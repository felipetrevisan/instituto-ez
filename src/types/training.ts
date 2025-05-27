import type { SanityAsset } from './sanityAssets';

export type Training = {
	id: string;
	title: string;
	subtitle?: string;
	background: SanityAsset;
};
