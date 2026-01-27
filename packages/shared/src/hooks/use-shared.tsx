'use client'

import {
  createContext,
  type Dispatch,
  type ReactNode,
  type SetStateAction,
  useCallback,
  useContext,
  useState,
} from 'react'

type SharedContextProps = {
  isContactDialogOpen: boolean
  setIsContactDialogOpen: Dispatch<SetStateAction<boolean>>
  contactSubject: string
  setContactSubject: Dispatch<SetStateAction<string>>
  handleOpenContactDialog:  (subject?: string) => void
}

const SharedContext = createContext({} as SharedContextProps)

export function SharedProvider({ children }: { children: ReactNode }) {
  const [isContactDialogOpen, setIsContactDialogOpen] = useState(false)
  const [contactSubject, setContactSubject] = useState('')

  const handleOpenContactDialog = useCallback((subject?: string) => {
     setIsContactDialogOpen(true)
     setContactSubject(subject ?? '')
  }, [])

  return (
    <SharedContext.Provider
      value={{
        isContactDialogOpen,
        setIsContactDialogOpen,
        setContactSubject,
        contactSubject,
        handleOpenContactDialog
      }}
    >
      {children}
    </SharedContext.Provider>
  )
}

export function useShared(): SharedContextProps {
  const context = useContext(SharedContext)
  if (!context) {
    throw new Error('useShared must be used within a SharedProvider')
  }
  return context
}
