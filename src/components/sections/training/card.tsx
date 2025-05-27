'use client';

import { ButtonLink } from '@/components/app';
import { Card, CardFooter, type CardProps } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { urlForImage } from '@/sanity/lib/utils';
import type { Training } from '@/types/training';
import { motion } from 'framer-motion';

type Props = {
	item: Training;
} & CardProps;

const MotionCard = motion(Card);

export function TrainingCard({
	item: { background, title, subtitle },
	className,
}: Props) {
	const backgroundClass = background
		? `url('${urlForImage(background.asset)}')`
		: 'transparent';

	return (
		<ButtonLink href="/treinamentos" passHref>
			<MotionCard
				variant="ghost"
				className={cn(
					'flex items-end justify-center shrink md:shrink-0 rounded-xl bg-card w-[70vw] md:w-160 lg:w-80 h-96 relative bg-cover! shadow-2xl',
					className,
				)}
				style={{
					background: backgroundClass,
				}}
				whileHover={{ scale: 1.1 }}
				whileTap={{ scale: 0.9 }}
				transition={{ type: 'spring', stiffness: 400, damping: 10 }}
				animate={{
					transition: { duration: 0.4, ease: 'easeInOut' },
				}}
			>
				<CardFooter className="bg-black/80 flex flex-col justify-center items-center gap-4 p-4 w-[calc(100%-10px)] h-28 rounded-2xl font-oswald border border-white/40 backdrop-blur-xl">
					<span className="text-orange-400 font-bold text-2xl text-center">
						{title}
					</span>
					{subtitle && (
						<span className="text-white font-bold text-2xl">{subtitle}</span>
					)}
				</CardFooter>
			</MotionCard>
		</ButtonLink>
	);
}
