'use client';

import { type HTMLMotionProps, type MotionValue, motion } from 'framer-motion';
import Image from 'next/image';
import * as React from 'react';

type LogoProps = {
	src?: string;
	showSlogan?: boolean;
	linkable?: boolean;
} & HTMLMotionProps<'a'>;

export const Logo = ({
	className,
	showSlogan = true,
	linkable = true,
	src,
	...props
}: LogoProps) => {
	const logoImage = (
		<>
			<Image
				src={src ?? '/assets/logo.png'}
				alt="Logo Instituto Ez - Desenvolvimento Humano"
				className="h-full"
				sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
				priority
				width={57}
				height={57}
			/>
			{showSlogan && (
				<span className="flex flex-col justify-center md:hidden xl:flex">
					<p className="font-oswald text-primary text-lg font-bold">
						Instituto Ez
					</p>
					<p className="font-questrial text-primary text-sm font-light text-nowrap">
						Desenvolvimento Humano
					</p>
				</span>
			)}
		</>
	);

	return (
		<>
			{linkable ? (
				<motion.a
					className="relative h-[3.56rem] w-56 md:w-auto flex space-x-2"
					{...props}
					href="/"
				>
					{logoImage}
				</motion.a>
			) : (
				logoImage
			)}
		</>
	);
};
