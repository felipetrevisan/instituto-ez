import { SmoothScrollProvider } from '@ez/web/components/redesign/smooth-scroll-provider'
import type { Metadata } from 'next'
import { Hanken_Grotesk } from 'next/font/google'
import type { ReactNode } from 'react'
import './redesign.css'

const hanken = Hanken_Grotesk({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-hanken',
})

// Work-in-progress redesign (v1). Kept out of search results until the
// cutover — see apps/web/middleware.ts for the production access gate.
export const metadata: Metadata = {
  robots: { index: false, follow: false },
}

export default function RedesignLayout({ children }: { children: ReactNode }) {
  return (
    <div className={`${hanken.variable} rdg-scope relative isolate min-h-screen`}>
      <SmoothScrollProvider>{children}</SmoothScrollProvider>
    </div>
  )
}
