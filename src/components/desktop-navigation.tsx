'use client';

import {
	NavigationMenu,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
} from '@/components/ui/navigation-menu';
import { useApp } from '@/hooks/use-app';
import type { Navigation } from '@/types/site';
import { motion } from 'framer-motion';
import { Fragment } from 'react';

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
						<MenuItemMotion
							whileHover={{ scale: 1.1 }}
							whileTap={{ scale: 0.95 }}
						>
							<NavigationMenuLink
								active={(url.link && isMenuActive(url.link)) || false}
								href={
									url.isHome || !url.link ? '/' : (url.link ?? url.externalUrl)
								}
								target={!url.link && url.externalUrl ? '_blank' : undefined}
								className="relative hover:after:w-full hover:after:animation-pulse hover:after:shadow-xl after:absolute after:w-0 after:bg-primary-foreground after:left-1/2 after:-bottom-1 after:h-[2px] after:rounded-xl after:-translate-x-1/2 after:transition-all"
							>
								{label}
							</NavigationMenuLink>
						</MenuItemMotion>
					</Fragment>
				))}
			</NavigationMenuList>
		</NavigationMenu>
	);
};
