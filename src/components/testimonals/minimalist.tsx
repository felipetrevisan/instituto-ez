'use client';

import { Card, CardContent, type cardVariants } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import type { Testimonial } from '@/types/testimonial';
import { PortableText } from '@portabletext/react';
import { ScrollArea } from '@radix-ui/react-scroll-area';
import type { VariantProps } from 'class-variance-authority';
import { motion } from 'framer-motion';

const MotionCard = motion(Card);

type CardVariants = VariantProps<typeof cardVariants>;

type Props = {
	item: Testimonial;
	theme?: CardVariants['theme'];
	variant?: CardVariants['variant'];
	rounded?: CardVariants['rounded'];
};

export function TestimonialMinimalist({
	item,
	theme,
	variant,
	rounded,
}: Props) {
	return (
		<MotionCard
			className={cn(
				'overflow-visible h-[400px] max-h-[400px] xl:h-[300px] xl:max-h-[300px] group relative select-none cursor-pointer p-1 transition-all',
			)}
			variant={variant}
			theme={theme}
			rounded={rounded}
		>
			<CardContent className="flex items-center justify-center w-ful p-0 h-full">
				<figure className="relative flex flex-col items-center justify-evenly w-full h-full border-0 py-0 px-8">
					<ScrollArea className="h-3/4 max-w-2xl mx-auto mb-4 lg:mb-8 text-justify relative w-full">
						<PortableText value={item.testimonial} />
					</ScrollArea>
					<figcaption className="absolute flex items-center justify-center -bottom-4 bg-background p-3 rounded-2xl -right-1">
						<div className="space-y-0.5 font-bold text-slate-700 text-left rtl:text-right ms-3">
							<div>{item.author?.name}</div>
						</div>
					</figcaption>
				</figure>
			</CardContent>
		</MotionCard>
	);
}
