import { cn } from '@/lib/utils';
import { type VariantProps, cva } from 'class-variance-authority';

const alertVariants = cva(
	'relative w-full rounded-2xl border px-4 py-3 grid has-[>svg]:grid-cols-[calc(var(--spacing)*4)_1fr] grid-cols-[0_1fr] has-[>svg]:gap-x-3 gap-y-0.5 items-start [&>svg]:size-4 [&>svg]:translate-y-0.5 [&>svg]:text-current',
	{
		variants: {
			variant: {
				default: 'shadow-[0_0_15px_3px] outline outline-1',
				outline: 'shadow-[0_0_15px_3px] outline outline-1',
				ghost: 'shadow-none outline-none border-none',
			},
			theme: {
				default:
					'shadow-primary/20 bg-primary/20 text-primary-foreground outline-primary border-primary/20 *:data-[slot=alert-title]:text-primary *:data-[slot=alert-title]:text-lg [&>svg]:fill-primary *:data-[slot=alert-description]:text-primary',
				secondary:
					'shadow-secondary/20 bg-secondary/20 text-secondary-foreground outline-secondary border-secondary/20 *:data-[slot=alert-title]:text-secondary *:data-[slot=alert-title]:text-lg [&>svg]:fill-secondary *:data-[slot=alert-description]:text-secondary',
				tertiary:
					'shadow-tertiary/20 bg-tertiary/20 text-tertiary-foreground outline-tertiary border-tertiary/20 *:data-[slot=alert-title]:text-tertiary *:data-[slot=alert-title]:text-lg [&>svg]:fill-tertiary *:data-[slot=alert-description]:text-tertiary',
			},
		},
		defaultVariants: {
			variant: 'default',
			theme: 'default',
		},
	},
);

function Alert({
	className,
	variant,
	theme,
	...props
}: React.ComponentProps<'div'> & VariantProps<typeof alertVariants>) {
	return (
		<div
			data-slot="alert"
			role="alert"
			className={cn(alertVariants({ variant, theme }), className)}
			{...props}
		/>
	);
}

function AlertTitle({ className, ...props }: React.ComponentProps<'div'>) {
	return (
		<div
			data-slot="alert-title"
			className={cn(
				'col-start-2 line-clamp-1 min-h-4 font-medium tracking-tight mb-4 flex items-center gap-2',
				className,
			)}
			{...props}
		/>
	);
}

function AlertDescription({
	className,
	...props
}: React.ComponentProps<'div'>) {
	return (
		<div
			data-slot="alert-description"
			className={cn(
				'text-muted-foreground col-start-2 grid justify-items-start gap-1 text-md [&_p]:leading-relaxed',
				className,
			)}
			{...props}
		/>
	);
}

export { Alert, AlertTitle, AlertDescription, alertVariants };
