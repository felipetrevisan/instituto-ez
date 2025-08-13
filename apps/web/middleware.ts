import { routing } from '@ez/web/i18n/routing'
import createMiddleware from 'next-intl/middleware'

export default createMiddleware(routing)

export const config = {
  matcher: [
    // This comes from the middleware basic setup
    '/(en)/:path*',
    // This comes from the section on matchers without prefix: https://next-intl-docs.vercel.app/docs/routing/middleware#matcher-no-prefix
    '/((?!api|_next|_vercel|.*\\..*).*)',
  ],
}
