'use client';

import useEmblaCarousel, {
	type UseEmblaCarouselType,
} from 'embla-carousel-react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import * as React from 'react';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { type VariantProps, cva } from 'class-variance-authority';
import {
	MotionHighlight,
	MotionHighlightItem,
} from '../animate-ui/effects/motion-highlight';

type CarouselApi = UseEmblaCarouselType[1];
type UseCarouselParameters = Parameters<typeof useEmblaCarousel>;
type CarouselOptions = UseCarouselParameters[0];
type CarouselPlugin = UseCarouselParameters[1];

type CarouselContextProps = {
	carouselRef: ReturnType<typeof useEmblaCarousel>[0];
	api: ReturnType<typeof useEmblaCarousel>[1];
	scrollPrev: () => void;
	scrollNext: () => void;
	setSelectedIndex: (index: number) => void;
	setScrollSnaps: (snaps: number[]) => void;
	goToSlide: (index: number) => void;
	canScrollPrev: boolean;
	canScrollNext: boolean;
	scrollSnaps: number[];
	selectedIndex: number;
} & CarouselProps;

const carouselVariants = cva('relative **:data-[slot=carousel-dot]:outline-none **:data-[slot=carousel-dot]:hover:outline-none', {
	variants: {
		theme: {
			default:
				'**:data-[slot=carousel-dot]:shadow-primary **:data-[slot=carousel-dot]:hover:after:shadow-primary',
			secondary:
				'**:data-[slot=carousel-dot]:shadow-secondary **:data-[slot=carousel-dot]:hover:after:shadow-secondary',
			tertiary:
				'**:data-[slot=carousel-dot]:shadow-tertiary **:data-[slot=carousel-dot]:hover:after:shadow-tertiary',
		},
	},
	defaultVariants: {
		theme: 'default',
	},
});

const CarouselContext = React.createContext<CarouselContextProps | null>(null);

function useCarousel() {
	const context = React.useContext(CarouselContext);

	if (!context) {
		throw new Error('useCarousel must be used within a <Carousel />');
	}

	return context;
}

type CarouselProps = {
	opts?: CarouselOptions & { autoplay?: number };
	plugins?: CarouselPlugin;
	orientation?: 'horizontal' | 'vertical';
	setApi?: (api: CarouselApi) => void;
} & React.ComponentProps<'div'> &
	VariantProps<typeof carouselVariants>;

function Carousel({
	orientation = 'horizontal',
	opts,
	setApi,
	plugins,
	className,
	children,
	...props
}: React.ComponentProps<'div'> & CarouselProps) {
	const [carouselRef, api] = useEmblaCarousel(
		{
			...opts,
			axis: orientation === 'horizontal' ? 'x' : 'y',
		},
		plugins,
	);
	const [canScrollPrev, setCanScrollPrev] = React.useState(false);
	const [canScrollNext, setCanScrollNext] = React.useState(false);
	const [selectedIndex, setSelectedIndex] = React.useState(0);
	const [scrollSnaps, setScrollSnaps] = React.useState<number[]>([]);

	const onSelect = React.useCallback((api: CarouselApi) => {
		if (!api) return;
		setCanScrollPrev(api.canScrollPrev());
		setCanScrollNext(api.canScrollNext());
		setSelectedIndex(api.selectedScrollSnap());
		setScrollSnaps(api.scrollSnapList());
	}, []);

	const scrollPrev = React.useCallback(() => {
		api?.scrollPrev();
	}, [api]);

	const scrollNext = React.useCallback(() => {
		api?.scrollNext();
	}, [api]);

	const handleKeyDown = React.useCallback(
		(event: React.KeyboardEvent<HTMLDivElement>) => {
			if (event.key === 'ArrowLeft') {
				event.preventDefault();
				scrollPrev();
			} else if (event.key === 'ArrowRight') {
				event.preventDefault();
				scrollNext();
			}
		},
		[scrollPrev, scrollNext],
	);

	const goToSlide = React.useCallback(
		(index: number) => {
			if (!api) return;
			api.scrollTo(index);
		},
		[api],
	);

	React.useEffect(() => {
		if (!api || !setApi) return;
		setApi(api);
	}, [api, setApi]);

	React.useEffect(() => {
		if (!api) return;

		onSelect(api);
		api.on('reInit', onSelect);
		api.on('select', onSelect);

		return () => {
			api?.off('select', onSelect);
		};
	}, [api, onSelect]);

	return (
		<CarouselContext.Provider
			value={{
				carouselRef,
				api: api,
				opts,
				orientation:
					orientation || (opts?.axis === 'y' ? 'vertical' : 'horizontal'),
				scrollPrev,
				scrollNext,
				canScrollPrev,
				canScrollNext,
				setSelectedIndex,
				selectedIndex,
				setScrollSnaps,
				scrollSnaps,
				goToSlide,
			}}
		>
			<div
				onKeyDownCapture={handleKeyDown}
				className={className}
				// biome-ignore lint/a11y/useSemanticElements: <explanation>
				role="region"
				aria-roledescription="carousel"
				data-slot="carousel"
				{...props}
			>
				{children}
			</div>
		</CarouselContext.Provider>
	);
}

