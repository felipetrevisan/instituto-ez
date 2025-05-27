'use client';

import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import type { Testimonial } from '@/types/testimonial';
import { PortableText } from '@portabletext/react';
import { ScrollArea } from '@radix-ui/react-scroll-area';
import { motion } from 'framer-motion';

const MotionCard = motion(Card);

type Props = {
	item: Testimonial;
	hoveredIndex: string | null;
	setHoveredIndex: (id: string | null) => void;
};

export function TestimonialCard({
	item,
	hoveredIndex,
	setHoveredIndex,
}: Props) {
	const isBlurred = hoveredIndex !== null && hoveredIndex !== item.id;

	return (
		<MotionCard
			className={cn(
				'overflow-visible h-[400px] max-h-[400px] xl:h-[300px] xl:max-h-[300px] group relative select-none cursor-pointer p-1 transition-all',
			)}
			variant="tertiary"
			rounded="2xl"
			whileHover={{ scale: 1.1 }}
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
