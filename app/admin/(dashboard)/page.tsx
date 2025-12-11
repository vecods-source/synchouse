"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, Mail, Search, TrendingUp } from "lucide-react"

const stats = [
  {
    title: "Total Leads",
    value: "0",
    description: "Contacts in database",
    icon: Users,
  },
  {
    title: "Emails Sent",
    value: "0",
    description: "This month",
    icon: Mail,
  },
  {
    title: "Scraped Today",
    value: "0",
    description: "New leads found",
    icon: Search,
  },
  {
    title: "Response Rate",
    value: "0%",
    description: "Average replies",
    icon: TrendingUp,
  },
]

export default function AdminDashboardPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground mt-1">
          Welcome to your AI-powered outreach command center
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">
                {stat.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card className="hover:border-accent/50 transition-colors cursor-pointer">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Search className="h-5 w-5 text-accent" />
              Start Scraping
            </CardTitle>
            <CardDescription>
              Find new leads by scraping websites for contact information
            </CardDescription>
          </CardHeader>
        </Card>

        <Card className="hover:border-accent/50 transition-colors cursor-pointer">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Mail className="h-5 w-5 text-accent" />
              Create Campaign
            </CardTitle>
            <CardDescription>
              Generate AI-powered emails and send to your leads
            </CardDescription>
          </CardHeader>
        </Card>

        <Card className="hover:border-accent/50 transition-colors cursor-pointer">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5 text-accent" />
              Manage Leads
            </CardTitle>
            <CardDescription>
              View, edit, and organize your contact database
            </CardDescription>
          </CardHeader>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>Your latest outreach actions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-muted-foreground">
            <Mail className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>No activity yet</p>
            <p className="text-sm">Start by scraping leads or creating a campaign</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
