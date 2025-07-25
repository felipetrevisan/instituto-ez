import type { PortableTextBlock } from 'sanity';
import type { SanityAsset } from './sanityAssets';

export type Page = {
	id: string;
	title: string;
	slug: string;
	description?: string;
	sections: Section[];
};

export type Section = {
	title?: string;
	hash: string;
	content: PortableTextBlock[];
	media: {
		type: 'VIDEO' | 'IMAGE';
		video?: {
			url: string;
		};
		image?: SanityAsset;
	},
	background: {
		image: SanityAsset;
		title?: string;
	};
};
