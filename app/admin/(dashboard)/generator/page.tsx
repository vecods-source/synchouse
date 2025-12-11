"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Zap, Loader2, Copy, Send, RefreshCw } from "lucide-react"

const emailTones = [
  { value: "professional", label: "Professional" },
  { value: "friendly", label: "Friendly" },
  { value: "casual", label: "Casual" },
  { value: "formal", label: "Formal" },
]

const emailTypes = [
  { value: "introduction", label: "Introduction / First Contact" },
  { value: "followup", label: "Follow-up" },
  { value: "partnership", label: "Partnership Proposal" },
  { value: "service", label: "Service Offering" },
]

export default function GeneratorPage() {
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedEmail, setGeneratedEmail] = useState({
    subject: "",
    body: "",
  })

  // Form state
  const [recipientName, setRecipientName] = useState("")
  const [recipientCompany, setRecipientCompany] = useState("")
  const [recipientRole, setRecipientRole] = useState("")
  const [emailType, setEmailType] = useState("introduction")
  const [tone, setTone] = useState("professional")
  const [context, setContext] = useState("")
  const [yourOffer, setYourOffer] = useState("")

  const handleGenerate = async () => {
    setIsGenerating(true)

    try {
      const response = await fetch("/api/admin/generate-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          recipientName,
          recipientCompany,
          recipientRole,
          emailType,
          tone,
          context,
          yourOffer,
        }),
      })

      if (response.ok) {
        const data = await response.json()
        setGeneratedEmail({
          subject: data.subject,
          body: data.body,
        })
      }
    } catch (error) {
      console.error("Failed to generate email:", error)
    } finally {
      setIsGenerating(false)
    }
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">AI Email Generator</h1>
        <p className="text-muted-foreground mt-1">
          Generate personalized outreach emails using AI
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Input Form */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="h-5 w-5 text-accent" />
              Email Parameters
            </CardTitle>
            <CardDescription>
              Provide details about the recipient and your offer
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="recipientName">Recipient Name</Label>
                <Input
                  id="recipientName"
                  placeholder="John Smith"
                  value={recipientName}
                  onChange={(e) => setRecipientName(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="recipientCompany">Company</Label>
                <Input
                  id="recipientCompany"
                  placeholder="Acme Corp"
                  value={recipientCompany}
                  onChange={(e) => setRecipientCompany(e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="recipientRole">Role / Position</Label>
              <Input
                id="recipientRole"
                placeholder="CEO, Marketing Director, etc."
                value={recipientRole}
                onChange={(e) => setRecipientRole(e.target.value)}
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label>Email Type</Label>
                <Select value={emailType} onValueChange={setEmailType}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {emailTypes.map((type) => (
                      <SelectItem key={type.value} value={type.value}>
                        {type.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Tone</Label>
                <Select value={tone} onValueChange={setTone}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {emailTones.map((t) => (
                      <SelectItem key={t.value} value={t.value}>
                        {t.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="context">Context / Research</Label>
              <Textarea
                id="context"
                placeholder="Any relevant information about the recipient or their company that could personalize the email..."
                value={context}
                onChange={(e) => setContext(e.target.value)}
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="yourOffer">Your Offer / Value Proposition</Label>
              <Textarea
                id="yourOffer"
                placeholder="What you're offering or proposing..."
                value={yourOffer}
                onChange={(e) => setYourOffer(e.target.value)}
                rows={3}
              />
            </div>

            <Button
              onClick={handleGenerate}
              disabled={isGenerating || !recipientName || !yourOffer}
              className="w-full"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Zap className="h-4 w-4 mr-2" />
                  Generate Email
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        {/* Generated Output */}
        <Card>
          <CardHeader>
            <CardTitle>Generated Email</CardTitle>
            <CardDescription>
              Review and edit the AI-generated content
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {generatedEmail.subject || generatedEmail.body ? (
              <>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label>Subject Line</Label>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => copyToClipboard(generatedEmail.subject)}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                  <Input
                    value={generatedEmail.subject}
                    onChange={(e) =>
                      setGeneratedEmail((prev) => ({ ...prev, subject: e.target.value }))
                    }
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label>Email Body</Label>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => copyToClipboard(generatedEmail.body)}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                  <Textarea
                    value={generatedEmail.body}
                    onChange={(e) =>
                      setGeneratedEmail((prev) => ({ ...prev, body: e.target.value }))
                    }
                    rows={12}
                    className="font-mono text-sm"
                  />
                </div>

                <div className="flex gap-2">
                  <Button variant="outline" onClick={handleGenerate} className="flex-1">
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Regenerate
                  </Button>
                  <Button className="flex-1">
                    <Send className="h-4 w-4 mr-2" />
                    Send Email
                  </Button>
                </div>
              </>
            ) : (
              <div className="text-center py-12">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-muted mb-4">
                  <Zap className="h-8 w-8 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-semibold mb-2">No email generated yet</h3>
                <p className="text-muted-foreground">
                  Fill in the parameters and click Generate
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
