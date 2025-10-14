"use server"

import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

export async function submitConsultation(data: {
  name: string
  phone: string
  serviceType: string
  date: string
  time: string
  contactMethod: string
  insideQatar: string
  preferredLanguage: string
  role: string
  note?: string
}) {
  try {
    await resend.emails.send({
      from: "Synchouse Consultation <onboarding@resend.dev>",
      to: "synchouse26@gmail.com",
      subject: `New Consultation Request from ${data.name}`,
      html: `
        <h2>New Consultation Request</h2>
        <p><strong>Name:</strong> ${data.name}</p>
        <p><strong>Phone:</strong> ${data.phone}</p>
        <p><strong>Role:</strong> ${data.role}</p>
        <p><strong>Service Type:</strong> ${data.serviceType}</p>
        <p><strong>Preferred Date:</strong> ${data.date}</p>
        <p><strong>Preferred Time:</strong> ${data.time}</p>
        <p><strong>Contact Method:</strong> ${data.contactMethod}</p>
        <p><strong>Inside Qatar:</strong> ${data.insideQatar}</p>
        <p><strong>Preferred Language:</strong> ${data.preferredLanguage === "en" ? "English" : "Arabic"}</p>
        ${data.note ? `<p><strong>Additional Notes:</strong> ${data.note}</p>` : ""}
      `,
    })

    return { success: true }
  } catch (error) {
    console.error("Failed to send consultation email:", error)
    return { success: false, error: "Failed to send email" }
  }
}