function CarouselContent({
	className,
	rootClassName,
	...props
}: React.ComponentProps<'div'> & { rootClassName?: string }) {
	const { carouselRef, orientation } = useCarousel();

	return (
		<div
			ref={carouselRef}
			className={cn('overflow-hidden', rootClassName)}
			data-slot="carousel-content"
		>
			<div
				className={cn(
					'flex',
					orientation === 'horizontal' ? '-ml-4' : '-mt-4 flex-col',
					className,
				)}
				{...props}
			/>
		</div>
	);
}

function CarouselItem({ className, ...props }: React.ComponentProps<'div'>) {
	const { orientation } = useCarousel();

	return (
		<div
			role="group"
			aria-roledescription="slide"
			data-slot="carousel-item"
			className={cn(
				'min-w-0 shrink-0 grow-0 basis-full',
				orientation === 'horizontal' ? 'pl-4' : 'pt-4',
				className,
			)}
			{...props}
		/>
	);
}

function CarouselPrevious({
	className,
	variant = 'outline',
	...props
}: React.ComponentProps<typeof Button>) {
	const { orientation, scrollPrev, canScrollPrev } = useCarousel();

	return (
		<Button
			data-slot="carousel-previous"
			variant={variant}
			className={cn(
				'absolute size-8 rounded-full',
				orientation === 'horizontal'
					? 'top-1/2 -left-12 -translate-y-1/2'
					: '-top-12 left-1/2 -translate-x-1/2 rotate-90',
				className,
			)}
			disabled={!canScrollPrev}
			onClick={scrollPrev}
			{...props}
		>
			<ArrowLeft />
			<span className="sr-only">Previous slide</span>
		</Button>
	);
}

function CarouselNext({
	className,
	variant = 'outline',
	...props
}: React.ComponentProps<typeof Button>) {
	const { orientation, scrollNext, canScrollNext } = useCarousel();

	return (
		<Button
			data-slot="carousel-next"
			variant={variant}
			className={cn(
				'absolute size-8 rounded-full',
				orientation === 'horizontal'
					? 'top-1/2 -right-12 -translate-y-1/2'
					: '-bottom-12 left-1/2 -translate-x-1/2 rotate-90',
				className,
			)}
			disabled={!canScrollNext}
			onClick={scrollNext}
			{...props}
		>
			<ArrowRight />
			<span className="sr-only">Next slide</span>
		</Button>
	);
}

function CarouselDots({
	className,
	theme,
	...props
}: React.ComponentProps<'div'> & VariantProps<typeof carouselVariants>) {
	const { scrollSnaps, selectedIndex, goToSlide } = useCarousel();

	return (
		<div
			className={cn(
				'flex flex-wrap justify-center items-center',
				carouselVariants({ theme }),
			)}
			data-slot="carousel-dots"
			{...props}
		>
			<MotionHighlight
				controlledItems
				hover
				className="flex flex-row bg-transparent"
				mode="children"
			>
				{scrollSnaps.map((_, index) => (
					<MotionHighlightItem
						activeClassName={cn({
							'after:bg-primary': theme === 'default',
							'after:bg-secondary': theme === 'secondary',
							'after:bg-tertiary': theme === 'tertiary',
						})}
						// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
						key={index}
					>
						<Button
							data-slot="carousel-dot"
							variant="outline"
							theme={theme}
							className={cn(
								'rounded-full after:shadow-[0_0_0_0.2rem] after:rounded-full after:size-2 after:flex after:items-center',
								{
									'after:shadow-primary after:bg-primary':
										theme === 'default' && selectedIndex === index,
									'after:shadow-secondary after:bg-secondary':
										theme === 'secondary' && selectedIndex === index,
									'after:shadow-tertiary after:bg-tertiary':
										theme === 'tertiary' && selectedIndex === index,
								},
								className,
							)}
							onClick={() => goToSlide(index)}
						>
							<span className="sr-only">Dot</span>
						</Button>
					</MotionHighlightItem>
				))}
			</MotionHighlight>
		</div>
	);
}

export {
	type CarouselApi,
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselPrevious,
	CarouselNext,
	CarouselDots,
};
