'use client';

import { Button } from '@/components/ui/button';
import { Dialog } from '@/components/ui/dialog';
import * as Navbar from '@/components/ui/navbar';
import { menuListVariants, sidebarVariants } from '@/config/animation';
import { useApp } from '@/hooks/use-app';
import { useDimensions } from '@/hooks/use-dimension';
import { useSite } from '@/hooks/use-site';
import { cn } from '@/lib/utils';
import { urlForImage } from '@/sanity/lib/utils';
import { Slot } from '@radix-ui/react-slot';
import { type VariantProps, cva } from 'class-variance-authority';
import {
	motion,
	useAnimation,
	useMotionValueEvent,
	useScroll,
	useTransform,
} from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Fragment, useRef, useState } from 'react';
import { MdOutlineEmail } from 'react-icons/md';
import { ContactFormDialog } from './contact-form-dialog';
import { DesktopNavigation } from './desktop-navigation';
import { Logo } from './logo';
import { MobileNavigation } from './mobile-navigation';

const MotionMobileNavigation = motion(MobileNavigation);

function Header({ className }: React.ComponentProps<'div'>) {
	const { data } = useSite();
	const [currentScrollY, setCurrentScrollY] = useState(0);
	const containerRef = useRef<HTMLDivElement | null>(null);
	const { height } = useDimensions(containerRef);
	const { isMenuOpen, toggleMenu } = useApp();
	const { scrollY } = useScroll();

	const scrollYRange = [0, 100, 100];

	const logoSizeHeight = useTransform(scrollY, scrollYRange, [
		'60px',
		'56px',
		'56px',
	]);
	const logoSizeWidth = useTransform(scrollY, scrollYRange, [
		'220px',
		'174px',
		'174px',
	]);
	const paddingHeaderY = useTransform(scrollY, scrollYRange, [
		'1.2rem',
		'1rem',
		'1rem',
	]);

	const controls = useAnimation();
	const delta = useRef(0);
	const lastScrollY = useRef(0);

	useMotionValueEvent(scrollY, 'change', (val) => {
		const diff = Math.abs(val - lastScrollY.current);

		if (val >= lastScrollY.current) {
			delta.current = delta.current >= 10 ? 10 : delta.current + diff;
		} else {
			delta.current = delta.current <= -10 ? -10 : delta.current - diff;
		}

		if (delta.current >= 10 && val > 200) {
			controls.start('hidden');
		} else if (delta.current <= -10 || val < 200) {
			controls.start('visible');
		}

		lastScrollY.current = val;
		setCurrentScrollY(val);
	});

	return (
		<motion.header
			className={cn(
				'lg:fixed lg:z-90 lg:top-0 w-full backdrop-blur-md transition-colors duration-500 bg-transparent h-20',
				{
					'bg-white/90 backdrop-blur-3xl shadow-2xl': currentScrollY > 80,
					'backdrop-blur-none': currentScrollY < 80,
				},
				className,
			)}
			{...(isMenuOpen && { 'data-menu-open': true })}
		>
			<Navbar.Root
				sticky
				style={{
					paddingTop: paddingHeaderY,
					paddingBottom: paddingHeaderY,
				}}
			>
				<Fragment>
					<Navbar.Brand>
						<Logo
							height={logoSizeHeight}
							width={logoSizeWidth}
							src={data?.logo && urlForImage(data.logo?.asset).url()}
						/>
					</Navbar.Brand>
					<motion.div
						animate={isMenuOpen ? 'open' : 'closed'}
						custom={height}
						ref={containerRef}
					>
						<Navbar.Toggle />
						<DesktopNavigation navigation={data?.primaryNavigation} />
						<motion.div
							className="absolute z-90 top-0 right-0 w-[300px] h-screen bg-slate-200/80 backdrop-blur-2xl lg:hidden"
							variants={sidebarVariants}
						>
							<MotionMobileNavigation
								navigation={data?.primaryNavigation}
								variants={menuListVariants}
							/>
						</motion.div>
					</motion.div>
				</Fragment>
			</Navbar.Root>
		</motion.header>
	);
}

