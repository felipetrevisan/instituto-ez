'use client'

import { createContext, type ReactNode, useCallback, useContext, useMemo, useState } from 'react'

type ContactDialogState = {
  isOpen: boolean
  subject: string
  setIsOpen: (open: boolean) => void
  /** Abre o formulário de contato, opcionalmente com o assunto preenchido. */
  open: (subject?: string) => void
}

const ContactDialogContext = createContext<ContactDialogState | null>(null)

export function ContactDialogProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)
  const [subject, setSubject] = useState('')

  const open = useCallback((next?: string) => {
    setSubject(next ?? '')
    setIsOpen(true)
  }, [])

  const value = useMemo(() => ({ isOpen, subject, setIsOpen, open }), [isOpen, subject, open])

  return <ContactDialogContext.Provider value={value}>{children}</ContactDialogContext.Provider>
}

export function useContactDialog() {
  const context = useContext(ContactDialogContext)
  if (!context) throw new Error('useContactDialog deve ser usado dentro de <ContactDialogProvider>')
  return context
}
