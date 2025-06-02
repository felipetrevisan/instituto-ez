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
import {
	MotionHighlight,
	MotionHighlightItem,
} from './animate-ui/effects/motion-highlight';

type NavigationProps = {
	navigation?: Navigation;
};

const MenuItemMotion = motion(NavigationMenuItem);

export const DesktopNavigation = ({ navigation }: NavigationProps) => {
	const { isMenuActive } = useApp();

	return (
		<NavigationMenu className="hidden lg:flex">
			<NavigationMenuList>
				<MotionHighlight
					controlledItems
					hover
					className="flex flex-row border-b-primary border-b-2 bg-transparent text-primary"
					mode="parent"
					containerClassName="flex justify-center items-center"
				>
					{navigation?.items?.map(({ id, label, url }) => (
						<MenuItemMotion key={id} data-value={id}>
							<MotionHighlightItem activeClassName="border-b-primary text-primary p-4">
								<NavigationMenuLink
									data-active={isMenuActive(url.link)}
									href={
										url.isHome || !url.link
											? '/'
											: (url.link ?? url.externalUrl)
									}
									target={!url.link && url.externalUrl ? '_blank' : undefined}
									className="relative hover:after:w-full hover:after:animation-pulse hover:after:shadow-xl after:absolute after:w-0 after:bg-primary-foreground after:left-1/2 after:-bottom-1 after:h-[2px] after:rounded-xl after:-translate-x-1/2 after:transition-all"
								>
									{label}
								</NavigationMenuLink>
							</MotionHighlightItem>
						</MenuItemMotion>
					))}
				</MotionHighlight>
			</NavigationMenuList>
		</NavigationMenu>
	);
};
