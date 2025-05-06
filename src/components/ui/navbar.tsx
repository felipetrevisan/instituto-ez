import { ComponentProps, forwardRef, HTMLAttributes } from "react";
import { Slot } from "@radix-ui/react-slot";
import { VariantProps, cva } from "class-variance-authority";
import { HTMLMotionProps, motion, MotionValue } from "framer-motion";
import { cn } from "@/lib/utils";
import { useApp } from "@/hooks/use-app";

const navbarVariants = cva("w-full h-auto sm:px-4 lg:p-2", {
	variants: {
		sticky: {
			true: "lg:fixed lg:z-[90] lg:top-0 lg:start-0",
		},
		rounded: {
			none: "rounded-none",
			full: "rounded-full",
			lg: "rounded-lg",
		},
	},
	defaultVariants: {
		sticky: false,
		rounded: "none",
	},
});

export interface NavbarProps
	extends HTMLMotionProps<"div">,
		VariantProps<typeof navbarVariants> {
	children: JSX.Element;
}

const Root = forwardRef<HTMLDivElement, NavbarProps>(
	({ className, sticky, rounded, children, ...props }, ref) => {
		return (
			<motion.div
				ref={ref}
				className={cn(navbarVariants({ sticky, rounded, className }))}
				initial={false}
				// animate={isOpen ? "open" : "closed"}
				{...props}
			>
				<div className="container mx-auto flex flex-wrap items-center justify-between">
					{children}
				</div>
			</motion.div>
		);
	},
);
Root.displayName = "Navbar.Root";

export interface NavBrandProps extends HTMLAttributes<HTMLDivElement> {
	asChild?: boolean;
}

const Brand = forwardRef<HTMLDivElement, NavBrandProps>(
	({ className, asChild = false, ...props }, ref) => {
		const Comp = asChild ? Slot : "div";
		return (
			<Comp
				ref={ref}
				className={cn("flex items-center space-x-3", className)}
				{...props}
			/>
		);
	},
);
Brand.displayName = "Navbar.Brand";

const Path = (props: any) => (
	<motion.path
		strokeWidth="3"
		fill="currentColor"
		stroke="currentColor"
		strokeLinecap="round"
		{...props}
	/>
);

const Toggle = forwardRef<HTMLButtonElement, ComponentProps<"button">>(
	({ className, ...props }, ref) => {
		const { toggleMenu } = useApp();

		return (
			<button
				ref={ref}
				className={cn(
					"absolute top-6 right-5 z-[100] rounded-full cursor-pointer flex justify-center items-center size-12 text-sm lg:hidden",
					className,
				)}
				{...props}
				onClick={() => toggleMenu()}
			>
				<svg width="23" height="23" viewBox="0 0 23 23">
					<Path
						variants={{
							closed: { d: "M 2 2.5 L 20 2.5" },
							open: { d: "M 3 16.5 L 17 2.5" },
						}}
					/>
					<Path
						d="M 2 9.423 L 20 9.423"
						variants={{
							closed: { opacity: 1 },
							open: { opacity: 0 },
						}}
						transition={{ duration: 0.1 }}
					/>
					<Path
						variants={{
							closed: { d: "M 2 16.346 L 20 16.346" },
							open: { d: "M 3 2.5 L 17 16.346" },
						}}
					/>
				</svg>
			</button>
		);
	},
);
Toggle.displayName = "Navbar.Toggle";

export interface BackgroundProps extends HTMLMotionProps<"div"> {
	size: MotionValue<string>;
}

const Background = forwardRef<HTMLDivElement, BackgroundProps>(
	({ className, size, ...props }, ref) => {
		return (
			<motion.div
				ref={ref}
				className={cn(
					"absolute flex justify-center top-0 right-0 bottom-0 shadow-xl bg-accent backdrop-blur-xl md:hidden w-7/12 md:w-9/12 h-screen border-l-4 border-secondary",
					className,
				)}
				{...props}
			/>
		);
	},
);
Background.displayName = "Navbar.Background";

export { Root, Brand, Background, Toggle };
