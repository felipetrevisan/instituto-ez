import type { SchemaTypeDefinition } from 'sanity';

import advancedMentory from './schemas/advanced-mentory';
import immersion from './schemas/immersion';
import lecture from './schemas/lecture';
import mathematizer from './schemas/mathematizer';
import services from './schemas/services';
import testimonial from './schemas/testimonials';
import training from './schemas/training';
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

import accordion from './schemas/objects/editor/accordion';
import accordionContent from './schemas/objects/editor/accordion-content';
import alert from './schemas/objects/editor/alert';
import buttonLink from './schemas/objects/editor/button';
import title from './schemas/objects/editor/title';

export const schema: { types: SchemaTypeDefinition[] } = {
	types: [
		settings,
		testimonial,
		workshop,
		training,
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

		buttonLink,
		title,
		accordion,
		accordionContent,
		alert
	],
};
