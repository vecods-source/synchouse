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

const reasons = [
  {
    icon: Zap,
    title: "Fast Delivery",
    description:
      "Agile development process ensures rapid deployment without compromising quality.",
  },
  {
    icon: Shield,
    title: "Enterprise Security",
    description:
      "Bank-level security protocols protect your data and your customers' trust.",
  },
  {
    icon: Users,
    title: "Expert Team",
    description:
      "Seasoned developers and designers with proven track records in enterprise software.",
  },
  {
    icon: Rocket,
    title: "Scalable Solutions",
    description:
      "Future-proof architecture that grows with your business needs.",
  },
  {
    icon: Wrench,
    title: "Warranty & Maintenance",
    description:
      "Comprehensive warranty coverage and ongoing maintenance services to keep your systems running smoothly.",
  },
  {
    icon: FileCheck,
    title: "Contract & In-Person Meetings",
    description:
      "Professional contracts and face-to-face consultations to ensure clear communication and guaranteed deliverables.",
  },
];

export function WhyUsSection() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const [minDate, setMinDate] = useState("");
  const [minTime, setMinTime] = useState("");

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
          title: "Consultation Scheduled!",
          description: "We'll contact you at your preferred time.",
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
          title: "Error",
          description:
            result.error ||
            "Failed to schedule consultation. Please try again.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
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
            <span className="font-mono text-sm font-bold text-background">
              WHY CHOOSE US
            </span>
          </div>
          <h2 className="mb-4 font-mono text-4xl font-bold tracking-tight md:text-5xl text-balance">
            BUILT FOR PERFORMANCE
            <br />
            <span className="text-accent">DESIGNED FOR SUCCESS</span>
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground text-pretty">
            We combine technical excellence with business acumen to deliver
            solutions that drive real results
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {reasons.map((reason, index) => (
            <div
              key={reason.title}
              className="relative border-4 border-foreground bg-card p-8 pixel-corners"
            >
              {/* Window-style title bar */}
              <div className="mb-6 flex items-center gap-2 border-b-4 border-foreground pb-4">
                <div className="h-3 w-3 border-2 border-foreground bg-accent" />
                <div className="h-3 w-3 border-2 border-foreground bg-background" />
                <div className="h-3 w-3 border-2 border-foreground bg-background" />
                <span className="ml-2 font-mono text-xs font-bold text-muted-foreground">
                  FEATURE_{(index + 1).toString().padStart(2, "0")}
                </span>
              </div>

              <div className="mb-4 inline-flex h-16 w-16 items-center justify-center border-4 border-foreground bg-accent pixel-corners">
                <reason.icon className="h-8 w-8 text-accent-foreground" />
              </div>

              <h3 className="mb-3 font-mono text-2xl font-bold">
                {reason.title}
              </h3>
              <p className="leading-relaxed text-muted-foreground">
                {reason.description}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-16 border-4 border-foreground bg-accent p-12 text-center pixel-corners">
          <h3 className="mb-4 font-mono text-3xl font-bold text-accent-foreground">
            READY TO TRANSFORM YOUR BUSINESS?
          </h3>
          <p className="mb-6 text-lg text-accent-foreground/90">
            Let's discuss how we can help you achieve your digital goals
          </p>
          <Button
            onClick={() => setIsDialogOpen(true)}
            size="lg"
            className="bg-foreground text-background hover:bg-background hover:text-foreground border-4 border-foreground font-mono text-sm font-bold pixel-corners"
          >
            SCHEDULE A CONSULTATION
          </Button>
        </div>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold">
                Schedule a Consultation
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
                    Full Name *
                  </Label>
                  <Input
                    id="consultation-name"
                    type="text"
                    required
                    placeholder="Abdullah Al Mamun"
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
                    Phone Number *
                  </Label>
                  <Input
                    id="consultation-phone"
                    type="tel"
                    required
                    placeholder="+974 55600224"
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
                    Service Type *
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
                      <SelectValue placeholder="Select a service" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="web-application">
                        Web Application
                      </SelectItem>
                      <SelectItem value="mobile-application">
                        Mobile Application
                      </SelectItem>
                      <SelectItem value="management-system">
                        Management System
                      </SelectItem>
                      <SelectItem value="e-commerce">E-Commerce</SelectItem>
                      <SelectItem value="ai-agent">AI Agent</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label
                    htmlFor="consultation-role"
                    className="mb-2 block text-sm font-semibold"
                  >
                    Your Role *
                  </Label>
                  <Input
                    id="consultation-role"
                    type="text"
                    required
                    placeholder="e.g., CEO, Manager, Developer"
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
                    Preferred Date *
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
                    Preferred Time *
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
                    Inside Qatar? *
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
                        Yes
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="no" id="qatar-no" />
                      <Label
                        htmlFor="qatar-no"
                        className="cursor-pointer font-normal"
                      >
                        No
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                <div>
                  <Label className="mb-3 block text-sm font-semibold">
                    Preferred Language *
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
                        English
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="ar" id="lang-ar" />
                      <Label
                        htmlFor="lang-ar"
                        className="cursor-pointer font-normal"
                      >
                        Arabic
                      </Label>
                    </div>
                  </RadioGroup>
                </div>
              </div>

              <div>
                <Label className="mb-3 block text-sm font-semibold">
                  Preferred Contact Method *
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
                      Phone Call
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
                      WhatsApp
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              <div>
                <Label
                  htmlFor="consultation-note"
                  className="mb-2 block text-sm font-semibold"
                >
                  Additional Notes (Optional)
                </Label>
                <Textarea
                  id="consultation-note"
                  rows={3}
                  placeholder="Any specific requirements or questions..."
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
                {isSubmitting ? "Scheduling..." : "Confirm Consultation"}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
}
