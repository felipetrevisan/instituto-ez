import { ScrollToHash } from '@/components/scroll-to-hash';
import { getPageBySlug } from '@/server/get-page';
import { Bar, Progress, Spinner, SpinnerIcon } from '@bprogress/next';
import { Suspense } from 'react';
import { Content } from './_content';
import Loading from './_loading';

export default async function Page({
	params,
}: { params: Promise<{ slug: string }> }) {
	const { slug } = await params;

	const data = await getPageBySlug(slug[0]);

	return (
		<div className="w-full flex items-center flex-col justify-center space-y-14">
			<div className="relative flex flex-col gap-20 w-screen items-center justify-center">
				<ScrollToHash />
				<Suspense fallback={<Loading />}>
					<Content data={data} slug={slug[0]} />
				</Suspense>
			</div>
		</div>
	);
}
