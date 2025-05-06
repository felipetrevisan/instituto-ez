import { Fragment } from "react";
import * as App from "@/components/app";

import "../../globals.scss";

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
