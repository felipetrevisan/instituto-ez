'use client'

import { PageType } from '@ez/shared/types/global'
import { usePathname } from 'next/navigation'
import {
  createContext,
  type Dispatch,
  type ReactNode,
  type SetStateAction,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react'

type AppContextProps = {
  isMenuOpen: boolean
  toggleMenu: () => void
  setIsMenuOpen: Dispatch<SetStateAction<boolean>>
  isMenuActive: (menu: string) => boolean
  isHome: boolean
  setActiveMenu: Dispatch<SetStateAction<string>>
  activeMenu: string
  setPageType: Dispatch<SetStateAction<keyof typeof PageType>>
  pageType: keyof typeof PageType
  isLandingPage: () => boolean
  isNormalPage: () => boolean
  isEbookPage: () => boolean
}

const AppContext = createContext({} as AppContextProps)

export function AppProvider({ children }: { children: ReactNode }) {
  const currentUrl = usePathname()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [pageType, setPageType] = useState<keyof typeof PageType>(PageType.page)

  const [activeMenu, setActiveMenu] = useState(currentUrl)

  const toggleMenu = useCallback(() => {
    setIsMenuOpen((prev) => !prev)
  }, [])

  const isHome = activeMenu === '/'

  const isMenuActive = useCallback(
    (menu: string) => {
      return currentUrl.includes(menu) && menu !== '/'
    },
    [currentUrl],
  )

  const isLandingPage = useCallback(() => {
    return pageType === PageType.landing
  }, [pageType])

  const isNormalPage = useCallback(() => {
    return pageType === PageType.page
  }, [pageType])

  const isEbookPage = useCallback(() => {
    return pageType === PageType.ebook
  }, [pageType])

  useEffect(() => {
    setIsMenuOpen(false)
    setActiveMenu(currentUrl)
  }, [currentUrl])

  return (
    <AppContext.Provider
      value={{
        toggleMenu,
        isMenuOpen,
        setIsMenuOpen,
        isHome,
        isMenuActive,
        activeMenu,
        setActiveMenu,
        setPageType,
        pageType,
        isLandingPage,
        isNormalPage,
        isEbookPage,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export function useApp(): AppContextProps {
  const context = useContext(AppContext)
  if (!context) {
    throw new Error('useApp must be used within a App')
  }
  return context
}
