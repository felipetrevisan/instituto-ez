'use client'

import { type Cycle, useCycle } from 'framer-motion'
import { usePathname } from 'next/navigation'
import {
  type Dispatch,
  type ReactNode,
  type SetStateAction,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react'

type AppContextProps = {
  isMenuOpen: boolean
  toggleMenu: Cycle
  isMenuActive: (menu: string) => boolean
  isHome: boolean
  setActiveMenu: Dispatch<SetStateAction<string>>
  activeMenu: string
}

const AppContext = createContext({} as AppContextProps)

export function AppProvider({ children }: { children: ReactNode }) {
  const currentUrl = usePathname()
  const [isMenuOpen, toggleMenu] = useCycle(false, true)

  const [activeMenu, setActiveMenu] = useState(currentUrl)

  const isHome = activeMenu === '/'

  const isMenuActive = useCallback(
    (menu: string) => {
      return currentUrl.includes(menu) && menu !== '/'
    },
    [currentUrl],
  )

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    setActiveMenu(currentUrl)
  }, [])

  return (
    <AppContext.Provider
      value={{
        toggleMenu,
        isMenuOpen,
        isHome,
        isMenuActive,
        activeMenu,
        setActiveMenu,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export function useApp(): AppContextProps {
  return useContext(AppContext)
}