function Content({ className, children }: React.ComponentProps<'div'>) {
	const { isContactDialogOpen } = useApp();

	return (
		<motion.main
			className={cn(
				'mt-4 lg:mt-36 container relative h-full flex items-center flex-col justify-center space-x-2',
				className,
			)}
		>
			{children}
			<Dialog open={isContactDialogOpen}>
				{isContactDialogOpen && <ContactFormDialog />}
			</Dialog>
		</motion.main>
	);
}

function Footer({ className }: React.ComponentProps<'div'>) {
	const { setIsContactDialogOpen } = useApp();
	const MotionButton = motion(Button);

	return (
		<footer
			className={cn(
				'flex flex-col w-full select-none items-center p-5 relative mt-24',
				className,
			)}
		>
			<div className="fixed bottom-4 right-10 z-50 flex flex-row items-center gap-4">
				<MotionButton
					aria-label="Entre em contato"
					whileHover={{ scale: 1.4 }}
					whileTap={{ scale: 1.4 }}
					variant="icon"
					size="2xl"
					rounded="full"
					className="flex items-center justify-center gap-2 shadow"
					onClick={() => setIsContactDialogOpen(true)}
				>
					<MdOutlineEmail size={32} />
					<span className="sr-only">Entre em contato</span>
				</MotionButton>
			</div>
			<div className="container flex flex-row gap-4 items-center justify-center w-full">
				<div className="flex flex-row justify-center items-center gap-4">
					<Image
						src="/assets/logo.png"
						alt="Logo"
						width="60"
						height="60"
						sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
						priority
					/>
					<p className="text-center text-primary text-opacity-75">
						© {new Date().getFullYear()} - Todos os direitos reservados
					</p>
				</div>
			</div>
		</footer>
	);
}

export const titleVariants = cva('font-oswald font-bold', {
	variants: {
		variant: {
			default: 'text-primary',
			secondary: 'text-secondary',
			tertiary: 'text-tertiary',
			white: 'text-white',
		},
		size: {
			default: 'clamp-[text,2xl,6xl]',
			sm: 'clamp-[text,sm,lg]',
			lg: 'clamp-[text,lg,2xl]',
			xl: 'clamp-[text,xl,6xl]',
			'2xl': 'clamp-[text,2xl,8xl]',
		},
	},
	defaultVariants: {
		variant: 'secondary',
		size: 'default',
	},
});

function Title({
	className,
	variant,
	size,
	asChild = false,
	children,
	...props
}: React.ComponentProps<'h1'> &
	VariantProps<typeof titleVariants> & {
		asChild?: boolean;
	}) {
	const Comp = asChild ? Slot : 'h1';

	return (
		<Comp
			className={cn(titleVariants({ variant, size }), className)}
			{...props}
		>
			{children}
		</Comp>
	);
}

function Subtitle({
	className,
	variant,
	size,
	asChild = false,
	children,
	...props
}: React.ComponentProps<'h3'> &
	VariantProps<typeof titleVariants> & {
		asChild?: boolean;
	}) {
	const Comp = asChild ? Slot : 'h3';

	return (
		<Comp
			className={cn(
				titleVariants({ variant, size }),
				'font-light mt-5',
				className,
			)}
			{...props}
		>
			{children}
		</Comp>
	);
}

function PageHeader({
	className,
	children,
	...props
}: React.ComponentProps<'div'> & {
	background?: string;
}) {
	return (
		<div
			className={cn(
				'w-full flex flex-col justify-center items-center font-oswald',
				className,
			)}
			{...props}
		>
			{children}
		</div>
	);
}

function ButtonLink({
	className,
	children,
	href,
	disabled,
	...props
}: React.ComponentProps<typeof Link> & {
	disabled?: boolean;
}) {
	return (
		<>
			{href && (
				<Link
					href={href}
					passHref
					aria-disabled={disabled}
					className={className}
					{...props}
				>
					{children}
				</Link>
			)}
			{!href && <div className={className}>{children}</div>}
		</>
	);
}

export { Header, Content, Footer, Title, Subtitle, PageHeader, ButtonLink };
