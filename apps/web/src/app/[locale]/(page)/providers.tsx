'use client'

import { Bar } from '@bprogress/next'
import { ProgressProvider } from '@bprogress/next/app'
import { SharedProvider } from '@ez/shared/hooks/use-shared'
import { Toaster } from '@ez/shared/ui'
import { AppProvider } from '@ez/web/hooks/use-app'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { ThemeProvider } from 'next-themes'
import { type ReactNode, useState } from 'react'

const oneDay = 1000 * 60 * 60 * 24

export default function Providers({ children }: { children: ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: oneDay,
            refetchOnWindowFocus: false,
          },
        },
      }),
  )

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
      <ProgressProvider height="6px" color="#430a88" options={{ showSpinner: true }} shallowRouting>
        <QueryClientProvider client={queryClient}>
          <SharedProvider>
            <AppProvider>
              <Bar />
              {children}
            </AppProvider>
          </SharedProvider>
          <ReactQueryDevtools initialIsOpen={false} />
          <Toaster />
        </QueryClientProvider>
      </ProgressProvider>
    </ThemeProvider>
  )
}
