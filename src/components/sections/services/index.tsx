'use client';

import { useServices } from '@/hooks/use-services';
import { motion } from 'framer-motion';
import { ServiceCard as Card } from './card';
import { Skeleton } from './skeleton';

export function Services() {
	const { data, isLoading } = useServices();

	return (
		<motion.div layout className="flex flex-col space-y-12 gap-10">
			<div className="flex flex-col md:flex-row justify-center items-center gap-16 h-full flex-wrap">
				{isLoading && <Skeleton />}
				{data?.map((item) => (
					<Card key={item.id} item={item} />
				))}
			</div>
		</motion.div>
	);
}
