"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Search, Globe, Loader2, Save, AlertCircle } from "lucide-react"

interface ScrapedLead {
  id: string
  name: string
  email: string
  company: string
  role?: string
  website: string
  selected: boolean
}

export default function ScraperPage() {
  const [url, setUrl] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [scrapedLeads, setScrapedLeads] = useState<ScrapedLead[]>([])
  const [error, setError] = useState<string | null>(null)

  const handleScrape = async () => {
    if (!url) return

    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch("/api/admin/scrape", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
      })

      if (!response.ok) {
        throw new Error("Failed to scrape website")
      }

      const data = await response.json()
      setScrapedLeads(data.leads.map((lead: Omit<ScrapedLead, 'selected'>) => ({ ...lead, selected: true })))
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred")
    } finally {
      setIsLoading(false)
    }
  }

  const toggleLead = (id: string) => {
    setScrapedLeads(leads =>
      leads.map(lead =>
        lead.id === id ? { ...lead, selected: !lead.selected } : lead
      )
    )
  }

  const toggleAll = (checked: boolean) => {
    setScrapedLeads(leads =>
      leads.map(lead => ({ ...lead, selected: checked }))
    )
  }

  const saveSelectedLeads = async () => {
    const selectedLeads = scrapedLeads.filter(lead => lead.selected)
    if (selectedLeads.length === 0) return

    try {
      const response = await fetch("/api/admin/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ leads: selectedLeads }),
      })

      if (response.ok) {
        setScrapedLeads([])
        setUrl("")
      }
    } catch (err) {
      setError("Failed to save leads")
    }
  }

  const selectedCount = scrapedLeads.filter(l => l.selected).length

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Web Scraper</h1>
        <p className="text-muted-foreground mt-1">
          Extract contact information from websites
        </p>
      </div>

      {/* Scraper Input */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Globe className="h-5 w-5" />
            Scrape Website
          </CardTitle>
          <CardDescription>
            Enter a URL to extract email addresses and contact information
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="url">Website URL</Label>
            <div className="flex gap-2">
              <Input
                id="url"
                placeholder="https://example.com/team or https://example.com/contact"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="flex-1"
              />
              <Button onClick={handleScrape} disabled={!url || isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Scraping...
                  </>
                ) : (
                  <>
                    <Search className="h-4 w-4 mr-2" />
                    Scrape
                  </>
                )}
              </Button>
            </div>
          </div>

          <div className="rounded-lg border border-dashed p-4 bg-muted/50">
            <p className="text-sm text-muted-foreground">
              <strong>Tips for better results:</strong>
            </p>
            <ul className="text-sm text-muted-foreground mt-2 space-y-1 list-disc list-inside">
              <li>Try team pages, about pages, or contact pages</li>
              <li>Company websites often list employees with emails</li>
              <li>LinkedIn company pages can be scraped for profiles</li>
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* Error Display */}
      {error && (
        <Card className="border-destructive">
          <CardContent className="pt-6">
            <div className="flex items-center gap-2 text-destructive">
              <AlertCircle className="h-5 w-5" />
              <p>{error}</p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Scraped Results */}
      {scrapedLeads.length > 0 && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Scraped Results</CardTitle>
                <CardDescription>
                  Found {scrapedLeads.length} potential leads
                </CardDescription>
              </div>
              <Button onClick={saveSelectedLeads} disabled={selectedCount === 0}>
                <Save className="h-4 w-4 mr-2" />
                Save {selectedCount} Lead{selectedCount !== 1 ? "s" : ""}
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[50px]">
                    <Checkbox
                      checked={selectedCount === scrapedLeads.length}
                      onCheckedChange={(checked) => toggleAll(!!checked)}
                    />
                  </TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Company</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Source</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {scrapedLeads.map((lead) => (
                  <TableRow key={lead.id}>
                    <TableCell>
                      <Checkbox
                        checked={lead.selected}
                        onCheckedChange={() => toggleLead(lead.id)}
                      />
                    </TableCell>
                    <TableCell className="font-medium">{lead.name}</TableCell>
                    <TableCell>{lead.email}</TableCell>
                    <TableCell>{lead.company}</TableCell>
                    <TableCell>{lead.role || "-"}</TableCell>
                    <TableCell>
                      <Badge variant="secondary">Web Scrape</Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}

      {/* Empty State */}
      {scrapedLeads.length === 0 && !isLoading && (
        <Card>
          <CardContent className="py-12">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-muted mb-4">
                <Search className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Ready to scrape</h3>
              <p className="text-muted-foreground">
                Enter a URL above to start finding leads
              </p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
