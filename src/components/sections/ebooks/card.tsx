'use client';

import { ButtonLink } from '@/components/app';
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	type CardProps,
} from '@/components/ui/card';
import { cn, getLink } from '@/lib/utils';
import { urlForImage } from '@/sanity/lib/utils';
import type { Ebook } from '@/types/ebook';
import { motion } from 'framer-motion';

import './styles.css';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { useState } from 'react';

type Props = {
	item: Ebook;
	full?: boolean;
} & CardProps;

const MotionCard = motion(Card);

export function EbookCard({
	item: { image, slug, title, subtitle, description, button, disabled },
	full = false,
	className,
}: Props) {
	const backgroundClass = image.preview
		? `url('${urlForImage(image.preview.asset)}') no-repeat center center / cover`
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
					'flex flex-col md:flex-row items-end justify-center shrink md:shrink-0 rounded-xl bg-card w-[70vw] md:w-80 lg:w-80 h-96 relative shadow-2xl',
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
			>
				</MotionCard>
		</div>
	);

	const CardFullRender = () => (
		<div className="relative w-full">
			<div className="md:hidden flex justify-center item-center ribbon ribbon-primary text-base font-bold uppercase backdrop-blur-2xl p-5 text-center">
				{title}
			</div>

			<MotionCard
				variant="ghost"
				className={cn(
					'flex flex-col md:flex-row justify-center shrink md:shrink-0 relative rounded-2xl shadow-xl w-full h-full md:h-[300px] border-1! border-primary/50 overflow-hidden',
					{
						'grayscale-[85%] opacity-80 select-none pointer-events-none':
							disabled,
						'md:flex-col': !description,
					},
					className,
				)}
			>
				{image.preview && (
					<CardHeader
						className={cn(
							'relative h-[40vh] md:w-1/2 md:h-full overflow-visible p-0',
							{ 'bg-[#f5f5f5] md:w-full': !description },
						)}
					>
						<motion.div
							className={cn(
								'absolute inset-0 overflow-visible md:w-full md:h-full',
								{ 'md:w-full': !description },
							)}
							variants={{
								hover: { scale: 1.2 },
								initial: { scale: 1 },
							}}
							transition={{ duration: 0.4, ease: 'easeInOut' }}
						>
							<Image
								src={urlForImage(image.preview.asset).url()}
								alt=""
								fill
								placeholder="blur"
								blurDataURL={image.preview.metadata.lqip}
								className={cn('object-cover h-max rounded-xl', {
									'md:object-contain': !description,
								})}
							/>
						</motion.div>
					</CardHeader>
				)}
				<CardContent className="relative flex flex-col justify-between p-0 gap-4 w-full">
					{description && (
						<div className="p-5 md:px-3 md:py-2">{description}</div>
					)}
					{button && (
						<div
							className={cn('relative w-full md:p-5', {
								'md:absolute md:bottom-0': description,
							})}
						>
							<Button
								disabled={disabled}
								fullWidth
								size="xl"
								rounded="2xl"
								className="m-0"
								scaleEffect={false}
							>
								{!disabled ? button.label : 'Em breve'}
							</Button>
						</div>
					)}
				</CardContent>
			</MotionCard>
		</div>
	);

	return (
		<>
			{link && !full ? (
				<ButtonLink href={`/ebooks/${slug}`} passHref>
					<CardRender />
				</ButtonLink>
			) : (
				<>{full ? <CardFullRender /> : <CardRender />}</>
			)}
		</>
	);
}
