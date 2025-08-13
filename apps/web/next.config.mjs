import createNextIntlPlugin from 'next-intl/plugin'

export const runtime = 'edge'

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
}

const withNextIntl = createNextIntlPlugin({
  experimental: {
    createMessagesDeclaration: ['./messages/pt.json', './messages/en.json']
  }
});

export default withNextIntl(nextConfig)
