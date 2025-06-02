'use client';

import { cn } from '@/lib/utils';
import * as AccordionPrimitive from '@radix-ui/react-accordion';
import {
	AnimatePresence,
	type HTMLMotionProps,
	type Transition,
	motion,
} from 'framer-motion';
import { ChevronDownIcon } from 'lucide-react';
import * as React from 'react';

type AccordionItemContextType = {
	isOpen: boolean;
	setIsOpen: (open: boolean) => void;
};
const AccordionItemContext = React.createContext<
	AccordionItemContextType | undefined
>(undefined);

const useAccordionItem = (): AccordionItemContextType => {
	const context = React.useContext(AccordionItemContext);
	if (!context) {
		throw new Error('useAccordionItem must be used within an AccordionItem');
	}
	return context;
};

type AccordionProps = React.ComponentProps<typeof AccordionPrimitive.Root>;

function Accordion({ ...props }: AccordionProps) {
	return <AccordionPrimitive.Root data-slot="accordion" {...props} />;
}

type AccordionItemProps = React.ComponentProps<
	typeof AccordionPrimitive.Item
> & {
	children: React.ReactNode;
};

function AccordionItem({ children, className, ...props }: AccordionItemProps) {
	const [isOpen, setIsOpen] = React.useState(false);

	return (
		<AccordionItemContext.Provider value={{ isOpen, setIsOpen }}>
			<AccordionPrimitive.Item
				data-slot="accordion-item"
				className={cn(
					'border border-secondary relative backdrop-blur-md bg-transparent/60 mb-3 shadow-xl rounded-3xl',
					className,
				)}
				{...props}
			>
				{children}
			</AccordionPrimitive.Item>
		</AccordionItemContext.Provider>
	);
}

type AccordionTriggerProps = React.ComponentProps<
	typeof AccordionPrimitive.Trigger
> & {
	transition?: Transition;
	chevron?: boolean;
};

const AccordionTrigger = React.forwardRef<
	HTMLButtonElement,
	AccordionTriggerProps
>(
	(
		{
			className,
			children,
			transition = { type: 'spring', stiffness: 150, damping: 22 },
			chevron = true,
			...props
		},
		ref,
	) => {
		const triggerRef = React.useRef<HTMLButtonElement | null>(null);
		React.useImperativeHandle(
			ref,
			() => triggerRef.current as HTMLButtonElement,
		);
		const { isOpen, setIsOpen } = useAccordionItem();

		React.useEffect(() => {
			const node = triggerRef.current;
			if (!node) return;

			const observer = new MutationObserver((mutationsList) => {
				// biome-ignore lint/complexity/noForEach: <explanation>
				mutationsList.forEach((mutation) => {
					if (mutation.attributeName === 'data-state') {
						const currentState = node.getAttribute('data-state');
						setIsOpen(currentState === 'open');
					}
				});
			});
			observer.observe(node, {
				attributes: true,
				attributeFilter: ['data-state'],
			});
			const initialState = node.getAttribute('data-state');
			setIsOpen(initialState === 'open');
			return () => {
				observer.disconnect();
			};
		}, [setIsOpen]);

		return (
			<AccordionPrimitive.Header data-slot="accordion-header" className="flex">
				<AccordionPrimitive.Trigger
					ref={triggerRef}
					data-slot="accordion-trigger"
					className={cn(
						'focus-visible:border-ring focus-visible:ring-ring/50 flex flex-1 items-start justify-between gap-4 hover:bg-secondary/10 rounded-3xl px-4 py-5 text-left text-md font-semibold transition-all outline-none focus-visible:ring-[3px] disabled:pointer-events-none disabled:opacity-50 [&[data-state=open]>svg]:rotate-180',
						className,
					)}
					{...props}
				>
					{children}

					{chevron && (
						<motion.div
							data-slot="accordion-trigger-chevron"
							animate={{ rotate: isOpen ? 180 : 0 }}
							transition={transition}
						>
							<ChevronDownIcon className="size-5 shrink-0" />
						</motion.div>
					)}
				</AccordionPrimitive.Trigger>
			</AccordionPrimitive.Header>
		);
	},
);

// function AccordionContent({
// 	className,
// 	children,
// 	...props
// }: React.ComponentProps<typeof AccordionPrimitive.Content>) {
// 	return (
// 		<AccordionPrimitive.Content
// 			data-slot="accordion-content"
// 			className="data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down overflow-hidden text-sm"
// 			{...props}
// 		>
// 			<div className={cn('pt-0 pb-4', className)}>{children}</div>
// 		</AccordionPrimitive.Content>
// 	);
// }

type AccordionContentProps = React.ComponentProps<
	typeof AccordionPrimitive.Content
> &
	HTMLMotionProps<'div'> & {
		transition?: Transition;
	};

function AccordionContent({
	className,
	children,
	transition = { type: 'spring', stiffness: 150, damping: 22 },
	...props
}: AccordionContentProps) {
	const { isOpen } = useAccordionItem();

	return (
		<AnimatePresence>
			{isOpen && (
				<AccordionPrimitive.Content forceMount {...props}>
					<motion.div
						key="accordion-content"
						data-slot="accordion-content"
						initial={{ height: 0, opacity: 0, '--mask-stop': '0%' }}
						animate={{ height: 'auto', opacity: 1, '--mask-stop': '100%' }}
						exit={{ height: 0, opacity: 0, '--mask-stop': '0%' }}
						transition={transition}
						style={{
							maskImage:
								'linear-gradient(black var(--mask-stop), transparent var(--mask-stop))',
							WebkitMaskImage:
								'linear-gradient(black var(--mask-stop), transparent var(--mask-stop))',
						}}
						className="overflow-hidden"
						{...props}
					>
						<div className={cn('pb-4 pt-0 text-sm', className)}>{children}</div>
					</motion.div>
				</AccordionPrimitive.Content>
			)}
		</AnimatePresence>
	);
}

export {
	Accordion,
	AccordionItem,
	AccordionTrigger,
	AccordionContent,
	useAccordionItem,
	type AccordionItemContextType,
	type AccordionProps,
	type AccordionItemProps,
	type AccordionTriggerProps,
	type AccordionContentProps,
};
