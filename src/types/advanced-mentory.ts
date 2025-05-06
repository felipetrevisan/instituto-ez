import { PortableTextBlock } from "sanity";
import { SanityAsset } from "./sanityAssets";
import { Button } from "./global";

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
