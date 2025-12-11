"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Settings, Key, Mail, User, Save, AlertCircle } from "lucide-react"

export default function SettingsPage() {
  const [senderName, setSenderName] = useState("Synchouse")
  const [senderEmail, setSenderEmail] = useState("")
  const [emailSignature, setEmailSignature] = useState("")
  const [dailyLimit, setDailyLimit] = useState("50")
  const [trackOpens, setTrackOpens] = useState(true)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground mt-1">
          Configure your outreach tool preferences
        </p>
      </div>

      {/* Sender Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Mail className="h-5 w-5" />
            Email Settings
          </CardTitle>
          <CardDescription>
            Configure how your emails are sent
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="senderName">Sender Name</Label>
              <Input
                id="senderName"
                placeholder="Your Name or Company"
                value={senderName}
                onChange={(e) => setSenderName(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="senderEmail">Sender Email</Label>
              <Input
                id="senderEmail"
                type="email"
                placeholder="you@company.com"
                value={senderEmail}
                onChange={(e) => setSenderEmail(e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="signature">Email Signature</Label>
            <Textarea
              id="signature"
              placeholder="Your email signature..."
              value={emailSignature}
              onChange={(e) => setEmailSignature(e.target.value)}
              rows={4}
            />
          </div>

          <Separator />

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Daily Send Limit</Label>
                <p className="text-sm text-muted-foreground">
                  Maximum emails to send per day (Resend free tier: 100/day)
                </p>
              </div>
              <Input
                type="number"
                value={dailyLimit}
                onChange={(e) => setDailyLimit(e.target.value)}
                className="w-24"
                min="1"
                max="100"
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Track Email Opens</Label>
                <p className="text-sm text-muted-foreground">
                  Add tracking pixel to emails to monitor opens
                </p>
              </div>
              <Switch checked={trackOpens} onCheckedChange={setTrackOpens} />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* API Keys */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Key className="h-5 w-5" />
            API Configuration
          </CardTitle>
          <CardDescription>
            API keys are stored securely as environment variables
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="rounded-lg border border-dashed p-4 bg-muted/50">
            <div className="flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-muted-foreground mt-0.5" />
              <div>
                <p className="text-sm font-medium">Environment Variables</p>
                <p className="text-sm text-muted-foreground mt-1">
                  Configure the following in your Vercel project settings:
                </p>
                <ul className="text-sm text-muted-foreground mt-2 space-y-1 font-mono">
                  <li>OPENAI_API_KEY - For AI email generation</li>
                  <li>RESEND_API_KEY - For sending emails</li>
                  <li>CLERK_SECRET_KEY - For authentication</li>
                  <li>POSTGRES_URL - For database connection</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label>OpenAI Status</Label>
              <div className="flex items-center gap-2 text-sm">
                <span className="h-2 w-2 rounded-full bg-yellow-500"></span>
                <span className="text-muted-foreground">Not configured</span>
              </div>
            </div>
            <div className="space-y-2">
              <Label>Resend Status</Label>
              <div className="flex items-center gap-2 text-sm">
                <span className="h-2 w-2 rounded-full bg-green-500"></span>
                <span className="text-muted-foreground">Connected</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Profile Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            Default Outreach Profile
          </CardTitle>
          <CardDescription>
            Information about your company used in emails
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label>Company Name</Label>
              <Input placeholder="Synchouse" defaultValue="Synchouse" />
            </div>
            <div className="space-y-2">
              <Label>Website</Label>
              <Input placeholder="https://synchouse.com" />
            </div>
          </div>
          <div className="space-y-2">
            <Label>Company Description</Label>
            <Textarea
              placeholder="Brief description of what your company does..."
              rows={3}
            />
          </div>
          <div className="space-y-2">
            <Label>Value Proposition</Label>
            <Textarea
              placeholder="What makes your offer unique..."
              rows={3}
            />
          </div>
        </CardContent>
      </Card>

      {/* Save Button */}
      <div className="flex justify-end">
        <Button>
          <Save className="h-4 w-4 mr-2" />
          Save Settings
        </Button>
      </div>
    </div>
  )
}
