"use client";

import { motion } from "framer-motion";
import * as App from "@/components/app";
import { useTraining } from "@/hooks/use-training";
import { TrainingCard as Card } from "./card";
import { Skeleton } from "./skeleton";

export function Training() {
	const { data, isLoading } = useTraining();

	return (
		<motion.div layout className="flex flex-col space-y-12">
			<App.PageHeader>
				<App.Title>Treinamentos</App.Title>
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
