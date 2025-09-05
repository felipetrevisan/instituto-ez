'use client'

import type { Ebook } from '@ez/web/types/ebook'
import BuySection from './_buy'
import GuaranteeSection from './_guarantee'

export default function Footer({ data }: { data: Ebook }) {
  return (
    <section className="relative w-full bg-gradient-to-b from-white via-zinc-200 to-white lg:pb-55">
      <div className="container flex h-full flex-col gap-20 lg:gap-40">
        <BuySection data={data} />
        <GuaranteeSection />
      </div>
      <div className="absolute bottom-0 left-0 hidden w-full rotate-180 md:block">
        {/* biome-ignore lint/a11y/noSvgWithoutTitle: <explanation> */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          className="relative block h-77 w-[calc(157%+1.3px)]"
        >
          <path
            d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
            className="fill-white"
          />
        </svg>
      </div>
    </section>
  )
}
