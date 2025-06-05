import type { Button } from './global';
import type { SanityAsset } from './sanityAssets';

export type Service = {
	id: string;
	title: string;
	description: string;
	image: SanityAsset;
	button: Button;
};
