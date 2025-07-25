'use client';

import { Toaster } from '@/components/ui/sonner';
import { AppProvider } from '@/hooks/use-app';
import { Bar } from '@bprogress/next';
import { ProgressProvider } from '@bprogress/next/app';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ThemeProvider } from 'next-themes';
import { type ReactNode, useState } from 'react';

const oneDay = 1000 * 60 * 60 * 24;

export default function Providers({ children }: { children: ReactNode }) {
	const [queryClient] = useState(
		() =>
			new QueryClient({
				defaultOptions: {
					queries: {
						staleTime: oneDay,
						refetchOnWindowFocus: false, // opcional: evita refetch ao voltar pro tab
					},
				},
			}),
	);

	return (
		<ThemeProvider
			attribute="class"
			defaultTheme="system"
			enableSystem
			disableTransitionOnChange
		>
			<ProgressProvider
				height="6px"
				color="#430a88"
				options={{ showSpinner: true }}
				shallowRouting
			>
				<QueryClientProvider client={queryClient}>
					<AppProvider>
						<Bar />
						{children}
					</AppProvider>
					<ReactQueryDevtools initialIsOpen={false} />
					<Toaster />
				</QueryClientProvider>
			</ProgressProvider>
		</ThemeProvider>
	);
}
