'use client'

import { PageType } from '@ez/shared/types/global'
import { type Cycle, useCycle } from 'motion/react'
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
  toggleMenu: Cycle
  isMenuActive: (menu: string) => boolean
  isHome: boolean
  setActiveMenu: Dispatch<SetStateAction<string>>
  activeMenu: string
  setPageType: Dispatch<SetStateAction<'page' | 'landing'>>
  pageType: 'page' | 'landing'
  isLandingPage: () => boolean
  isNormalPage: () => boolean
}

const AppContext = createContext({} as AppContextProps)

export function AppProvider({ children }: { children: ReactNode }) {
  const currentUrl = usePathname()
  const [isMenuOpen, toggleMenu] = useCycle(false, true)
  const [pageType, setPageType] = useState<keyof typeof PageType>(PageType.page)

  const [activeMenu, setActiveMenu] = useState(currentUrl)

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

  // biome-ignore lint/correctness/useExhaustiveDependencies: false positive
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
        setPageType,
        pageType,
        isLandingPage,
        isNormalPage,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export function useApp(): AppContextProps {
  return useContext(AppContext)
}
