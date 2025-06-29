import AccordionComponent from '@/sanity/lib/components/accordion';
import AlertComponent from '@/sanity/lib/components/alert';
import ButtonComponent from '@/sanity/lib/components/button';
import DividerComponent from '@/sanity/lib/components/divider';
import EbooksComponent from '@/sanity/lib/components/ebooks';
import ImageComponent from '@/sanity/lib/components/image';
import TestimonialComponent from '@/sanity/lib/components/testimonial';
import TitleComponent from '@/sanity/lib/components/title';
import type { PortableTextComponents } from '@portabletext/react';
import Link from 'next/link';
import { Button } from './button';

export const portableComponents: PortableTextComponents = {
	types: {
		image: ImageComponent,
		buttonLink: ButtonComponent,
		title: TitleComponent,
		accordion: AccordionComponent,
		divider: DividerComponent,
		alert: AlertComponent,
		testimonialWidget: TestimonialComponent,
		ebooksWidget: EbooksComponent
	},
	marks: {
		internalLink: ({ value, children }) => {
			const { slug = {} } = value;
			const href = `/${slug.current}`;

			return (
				<Link href={href} passHref>
					<Button variant="outline" rounded="full">
						{children}
					</Button>
				</Link>
			);
		},
		link: ({ value, children }) => {
			const { blank, href } = value;
			return blank ? (
				<Link href={href} passHref target="_blank" rel="noopener">
					<Button variant="outline" rounded="full">
						{children}
					</Button>
				</Link>
			) : (
				<Link href={href} passHref>
					<Button variant="outline" shadow>
						{children}
					</Button>
				</Link>
			);
		},
	},

	list: {
		bullet: ({ children }) => (
			<ul className="flex flex-col list-disc gap-2 p-4 divide-y divide-primary/30 [&>li]:py-2">{children}</ul>
		),
		number: ({ children }) => (
			<ol className="flex flex-col list-decimal gap-2 p-4 divide-y divide-primary/30 [&>li]:py-2">{children}</ol>
		),
		checkmarks: ({ children }) => (
			<ol className="flex flex-col gap-2 p-4 divide-y divide-primary/30 [&>li]:py-2">{children}</ol>
		),
	},
};
