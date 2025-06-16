'use client';

import { ButtonLink } from '@/components/app';
import { Card, CardFooter, type CardProps } from '@/components/ui/card';
import { cn, getLink } from '@/lib/utils';
import { urlForImage } from '@/sanity/lib/utils';
import type { Ebook } from '@/types/ebook';
import { motion } from 'framer-motion';

import './styles.css';

type Props = {
	item: Ebook;
} & CardProps;

const MotionCard = motion(Card);

export function EbookCard({
	item: { background, title, subtitle, button, disabled },
	className,
}: Props) {
	const backgroundClass = background
		? `url('${urlForImage(background.asset)}')`
		: 'transparent';

	const link = !disabled && button ? getLink(button) : false;

	const CardRender = () => (
		<div className="relative w-fit">
			{disabled && (
				<div className="text-base font-bold text-white ribbon filter-none">
					Em breve
				</div>
			)}
			<MotionCard
				variant="ghost"
				className={cn(
					'flex items-end justify-center shrink md:shrink-0 rounded-xl bg-card w-[70vw] md:w-80 lg:w-80 h-96 relative bg-center! bg-cover! shadow-2xl',
					{
						'grayscale-100 opacity-80 select-none pointer-events-none':
							disabled,
					},
					className,
				)}
				style={{
					background: backgroundClass,
				}}
				whileHover={{ scale: disabled ? 1 : 1.1 }}
				whileTap={{ scale: disabled ? 1 : 0.9 }}
				transition={{ type: 'spring', stiffness: 400, damping: 10 }}
				animate={{
					transition: { duration: 0.4, ease: 'easeInOut' },
				}}
			/>
		</div>
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
