import { PortableTextBlock } from "sanity";
import { SanityAsset } from "./sanityAssets";

export type About = {
	id: string;
	title?: string;
	content: PortableTextBlock[];
	background: SanityAsset;
};
