import { Skeleton } from '@/components/sections/testimonials/skeleton';
import { TestimonialAnimated } from '@/components/testimonals/animated';
import { TestimonialMinimalist } from '@/components/testimonals/minimalist';
import {
	Carousel,
	CarouselContent,
	CarouselDots,
	CarouselItem,
} from '@/components/ui/carousel';
import { useTestimonials } from '@/hooks/use-testimonials';
import type { BorderRounded, Theme, Variant } from '@/types/global';
import ClassNames from 'embla-carousel-class-names';
import { useState } from 'react';

type TestimonialType = {
	type: 'ANIMATED' | 'MINIMALIST';
	theme: keyof typeof Theme;
	variant: keyof typeof Variant;
	rounded: keyof typeof BorderRounded;
	category: string;
};

const TestimonialComponent = ({ value }: { value: TestimonialType }) => {
	const [hoveredIndex, setHoveredIndex] = useState<string | null>(null);

	const { type, theme, variant, rounded, category } = value;

	const { data, isLoading } = useTestimonials(category);

	const TestimonialRender =
		type === 'MINIMALIST' ? TestimonialMinimalist : TestimonialAnimated;

	return (
		<div className="flex flex-col w-full h-full space-y-14">
			<div className="flex flex-col justify-center">
				{isLoading && <Skeleton />}
				{!isLoading && (
					<Carousel plugins={[ClassNames()]} className="md:overflow-visible">
						<CarouselContent rootClassName="md:overflow-visible!">
							{data?.map((testimonial, _index) => (
								<CarouselItem
									key={testimonial.id}
									className="basis-full md:basis-1/2 lg:basis-1/2 xl:basis-1/2"
								>
									<TestimonialRender
										key={`testimonial_${category}_${testimonial.id}`}
										item={testimonial}
										hoveredIndex={hoveredIndex}
										setHoveredIndex={setHoveredIndex}
										theme={theme}
										variant={variant}
										rounded={rounded}
									/>
								</CarouselItem>
							))}
						</CarouselContent>
						<CarouselDots className="mt-10" />
					</Carousel>
				)}
			</div>
		</div>
	);
};

export default TestimonialComponent;
