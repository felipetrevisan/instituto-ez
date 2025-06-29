import * as App from '@/components/app';
import { getSiteConfig } from '@/server/get-site-config';
import { Fragment } from 'react';

import '../../globals.css';

export default async function RootLayout({
	children,
}: { children: React.ReactNode }) {
	const data = await getSiteConfig();

	return (
		<Fragment>
			<App.Header data={data} />
			<App.Content>{children}</App.Content>
			<App.Footer />
		</Fragment>
	);
}
