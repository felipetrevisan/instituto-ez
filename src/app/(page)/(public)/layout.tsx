import * as App from '@/components/app';
import { Fragment } from 'react';

import '../../globals.css';

export default function RootLayout({
	children,
}: { children: React.ReactNode }) {
	return (
		<Fragment>
			<App.Header />
			<App.Content>{children}</App.Content>
			<App.Footer />
		</Fragment>
	);
}
