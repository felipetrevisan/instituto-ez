import { Slot } from '@radix-ui/react-slot';
import { type VariantProps, cva } from 'class-variance-authority';
import type * as React from 'react';

import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

const buttonVariants = cva(
	'relative overflow-hidden inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive z-1 cursor-pointer',
	{
		variants: {
			variant: {
				default: 'shadow-sm outline outline-2',
				outline: 'shadow-sm outline outline-2',
				ghost: 'shadow-none outline-none border-none',
				link: 'bg-none shadow-none border-none',
				icon: 'outline outline-2',
			},
			theme: {
				default:
					'bg-linear-to-r from-primary via-primary/80 to-primary hover:bg-primary-foreground hover:text-primary-foreground text-primary-foreground outline-primary-foreground/40',
				secondary:
					'bg-linear-to-r from-secondary via-secondary/80 to-secondary hover:bg-secondary/30 hover:text-secondary-foreground text-secondary-foreground outline-secondary-foreground/40',
				tertiary:
					'bg-linear-to-r from-tertiary via-tertiary/80 to-tertiary text-tertiary-foreground hover:bg-tertiary/30 hover:text-tertiary-foreground outline-tertiary/40 hover:border-tertiary/40',
				whatsapp:
					'bg-whatsapp border-2 text-whatsapp-foreground border-whatsapp hover:border-whatsapp-foreground outline-whatsapp hover:outline-whatsapp-foreground hover:border-whatsapp hover:bg-whatsapp-foreground hover:text-whatsapp',
			},
			size: {
				default: 'h-9 px-4 py-2',
				sm: 'h-8 px-3 text-xs',
				lg: 'h-10 px-8',
				xl: 'h-14 text-md px-6',
				'2xl': 'h-16 text-md px-8',
			},
			rounded: {
				none: 'rounded-none',
				full: 'rounded-full',
				lg: 'rounded-lg',
				xl: 'rounded-2xl',
				'2xl': 'rounded-3xl',
			},
			shadow: {
				true: 'shadow-[0_4px_15px_0]',
				false: 'shadow-none',
			},
			effect: {
				pulse: 'transition-all duration-75 hover:bg-position-[100%_0]',
			},
			fullWidth: {
				true: 'w-full',
			},
		},
		defaultVariants: {
			variant: 'default',
			theme: 'default',
			size: 'default',
			rounded: 'none',
			effect: null,
			shadow: false,
			fullWidth: false,
		},
		compoundVariants: [
			{
				effect: 'pulse',
				variant: 'default',
				className: '--hover: var(--primary-foreground)',
			},

			{
				effect: 'pulse',
				variant: 'default',
				theme: 'secondary',
				className: '--hover: var(--secondary)',
			},

			{
				effect: 'pulse',
				variant: 'default',
				theme: 'tertiary',
				className: '--hover: var(--tertiary)',
			},
			// Hover
			// Default / Primary
			// {
			// 	hover: 'effect',
			// 	variant: 'default',
			// 	className:
			// 		'transition-all ease-in-out duration-500 before:bg-primary-foreground hover:text-primary',
			// },
			// {
			// 	hover: 'effect',
			// 	variant: 'outline',
			// 	className:
			// 		'transition-all ease-in-out duration-500 border-primary text-primary before:bg-primary hover:text-primary-foreground',
			// },
			// {
			// 	hover: 'effect',
			// 	variant: 'ghost',
			// 	className:
			// 		'transition-all ease-in-out duration-500 text-primary before:bg-primary hover:text-primary-foreground',
			// },
			// Secondary
			// {
			// 	hover: 'effect',
			// 	theme: 'secondary',
			// 	variant: 'default',
			// 	className:
			// 		'transition-all ease-in-out duration-500 before:bg-secondary-foreground hover:text-secondary',
			// },
			// {
			// 	hover: 'effect',
			// 	theme: 'secondary',
			// 	variant: 'outline',
			// 	className:
			// 		'transition-all ease-in-out duration-500 border-secondary text-secondary before:bg-secondary hover:text-secondary-foreground',
			// },
			// {
			// 	hover: 'effect',
			// 	theme: 'secondary',
			// 	variant: 'ghost',
			// 	className:
			// 		'transition-all ease-in-out duration-500 text-secondary before:bg-secondary hover:text-secondary-foreground',
			// },
			// Tertiary
			// {
			// 	hover: 'effect',
			// 	theme: 'tertiary',
			// 	variant: 'default',
			// 	className:
			// 		'transition-all ease-in-out duration-500 before:bg-tertiary-foreground hover:text-tertiary',
			// },
			// {
			// 	hover: 'effect',
			// 	theme: 'tertiary',
			// 	variant: 'outline',
			// 	className:
			// 		'transition-all ease-in-out duration-500 border-tertiary text-tertiary before:bg-tertiary hover:text-tertiary-foreground',
			// },
			// {
			// 	hover: 'effect',
			// 	theme: 'tertiary',
			// 	variant: 'ghost',
			// 	className:
			// 		'transition-all ease-in-out duration-500 text-tertiary before:bg-tertiary hover:text-tertiary-foreground',
			// },

			// Shadow
			// Default / Primary
			{
				shadow: true,
				variant: 'default',
				className:
					'shadow-primary-foreground/40 hover:shadow-primary-foreground transition-shadow ease-in-out duration-500',
			},
			{
				shadow: true,
				variant: 'outline',
				className:
					'shadow-primary-foreground/40 hover:shadow-primary-foreground transition-shadow ease-in-out duration-500',
			},
			{
				shadow: true,
				variant: 'ghost',
				className:
					'shadow-primary-foreground/40 hover:shadow-primary-foreground transition-shadow ease-in-out duration-500',
			},
			// Secondary
			{
				shadow: true,
				theme: 'secondary',
				variant: 'default',
				className:
					'shadow-secondary/40 hover:shadow-secondary transition-shadow ease-in-out duration-500',
			},
			{
				shadow: true,
				theme: 'secondary',
				variant: 'outline',
				className:
					'shadow-secondary/40 hover:shadow-secondary transition-shadow ease-in-out duration-500',
			},
			{
				shadow: true,
				theme: 'secondary',
				variant: 'ghost',
				className:
					'shadow-secondary/40 hover:shadow-secondary transition-shadow ease-in-out duration-500',
			},
			// Tertiary
			{
				shadow: true,
				theme: 'secondary',
				variant: 'default',
				className:
					'shadow-tertiary/40 hover:shadow-tertiary transition-shadow ease-in-out duration-500',
			},
			{
				shadow: true,
				theme: 'tertiary',
				variant: 'outline',
				className:
					'shadow-tertiary/40 hover:shadow-tertiary transition-shadow ease-in-out duration-500',
			},
			{
				shadow: true,
				theme: 'tertiary',
				variant: 'ghost',
				className:
					'shadow-tertiary/40 hover:shadow-tertiary transition-shadow ease-in-out duration-500',
			},

			// Outline
			{
				variant: 'outline',
				className: 'bg-transparent text-primary',
			},
			{
				variant: 'outline',
				theme: 'secondary',
				className: 'bg-transparent text-secondary',
			},
			{
				variant: 'outline',
				theme: 'tertiary',
				className: 'bg-transparent text-tertiary',
			},

			{
				variant: 'ghost',
				className: 'bg-transparent text-primary',
			},
			{
				variant: 'ghost',
				theme: 'secondary',
				className: 'bg-transparent text-secondary',
			},
			{
				variant: 'ghost',
				theme: 'tertiary',
				className: 'bg-transparent text-tertiary',
			},

			{
				variant: 'link',
				theme: 'default',
				className: 'bg-transparent text-primary !shadow-none',
			},
			{
				variant: 'link',
				theme: 'secondary',
				className: 'bg-transparent text-secondary !shadow-none',
			},
			{
				variant: 'link',
				theme: 'tertiary',
				className: 'bg-transparent text-tertiary !shadow-none',
			},

			{
				variant: 'icon',
				size: 'default',
				className: 'size-9 p-0 [&_svg]:size-4',
			},
			{
				variant: 'icon',
				size: 'sm',
				className: 'size-8 p-0 [&_svg]:size-3',
			},
			{
				variant: 'icon',
				size: 'lg',
				className: 'size-10 p-0',
			},
			{
				variant: 'icon',
				size: 'xl',
				className: 'size-14 p-0 [&_svg]:size-9',
			},
			{
				variant: 'icon',
				size: '2xl',
				className: 'size-16 p-0 [&_svg]:size-8',
			},
		],
	},
);

function Button({
	className,
	variant,
	theme,
	size,
	rounded,
	effect,
	shadow,
	fullWidth,
	asChild = false,
	...props
}: React.ComponentProps<typeof motion.button> &
	VariantProps<typeof buttonVariants> & {
		asChild?: boolean;
	}) {
	const Comp = asChild ? Slot : 'button';
	const CompMotion = motion(Comp);

	return (
		<CompMotion
			data-slot="button"
			whileHover={{ scale: 1.05 }}
			whileTap={{ scale: 0.9 }}
			transition={{ type: 'spring', stiffness: 400, damping: 10 }}
			animate={{
				transition: { duration: 0.4, ease: 'easeInOut' },
			}}
			className={cn(
				buttonVariants({
					variant,
					theme,
					size,
					rounded,
					effect,
					shadow,
					fullWidth,
					className,
				}),
			)}
			{...props}
		/>
	);
}

export { Button, buttonVariants };
