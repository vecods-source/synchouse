import createIntlMiddleware from 'next-intl/middleware'
import { locales, defaultLocale } from './i18n/config'

export default createIntlMiddleware({
  locales,
  defaultLocale,
  localeDetection: true,
  localePrefix: 'always'
})

export const config = {
  matcher: [
    '/',
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
  ],
}
