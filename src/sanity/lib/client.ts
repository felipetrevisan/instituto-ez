import { createClient } from "next-sanity";

import { apiVersion, dataset, projectId, studioUrl } from "../env";

export const client = createClient({
	apiVersion,
	dataset,
	projectId,
	useCdn: true,
	perspective: "published",
	stega: {
		studioUrl,
		logger: console,
		filter: (props) => {
			if (props.sourcePath.at(-1) === "title") {
				return true;
			}

			return props.filterDefault(props);
		},
	},
});
