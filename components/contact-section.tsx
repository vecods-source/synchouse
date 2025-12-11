"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Mail, Phone, MapPin, MessageCircle } from "lucide-react";
import { submitContactForm } from "@/app/actions/contact";
import { useTranslations, useLocale } from "next-intl";
import { isRtlLocale, type Locale } from "@/i18n/config";

export function ContactSection() {
  const t = useTranslations("contact");
  const locale = useLocale() as Locale;
  const isRTL = isRtlLocale(locale);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    contactNumber: "",
    contactMethod: "",
    preferredDate: "",
    preferredTime: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      const result = await submitContactForm(formData);
      if (result.success) {
        setSubmitStatus("success");
        setFormData({
          name: "",
          email: "",
          company: "",
          contactNumber: "",
          contactMethod: "",
          preferredDate: "",
          preferredTime: "",
          message: "",
        });
      } else {
        setSubmitStatus("error");
      }
    } catch (error) {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleWhatsAppClick = () => {
    const whatsappNumber = locale === "de" ? "4915215928643" : "97455600224";
    window.open(`https://wa.me/${whatsappNumber}`, "_blank");
  };

  return (
    <section
      id="contact"
      className="border-b border-border/40 bg-background py-24"
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="mb-16 text-center">
          <div className="mb-4 inline-block rounded-full bg-primary/10 px-4 py-2">
            <span className="text-sm font-semibold text-primary">
              {t("badge")}
            </span>
          </div>
          <h2 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl text-balance">
            {t("title1")}
            <br />
            <span className="text-primary">{t("title2")}</span>
          </h2>
          <p className={`mx-auto max-w-2xl text-lg text-muted-foreground text-pretty ${isRTL ? "leading-loose" : ""}`}>
            {t("description")}
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
              {t("whatsappUs")}
            </Button>

            <div className="rounded-lg border border-border/40 bg-card p-4 shadow-sm hover:shadow-md transition-shadow">
              <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                <Mail className="h-5 w-5 text-primary" />
              </div>
              <h3 className="mb-1 text-base font-semibold">{t("email")}</h3>
              <p className="text-sm text-muted-foreground">
                synchouse26@gmail.com
              </p>
            </div>

            <div className="rounded-lg border border-border/40 bg-card p-4 shadow-sm hover:shadow-md transition-shadow">
              <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                <Phone className="h-5 w-5 text-primary" />
              </div>
              <h3 className="mb-1 text-base font-semibold">{t("phone")}</h3>
              <div className={`space-y-1 ${isRTL ? "text-right" : ""}`}>
                <a
                  href="tel:+97455600224"
                  dir="ltr"
                  className={`text-sm text-muted-foreground hover:text-primary transition-colors block ${isRTL ? "text-right" : ""}`}
                >
                  +974 55600224
                </a>
                <a
                  href="tel:+4915215928643"
                  dir="ltr"
                  className={`text-sm text-muted-foreground hover:text-primary transition-colors block ${isRTL ? "text-right" : ""}`}
                >
                  +49 152 15928643
                </a>
              </div>
            </div>

            <div className="rounded-lg border border-border/40 bg-card p-4 shadow-sm hover:shadow-md transition-shadow">
              <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                <MapPin className="h-5 w-5 text-primary" />
              </div>
              <h3 className="mb-1 text-base font-semibold">{t("location")}</h3>
              <p className="text-sm text-muted-foreground">{t("locationDoha")}</p>
              <p className="text-sm text-muted-foreground">{t("locationBerlin")}</p>
            </div>
          </div>

          <div className="lg:col-span-2">
            <form
              onSubmit={handleSubmit}
              className="rounded-lg border border-border/40 bg-card p-8 shadow-sm"
            >
              <div className="space-y-6">
                <div className="grid gap-6 md:grid-cols-2">
                  <div>
                    <Label
                      htmlFor="name"
                      className="mb-2 block text-sm font-semibold"
                    >
                      {t("form.name")}
                    </Label>
                    <Input
                      id="name"
                      required
                      className="border-border/40"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                    />
                  </div>
                  <div>
                    <Label
                      htmlFor="email"
                      className="mb-2 block text-sm font-semibold"
                    >
                      {t("form.email")}
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      className="border-border/40"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                    />
                  </div>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                  <div>
                    <Label
                      htmlFor="company"
                      className="mb-2 block text-sm font-semibold"
                    >
                      {t("form.company")}
                    </Label>
                    <Input
                      id="company"
                      className="border-border/40"
                      value={formData.company}
                      onChange={(e) =>
                        setFormData({ ...formData, company: e.target.value })
                      }
                    />
                  </div>
                  <div>
                    <Label
                      htmlFor="contactNumber"
                      className="mb-2 block text-sm font-semibold"
                    >
                      {t("form.contactNumber")}
                    </Label>
                    <Input
                      id="contactNumber"
                      type="tel"
                      required
                      className="border-border/40"
                      value={formData.contactNumber}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          contactNumber: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>

                <div>
                  <Label className={`mb-3 block text-sm font-semibold ${isRTL ? "text-right" : ""}`}>
                    {t("form.contactMethod")}
                  </Label>
                  <RadioGroup
                    required
                    value={formData.contactMethod}
                    onValueChange={(value) =>
                      setFormData({ ...formData, contactMethod: value })
                    }
                    className={`flex flex-row gap-6 ${isRTL ? "justify-end" : ""}`}
                  >
                    <div className={`flex items-center gap-2 ${isRTL ? "flex-row-reverse" : ""}`}>
                      <RadioGroupItem value="call" id="call" />
                      <Label
                        htmlFor="call"
                        className="cursor-pointer font-normal"
                      >
                        {t("form.call")}
                      </Label>
                    </div>
                    <div className={`flex items-center gap-2 ${isRTL ? "flex-row-reverse" : ""}`}>
                      <RadioGroupItem value="whatsapp" id="whatsapp" />
                      <Label
                        htmlFor="whatsapp"
                        className="cursor-pointer font-normal"
                      >
                        {t("form.whatsapp")}
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                {formData.contactMethod === "call" && (
                  <div className="grid gap-6 md:grid-cols-2">
                    <div>
                      <Label
                        htmlFor="preferredDate"
                        className="mb-2 block text-sm font-semibold"
                      >
                        {t("form.preferredDate")}
                      </Label>
                      <Input
                        id="preferredDate"
                        type="date"
                        required
                        className="border-border/40"
                        value={formData.preferredDate}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            preferredDate: e.target.value,
                          })
                        }
                        min={new Date().toISOString().split("T")[0]}
                      />
                    </div>
                    <div>
                      <Label
                        htmlFor="preferredTime"
                        className="mb-2 block text-sm font-semibold"
                      >
                        {t("form.preferredTime")}
                      </Label>
                      <Input
                        id="preferredTime"
                        type="time"
                        required
                        className="border-border/40"
                        value={formData.preferredTime}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            preferredTime: e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>
                )}

                <div>
                  <Label
                    htmlFor="message"
                    className="mb-2 block text-sm font-semibold"
                  >
                    {t("form.message")}
                  </Label>
                  <Textarea
                    id="message"
                    required
                    rows={4}
                    className="border-border/40 resize-none"
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                  />
                </div>

                {submitStatus === "success" && (
                  <div className={`rounded-lg bg-green-50 p-4 text-sm text-green-800 ${isRTL ? "leading-relaxed" : ""}`}>
                    {t("form.successMessage")}
                  </div>
                )}
                {submitStatus === "error" && (
                  <div className={`rounded-lg bg-red-50 p-4 text-sm text-red-800 ${isRTL ? "leading-relaxed" : ""}`}>
                    {t("form.errorMessage")}
                  </div>
                )}

                <Button
                  type="submit"
                  size="lg"
                  disabled={isSubmitting}
                  className="w-full text-base font-semibold bg-accent hover:bg-accent/90"
                >
                  {isSubmitting ? t("form.sending") : t("form.sendMessage")}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
