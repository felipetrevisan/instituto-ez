import type { PortableTextBlock } from 'sanity';
import type { SanityAsset } from './sanityAssets';

export type About = {
	id: string;
	title?: string;
	content: PortableTextBlock[];
	background: SanityAsset;
};
