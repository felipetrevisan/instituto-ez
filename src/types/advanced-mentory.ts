import type { PortableTextBlock } from 'sanity';
import type { Button } from './global';
import type { SanityAsset } from './sanityAssets';

export type AdvancedMentory = {
	id: string;
	title: string;
	content: PortableTextBlock[];
	background: SanityAsset;
	button: Button;
	ribbon: {
		show: boolean;
		text: string;
	};
};
