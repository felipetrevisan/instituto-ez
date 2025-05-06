import { SanityAsset } from "./sanityAssets";

export type Workshop = {
	id: string;
	title: string;
	subtitle?: string;
	background: SanityAsset;
};
