'use client';

import { menuItemVariants } from '@/config/animation';
import { useApp } from '@/hooks/use-app';
import { cn } from '@/lib/utils';
import type { Navigation } from '@/types/site';
import { motion } from 'framer-motion';
import { Fragment } from 'react';
import {
	NavigationListItem,
	NavigationMenu,
	NavigationMenuContent,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	NavigationMenuTrigger,
} from './ui/navigation-menu';

type NavigationProps = {
	navigation?: Navigation;
};

const MenuItemMotion = motion(NavigationMenuItem);

export const MobileNavigation = ({ navigation }: NavigationProps) => {
	const { isMenuActive } = useApp();

	return (
		<NavigationMenu
			className="absolute top-[100px] left-10 w-full flex mx-auto lg:hidden lg:items-start"
			orientation="vertical"
		>
			<NavigationMenuList className="items-end">
				{navigation?.items?.map(
					({ id, hasSubmenu, label, url, submenu, columns }) => (
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
											className={cn(
												'flex flex-col gap-3 p-4 w-full items-end',
												{
													'md:grid md:grid-cols-1 md:w-[400px] lg:w-[600px]':
														columns === 1,
													'md:grid md:grid-cols-2 md:w-[400px] lg:w-[600px]':
														columns === 2,
													'md:grid md:grid-cols-3 md:w-[400px] lg:w-[600px]':
														columns === 3,
												},
											)}
										>
											{submenu?.map(({ id: submenuId, label, url }) => (
												<NavigationListItem
													title={label}
													key={submenuId}
													href={
														url.isHome || !url.link
															? '/'
															: (url.link ?? url.externalUrl)
													}
													target={
														!url.link && url.externalUrl ? '_blank' : undefined
													}
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
									<NavigationMenuLink
										active={(url.link && isMenuActive(url.link)) || false}
										href={
											url.isHome || !url.link
												? '/'
												: (url.link ?? url.externalUrl)
										}
										target={!url.link && url.externalUrl ? '_blank' : undefined}
										className="relative"
									>
										{label}
									</NavigationMenuLink>
								</MenuItemMotion>
							)}
						</Fragment>
					),
				)}
			</NavigationMenuList>
		</NavigationMenu>
	);
};
