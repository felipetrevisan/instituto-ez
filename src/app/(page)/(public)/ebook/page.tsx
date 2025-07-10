'use client';

import { useEbook } from '@/hooks/use-ebook';
import { Bar, Progress, Spinner, SpinnerIcon } from '@bprogress/next';
import { use } from 'react';
import { Content } from './_content';

export default function Page() {
	return (
		<div className="w-full flex items-center flex-col justify-center space-y-14">
			<div className="relative flex flex-col gap-20 w-screen items-center justify-center">
				<Content />
			</div>
		</div>
	);
}

