"use client";

import { Fragment } from "react";
import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui2/navigation-menu";
import { motion } from "framer-motion";
import { Navigation } from "@/types/site";
import { useApp } from "@/hooks/use-app";

type NavigationProps = {
  navigation?: Navigation;
};

const MenuItemMotion = motion(NavigationMenuItem);

export const DesktopNavigation = ({ navigation }: NavigationProps) => {
  const { isMenuActive } = useApp();

  return (
    <NavigationMenu className="hidden lg:flex">
      <NavigationMenuList>
        {navigation?.items?.map(({ id, label, url }) => (
          <Fragment key={`frag-${id}`}>
            <MenuItemMotion whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
              <Link
                href={url.isHome || !url.link ? "/" : url.link ?? url.externalUrl!}
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
          </Fragment>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
};
