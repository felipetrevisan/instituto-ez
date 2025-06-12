import type { PortableTextBlock } from 'next-sanity';
import type { TestimonialType } from './global';

export type Testimonial = {
	id: string;
	author: {
		name: string;
	};
	testimonial: PortableTextBlock[];
	category: TestimonialType;
};
