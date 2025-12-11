import { NextRequest, NextResponse } from "next/server"
import * as cheerio from "cheerio"

// Email regex pattern
const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g

// Common name patterns near emails
const namePatterns = [
  /(?:^|[\s,])([A-Z][a-z]+(?:\s+[A-Z][a-z]+)+)(?=[\s,]|$)/g,
]

interface ScrapedLead {
  id: string
  name: string
  email: string
  company: string
  role: string
  website: string
}

export async function POST(req: NextRequest) {
  try {
    const { url } = await req.json()

    if (!url) {
      return NextResponse.json({ error: "URL is required" }, { status: 400 })
    }

    // Fetch the webpage
    const response = await fetch(url, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
      },
    })

    if (!response.ok) {
      return NextResponse.json(
        { error: "Failed to fetch the webpage" },
        { status: 400 }
      )
    }

    const html = await response.text()
    const $ = cheerio.load(html)

    // Extract all text content
    const textContent = $("body").text()

    // Find all emails
    const emails = [...new Set(textContent.match(emailRegex) || [])]
      .filter((email) => {
        // Filter out common non-personal emails
        const excludePatterns = [
          "noreply",
          "no-reply",
          "support@",
          "info@",
          "contact@",
          "sales@",
          "hello@",
          "help@",
          "admin@",
          "webmaster@",
        ]
        return !excludePatterns.some((pattern) =>
          email.toLowerCase().includes(pattern)
        )
      })

    // Extract company name from URL or page
    const urlObj = new URL(url)
    const companyFromUrl = urlObj.hostname
      .replace("www.", "")
      .split(".")[0]
      .replace(/-/g, " ")
      .replace(/\b\w/g, (c) => c.toUpperCase())

    const pageTitle = $("title").text() || ""
    const companyName = pageTitle.split("|")[0]?.trim() ||
                        pageTitle.split("-")[0]?.trim() ||
                        companyFromUrl

    // Try to extract names from structured data or common patterns
    const leads: ScrapedLead[] = []

    // Look for team member cards or similar structures
    $('[class*="team"], [class*="member"], [class*="person"], [class*="staff"], [class*="employee"]').each((_, element) => {
      const $el = $(element)
      const text = $el.text()

      // Try to find email in this element
      const emailMatch = text.match(emailRegex)
      if (emailMatch && emailMatch[0]) {
        const email = emailMatch[0]

        // Try to find name - look for h2, h3, h4, or strong tags
        const name = $el.find("h2, h3, h4, strong, [class*='name']").first().text().trim() ||
                    extractNameFromEmail(email)

        // Try to find role
        const role = $el.find("[class*='title'], [class*='role'], [class*='position'], p").first().text().trim()

        if (!leads.some(l => l.email === email)) {
          leads.push({
            id: crypto.randomUUID(),
            name: name || "Unknown",
            email,
            company: companyName,
            role: role || "",
            website: url,
          })
        }
      }
    })

    // If no structured data found, create leads from found emails
    if (leads.length === 0) {
      emails.forEach((email) => {
        leads.push({
          id: crypto.randomUUID(),
          name: extractNameFromEmail(email),
          email,
          company: companyName,
          role: "",
          website: url,
        })
      })
    }

    return NextResponse.json({ leads })
  } catch (error) {
    console.error("Scraping error:", error)
    return NextResponse.json(
      { error: "Failed to scrape website" },
      { status: 500 }
    )
  }
}

function extractNameFromEmail(email: string): string {
  const localPart = email.split("@")[0]

  // Try to extract name from email patterns like john.smith or john_smith
  const nameParts = localPart
    .replace(/[._-]/g, " ")
    .replace(/\d+/g, "")
    .trim()
    .split(" ")
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase())

  return nameParts.join(" ") || "Unknown"
}
