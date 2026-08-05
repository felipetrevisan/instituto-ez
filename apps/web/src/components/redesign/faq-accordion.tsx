'use client'

import { ChevronDown } from 'lucide-react'
import { useState } from 'react'

type FaqItem = { question: string; answer: string }

export function FaqAccordion({ items }: { items: FaqItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <div className="space-y-3">
      {items.map((item, index) => {
        const isOpen = openIndex === index
        return (
          <div className="rdg-glass overflow-hidden rounded-2xl" key={item.question}>
            <button
              aria-expanded={isOpen}
              className="flex w-full cursor-pointer items-center justify-between gap-4 px-6 py-5 text-left"
              onClick={() => setOpenIndex(isOpen ? null : index)}
              type="button"
            >
              <span className="font-medium">{item.question}</span>
              <ChevronDown
                className={`h-4 w-4 shrink-0 text-[var(--rdg-copper)] transition-transform ${isOpen ? 'rotate-180' : ''}`}
              />
            </button>
            {isOpen && (
              <p className="px-6 pb-5 text-[var(--rdg-on-surface-variant)] text-sm">
                {item.answer}
              </p>
            )}
          </div>
        )
      })}
    </div>
  )
}
