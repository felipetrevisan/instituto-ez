import { PortableTextBlock } from "sanity";
import { SanityAsset } from "./sanityAssets";
import { Button } from "./global";

export type Lecture = {
	id: string;
	title: string;
	content: PortableTextBlock[];
	background: SanityAsset;
	button: Button;
};
