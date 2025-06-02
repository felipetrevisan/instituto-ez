import { cn } from '@/lib/utils';
import { Slot } from '@radix-ui/react-slot';
import { type VariantProps, cva } from 'class-variance-authority';
import { type HTMLMotionProps, type Transition, motion } from 'framer-motion';
import * as React from 'react';

const buttonVariants = cva(
	'relative overflow-hidden inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive z-1 cursor-pointer',
	{
		variants: {
			variant: {
				default: 'shadow-sm outline outline-2',
				outline: 'shadow-sm outline outline-2',
				ghost: 'shadow-none outline-none border-none',
				link: 'bg-none shadow-none border-none',
			},
			theme: {
				default:
					'bg-linear-to-r from-primary via-primary/80 to-primary hover:bg-primary-foreground hover:text-primary-foreground text-primary-foreground outline-primary-foreground/40',
				secondary:
					'bg-linear-to-r from-secondary via-secondary/80 to-secondary hover:bg-secondary/30 hover:text-secondary-foreground text-secondary-foreground outline-secondary-foreground/40',
				tertiary:
					'bg-linear-to-r from-tertiary via-tertiary/80 to-tertiary text-tertiary-foreground hover:bg-tertiary/30 hover:text-tertiary-foreground outline-tertiary/40 hover:border-tertiary/40',
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
		],
	},
);

const rippleVariants = cva('absolute rounded-full size-5 pointer-events-none', {
	variants: {
		variant: {
			default: 'shadow-sm outline outline-2',
			outline: 'shadow-sm outline outline-2',
			ghost: 'shadow-none outline-none border-none',
			link: 'bg-none shadow-none border-none',
			icon: 'outline outline-2',
		},
		theme: {
			default: 'bg-secondary',
			secondary: 'bg-tertiary',
			tertiary: 'bg-primary',
		},
	},
	defaultVariants: {
		variant: 'default',
		theme: 'default',
	},
});

type Ripple = { id: number; x: number; y: number };

type ButtonProps = HTMLMotionProps<'button'> &
	VariantProps<typeof buttonVariants> & {
		children: React.ReactNode;
		rippleClassName?: string;
		scale?: number;
		transition?: Transition;
		asChild?: boolean;
	};

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
	(
		{
			className,
			onClick,
			rippleClassName,
			variant,
			theme,
			size,
			rounded,
			effect,
			shadow,
			fullWidth,
			scale = 10,
			transition = { duration: 0.6, ease: 'easeOut' },
			asChild = false,
			children,
			...props
		},
		ref,
	) => {
		const Comp = asChild ? Slot : 'button';
		const CompMotion = motion(Comp);
		const [ripples, setRipples] = React.useState<Ripple[]>([]);
		const buttonRef = React.useRef<HTMLButtonElement>(null);

		React.useImperativeHandle(
			ref,
			() => buttonRef.current as HTMLButtonElement,
		);

		const createRipple = React.useCallback(
			(event: React.MouseEvent<HTMLButtonElement>) => {
				const rect = buttonRef.current?.getBoundingClientRect();
				if (!rect) return;
				const x = event.clientX - rect.left;
				const y = event.clientY - rect.top;
				const id = Date.now();
				setRipples((prev) => [...prev, { id, x, y }]);
				setTimeout(
					() => setRipples((prev) => prev.filter((r) => r.id !== id)),
					600,
				);
			},
			[],
		);

		const handleClick = React.useCallback(
			(event: React.MouseEvent<HTMLButtonElement>) => {
				createRipple(event);
				setTimeout(() => onClick?.(event), 600);
			},
			[createRipple, onClick],
		);

		return (
			<CompMotion
				ref={buttonRef}
				data-slot="button"
				whileHover={{ scale: 1.1 }}
				whileTap={{ scale: 0.9 }}
				transition={{ type: 'spring', stiffness: 400, damping: 10 }}
				animate={{ transition: { duration: 0.4, ease: 'easeInOut' } }}
				className={cn(
					buttonVariants({
						variant,
						theme,
						size,
						rounded,
						effect,
						shadow,
						fullWidth,
					}),
					className,
				)}
				onClick={handleClick}
				{...props}
			>
				{children}
				{ripples.map((r) => (
					<motion.span
						key={r.id}
						initial={{ scale: 0, opacity: 0.5 }}
						animate={{ scale, opacity: 0 }}
						transition={transition}
						className={cn(rippleVariants({ variant, theme }), rippleClassName)}
						style={{ top: r.y - 10, left: r.x - 10 }}
					/>
				))}
			</CompMotion>
		);
	},
);

export { Button, buttonVariants };
