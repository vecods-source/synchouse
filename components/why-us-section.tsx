"use client";

import type React from "react";

import { useState, useEffect } from "react";
import { Zap, Shield, Users, Rocket, Wrench, FileCheck } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { submitConsultation } from "@/app/actions/consultation";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/lib/language-context";

export function WhyUsSection() {
  const { t, isRTL } = useLanguage();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const [minDate, setMinDate] = useState("");
  const [minTime, setMinTime] = useState("");

  const reasons = [
    {
      icon: Zap,
      title: t.whyUs.reasons.fastDelivery.title,
      description: t.whyUs.reasons.fastDelivery.description,
    },
    {
      icon: Shield,
      title: t.whyUs.reasons.security.title,
      description: t.whyUs.reasons.security.description,
    },
    {
      icon: Users,
      title: t.whyUs.reasons.team.title,
      description: t.whyUs.reasons.team.description,
    },
    {
      icon: Rocket,
      title: t.whyUs.reasons.scalable.title,
      description: t.whyUs.reasons.scalable.description,
    },
    {
      icon: Wrench,
      title: t.whyUs.reasons.warranty.title,
      description: t.whyUs.reasons.warranty.description,
    },
    {
      icon: FileCheck,
      title: t.whyUs.reasons.contract.title,
      description: t.whyUs.reasons.contract.description,
    },
  ];

  const [consultationData, setConsultationData] = useState({
    name: "",
    phone: "",
    serviceType: "",
    date: "",
    time: "",
    contactMethod: "",
    insideQatar: "",
    preferredLanguage: "",
    role: "",
    note: "",
  });

  useEffect(() => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    setMinDate(`${year}-${month}-${day}`);
  }, []);

  useEffect(() => {
    if (consultationData.date === minDate) {
      const now = new Date();
      const hours = String(now.getHours()).padStart(2, "0");
      const minutes = String(now.getMinutes()).padStart(2, "0");
      setMinTime(`${hours}:${minutes}`);
    } else {
      setMinTime("");
    }
  }, [consultationData.date, minDate]);

  const handleConsultationSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const result = await submitConsultation(consultationData);

      if (result.success) {
        toast({
          title: t.whyUs.dialog.successTitle,
          description: t.whyUs.dialog.successDescription,
        });
        setConsultationData({
          name: "",
          phone: "",
          serviceType: "",
          date: "",
          time: "",
          contactMethod: "",
          insideQatar: "",
          preferredLanguage: "",
          role: "",
          note: "",
        });
        setIsDialogOpen(false);
      } else {
        toast({
          title: t.whyUs.dialog.errorTitle,
          description: result.error || t.whyUs.dialog.errorDescription,
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: t.whyUs.dialog.errorTitle,
        description: t.whyUs.dialog.genericError,
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="why-us"
      className="border-b-4 border-foreground bg-secondary py-24"
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="mb-16 text-center">
          <div className="mb-4 inline-block border-4 border-foreground bg-foreground px-4 py-2 pixel-corners">
            <span className={`text-sm font-bold text-background ${isRTL ? "" : "font-mono"}`}>
              {t.whyUs.badge}
            </span>
          </div>
          <h2 className={`mb-4 text-4xl font-bold tracking-tight md:text-5xl text-balance ${isRTL ? "leading-tight" : "font-mono"}`}>
            {t.whyUs.title1}
            <br />
            <span className="text-accent">{t.whyUs.title2}</span>
          </h2>
          <p className={`mx-auto max-w-2xl text-lg text-muted-foreground text-pretty ${isRTL ? "leading-loose" : ""}`}>
            {t.whyUs.description}
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {reasons.map((reason, index) => (
            <div
              key={reason.title}
              className="relative border-4 border-foreground bg-card p-8 pixel-corners"
            >
              {/* Window-style title bar */}
              <div className={`mb-6 flex items-center gap-2 border-b-4 border-foreground pb-4 ${isRTL ? "flex-row-reverse" : ""}`}>
                <div className="h-3 w-3 border-2 border-foreground bg-accent" />
                <div className="h-3 w-3 border-2 border-foreground bg-background" />
                <div className="h-3 w-3 border-2 border-foreground bg-background" />
                <span className={`font-mono text-xs font-bold text-muted-foreground ${isRTL ? "mr-2" : "ml-2"}`}>
                  FEATURE_{(index + 1).toString().padStart(2, "0")}
                </span>
              </div>

              <div className="mb-4 inline-flex h-16 w-16 items-center justify-center border-4 border-foreground bg-accent pixel-corners">
                <reason.icon className="h-8 w-8 text-accent-foreground" />
              </div>

              <h3 className={`mb-3 text-2xl font-bold ${isRTL ? "leading-relaxed" : "font-mono"}`}>
                {reason.title}
              </h3>
              <p className={`text-muted-foreground ${isRTL ? "leading-loose" : "leading-relaxed"}`}>
                {reason.description}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-16 border-4 border-foreground bg-accent p-12 text-center pixel-corners">
          <h3 className={`mb-4 text-3xl font-bold text-accent-foreground ${isRTL ? "leading-relaxed" : "font-mono"}`}>
            {t.whyUs.cta.title}
          </h3>
          <p className={`mb-6 text-lg text-accent-foreground/90 ${isRTL ? "leading-loose" : ""}`}>
            {t.whyUs.cta.description}
          </p>
          <Button
            onClick={() => setIsDialogOpen(true)}
            size="lg"
            className={`bg-foreground text-background hover:bg-background hover:text-foreground border-4 border-foreground text-sm font-bold pixel-corners ${isRTL ? "" : "font-mono"}`}
          >
            {t.whyUs.cta.button}
          </Button>
        </div>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold">
                {t.whyUs.dialog.title}
              </DialogTitle>
            </DialogHeader>
            <form
              onSubmit={handleConsultationSubmit}
              className="space-y-6 mt-4"
            >
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label
                    htmlFor="consultation-name"
                    className="mb-2 block text-sm font-semibold"
                  >
                    {t.whyUs.dialog.fullName}
                  </Label>
                  <Input
                    id="consultation-name"
                    type="text"
                    required
                    placeholder={t.whyUs.dialog.fullNamePlaceholder}
                    value={consultationData.name}
                    onChange={(e) =>
                      setConsultationData({
                        ...consultationData,
                        name: e.target.value,
                      })
                    }
                  />
                </div>

                <div>
                  <Label
                    htmlFor="consultation-phone"
                    className="mb-2 block text-sm font-semibold"
                  >
                    {t.whyUs.dialog.phone}
                  </Label>
                  <Input
                    id="consultation-phone"
                    type="tel"
                    required
                    placeholder={t.whyUs.dialog.phonePlaceholder}
                    value={consultationData.phone}
                    onChange={(e) =>
                      setConsultationData({
                        ...consultationData,
                        phone: e.target.value,
                      })
                    }
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label
                    htmlFor="consultation-service"
                    className="mb-2 block text-sm font-semibold"
                  >
                    {t.whyUs.dialog.serviceType}
                  </Label>
                  <Select
                    required
                    value={consultationData.serviceType}
                    onValueChange={(value) =>
                      setConsultationData({
                        ...consultationData,
                        serviceType: value,
                      })
                    }
                  >
                    <SelectTrigger id="consultation-service">
                      <SelectValue placeholder={t.whyUs.dialog.selectService} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="web-application">
                        {t.whyUs.dialog.webApp}
                      </SelectItem>
                      <SelectItem value="mobile-application">
                        {t.whyUs.dialog.mobileApp}
                      </SelectItem>
                      <SelectItem value="management-system">
                        {t.whyUs.dialog.managementSystem}
                      </SelectItem>
                      <SelectItem value="e-commerce">{t.whyUs.dialog.ecommerce}</SelectItem>
                      <SelectItem value="ai-agent">{t.whyUs.dialog.aiAgent}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label
                    htmlFor="consultation-role"
                    className="mb-2 block text-sm font-semibold"
                  >
                    {t.whyUs.dialog.role}
                  </Label>
                  <Input
                    id="consultation-role"
                    type="text"
                    required
                    placeholder={t.whyUs.dialog.rolePlaceholder}
                    value={consultationData.role}
                    onChange={(e) =>
                      setConsultationData({
                        ...consultationData,
                        role: e.target.value,
                      })
                    }
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label
                    htmlFor="consultation-date"
                    className="mb-2 block text-sm font-semibold"
                  >
                    {t.whyUs.dialog.preferredDate}
                  </Label>
                  <Input
                    id="consultation-date"
                    type="date"
                    required
                    min={minDate}
                    value={consultationData.date}
                    onChange={(e) =>
                      setConsultationData({
                        ...consultationData,
                        date: e.target.value,
                      })
                    }
                  />
                </div>

                <div>
                  <Label
                    htmlFor="consultation-time"
                    className="mb-2 block text-sm font-semibold"
                  >
                    {t.whyUs.dialog.preferredTime}
                  </Label>
                  <Input
                    id="consultation-time"
                    type="time"
                    required
                    min={minTime}
                    value={consultationData.time}
                    onChange={(e) =>
                      setConsultationData({
                        ...consultationData,
                        time: e.target.value,
                      })
                    }
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="mb-3 block text-sm font-semibold">
                    {t.whyUs.dialog.insideQatar}
                  </Label>
                  <RadioGroup
                    required
                    value={consultationData.insideQatar}
                    onValueChange={(value) =>
                      setConsultationData({
                        ...consultationData,
                        insideQatar: value,
                      })
                    }
                    className="flex flex-row gap-6"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="yes" id="qatar-yes" />
                      <Label
                        htmlFor="qatar-yes"
                        className="cursor-pointer font-normal"
                      >
                        {t.whyUs.dialog.yes}
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="no" id="qatar-no" />
                      <Label
                        htmlFor="qatar-no"
                        className="cursor-pointer font-normal"
                      >
                        {t.whyUs.dialog.no}
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                <div>
                  <Label className="mb-3 block text-sm font-semibold">
                    {t.whyUs.dialog.preferredLanguage}
                  </Label>
                  <RadioGroup
                    required
                    value={consultationData.preferredLanguage}
                    onValueChange={(value) =>
                      setConsultationData({
                        ...consultationData,
                        preferredLanguage: value,
                      })
                    }
                    className="flex flex-row gap-6"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="en" id="lang-en" />
                      <Label
                        htmlFor="lang-en"
                        className="cursor-pointer font-normal"
                      >
                        {t.whyUs.dialog.english}
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="ar" id="lang-ar" />
                      <Label
                        htmlFor="lang-ar"
                        className="cursor-pointer font-normal"
                      >
                        {t.whyUs.dialog.arabic}
                      </Label>
                    </div>
                  </RadioGroup>
                </div>
              </div>

              <div>
                <Label className="mb-3 block text-sm font-semibold">
                  {t.whyUs.dialog.contactMethod}
                </Label>
                <RadioGroup
                  required
                  value={consultationData.contactMethod}
                  onValueChange={(value) =>
                    setConsultationData({
                      ...consultationData,
                      contactMethod: value,
                    })
                  }
                  className="flex flex-row gap-6"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="call" id="consultation-call" />
                    <Label
                      htmlFor="consultation-call"
                      className="cursor-pointer font-normal"
                    >
                      {t.whyUs.dialog.phoneCall}
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem
                      value="whatsapp"
                      id="consultation-whatsapp"
                    />
                    <Label
                      htmlFor="consultation-whatsapp"
                      className="cursor-pointer font-normal"
                    >
                      {t.whyUs.dialog.whatsapp}
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              <div>
                <Label
                  htmlFor="consultation-note"
                  className="mb-2 block text-sm font-semibold"
                >
                  {t.whyUs.dialog.additionalNotes}
                </Label>
                <Textarea
                  id="consultation-note"
                  rows={3}
                  placeholder={t.whyUs.dialog.notesPlaceholder}
                  value={consultationData.note}
                  onChange={(e) =>
                    setConsultationData({
                      ...consultationData,
                      note: e.target.value,
                    })
                  }
                  className="resize-none"
                />
              </div>

              <Button
                type="submit"
                size="lg"
                className="w-full text-base font-semibold bg-accent hover:bg-accent/90"
                disabled={isSubmitting}
              >
                {isSubmitting ? t.whyUs.dialog.scheduling : t.whyUs.dialog.confirmConsultation}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
}
