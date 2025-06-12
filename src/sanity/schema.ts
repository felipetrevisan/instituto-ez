import type { SchemaTypeDefinition } from 'sanity';

import advancedMentory from './schemas/advanced-mentory';
import ebook from './schemas/ebooks';
import immersion from './schemas/immersion';
import lecture from './schemas/lecture';
import mathematizer from './schemas/mathematizer';
import services from './schemas/services';
import testimonial from './schemas/testimonials';
import workshop from './schemas/workshops';

import banner from './schemas/banner';
import settings from './schemas/settings';

import navigation from './schemas/navigation';
import page from './schemas/page';

import aboutCard from './schemas/objects/about-card';
import button from './schemas/objects/button';
import link from './schemas/objects/link';
import navigationItem from './schemas/objects/navigation-item';
import navigationSubmenuItem from './schemas/objects/navigation-submenu-item';
import pageSection from './schemas/objects/page';
import ribbon from './schemas/objects/ribbon';
import section from './schemas/objects/section';
import socialNetworksItem from './schemas/objects/social-networks-item';

import accordionWidget from './schemas/objects/editor/accordion';
import accordionContentWidget from './schemas/objects/editor/accordion-content';
import alertWidget from './schemas/objects/editor/alert';
import buttonLinkWidget from './schemas/objects/editor/button';
import dividerWidget from './schemas/objects/editor/divider';
import eventWidget from './schemas/objects/editor/event';
import testimonialWidget from './schemas/objects/editor/testimonial';
import titleWidget from './schemas/objects/editor/title';

export const schema: { types: SchemaTypeDefinition[] } = {
	types: [
		settings,
		testimonial,
		workshop,
		ebook,
		services,
		immersion,
		advancedMentory,
		mathematizer,
		lecture,
		banner,

		page,

		navigation,
		navigationItem,
		navigationSubmenuItem,
		socialNetworksItem,
		link,
		button,
		ribbon,
		pageSection,
		aboutCard,
		section,

		buttonLinkWidget,
		titleWidget,
		accordionWidget,
		accordionContentWidget,
		alertWidget,
		dividerWidget,
		eventWidget,
		testimonialWidget
	],
};
