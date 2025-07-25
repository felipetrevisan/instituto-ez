import type { Button } from './global';
import type { SanityAsset } from './sanityAssets';

export type Service = {
	id: string;
	title: string;
	image: SanityAsset;
	disabled: boolean;
	button: Button;
};
