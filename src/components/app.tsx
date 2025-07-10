'use client';

import { Dialog } from '@/components/ui/dialog';
import * as Navbar from '@/components/ui/navbar';
import { menuListVariants, sidebarVariants } from '@/config/animation';
import { useApp } from '@/hooks/use-app';
import { useDimensions } from '@/hooks/use-dimension';
import { useSite } from '@/hooks/use-site';
import { cn } from '@/lib/utils';
import { urlForImage } from '@/sanity/lib/utils';
import type { Site } from '@/types/site';
import { Slot } from '@radix-ui/react-slot';
import { type VariantProps, cva } from 'class-variance-authority';
import {
	motion,
	useAnimation,
	useMotionValueEvent,
	useScroll,
	useTransform,
} from 'framer-motion';
import Link from 'next/link';
import { Fragment, useEffect, useRef, useState } from 'react';
import { MdOutlineEmail } from 'react-icons/md';
import { IconButton } from './animate-ui/buttons/icon';
import { ContactFormDialog } from './contact-form-dialog';
import { Logo } from './logo';
import { DesktopNavigation, DesktopNavigationSkeleton } from './navigation/desktop-navigation';
import { MobileNavigation } from './navigation/mobile-navigation';

const MotionMobileNavigation = motion(MobileNavigation);

type HeaderProps = {
	data: Site
} & React.ComponentProps<'div'>;

function Header({ className, data }: HeaderProps) {
	const [currentScrollY, setCurrentScrollY] = useState(0);
	const containerRef = useRef<HTMLDivElement | null>(null);
	const { height } = useDimensions(containerRef);
	const { isMenuOpen } = useApp();
	const { scrollY } = useScroll();

	const scrollYRange = [0, 100, 100];

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

	useEffect(() => {
		if (isMenuOpen) {
			document.body.style.overflow = 'hidden';
		} else {
			document.body.style.overflow = '';
		}
		return () => {
			document.body.style.overflow = '';
		};
	}, [isMenuOpen]);

	return (
		<motion.header
			className={cn(
				'fixed z-90 top-0 w-full backdrop-blur-md transition-colors duration-500 bg-transparent h-20',
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
						<Logo src={data?.logo && urlForImage(data.logo?.asset).url()} />
					</Navbar.Brand>
					<motion.div
						animate={isMenuOpen ? 'open' : 'closed'}
						custom={height}
						ref={containerRef}
					>
						<Navbar.Toggle />
						{!data ? <DesktopNavigationSkeleton /> : <DesktopNavigation navigation={data?.primaryNavigation} />}
						<motion.div
							className="fixed z-90 top-0 right-0 w-[300px] h-screen bg-slate-200/90 backdrop-blur-3xl lg:hidden"
							variants={sidebarVariants}
							initial="closed"
							animate={isMenuOpen ? 'open' : 'closed'}
						>
							<MotionMobileNavigation
								navigation={data?.primaryNavigation}
								variants={menuListVariants}
								animate={isMenuOpen ? 'open' : 'closed'}
							/>
						</motion.div>
					</motion.div>
				</Fragment>
			</Navbar.Root>
		</motion.header>
	);
}

function Content({ className, children }: React.ComponentProps<'div'>) {
	const { isContactDialogOpen, isMenuOpen } = useApp();

	return (
		<motion.main
			className={cn(
				'mt-24 lg:mt-36 container relative h-full flex items-center flex-col justify-center',
				{
					'before:backdrop-blur-xl before:absolute before:w-full before:h-full before:bg-white/50 before:z-50':
						isMenuOpen,
				},
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
	const { data } = useSite();

	return (
		<footer
			className={cn(
				'flex flex-col w-full select-none items-center p-5 relative mt-24',
				className,
			)}
		>
			<div className="fixed bottom-4 right-10 z-50 flex flex-row items-center gap-4">
				<IconButton
					icon={MdOutlineEmail}
					onClick={() => setIsContactDialogOpen(true)}
					size="lg"
					whileHover={{ scale: 1.4 }}
					whileTap={{ scale: 1.4 }}
					transition={{ type: 'spring', stiffness: 400, damping: 10 }}
				/>
			</div>
			<div className="container flex flex-row gap-4 items-center justify-center w-full">
				<div className="flex flex-col justify-center items-center gap-4">
					<Logo
						src={data?.logo && urlForImage(data.logo?.asset).url()}
						showSlogan={false}
						linkable={false}
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
			xl: 'clamp-[text,xl,2xl]',
			'2xl': 'clamp-[text,2xl,4xl]',
			'3xl': 'clamp-[text,4xl,8xl]',
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
	separator = false,
	children,
	...props
}: React.ComponentProps<'h1'> &
	VariantProps<typeof titleVariants> & {
		asChild?: boolean;
		separator?: boolean;
	}) {
	const Comp = asChild ? Slot : 'h1';

	return (
		<div className="flex flex-row gap-2 items-center justify-center md:justify-start">
			{separator && (
				// biome-ignore lint/a11y/noSvgWithoutTitle: <explanation>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="26"
					height="7"
					viewBox="0 0 26 7"
					fill="none"
				>
					<path
						d="M26 0.999776C26 1.55218 25.2166 2 24.2493 2H7.74961C7.26654 2 6.82911 1.88808 6.51229 1.70704C6.19573 1.52628 6 1.27626 6 1.00007C5.99974 0.447599 6.78343 -0.000149254 7.75053 3.73222e-08H24.2506C25.2171 0.000124446 25.9998 0.447599 26 0.999776Z"
						className={cn({
							'fill-primary': variant === 'default',
							'fill-secondary': variant === 'secondary',
							'fill-tertiary': variant === 'tertiary',
						})}
					/>
					<path
						d="M20 5.99978C20 6.55218 19.2166 7 18.2493 7H1.74961C1.26654 7 0.829108 6.88808 0.512287 6.70704C0.195727 6.52628 6.53032e-08 6.27626 6.53032e-08 6.00007C-0.000261194 5.4476 0.783431 4.99985 1.75053 5H18.2506C19.2171 5.00012 19.9998 5.4476 20 5.99978Z"
						className={cn({
							'fill-primary': variant === 'default',
							'fill-secondary': variant === 'secondary',
							'fill-tertiary': variant === 'tertiary',
						})}
					/>
				</svg>
			)}
			<Comp
				className={cn(titleVariants({ variant, size }), className)}
				{...props}
			>
				{children}
			</Comp>
		</div>
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
				'font-light mt-5 text-center',
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
