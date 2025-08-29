'use client'

import { DownloadIcon } from '@ez/shared/icons'
import BlobButton from '@ez/shared/ui/animated/button/blob-button'
import { Title } from '@ez/shared/ui/title'
import type { Ebook } from '@ez/web/types/ebook'
import { motion } from 'motion/react'
import Image from 'next/image'

const seals = [
  {
    image: 'seals/guarantee.png',
    title: 'Garantia de 7 dias',
    description: 'Se não gostar do conteúdo, devolvemos seu dinheiro.',
  },
  {
    image: 'seals/safe-buy.png',
    title: 'Compra 100% Segura',
    description: 'Seus dados estão protegidos com criptografia avançada.',
  },
  {
    image: 'seals/quality.png',
    title: 'Qualidade Comprovada',
    description: 'Conteúdo criado por especialistas com resultados reais.',
  },
  {
    image: 'seals/refund.png',
    title: 'Reembolso Garantido',
    description: 'Você pode solicitar o reembolso sem burocracia.',
  },
]

const MotionTitle = motion(Title)
const DownloadIconMotion = motion(DownloadIcon)

export default function GuaranteeSection({ data }: { data: Ebook }) {
  const { download } = data

  return (
    <section className="relative mt-30 w-full bg-gradient-to-b from-white via-zinc-200 to-white py-20">
      <div className="absolute top-0 left-0 hidden w-full md:block">
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
      <div className="flex h-180 flex-col items-center justify-center gap-2">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12 font-bold text-3xl text-gray-900 tracking-tight md:text-4xl"
        >
          <MotionTitle
            size="2xl"
            className="after:-bottom-1 after:-translate-x-1/2 relative text-center font-questrial font-semibold text-[var(--primary-c)] after:absolute after:left-1/2 after:h-[2px] after:w-[40%] after:rounded-xl after:bg-[var(--primary-c)]/60 after:transition-all"
          >
            Selos de Garantia
          </MotionTitle>
        </motion.h2>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          {seals.map((seal, i) => (
            <motion.div
              key={seal.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.2, type: 'spring', stiffness: 400, damping: 10 }}
              whileHover={{ scale: 1.1 }}
              className="relative flex size-64 flex-col items-center p-8"
            >
              <Image src={`/assets/images/${seal.image}`} alt={seal.title} fill />
            </motion.div>
          ))}
        </div>
        {!download.disabled && (
          <BlobButton
            numOfBlobs={8}
            size="3xl"
            variant="default"
            theme="custom"
            rounded="full"
            className="w-[800px]"
            sticky
          >
            <DownloadIconMotion /> {download.label || 'Baixe Agora'}
          </BlobButton>
        )}
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
