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
import type { Theme } from '@/types/global';
import Image from 'next/image';

type Props = {
	item: Ebook;
	full?: boolean;
	theme: keyof typeof Theme;
} & CardProps;

const MotionCard = motion(Card);

export function EbookCard({
	item: { image, slug, title, subtitle, description, button, disabled },
	full = false,
	theme,
	className,
}: Props) {
	const backgroundClass = image.preview
		? `url('${urlForImage(image.preview.asset)}') no-repeat center center / cover`
		: 'transparent';

	const link = !disabled && button ? getLink(button) : false;

	const CardRender = () => (
		<div className="relative w-fit">
			{disabled && (
				<div
					className={cn('text-base font-bold text-white ribbon filter-none', {
						'ribbon-primary': theme === 'default',
						'ribbon-secondary': theme === 'secondary',
						'ribbon-tertiary': theme === 'tertiary',
					})}
				>
					Em breve
				</div>
			)}
			<MotionCard
				variant="ghost"
				theme={theme}
				className={cn(
					'flex flex-col md:flex-row items-end justify-center shrink md:shrink-0 bg-card w-[70vw] md:w-80 lg:w-80 h-96 relative shadow-2xl',
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

	const CardFullRender = () => (
		<div className="relative w-full">
			<div
				className={cn(
					'flex justify-center item-center ribbon text-base font-bold uppercase -mt-7 p-5 text-center',
					{
						'ribbon-primary': theme === 'default',
						'ribbon-secondary': theme === 'secondary',
						'ribbon-tertiary': theme === 'tertiary',
					},
				)}
			>
				{title}
			</div>
			<MotionCard
				variant="ghost"
				theme={theme}
				className={cn(
					'flex flex-col md:flex-row justify-center shrink md:shrink-0 relative shadow-xl w-full h-full md:h-[300px] border-1! border-primary/50 overflow-hidden',
					{
						'grayscale-[85%] opacity-80 select-none pointer-events-none':
							disabled,
						'md:flex-col': !description,
						'rounded-t-2xl': button,
						'rounded-2xl': !button,
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
				{description && (
					<CardContent className="relative flex flex-col justify-center p-0 gap-4 w-full">
						<div className="p-5 md:text-justify">{description}</div>
					</CardContent>
				)}
			</MotionCard>
			{button && (
				<div className="flex justify-center item-center rounded-b-3xl overflow-hidden">
					<Button
						disabled={disabled}
						theme={theme}
						fullWidth
						size="xl"
						className="m-0"
						scaleEffect={false}
					>
						{!disabled ? button.label : 'Em breve'}
					</Button>
				</div>
			)}
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
