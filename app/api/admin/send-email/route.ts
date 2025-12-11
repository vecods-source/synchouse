import { NextRequest, NextResponse } from "next/server"
import { Resend } from "resend"
import { db, emailLogs, leads } from "@/lib/db"
import { eq } from "drizzle-orm"

// Lazy initialization to avoid build-time errors
function getResend() {
  if (!process.env.RESEND_API_KEY) {
    throw new Error("Resend API key not configured")
  }
  return new Resend(process.env.RESEND_API_KEY)
}

interface SendEmailRequest {
  leadId?: number
  to: string
  subject: string
  body: string
  campaignId?: number
}

export async function POST(req: NextRequest) {
  try {
    const body: SendEmailRequest = await req.json()
    const { leadId, to, subject, body: emailBody, campaignId } = body

    if (!to || !subject || !emailBody) {
      return NextResponse.json(
        { error: "Missing required fields: to, subject, body" },
        { status: 400 }
      )
    }

    const resend = getResend()

    // Send the email via Resend
    const { data, error } = await resend.emails.send({
      from: process.env.SENDER_EMAIL || "Synchouse <onboarding@resend.dev>",
      to: [to],
      subject,
      text: emailBody,
      html: emailBody.replace(/\n/g, "<br>"),
    })

    if (error) {
      console.error("Resend error:", error)
      return NextResponse.json(
        { error: "Failed to send email" },
        { status: 500 }
      )
    }

    // Log the email
    await db.insert(emailLogs).values({
      campaignId: campaignId || null,
      leadId: leadId || null,
      subject,
      body: emailBody,
      status: "sent",
      sentAt: new Date(),
    })

    // Update lead status if applicable
    if (leadId) {
      await db
        .update(leads)
        .set({ status: "contacted", updatedAt: new Date() })
        .where(eq(leads.id, leadId))
    }

    return NextResponse.json({
      message: "Email sent successfully",
      id: data?.id,
    })
  } catch (error) {
    console.error("Send email error:", error)
    return NextResponse.json(
      { error: "Failed to send email" },
      { status: 500 }
    )
  }
}

// Bulk send emails
export async function PUT(req: NextRequest) {
  try {
    const body = await req.json()
    const { emails, campaignId } = body as {
      emails: Array<{ leadId: number; to: string; subject: string; body: string }>
      campaignId?: number
    }

    if (!Array.isArray(emails) || emails.length === 0) {
      return NextResponse.json(
        { error: "No emails to send" },
        { status: 400 }
      )
    }

    const resend = getResend()

    const results = {
      sent: 0,
      failed: 0,
      errors: [] as string[],
    }

    // Send emails with rate limiting (respect Resend limits)
    for (const email of emails) {
      try {
        const { error } = await resend.emails.send({
          from: process.env.SENDER_EMAIL || "Synchouse <onboarding@resend.dev>",
          to: [email.to],
          subject: email.subject,
          text: email.body,
          html: email.body.replace(/\n/g, "<br>"),
        })

        if (error) {
          results.failed++
          results.errors.push(`Failed to send to ${email.to}: ${error.message}`)
        } else {
          results.sent++

          // Log the email
          await db.insert(emailLogs).values({
            campaignId: campaignId || null,
            leadId: email.leadId || null,
            subject: email.subject,
            body: email.body,
            status: "sent",
            sentAt: new Date(),
          })

          // Update lead status
          if (email.leadId) {
            await db
              .update(leads)
              .set({ status: "contacted", updatedAt: new Date() })
              .where(eq(leads.id, email.leadId))
          }
        }

        // Rate limiting: wait 100ms between emails
        await new Promise((resolve) => setTimeout(resolve, 100))
      } catch (err) {
        results.failed++
        results.errors.push(`Error sending to ${email.to}`)
      }
    }

    return NextResponse.json({
      message: `Sent ${results.sent} emails, ${results.failed} failed`,
      ...results,
    })
  } catch (error) {
    console.error("Bulk send error:", error)
    return NextResponse.json(
      { error: "Failed to send bulk emails" },
      { status: 500 }
    )
  }
}
