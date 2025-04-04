"use client";

import { Dispatch, SetStateAction, createContext, useContext, useState } from "react";
import { Cycle, useCycle } from "framer-motion";
import { useCallback } from "react";
import { ReactNode } from "react";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
// import { Service } from "@/types/services";

type AppContextProps = {
  isMenuOpen: boolean;
  toggleMenu: Cycle;
  isContactDialogOpen: boolean;
  setIsContactDialogOpen: Dispatch<SetStateAction<boolean>>
  isMenuActive: (menu: string) => boolean;
  isHome: boolean;
  setActiveMenu: Dispatch<SetStateAction<string>>;
  activeMenu: string;
};

const AppContext = createContext({} as AppContextProps);

export function AppProvider({ children }: { children: ReactNode }) {
  const currentUrl = usePathname();
  const [isMenuOpen, toggleMenu] = useCycle(false, true);
  const [isContactDialogOpen, setIsContactDialogOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState(currentUrl);

  const isHome = activeMenu === "/";
  const isMenuActive = useCallback(
    (menu: string) => {
      return currentUrl.includes(menu) && menu !== "/";
    },
    [currentUrl]
  );

  useEffect(() => {
    setActiveMenu(currentUrl);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AppContext.Provider
      value={{
        toggleMenu,
        isMenuOpen,
        isContactDialogOpen,
        setIsContactDialogOpen,
        isHome,
        isMenuActive,
        activeMenu,
        setActiveMenu
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp(): AppContextProps {
  return useContext(AppContext);
}
