'use client'

import {
  type Dispatch,
  type ReactNode,
  type SetStateAction,
  createContext,
  useContext,
  useState,
} from 'react'

type SharedContextProps = {
  isContactDialogOpen: boolean
  setIsContactDialogOpen: Dispatch<SetStateAction<boolean>>
  contactSubject: string
  setContactSubject: Dispatch<SetStateAction<string>>
}

const SharedContext = createContext({} as SharedContextProps)

export function SharedProvider({ children }: { children: ReactNode }) {
  const [isContactDialogOpen, setIsContactDialogOpen] = useState(false)
  const [contactSubject, setContactSubject] = useState('')

  return (
    <SharedContext.Provider
      value={{
        isContactDialogOpen,
        setIsContactDialogOpen,
        setContactSubject,
        contactSubject,
      }}
    >
      {children}
    </SharedContext.Provider>
  )
}

export function useShared(): SharedContextProps {
  return useContext(SharedContext)
}
