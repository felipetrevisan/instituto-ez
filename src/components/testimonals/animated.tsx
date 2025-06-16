'use client';

import { Card, CardContent, type cardVariants } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import type { Testimonial } from '@/types/testimonial';
import { PortableText } from '@portabletext/react';
import { ScrollArea } from '@radix-ui/react-scroll-area';
import type { VariantProps } from 'class-variance-authority';
import { motion } from 'framer-motion';

import './styles.css';

const MotionCard = motion(Card);

type CardVariants = VariantProps<typeof cardVariants>;

type Props = {
	item: Testimonial;
	hoveredIndex: string | null;
	setHoveredIndex: (id: string | null) => void;
	theme?: CardVariants['theme'];
	variant?: CardVariants['variant'];
	rounded?: CardVariants['rounded'];
};

export function TestimonialAnimated({
	item,
	hoveredIndex,
	setHoveredIndex,
	theme,
	variant,
	rounded,
}: Props) {
	const isBlurred = hoveredIndex !== null && hoveredIndex !== item.id;

	return (
		<MotionCard
			className={cn(
				'overflow-visible h-[400px] max-h-[400px] xl:h-[300px] xl:max-h-[300px] group relative select-none cursor-pointer p-1 transition-all',
			)}
			variant={variant}
			theme={theme}
			rounded={rounded}
			data-theme={theme}
			data-variant={variant}
			whileHover={{ scale: 1.04 }}
			whileTap={{ scale: 0.9 }}
			transition={{ type: 'spring', stiffness: 400, damping: 10 }}
			onHoverStart={() => setHoveredIndex(item.id)}
			onHoverEnd={() => setHoveredIndex(null)}
			animate={{
				filter: isBlurred ? 'blur(10px)' : 'blur(0px)',
				opacity: isBlurred ? 0.5 : 1,
				transition: { duration: 0.4, ease: 'easeInOut' },
			}}
		>
			<CardContent className="flex items-center justify-center w-ful p-0 h-full">
				<div className="relative flex flex-col items-center justify-evenly w-full h-full border-0 py-0 px-8">
					<ScrollArea className="h-3/4 max-w-2xl mx-auto mb-4 lg:mb-8 text-justify relative w-full">
						<PortableText value={item.testimonial} />
					</ScrollArea>
					<div className="author font-bold" data-slot="card-content-action">
						{item.author?.name}
					</div>
				</div>
			</CardContent>
		</MotionCard>
	);
}
