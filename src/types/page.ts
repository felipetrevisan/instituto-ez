import { PortableTextBlock } from "sanity";
import { SanityAsset } from "./sanityAssets";

export type Page = {
	id: string;
	title: string;
	slug: string;
	description?: string;
	sections: Section[];
};

export type Section = {
	title: string;
	content: PortableTextBlock[];
	video: {
		url: string;
	};
	background: {
		image: SanityAsset;
		title: string;
	};
};
