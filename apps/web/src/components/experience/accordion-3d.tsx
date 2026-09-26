'use client'

import { cn } from '@ez/web/lib/utils'
import { Plus } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import { useId, useState } from 'react'
import { Reveal } from './reveal'

/** FAQ em que a resposta "desdobra" como uma aba girando no eixo X. */
export function Accordion3D({ items }: { items: { question: string; answer: string }[] }) {
  const [open, setOpen] = useState<number | null>(0)
  const baseId = useId()

  return (
    <div className="flex flex-col gap-3">
      {items.map((item, index) => {
        const isOpen = open === index
        const panelId = `${baseId}-panel-${index}`
        return (
          <Reveal delay={index * 0.05} key={item.question}>
            <div
              className={cn(
                'relative overflow-hidden rounded-3xl transition-colors',
                isOpen && 'bg-white/[0.02]',
              )}
            >
              <div aria-hidden className="ez-glass absolute inset-0 rounded-3xl" />
              <h3 className="relative">
                <button
                  aria-controls={panelId}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between gap-6 px-6 py-5 text-left font-medium text-base text-white sm:px-8 sm:text-lg"
                  onClick={() => setOpen(isOpen ? null : index)}
                  type="button"
                >
                  {item.question}
                  <motion.span
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    className="ez-icon-orb size-9 shrink-0 rounded-full"
                  >
                    <Plus aria-hidden className="size-4" />
                  </motion.span>
                </button>
              </h3>
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    animate={{ height: 'auto', opacity: 1 }}
                    className="relative overflow-hidden"
                    exit={{ height: 0, opacity: 0 }}
                    id={panelId}
                    initial={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <motion.p
                      animate={{ rotateX: 0 }}
                      className="px-6 pb-6 text-white/65 leading-relaxed sm:px-8"
                      exit={{ rotateX: -70 }}
                      initial={{ rotateX: -70 }}
                      style={{ transformOrigin: 'top', transformPerspective: 700 }}
                      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    >
                      {item.answer}
                    </motion.p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </Reveal>
        )
      })}
    </div>
  )
}
