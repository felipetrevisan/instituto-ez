'use client'

import { cn } from '@ez/web/lib/utils'
import * as DialogPrimitive from '@radix-ui/react-dialog'
import { X } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import type { ReactNode } from 'react'

/**
 * Modal acessível (Radix) com entrada 3D: o painel gira a partir da base
 * enquanto o fundo desfoca.
 */
export function Dialog({
  open,
  onOpenChange,
  title,
  description,
  children,
  className,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
  title: ReactNode
  description?: ReactNode
  children: ReactNode
  className?: string
}) {
  return (
    <DialogPrimitive.Root onOpenChange={onOpenChange} open={open}>
      <AnimatePresence>
        {open && (
          <DialogPrimitive.Portal forceMount>
            <DialogPrimitive.Overlay asChild forceMount>
              <motion.div
                animate={{ opacity: 1 }}
                className="fixed inset-0 z-[100] bg-[#03050d]/75 backdrop-blur-xl"
                exit={{ opacity: 0 }}
                initial={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
              />
            </DialogPrimitive.Overlay>
            <DialogPrimitive.Content asChild forceMount>
              <motion.div
                animate={{ opacity: 1, rotateX: 0, scale: 1, y: '-50%' }}
                className={cn(
                  '-translate-x-1/2 fixed top-1/2 left-1/2 z-[101] w-[calc(100%-2rem)] max-w-2xl focus:outline-none',
                  className,
                )}
                exit={{ opacity: 0, rotateX: -18, scale: 0.94, y: '-46%' }}
                initial={{ opacity: 0, rotateX: -18, scale: 0.94, y: '-46%' }}
                style={{ transformPerspective: 900, transformOrigin: 'center bottom' }}
                transition={{ type: 'spring', stiffness: 160, damping: 22 }}
              >
                <DialogPrimitive.Title className="sr-only">{title}</DialogPrimitive.Title>
                {description && (
                  <DialogPrimitive.Description className="sr-only">
                    {description}
                  </DialogPrimitive.Description>
                )}
                {children}
                <DialogPrimitive.Close
                  aria-label="Fechar"
                  className="absolute top-4 right-4 grid size-10 place-items-center rounded-full text-white/60 transition hover:bg-white/10 hover:text-white focus-visible:outline-2 focus-visible:outline-[color:var(--accent)]"
                >
                  <X className="size-5" />
                </DialogPrimitive.Close>
              </motion.div>
            </DialogPrimitive.Content>
          </DialogPrimitive.Portal>
        )}
      </AnimatePresence>
    </DialogPrimitive.Root>
  )
}
