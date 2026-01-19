import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'
import createIntlMiddleware from 'next-intl/middleware'
import { locales, defaultLocale } from './i18n/config'
import { NextResponse } from 'next/server'

const intlMiddleware = createIntlMiddleware({
  locales,
  defaultLocale,
  localeDetection: true,
  localePrefix: 'always'
})

const isAdminRoute = createRouteMatcher(['/admin(.*)'])
const isApiAdminRoute = createRouteMatcher(['/api/admin(.*)'])
const isAdminAuthRoute = createRouteMatcher(['/admin/sign-in(.*)', '/admin/unauthorized(.*)'])

const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'synchouse26@gmail.com'

export default clerkMiddleware(async (auth, req) => {
  const { pathname } = req.nextUrl

  // Allow admin auth pages without auth check
  if (isAdminAuthRoute(req)) {
    return NextResponse.next()
  }

  // Handle admin routes - require auth and email whitelist
  if (isAdminRoute(req) || isApiAdminRoute(req)) {
    const { userId, sessionClaims } = await auth()

    // If not signed in, redirect to admin sign-in
    if (!userId) {
      const signInUrl = new URL('/admin/sign-in', req.url)
      signInUrl.searchParams.set('redirect_url', pathname)
      return NextResponse.redirect(signInUrl)
    }

    // Check email whitelist
    const userEmail = sessionClaims?.email as string | undefined
    if (userEmail && userEmail !== ADMIN_EMAIL) {
      // Unauthorized - redirect to unauthorized page
      const unauthorizedUrl = new URL('/admin/unauthorized', req.url)
      return NextResponse.redirect(unauthorizedUrl)
    }

    return NextResponse.next()
  }

  // Handle all other routes (including root /) with intl middleware
  return intlMiddleware(req)
})

export const config = {
  matcher: [
    // Match root path
    '/',
    // Match all pathnames except static files
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
}
