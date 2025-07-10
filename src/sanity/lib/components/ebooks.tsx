import * as App from '@/components/app';
import { EbookCard } from '@/components/sections/ebooks/card';
import { Skeleton } from '@/components/sections/testimonials/skeleton';
import {
	Carousel,
	CarouselContent,
	CarouselDots,
	CarouselItem,
} from '@/components/ui/carousel';
import { useEbookByCollection, useEbooks } from '@/hooks/use-ebook';
import { cn } from '@/lib/utils';
import type { Ebook, EbookCollection } from '@/types/ebook';
import type { Theme } from '@/types/global';
import ClassNames from 'embla-carousel-class-names';

type EbooksType = {
	type: 'grid' | 'carousel';
	appareance: 'small' | 'full';
	collection: { _ref: string; _type: string };
	theme: keyof typeof Theme;
};

const EbooksComponent = ({ value }: { value: EbooksType }) => {
	const { data, isLoading } = value.collection
		? useEbookByCollection(value.collection._ref)
		: useEbooks();

	if (isLoading) return <Skeleton />;

	const ebooks = value.collection
		? (data as EbookCollection).ebooks
		: (data as Ebook[]);

	if (value.type === 'grid' && !isLoading) {
		return (
			<EbookGridComponent
				ebooks={ebooks}
				theme={value.theme}
				appareance={value.appareance}
				title={value.collection ? (data as EbookCollection).title : undefined}
			/>
		);
	}

	if (value.type === 'carousel' && !isLoading) {
		return (
			<EbookCarouselComponent
				ebooks={ebooks}
				theme={value.theme}
				appareance={value.appareance}
				title={value.collection ? (data as EbookCollection).title : undefined}
			/>
		);
	}

	return null;
};

const EbookGridComponent = ({
	ebooks,
	theme,
	appareance,
	title,
}: {
	ebooks: Ebook[] | undefined;
	theme: EbooksType['theme'];
	appareance: EbooksType['appareance'];
	title?: string;
}) => {
	return (
		<div className="flex flex-col w-full h-full space-y-14">
			<div className="flex flex-col justify-center gap-10">
				{ebooks && (
					<>
						{title && <App.Title size="2xl">{title}</App.Title>}
						<div
							className={cn(
								'grid gap-12 gap-y-12 place-items-center grid-cols-1',
								{
									'md:grid-cols-1 lg:grid-cols-1 xl:grid-cols-2':
										appareance === 'full',
									'md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-4':
										appareance === 'small',
								},
							)}
						>
							{ebooks?.map((ebook, _index) => (
								<EbookCard
									item={ebook}
									full={appareance === 'full'}
									key={ebook.id}
									theme={theme}
								/>
							))}
						</div>
					</>
				)}
			</div>
		</div>
	);
};

const EbookCarouselComponent = ({
	ebooks,
	theme,
	appareance,
	title,
}: {
	ebooks: Ebook[] | undefined;
	theme: EbooksType['theme'];
	appareance: EbooksType['appareance'];
	title?: string;
}) => {
	return (
		<div className="flex flex-col w-full h-full space-y-14">
			<div className="flex flex-col justify-center gap-10">
				{title && <App.Title size="2xl">{title}</App.Title>}
				<Carousel plugins={[ClassNames()]} className="overflow-visible">
					<CarouselContent className="gap-4" rootClassName="overflow-visible">
						{ebooks?.map((ebook) => (
							<CarouselItem
								key={ebook.id}
								className="basis-full md:basis-1/2 lg:basis-1/2 xl:basis-1/2"
							>
								<EbookCard
									item={ebook}
									full={appareance === 'full'}
									theme={theme}
								/>
							</CarouselItem>
						))}
					</CarouselContent>
					<CarouselDots theme="default" />
				</Carousel>
			</div>
		</div>
	);
};

export default EbooksComponent;
