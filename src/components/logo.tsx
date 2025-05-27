'use client';

import { type HTMLMotionProps, type MotionValue, motion } from 'framer-motion';
import Image from 'next/image';
import * as React from 'react';

type LogoProps = {
	height: MotionValue<string>;
	width: MotionValue<string>;
	src?: string;
} & HTMLMotionProps<'a'>;

export const Logo = ({
	className,
	height,
	width,
	src,
	...props
}: LogoProps) => {
	return (
		<motion.a
			className="relative h-[3.56rem] w-56 flex space-x-2"
			{...props}
			href="/"
		>
			<Image
				src={src ?? '/assets/logo.png'}
				alt="Logo Instituto Ez - Desenvolvimento Humano"
				className="h-full"
				sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
				priority
				width={57}
				height={57}
			/>
			<span className="flex flex-col justify-center">
				<p className="font-oswald text-primary text-lg font-bold">
					Instituto Ez
				</p>
				<p className="font-questrial text-primary text-sm font-light text-nowrap">
					Desenvolvimento Humano
				</p>
			</span>
		</motion.a>
	);
};
