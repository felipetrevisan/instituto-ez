'use client';

import {
	Carousel,
	CarouselContent,
	CarouselItem,
} from '@/components/ui/carousel';
import { textVariants } from '@/config/animation';
import { useBanner } from '@/hooks/use-banner';
import { urlForImage } from '@/sanity/lib/utils';
import ClassNames from 'embla-carousel-class-names';
import { motion } from 'framer-motion';
import { Parallax } from 'react-parallax';
import { Skeleton } from './skeleton';

export function Banner() {
	const { data, isLoading } = useBanner();

	if (!isLoading && !data) return <></>;

	return (
		<motion.div
			layout
			className="relative w-full h-[200px] lg:h-[350px] flex flex-col"
		>
			{isLoading && <Skeleton />}
			{!isLoading && (
				<Carousel
					opts={{ dragFree: false, watchDrag: false, watchFocus: false }}
					plugins={[ClassNames()]}
				>
					<CarouselContent>
						{data?.map(({ id, title, subtitle, image }) => (
							<CarouselItem key={id} className="basis-full">
								<Parallax
									bgImage={urlForImage(image.asset).url()}
									className="w-full h-full overflow-hidden lg:rounded-lg"
								>
									<motion.div
										className="flex h-[200px] lg:h-[350px]"
										variants={textVariants}
										animate="show"
										initial="hide"
									>
										{/* absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 */}
										<div className="flex flex-col justify-center items-center font-bold font-oswald w-full p-5 md:p-5 lg:p-5 xl:p-0 text-white">
											<motion.h3 className="clamp-[text,4xl,6xl] italic">
												{title}
											</motion.h3>
											<motion.h1 className="clamp-[text,2xl,6xl] w-full xl:w-3/5 text-center">
												{subtitle}
											</motion.h1>
										</div>
									</motion.div>
								</Parallax>
							</CarouselItem>
						))}
					</CarouselContent>
				</Carousel>
			)}
		</motion.div>
	);
}
