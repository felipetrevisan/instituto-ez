"use client";

import * as React from "react";
import Image from "next/image";
import { HTMLMotionProps, MotionValue, motion } from "framer-motion";
import Link from "next/link";

type LogoProps = {
	height: MotionValue<string>;
	width: MotionValue<string>;
} & HTMLMotionProps<"a">;

export const Logo = ({ className, height, width, ...props }: LogoProps) => {
	return (
		<motion.a
			className="relative h-[3.56rem] w-[14rem] flex space-x-2"
			{...props}
			href="/"
		>
			<Image
				src="/assets/logo.png"
				alt="Logo Instituto Ez - Desenvolvimento Humano"
				className="h-full"
				sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
				priority
				width={57}
				height={57}
			/>
			<span className="flex flex-col justify-center">
				<p className="font-oswald text-primary-foreground text-lg font-bold">
					Instituto Ez
				</p>
				<p className="font-questrial text-primary-foreground text-sm font-light text-nowrap">
					Desenvolvimento Humano
				</p>
			</span>
		</motion.a>
	);
};
