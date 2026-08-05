import { redesignRouting } from '@ez/web/i18n/redesign-routing'
import { routing } from '@ez/web/i18n/routing'
import { type NextRequest, NextResponse } from 'next/server'
import createMiddleware from 'next-intl/middleware'

const intlMiddleware = createMiddleware(routing)
// /redesign always carries its locale prefix (even for pt, the default
// locale) — see redesign-routing.ts for why.
const redesignIntlMiddleware = createMiddleware(redesignRouting)

const REDESIGN_PATH = /^\/(pt|en|es)?\/?redesign(\/|$)/
const REDESIGN_COOKIE = 'redesign_preview'

export default function middleware(request: NextRequest) {
  const isRedesignPath = REDESIGN_PATH.test(request.nextUrl.pathname)

  // The /redesign section (v1 rebuild) is still in progress and shares this
  // app's build/deploy. Outside production it's always reachable; in
  // production it stays gated behind a preview key until the cutover.
  if (isRedesignPath && process.env.VERCEL_ENV === 'production') {
    const key = process.env.REDESIGN_PREVIEW_KEY
    const providedKey = request.nextUrl.searchParams.get('key')
    const hasCookie = request.cookies.get(REDESIGN_COOKIE)?.value === key

    if (key && providedKey === key) {
      const response = redesignIntlMiddleware(request)
      response.cookies.set(REDESIGN_COOKIE, key, {
        httpOnly: true,
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 * 30,
      })
      return response
    }

    if (!key || !hasCookie) {
      return NextResponse.redirect(new URL('/', request.url))
    }
  }

  return isRedesignPath ? redesignIntlMiddleware(request) : intlMiddleware(request)
}

export const config = {
  // Match all pathnames except for
  // - … if they start with `/api`, `/trpc`, `/_next` or `/_vercel`
  // - … the ones containing a dot (e.g. `favicon.ico`)
  matcher: '/((?!api|trpc|_next|_vercel|.*\\..*).*)',
}
