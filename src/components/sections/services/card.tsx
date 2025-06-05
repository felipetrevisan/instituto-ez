'use client';

import { ButtonLink } from '@/components/app';
import { Card, CardFooter, type CardProps } from '@/components/ui/card';
import { cn, getLink } from '@/lib/utils';
import { urlForImage } from '@/sanity/lib/utils';
import type { Service } from '@/types/service';
import { motion } from 'framer-motion';
type Props = {
	item: Service;
} & CardProps;

const MotionCard = motion(Card);

export function ServiceCard({
	item: { image, description, button },
	className,
}: Props) {
	const backgroundClass = image
		? `url('${urlForImage(image.asset)}')`
		: 'transparent';

	const link = getLink(button);

	const CardRender = () => (
		<MotionCard
			variant="ghost"
			className={cn(
				'flex items-end justify-center shrink md:shrink-0 rounded-xl bg-card w-[70vw] md:w-160 h-[400px] relative bg-cover! shadow-2xl',
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
			<CardFooter className="backdrop-blur-2xl bg-black/70 flex flex-col justify-center items-center gap-4 p-4 w-[calc(100%-10px)] h-42 rounded-2xl font-oswald border border-white/40">
				<span className="text-orange-400 font-semibold text-md text-justify">
					{description}
				</span>
			</CardFooter>
		</MotionCard>
	);

	return (
		<>
			{link ? (
				<ButtonLink href={link} passHref>
					<CardRender />
				</ButtonLink>
			) : (
				<CardRender />
			)}
		</>
	);
}
