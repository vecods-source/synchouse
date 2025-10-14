"use server"

import { Resend } from "resend"

const resend = new Resend("re_4MJLhXwm_DTLWfHcDbbd8XqQTnuAX5vLH")

export async function submitContactForm(formData: {
  name: string
  email: string
  company: string
  contactNumber: string
  contactMethod: string
  preferredDate: string
  preferredTime: string
  message: string
}) {
  try {
    const { data, error } = await resend.emails.send({
      from: "Synchouse Contact Form <onboarding@resend.dev>",
      to: ["synchouse26@gmail.com"],
      subject: `New Contact Form Submission from ${formData.name}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${formData.name}</p>
        <p><strong>Email:</strong> ${formData.email || "Not provided"}</p>
        <p><strong>Company:</strong> ${formData.company || "Not provided"}</p>
        <p><strong>Contact Number:</strong> ${formData.contactNumber}</p>
        <p><strong>Preferred Contact Method:</strong> ${formData.contactMethod === "call" ? "Phone Call" : "WhatsApp Message"}</p>
        <p><strong>Preferred Date:</strong> ${formData.preferredDate}</p>
        <p><strong>Preferred Time:</strong> ${formData.preferredTime}</p>
        <p><strong>Message:</strong></p>
        <p>${formData.message}</p>
      `,
    })

    if (error) {
      console.error("Error sending email:", error)
      return { success: false, error }
    }

    return { success: true, data }
  } catch (error) {
    console.error("Error in submitContactForm:", error)
    return { success: false, error }
  }
}
