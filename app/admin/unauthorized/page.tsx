"use client"

import { useClerk } from "@clerk/nextjs"
import { Button } from "@/components/ui/button"
import { ShieldX } from "lucide-react"

export default function UnauthorizedPage() {
  const { signOut } = useClerk()

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-destructive/5">
      <div className="text-center p-8 max-w-md">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-destructive/10 mb-6">
          <ShieldX className="w-8 h-8 text-destructive" />
        </div>
        <h1 className="text-2xl font-bold tracking-tight mb-2">Access Denied</h1>
        <p className="text-muted-foreground mb-6">
          Your account is not authorized to access this admin panel.
          Only approved administrators can access this tool.
        </p>
        <Button
          onClick={() => signOut({ redirectUrl: "/" })}
          variant="outline"
        >
          Sign Out & Return Home
        </Button>
      </div>
    </div>
  )
}
