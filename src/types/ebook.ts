import type { Button } from './global';
import type { SanityAsset } from './sanityAssets';

export type Ebook = {
	id: string;
	title: string;
	subtitle?: string;
	background?: SanityAsset;
	disabled: boolean;
	button?: Button;
};
