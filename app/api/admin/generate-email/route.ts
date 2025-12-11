import { NextRequest, NextResponse } from "next/server"
import OpenAI from "openai"

// Lazy initialization to avoid build-time errors
function getOpenAI() {
  if (!process.env.OPENAI_API_KEY) {
    throw new Error("OpenAI API key not configured")
  }
  return new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  })
}

interface GenerateEmailRequest {
  recipientName: string
  recipientCompany: string
  recipientRole: string
  emailType: string
  tone: string
  context: string
  yourOffer: string
}

export async function POST(req: NextRequest) {
  try {
    const body: GenerateEmailRequest = await req.json()
    const {
      recipientName,
      recipientCompany,
      recipientRole,
      emailType,
      tone,
      context,
      yourOffer,
    } = body

    if (!recipientName || !yourOffer) {
      return NextResponse.json(
        { error: "Recipient name and offer are required" },
        { status: 400 }
      )
    }

    const openai = getOpenAI()

    const emailTypeDescriptions: Record<string, string> = {
      introduction: "a first contact introduction email",
      followup: "a follow-up email to a previous conversation",
      partnership: "a partnership proposal email",
      service: "a service offering email",
    }

    const toneDescriptions: Record<string, string> = {
      professional: "professional and business-like",
      friendly: "warm and friendly while remaining professional",
      casual: "casual and conversational",
      formal: "formal and respectful",
    }

    const prompt = `You are an expert cold email copywriter. Write ${emailTypeDescriptions[emailType] || "an outreach email"} that is ${toneDescriptions[tone] || "professional"}.

RECIPIENT INFORMATION:
- Name: ${recipientName}
- Company: ${recipientCompany || "Not specified"}
- Role/Position: ${recipientRole || "Not specified"}

CONTEXT/RESEARCH:
${context || "No additional context provided"}

WHAT I'M OFFERING:
${yourOffer}

REQUIREMENTS:
1. Keep the email concise (under 150 words for the body)
2. Make it personalized based on the recipient info
3. Include a clear call-to-action
4. Don't be pushy or salesy
5. Sound human and authentic
6. Use the recipient's first name

Respond in this exact JSON format:
{
  "subject": "Your compelling subject line here",
  "body": "Your email body here"
}

Only respond with the JSON, no other text.`

    const completion = await openai.chat.completions.create({
      model: "gpt-4-turbo-preview",
      messages: [
        {
          role: "system",
          content: "You are an expert at writing personalized cold emails that get responses. You write emails that are concise, personalized, and have clear calls to action. Always respond with valid JSON only.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.7,
      max_tokens: 500,
    })

    const content = completion.choices[0]?.message?.content
    if (!content) {
      return NextResponse.json(
        { error: "Failed to generate email" },
        { status: 500 }
      )
    }

    // Parse the JSON response
    try {
      const emailData = JSON.parse(content)
      return NextResponse.json(emailData)
    } catch {
      // If JSON parsing fails, try to extract subject and body
      const subjectMatch = content.match(/"subject":\s*"([^"]+)"/)
      const bodyMatch = content.match(/"body":\s*"([\s\S]+?)"(?=\s*\})/)

      if (subjectMatch && bodyMatch) {
        return NextResponse.json({
          subject: subjectMatch[1],
          body: bodyMatch[1].replace(/\\n/g, "\n"),
        })
      }

      return NextResponse.json(
        { error: "Failed to parse generated email" },
        { status: 500 }
      )
    }
  } catch (error) {
    console.error("Email generation error:", error)
    return NextResponse.json(
      { error: "Failed to generate email" },
      { status: 500 }
    )
  }
}
