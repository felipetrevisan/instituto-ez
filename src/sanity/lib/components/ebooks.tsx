import { EbookCard } from '@/components/sections/ebooks/card';
import { Skeleton } from '@/components/sections/testimonials/skeleton';
import { useEbooks } from '@/hooks/use-ebook';
import { cn } from '@/lib/utils';
import type { Theme } from '@/types/global';

type GridSize = 1 | 2 | 3 | 4 | 5;

const columnClassMap: Record<GridSize, string> = {
	1: 'grid-cols-1 md:grid-cols-1 lg:grid-cols-1',
	2: 'grid-cols-1 md:grid-cols-1 lg:grid-cols-2',
	3: 'grid-cols-1 md:grid-cols-1 lg:grid-cols-3',
	4: 'grid-cols-1 md:grid-cols-1 lg:grid-cols-4',
	5: 'grid-cols-1 md:grid-cols-1 lg:grid-cols-5',
};

const rowClassMap: Record<GridSize, string> = {
	1: 'grid-rows-1 md:grid-rows-1 lg:grid-cols-1',
	2: 'grid-rows-1 md:grid-rows-1 lg:grid-rows-2',
	3: 'grid-rows-1 md:grid-rows-1 lg:grid-rows-3',
	4: 'grid-rows-1 md:grid-rows-1 lg:grid-rows-4',
	5: 'grid-rows-1 md:grid-rows-1 lg:grid-rows-5',
};

type EbooksType = {
	rows: number;
	columns: number;
	theme: keyof typeof Theme;
};

const EbooksComponent = ({ value }: { value: EbooksType }) => {
	const { data, isLoading } = useEbooks();

	const classGridColumn =
		columnClassMap[value.columns as GridSize] || 'grid-cols-1 md:grid-cols-1 lg:grid-cols-2';
	const classGridRow =
		rowClassMap[value.rows as GridSize] || 'grid-rows-1 md:grid-rows-1 lg:grid-rows-2';

	return (
		<div className="flex flex-col w-full h-full space-y-14">
			<div className="flex flex-col justify-center">
				{isLoading && <Skeleton />}
				{!isLoading && (
					<div
						className={cn(
							'grid gap-12 gap-y-12 place-items-center',
							classGridRow,
							classGridColumn,
						)}
					>
						{data?.map((ebook, _index) => (
							<EbookCard item={ebook} full key={ebook.id} theme={value.theme} />
						))}
					</div>
				)}
			</div>
		</div>
	);
};

export default EbooksComponent;
