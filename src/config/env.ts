import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

const nodeEnv = z.enum(['development', 'production', 'test']);

function requiredOnEnv(env: z.infer<typeof nodeEnv>) {
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	return (value: any): boolean => {
		if (env === process.env.NODE_ENV && !value) {
			return false;
		}

		return true;
	};
}

export const env = createEnv({
	server: {
		SANITY_API_READ_TOKEN: z.string().refine(requiredOnEnv('production')),
	},
	client: {
		NEXT_PUBLIC_VERCEL_URL: z.string().url().min(1),
		NEXT_PUBLIC_SANITY_PROJECT_ID: z.string().min(1),
		NEXT_PUBLIC_SANITY_DATASET: z
			.enum(['production', 'preview', 'development'])
			.default('production'),
	},
	shared: {
		NODE_ENV: nodeEnv,
		VERCEL_ENV: z
			.enum(['production', 'preview', 'development'])
			.default('development'),
	},
	experimental__runtimeEnv: {
		NEXT_PUBLIC_VERCEL_URL: process.env.NEXT_PUBLIC_VERCEL_URL,
		NEXT_PUBLIC_SANITY_PROJECT_ID: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
		NEXT_PUBLIC_SANITY_DATASET: process.env.NEXT_PUBLIC_SANITY_DATASET,
		NODE_ENV: process.env.NODE_ENV,
		VERCEL_ENV: process.env.VERCEL_ENV,
	},
});
