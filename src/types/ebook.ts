import type { Button } from './global';
import type { SanityAsset } from './sanityAssets';

export type Ebook = {
	id: string;
	title: string;
	subtitle?: string;
	slug: string;
	description?: string;
	image: {
		preview: SanityAsset;
		large: SanityAsset;
	}
	disabled: boolean;
	button?: Button;
};
