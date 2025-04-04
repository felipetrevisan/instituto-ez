"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Fragment } from "react";
import Link from "next/link";
import {
  NavigationListItem,
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui2/navigation-menu";
import { Navigation } from "@/types/site";
import { cn } from "@/lib/utils";
import { menuItemVariants } from "@/config/animation";
import { useApp } from "@/hooks/use-app";

type NavigationProps = {
  navigation?: Navigation;
};

const MenuItemMotion = motion(NavigationMenuItem);

export const MobileNavigation = ({ navigation }: NavigationProps) => {
  const { isMenuActive, toggleMenu } = useApp();

  return (
    <NavigationMenu className="flex mx-auto lg:hidden w-full items-start" orientation="vertical">
      <NavigationMenuList className="items-end">
        {navigation?.items?.map(({ id, hasSubmenu, label, url, submenu, columns }) => (
          <Fragment key={`frag-${id}`}>
            {hasSubmenu ? (
              <MenuItemMotion
                variants={menuItemVariants}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <NavigationMenuTrigger>{label}</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul
                    className={cn("flex flex-col gap-3 p-4 w-full items-end", {
                      "md:grid md:grid-cols-1 md:w-[400px] lg:w-[600px]": columns === 1,
                      "md:grid md:grid-cols-2 md:w-[400px] lg:w-[600px]": columns === 2,
                      "md:grid md:grid-cols-3 md:w-[400px] lg:w-[600px]": columns === 3,
                    })}
                  >
                    {submenu?.map(({ id: submenuId, label, url }) => (
                      <NavigationListItem
                        title={label}
                        key={submenuId}
                        href={url.isHome || !url.link ? "/" : (url.link ?? url.externalUrl!)}
                        target={!url.link && url.externalUrl ? "_blank" : undefined}
                      />
                    ))}
                  </ul>
                </NavigationMenuContent>
              </MenuItemMotion>
            ) : (
              <MenuItemMotion
                variants={menuItemVariants}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  href={url.isHome || !url.link ? "/" : (url.link ?? url.externalUrl!)}
                  target={!url.link && url.externalUrl ? "_blank" : undefined}
                  legacyBehavior
                  passHref
                >
                  <NavigationMenuLink
                    active={(url.link && isMenuActive(url.link!)) || false}
                    className="relative"
                  >
                    {label}
                  </NavigationMenuLink>
                </Link>
              </MenuItemMotion>
            )}
          </Fragment>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
};
