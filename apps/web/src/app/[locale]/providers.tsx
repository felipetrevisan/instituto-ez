'use client'

import { Bar } from '@bprogress/next'
import { ProgressProvider } from '@bprogress/next/app'
import { ContactDialogProvider } from '@ez/web/hooks/use-contact-dialog'
import { ThemeProvider } from 'next-themes'
import type { ReactNode } from 'react'
import { Toaster } from 'sonner'

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider attribute="class" forcedTheme="dark">
      <ProgressProvider height="3px" options={{ showSpinner: false }} shallowRouting>
        <ContactDialogProvider>
          <Bar color="var(--ez-accent, #f2b544)" />
          {children}
        </ContactDialogProvider>
        <Toaster position="top-right" richColors theme="dark" />
      </ProgressProvider>
    </ThemeProvider>
  )
}
