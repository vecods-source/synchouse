"use client"

import { SignIn } from "@clerk/nextjs"

export default function AdminSignInPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-accent/5">
      <div className="w-full max-w-md p-8">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold tracking-tight">Synchouse Admin</h1>
          <p className="text-muted-foreground mt-2">Sign in to access the outreach tool</p>
        </div>
        <SignIn
          appearance={{
            elements: {
              rootBox: "mx-auto",
              card: "bg-card border border-border shadow-lg",
              headerTitle: "text-foreground",
              headerSubtitle: "text-muted-foreground",
              formButtonPrimary: "bg-accent hover:bg-accent/90",
              formFieldInput: "bg-background border-border",
              footerActionLink: "text-accent hover:text-accent/90",
            },
          }}
          routing="path"
          path="/admin/sign-in"
          signUpUrl={undefined}
          forceRedirectUrl="/admin"
        />
      </div>
    </div>
  )
}
