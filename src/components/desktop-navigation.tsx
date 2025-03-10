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
} from "@/components/ui/navigation-menu";
import { Skeleton } from "@/components/ui/skeleton";
import { LinkType, Navigation } from "@/types/site";
import { cn } from "@/lib/utils";
import { useApp } from "@/hooks/use-app";

type NavigationProps = {
  navigation?: Navigation;
  isServicesLoading?: boolean;
};

const MenuItemMotion = motion(NavigationMenuItem);

export const DesktopNavigation = ({
  navigation,
}: NavigationProps) => {
  //const { isMenuActive } = useApp();

  return (
    <NavigationMenu className="hidden lg:flex">
      <NavigationMenuList>
        {/* {navigation?.items?.map(({ id, hasSubmenu, label, url, submenu, columns }) => (
          <Fragment key={`frag-${id}`}>
            {hasSubmenu ? (
              <MenuItemMotion whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                <NavigationMenuTrigger>{label}</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul
                    className={cn("flex flex-col gap-3 p-4 w-full", {
                      "md:grid md:grid-cols-1 md:w-[400px] lg:w-[600px]": columns === 1,
                      "md:grid md:grid-cols-2 md:w-[400px] lg:w-[600px]": columns === 2,
                      "md:grid md:grid-cols-3 md:w-[400px] lg:w-[600px]": columns === 3,
                    })}
                  >
                    {submenu?.map(({ id: submenuId, label, url }) => (
                      <Fragment key={`frag-${submenuId}`}>
                        {url.type === LinkType.SERVICE_DIALOG ? (
                          <Fragment>
                            {isServicesLoading ? (
                              <Fragment>
                                {Array.from({ length: 10 }).map((_, index) => (
                                  <li key={index} className="space-y-1 rounded-md p-3">
                                    <Skeleton className="h-6" />
                                  </li>
                                ))}
                              </Fragment>
                            ) : (
                              <Fragment>
                                {servicesData?.map((service) => (
                                  <Dialog key={`submenu-${service.id}`}>
                                    <DialogTrigger asChild>
                                      <NavigationListItem
                                        title={service.title}
                                        icon={service.icon}
                                      />
                                    </DialogTrigger>
                                    <ServiceDetailsDialog {...service} />
                                  </Dialog>
                                ))}
                              </Fragment>
                            )}
                          </Fragment>
                        ) : (
                          <NavigationListItem
                            title={label}
                            key={submenuId}
                            href={url?.usePath ? url?.path : url?.externalUrl}
                          />
                        )}
                      </Fragment>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </MenuItemMotion>
            ) : (
              <MenuItemMotion whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                <Link
                  href={url.usePath ? url.path! : url.externalUrl!}
                  target={!url.usePath && url.externalUrl ? "_blank" : undefined}
                  legacyBehavior
                  passHref
                >
                  <NavigationMenuLink active={(url.usePath && isMenuActive(url.path!)) || false} className="relative">
                    {label}
                  </NavigationMenuLink>
                </Link>
              </MenuItemMotion>
            )}
          </Fragment>
        ))} */}
        <NavigationMenuItem>
          <Link href="/" legacyBehavior passHref>
            <NavigationMenuLink>Início</NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link href="ss" legacyBehavior passHref>
            <NavigationMenuLink>Sobre</NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link href="ss" legacyBehavior passHref>
            <NavigationMenuLink>Atendimentos</NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link href="ss" legacyBehavior passHref>
            <NavigationMenuLink>Mentorias</NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link href="ss" legacyBehavior passHref>
            <NavigationMenuLink>Workshops</NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link href="ss" legacyBehavior passHref>
            <NavigationMenuLink>Palestras</NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link href="ss" legacyBehavior passHref>
            <NavigationMenuLink>Imersão</NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link href="ss" legacyBehavior passHref>
            <NavigationMenuLink>Matematizador</NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link href="ss" legacyBehavior passHref>
            <NavigationMenuLink>Treinamentos</NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link href="ss" legacyBehavior passHref>
            <NavigationMenuLink>Calendário</NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link href="ss" legacyBehavior passHref>
            <NavigationMenuLink>Contato</NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};
