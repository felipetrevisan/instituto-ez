'use client';

import { cn } from '@/lib/utils';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import {
	AnimatePresence,
	type HTMLMotionProps,
	type Transition,
	motion,
} from 'framer-motion';
import { XIcon } from 'lucide-react';
import {
	createContext,
	useCallback,
	useContext,
	useEffect,
	useState,
} from 'react';

type DialogContextType = {
	isOpen: boolean;
};

const DialogContext = createContext<DialogContextType | undefined>(undefined);

const useDialog = (): DialogContextType => {
	const context = useContext(DialogContext);
	if (!context) {
		throw new Error('useDialog must be used within a Dialog');
	}
	return context;
};

function Dialog({
	children,
	...props
}: React.ComponentProps<typeof DialogPrimitive.Root>) {
	const [isOpen, setIsOpen] = useState(
		props?.open ?? props?.defaultOpen ?? false,
	);

	useEffect(() => {
		if (props?.open !== undefined) setIsOpen(props.open);
	}, [props?.open]);

	const handleOpenChange = useCallback(
		(open: boolean) => {
			setIsOpen(open);
			props.onOpenChange?.(open);
		},
		// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
		[props],
	);

	return (
		<DialogContext.Provider value={{ isOpen }}>
			<DialogPrimitive.Root
				data-slot="dialog"
				{...props}
				onOpenChange={handleOpenChange}
			>
				{children}
			</DialogPrimitive.Root>
		</DialogContext.Provider>
	);
}

function DialogTrigger({
	...props
}: React.ComponentProps<typeof DialogPrimitive.Trigger>) {
	return <DialogPrimitive.Trigger data-slot="dialog-trigger" {...props} />;
}

function DialogPortal({
	...props
}: React.ComponentProps<typeof DialogPrimitive.Portal>) {
	return <DialogPrimitive.Portal data-slot="dialog-portal" {...props} />;
}

function DialogClose({
	...props
}: React.ComponentProps<typeof DialogPrimitive.Close>) {
	return <DialogPrimitive.Close data-slot="dialog-close" {...props} />;
}

function DialogOverlay({
	className,
	...props
}: React.ComponentProps<typeof DialogPrimitive.Overlay>) {
	return (
		<DialogPrimitive.Overlay
			data-slot="dialog-overlay"
			className={cn(
				'data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-100 backdrop-blur-xl bg-linear-to-r from-primary/80 via-secondary/80 to-tertiary/80',
				className,
			)}
			{...props}
		/>
	);
}

type FlipDirection = 'top' | 'bottom' | 'left' | 'right';

type DialogContentProps = React.ComponentProps<typeof DialogPrimitive.Content> &
	HTMLMotionProps<'div'> & {
		from?: FlipDirection;
		transition?: Transition;
    onClose: () => void
	};

function DialogContent({
	className,
	children,
	from = 'top',
	transition = { type: 'spring', stiffness: 150, damping: 25 },
  onClose,
	...props
}: DialogContentProps) {
	const { isOpen } = useDialog();

	const initialRotation =
		from === 'top' || from === 'left' ? '20deg' : '-20deg';
	const isVertical = from === 'top' || from === 'bottom';
	const rotateAxis = isVertical ? 'rotateX' : 'rotateY';

	return (
		<AnimatePresence onExitComplete={onClose}>
			{isOpen && (
				<DialogPortal data-slot="dialog-portal">
					<DialogOverlay asChild>
						<motion.div
							key="dialog-overlay"
							initial={{ opacity: 0, filter: 'blur(4px)' }}
							animate={{ opacity: 1, filter: 'blur(0px)' }}
							exit={{ opacity: 0, filter: 'blur(4px)' }}
							transition={{ duration: 0.2, ease: 'easeInOut' }}
						/>
					</DialogOverlay>
					<DialogPrimitive.Content asChild forceMount {...props}>
						<motion.div
							key="dialog-content"
							data-slot="dialog-content"
							initial={{
								opacity: 0,
								filter: 'blur(4px)',
								transform: `perspective(500px) ${rotateAxis}(${initialRotation}) scale(0.8)`,
							}}
							animate={{
								opacity: 1,
								filter: 'blur(0px)',
								transform: `perspective(500px) ${rotateAxis}(0deg) scale(1)`,
							}}
							exit={{
								opacity: 0,
								filter: 'blur(4px)',
								transform: `perspective(500px) ${rotateAxis}(${initialRotation}) scale(0.8)`,
							}}
							transition={transition}
							className={cn(
								'bg-background data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 fixed top-[50%] left-[50%] z-100 grid w-full max-w-4xl translate-x-[-50%] translate-y-[-50%] gap-4 border-4 border-secondary p-6 shadow-lg duration-200 sm:max-w-lg rounded-3xl',
								className,
							)}
							{...props}
						>
							{children}
							<DialogTrigger asChild>
								<DialogPrimitive.Close className="cursor-pointer ring-offset-background focus:ring-ring data-[state=open]:bg-accent data-[state=open]:text-muted-foreground absolute top-4 right-4 rounded-xs opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4">
									<XIcon className="size-8" />
									<span className="sr-only">Close</span>
								</DialogPrimitive.Close>
							</DialogTrigger>
						</motion.div>
					</DialogPrimitive.Content>
				</DialogPortal>
			)}
		</AnimatePresence>
	);
}

function DialogHeader({ className, ...props }: React.ComponentProps<'div'>) {
	return (
		<div
			data-slot="dialog-header"
			className={cn(
				'flex flex-col gap-2 text-center sm:text-left py-4 md:py-5 border-b rounded-t border-background/30 ',
				className,
			)}
			{...props}
		/>
	);
}

function DialogFooter({ className, ...props }: React.ComponentProps<'div'>) {
	return (
		<div
			data-slot="dialog-footer"
			className={cn(
				'flex gap-2 sm:flex-row sm:justify-end py-6',
				className,
			)}
			{...props}
		/>
	);
}

function DialogTitle({
	className,
	...props
}: React.ComponentProps<typeof DialogPrimitive.Title>) {
	return (
		<DialogPrimitive.Title
			data-slot="dialog-title"
			className={cn(
				'text-2xl text-primary leading-none font-semibold',
				className,
			)}
			{...props}
		/>
	);
}

function DialogDescription({
	className,
	...props
}: React.ComponentProps<typeof DialogPrimitive.Description>) {
	return (
		<DialogPrimitive.Description
			data-slot="dialog-description"
			className={cn('text-muted-foreground text-sm', className)}
			{...props}
		/>
	);
}

export {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogOverlay,
	DialogPortal,
	DialogTitle,
	DialogTrigger,
};
