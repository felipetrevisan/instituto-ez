import type { Button } from './global';
import type { SanityAsset } from './sanityAssets';

export type Workshop = {
	id: string;
	title: string;
	subtitle?: string;
	background: SanityAsset;
	button: Button;
};
