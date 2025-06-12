'use client';

import { ButtonLink } from '@/components/app';
import { Button } from '@/components/ui/button';
import { Card, CardFooter, type CardProps } from '@/components/ui/card';
import {
	Carousel,
	CarouselContent,
	CarouselItem,
} from '@/components/ui/carousel';
import { cn, getLink } from '@/lib/utils';
import { urlForImage } from '@/sanity/lib/utils';
import type { Service } from '@/types/service';
import Autoplay from 'embla-carousel-autoplay';
import ClassNames from 'embla-carousel-class-names';
import { motion } from 'framer-motion';
type Props = {
	item: Service;
} & CardProps;

const MotionCard = motion(Card);

export function ServiceCard({
	item: { image, title, button, disabled },
	className,
}: Props) {
	const backgroundClass = image
		? `url('${urlForImage(image.asset)}')`
		: 'transparent';

	const link = !disabled ? getLink(button) : false;

	const CardRender = () => (
		<MotionCard
			variant="ghost"
			className={cn(
				'flex items-end justify-center shrink md:shrink-0 rounded-xl bg-card w-[70vw] md:w-160 h-[400px] relative bg-cover! shadow-2xl',
				{
					'grayscale-100 opacity-80 select-none pointer-events-none': disabled,
				},
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
			<CardFooter className="backdrop-blur-2xl bg-black/50 flex flex-col justify-center gap-4 p-4 h-20 w-full rounded-2xl font-oswald">
				<Carousel
					opts={{ loop: true, duration: 30 }}
					plugins={[ClassNames(), Autoplay({ playOnInit: true, delay: 3000 })]}
				>
					<CarouselContent>
						<CarouselItem className="flex justify-center items-center basis-full">
							<span className="text-orange-400 font-semibold text-xl text-center">
								{title}
							</span>
						</CarouselItem>
						{button.visible && (
							<CarouselItem className="flex justify-center items-center basis-full">
								<Button
									variant="default"
									theme="tertiary"
									rounded="xl"
									size="2xl"
									className="uppercase font-bold w-full"
									disabled={button.disabled}
									effect="none"
									scaleEffect={false}
								>
									{button.label}
								</Button>
							</CarouselItem>
						)}
					</CarouselContent>
				</Carousel>
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
