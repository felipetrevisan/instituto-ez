import type { PortableTextBlock } from 'sanity';
import type { Button } from './global';
import type { SanityAsset } from './sanityAssets';

export type Mathematizer = {
	id: string;
	title: string;
	content: PortableTextBlock[];
	background: SanityAsset;
	button: Button;
};
