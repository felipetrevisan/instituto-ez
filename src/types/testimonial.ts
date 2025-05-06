import { PortableTextBlock } from "next-sanity";

export type Testimonial = {
	id: string;
	author: {
		name: string;
	};
	testimonial: PortableTextBlock[];
};
