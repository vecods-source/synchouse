import { NextRequest, NextResponse } from "next/server"
import { db, leads } from "@/lib/db"
import { eq } from "drizzle-orm"

export async function GET() {
  try {
    const allLeads = await db.select().from(leads).orderBy(leads.createdAt)
    return NextResponse.json({ leads: allLeads })
  } catch (error) {
    console.error("Failed to fetch leads:", error)
    return NextResponse.json(
      { error: "Failed to fetch leads" },
      { status: 500 }
    )
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { leads: newLeads } = body

    if (!Array.isArray(newLeads) || newLeads.length === 0) {
      return NextResponse.json(
        { error: "No leads provided" },
        { status: 400 }
      )
    }

    const insertedLeads = []

    for (const lead of newLeads) {
      try {
        const [inserted] = await db
          .insert(leads)
          .values({
            name: lead.name,
            email: lead.email,
            company: lead.company || null,
            role: lead.role || null,
            website: lead.website || null,
            linkedIn: lead.linkedIn || null,
            source: lead.source || "scrape",
            status: "new",
          })
          .onConflictDoNothing()
          .returning()

        if (inserted) {
          insertedLeads.push(inserted)
        }
      } catch (insertError) {
        // Skip duplicate emails
        console.log("Skipping duplicate:", lead.email)
      }
    }

    return NextResponse.json({
      message: `Successfully added ${insertedLeads.length} leads`,
      leads: insertedLeads,
    })
  } catch (error) {
    console.error("Failed to create leads:", error)
    return NextResponse.json(
      { error: "Failed to create leads" },
      { status: 500 }
    )
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const id = searchParams.get("id")

    if (!id) {
      return NextResponse.json(
        { error: "Lead ID is required" },
        { status: 400 }
      )
    }

    await db.delete(leads).where(eq(leads.id, parseInt(id)))

    return NextResponse.json({ message: "Lead deleted successfully" })
  } catch (error) {
    console.error("Failed to delete lead:", error)
    return NextResponse.json(
      { error: "Failed to delete lead" },
      { status: 500 }
    )
  }
}
