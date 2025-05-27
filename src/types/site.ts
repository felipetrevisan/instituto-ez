import type { LinkType } from './global';
import type { SanityAsset } from './sanityAssets';
import type { Section } from './sections';

export type Site = {
	id: string;
	title: string;
	description?: string;
	keywords?: string;
	contact: { email: string };
	hero: Hero[];
	sections: Section[];
	logo?: SanityAsset;
	primaryNavigation?: Navigation;
	socialNavigation?: SocialNetwork;
};

export type Navigation = {
	items: NavigationItem[];
};

export type SocialNetwork = {
	items: SocialNetworkItem[];
};

export type NavigationItem = {
	id: string;
	label: string;
	url: NavigationItemURL;
	hasSubmenu: boolean;
	columns?: number;
	submenu: NavigationItem[];
};

export type SocialNetworkItem = {
	id: string;
	label: string;
	url: string;
	icon: string;
};

export type NavigationItemURL = {
	type: LinkType;
	link: string;
	isHome: boolean;
	externalUrl?: string;
};

export type Hero = {
	background: SanityAsset;
	title: string;
	description: string;
};
