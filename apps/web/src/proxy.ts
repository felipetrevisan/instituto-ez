import createMiddleware from 'next-intl/middleware'
import { routing } from './i18n/routing'

export default createMiddleware(routing)

export const config = {
  // Painel (/admin), arquivos (/files) e rotas de API ficam fora do roteamento por idioma.
  matcher: ['/((?!api|admin|files|trpc|_next|_vercel|.*\\..*).*)'],
}
