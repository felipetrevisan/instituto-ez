'use client';

import * as App from '@/components/app';
import { useWorkshop } from '@/hooks/use-workshop';
import { motion } from 'framer-motion';
import { WorkshopCard as Card } from './card';
import { Skeleton } from './skeleton';

export function Workshops() {
	const { data, isLoading } = useWorkshop();

	return (
		<motion.div layout className="flex flex-col space-y-12">
			<App.PageHeader>
				<App.Title>Conheça nossos Workshops</App.Title>
			</App.PageHeader>
			<div className="flex flex-col md:flex-row justify-center items-center gap-16 h-full flex-wrap">
				{isLoading && <Skeleton />}
				{data?.map((item) => (
					<Card key={item.id} item={item} />
				))}
			</div>
		</motion.div>
	);
}
