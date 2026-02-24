'use client'

import { cn } from '@ez/shared/lib/utils'

export function ComingSoonRibbon({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full border border-amber-500 bg-amber-300 px-3 py-1 font-extrabold text-[10px] text-amber-950 uppercase tracking-[0.18em] shadow-[0_2px_10px_rgba(245,158,11,0.35)] dark:border-amber-300/40 dark:bg-amber-300/20 dark:text-amber-100 dark:shadow-[0_2px_10px_rgba(251,191,36,0.25)]',
        className,
      )}
    >
      Em breve
    </span>
  )
}
