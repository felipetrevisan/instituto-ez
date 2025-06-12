import { getSiteConfig } from '@/server/get-site-config';
import { SpeedInsights } from '@vercel/speed-insights/next';
import type { Metadata } from 'next';
import { Inter, Oswald, Questrial } from 'next/font/google';
import Providers from './providers';

import '../globals.css';

const inter = Inter({
	subsets: ['latin'],
	weight: ['200', '300', '400', '500', '600', '700'],
	variable: '--font-inter',
});

const oswald = Oswald({
	subsets: ['latin'],
	weight: ['200', '300', '400', '500', '600', '700'],
	variable: '--font-oswald',
});

const questrial = Questrial({
	subsets: ['latin'],
	weight: ['400'],
	variable: '--font-questrial',
});

export async function generateMetadata(): Promise<Metadata> {
	const settings = await getSiteConfig();
	const title = settings?.title || 'Instituto Enzo';
	const description = settings?.description || '';
	const keywords = settings?.keywords || '';

	return {
		title: {
			template: `%s | ${title}`,
			default: title,
		},
		description,
		keywords
	};
}

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html
			lang="en"
			className={`${inter.variable} ${oswald.variable} ${questrial.variable}`}
			suppressHydrationWarning
		>
			<body className="antialiased overflow-x-hidden flex flex-col h-full">
				<Providers>{children}</Providers>
				<SpeedInsights />
			</body>
		</html>
	);
}
