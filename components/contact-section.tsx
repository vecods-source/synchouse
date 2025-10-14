"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Mail, Phone, MapPin, MessageCircle } from "lucide-react"
import { submitContactForm } from "@/app/actions/contact"

export function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    contactNumber: "",
    contactMethod: "",
    preferredDate: "",
    preferredTime: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus("idle")

    try {
      const result = await submitContactForm(formData)
      if (result.success) {
        setSubmitStatus("success")
        setFormData({
          name: "",
          email: "",
          company: "",
          contactNumber: "",
          contactMethod: "",
          preferredDate: "",
          preferredTime: "",
          message: "",
        })
      } else {
        setSubmitStatus("error")
      }
    } catch (error) {
      setSubmitStatus("error")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleWhatsAppClick = () => {
    window.open("https://wa.me/97455600224", "_blank")
  }

  return (
    <section id="contact" className="border-b border-border/40 bg-background py-24">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mb-16 text-center">
          <div className="mb-4 inline-block rounded-full bg-primary/10 px-4 py-2">
            <span className="text-sm font-semibold text-primary">GET IN TOUCH</span>
          </div>
          <h2 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl text-balance">
            Let's Build Something
            <br />
            <span className="text-primary">Amazing Together</span>
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground text-pretty">
            Have a project in mind? We'd love to hear about it. Send us a message and we'll respond within 24 hours.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-3 items-start">
          <div className="space-y-4 lg:col-span-1">
            <Button
              onClick={handleWhatsAppClick}
              size="lg"
              className="w-full gap-2 bg-[#25D366] hover:bg-[#20BA5A] text-white"
            >
              <MessageCircle className="h-5 w-5" />
              WhatsApp Us
            </Button>

            <div className="rounded-lg border border-border/40 bg-card p-4 shadow-sm hover:shadow-md transition-shadow">
              <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                <Mail className="h-5 w-5 text-primary" />
              </div>
              <h3 className="mb-1 text-base font-semibold">Email</h3>
              <p className="text-sm text-muted-foreground">synchouse26@gmail.com</p>
            </div>

            <div className="rounded-lg border border-border/40 bg-card p-4 shadow-sm hover:shadow-md transition-shadow">
              <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                <Phone className="h-5 w-5 text-primary" />
              </div>
              <h3 className="mb-1 text-base font-semibold">Phone</h3>
              <a href="tel:+97455600224" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                +974 55600224
              </a>
            </div>

            <div className="rounded-lg border border-border/40 bg-card p-4 shadow-sm hover:shadow-md transition-shadow">
              <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                <MapPin className="h-5 w-5 text-primary" />
              </div>
              <h3 className="mb-1 text-base font-semibold">Location</h3>
              <p className="text-sm text-muted-foreground">Doha, QA</p>
            </div>
          </div>

          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="rounded-lg border border-border/40 bg-card p-8 shadow-sm">
              <div className="space-y-6">
                <div className="grid gap-6 md:grid-cols-2">
                  <div>
                    <Label htmlFor="name" className="mb-2 block text-sm font-semibold">
                      Name *
                    </Label>
                    <Input
                      id="name"
                      required
                      className="border-border/40"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="email" className="mb-2 block text-sm font-semibold">
                      Email
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      className="border-border/40"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                  </div>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                  <div>
                    <Label htmlFor="company" className="mb-2 block text-sm font-semibold">
                      Company Name
                    </Label>
                    <Input
                      id="company"
                      className="border-border/40"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="contactNumber" className="mb-2 block text-sm font-semibold">
                      Contact Number *
                    </Label>
                    <Input
                      id="contactNumber"
                      type="tel"
                      required
                      className="border-border/40"
                      value={formData.contactNumber}
                      onChange={(e) => setFormData({ ...formData, contactNumber: e.target.value })}
                    />
                  </div>
                </div>

                <div>
                  <Label className="mb-3 block text-sm font-semibold">Preferred Contact Method *</Label>
                  <RadioGroup
                    required
                    value={formData.contactMethod}
                    onValueChange={(value) => setFormData({ ...formData, contactMethod: value })}
                    className="flex flex-row gap-6"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="call" id="call" />
                      <Label htmlFor="call" className="cursor-pointer font-normal">
                        Connect with a call
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="whatsapp" id="whatsapp" />
                      <Label htmlFor="whatsapp" className="cursor-pointer font-normal">
                        Connect with WhatsApp message
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                {formData.contactMethod === "call" && (
                  <div className="grid gap-6 md:grid-cols-2">
                    <div>
                      <Label htmlFor="preferredDate" className="mb-2 block text-sm font-semibold">
                        Preferred Date *
                      </Label>
                      <Input
                        id="preferredDate"
                        type="date"
                        required
                        className="border-border/40"
                        value={formData.preferredDate}
                        onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                        min={new Date().toISOString().split("T")[0]}
                      />
                    </div>
                    <div>
                      <Label htmlFor="preferredTime" className="mb-2 block text-sm font-semibold">
                        Preferred Time *
                      </Label>
                      <Input
                        id="preferredTime"
                        type="time"
                        required
                        className="border-border/40"
                        value={formData.preferredTime}
                        onChange={(e) => setFormData({ ...formData, preferredTime: e.target.value })}
                      />
                    </div>
                  </div>
                )}

                <div>
                  <Label htmlFor="message" className="mb-2 block text-sm font-semibold">
                    Message *
                  </Label>
                  <Textarea
                    id="message"
                    required
                    rows={4}
                    className="border-border/40 resize-none"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  />
                </div>

                {submitStatus === "success" && (
                  <div className="rounded-lg bg-green-50 p-4 text-sm text-green-800">
                    Thank you! Your message has been sent successfully. We'll get back to you soon.
                  </div>
                )}
                {submitStatus === "error" && (
                  <div className="rounded-lg bg-red-50 p-4 text-sm text-red-800">
                    Sorry, there was an error sending your message. Please try again.
                  </div>
                )}

                <Button
                  type="submit"
                  size="lg"
                  disabled={isSubmitting}
                  className="w-full text-base font-semibold bg-accent hover:bg-accent/90"
                >
                  {isSubmitting ? "SENDING..." : "SEND MESSAGE"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
