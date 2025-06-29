'use client';

import { Bar, Progress, Spinner, SpinnerIcon } from '@bprogress/next';

function Loading() {
	return (
		<>
			Loading...
			<Progress>
				<Bar />
				<Spinner className="mt-12">
					<SpinnerIcon />
				</Spinner>
			</Progress>
		</>
	);
}

export default Loading;
