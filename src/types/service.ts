import { SanityAsset } from "./sanityAssets";
import { Button } from "./global";

export type Service = {
	id: string;
	title: string;
	image: SanityAsset;
	button: Button;
};
