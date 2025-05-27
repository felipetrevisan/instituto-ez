import { cn } from '@/lib/utils';
import { type VariantProps, cva } from 'class-variance-authority';
import type * as React from 'react';

const cardVariants = cva('relative', {
	variants: {
		variant: {
			default: 'text-primary-foreground bg-primary border shadow-xl',
			secondary:
				'text-secondary-foreground bg-secondary border-2 border-white shadow-xl outline-secondary hover:outline-white hover:border-secondary',
			tertiary:
				'text-tertiary-foreground bg-tertiary border-2 border-white shadow-xl outline-tertiary hover:outline-white hover:border-tertiary',
			ghost: 'outline-0 bg-transparent',
		},
		rounded: {
			none: 'rounded-none',
			full: 'rounded-full',
			lg: 'rounded-lg',
			xl: 'rounded-2xl',
			'2xl': 'rounded-3xl',
		},
	},
	defaultVariants: {
		variant: 'default',
		rounded: 'none',
	},
});

export type CardProps = React.ComponentProps<'div'> & VariantProps<typeof cardVariants>;

function Card({
	className,
  variant, rounded,
	...props
}: CardProps) {
	return (
		<div
			data-slot="card"
			className={cn(cardVariants({ variant, rounded, className }))}
			{...props}
		/>
	);
}

function CardHeader({ className, ...props }: React.ComponentProps<'div'>) {
	return (
		<div
			data-slot="card-header"
			className={cn(
				'@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-1.5 px-6 has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6',
				className,
			)}
			{...props}
		/>
	);
}

function CardTitle({ className, ...props }: React.ComponentProps<'div'>) {
	return (
		<div
			data-slot="card-title"
			className={cn('leading-none font-semibold text-sm text-muted-foreground', className)}
			{...props}
		/>
	);
}

function CardDescription({ className, ...props }: React.ComponentProps<'div'>) {
	return (
		<div
			data-slot="card-description"
			className={cn('text-muted-foreground text-sm', className)}
			{...props}
		/>
	);
}

function CardAction({ className, ...props }: React.ComponentProps<'div'>) {
	return (
		<div
			data-slot="card-action"
			className={cn(
				'col-start-2 row-span-2 row-start-1 self-start justify-self-end',
				className,
			)}
			{...props}
		/>
	);
}

function CardContent({ className, ...props }: React.ComponentProps<'div'>) {
	return (
		<div
			data-slot="card-content"
			className={cn('p-6 pt-0', className)}
			{...props}
		/>
	);
}

function CardFooter({ className, ...props }: React.ComponentProps<'div'>) {
	return (
		<div
			data-slot="card-footer"
			className={cn('flex items-center px-6 [.border-t]:pt-6', className)}
			{...props}
		/>
	);
}

export {
	Card,
	CardHeader,
	CardFooter,
	CardTitle,
	CardAction,
	CardDescription,
	CardContent,
};
