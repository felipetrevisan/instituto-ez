"use client";

import * as React from "react";
import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";

export const DesktopNavigation = () => {
  return (
    <NavigationMenu className="hidden lg:flex">
      <NavigationMenuList>
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
