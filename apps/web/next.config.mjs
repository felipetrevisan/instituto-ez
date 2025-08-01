import 'dotenv/config';

export const runtime = 'edge';

/** @type {import('next').NextConfig} */
const nextConfig = {
	transpilePackages: ['lucide-react', '@ez/shared'],
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'cdn.sanity.io',
			},
		],
	},
	//experimental: { urlImports: ['https://themer.sanity.build/'] },
};

export default nextConfig;
