import AccordionComponent from '@/sanity/lib/components/accordion';
import AlertComponent from '@/sanity/lib/components/alert';
import ButtonComponent from '@/sanity/lib/components/button';
import DividerComponent from '@/sanity/lib/components/divider';
import EbooksComponent from '@/sanity/lib/components/ebooks';
import ImageComponent from '@/sanity/lib/components/image';
import ListComponent from '@/sanity/lib/components/list';
import TestimonialComponent from '@/sanity/lib/components/testimonial';
import TitleComponent from '@/sanity/lib/components/title';
import { TextAlignDecorator } from '@/sanity/lib/portable-components';
import type { PortableTextComponents } from '@portabletext/react';
import { LinkIcon } from 'lucide-react';
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
		ebooksWidget: EbooksComponent,
		list: ListComponent,
	},
	marks: {
		justify: (props) => TextAlignDecorator(props, 'justify'),
		center: (props) => TextAlignDecorator(props, 'center'),
		left: (props) => TextAlignDecorator(props, 'left'),
		right: (props) => TextAlignDecorator(props, 'right'),
		internalLink: ({ value, children }) => {
			const { slug = {} } = value;
			const href = `/${slug.current}`;

			return (
				<Link href={href} passHref>
					<Button variant="link">
						<LinkIcon /> {children}
					</Button>
				</Link>
			);
		},
		link: ({ value, children }) => {
			const { blank, href } = value;

			return blank ? (
				<Link href={href} passHref target="_blank" rel="noopener">
					<Button variant="link">
						<LinkIcon /> {children}
					</Button>
				</Link>
			) : (
				<Link href={href} passHref>
					<Button variant="link">
						<LinkIcon /> {children}
					</Button>
				</Link>
			);
		},
	},

	list: {
		bullet: ({ children }) => (
			<ul className="flex flex-col list-disc gap-2 p-4 [&>li]:py-2">
				{children}
			</ul>
		),
		number: ({ children }) => (
			<ol className="flex flex-col list-decimal gap-2 p-4 [&>li]:py-2">
				{children}
			</ol>
		),
		checkmarks: ({ children }) => (
			<ol className="flex flex-col gap-2 p-4 [&>li]:py-2">{children}</ol>
		),
	},
};
