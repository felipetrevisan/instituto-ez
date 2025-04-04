import { Metadata } from "next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import Providers from "./providers";
import { getSiteConfig } from "@/server/get-site-config";

import { Inter, Oswald, Questrial } from "next/font/google";

import "../globals.scss";

const inter = Inter({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700"],
  variable: "--font-inter",
});

const oswald = Oswald({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700"],
  variable: "--font-oswald",
});

const questrial = Questrial({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-questrial",
});

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteConfig();
  const title = settings?.title || "Instituto Enzo";
  const description = settings?.description || "";

  return {
    title: {
      template: `%s | ${title}`,
      default: title,
    },
    description,
  };
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${oswald.variable} ${questrial.variable}`}
      suppressHydrationWarning
    >
      <body className="antialiased overflow-x-hidden">
        <Providers>{children}</Providers>
        <SpeedInsights />
      </body>
    </html>
  );
}
