'use client'

import { Title } from '@ez/shared/ui/title'
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

export default function GuaranteeSection() {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-2 lg:container">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="font-bold text-3xl text-gray-900 tracking-tight md:text-4xl"
      >
        <MotionTitle
          size="2xl"
          className="after:-bottom-1 after:-translate-x-1/2 relative text-center font-questrial font-semibold text-[var(--primary-c)] after:absolute after:left-1/2 after:h-[2px] after:w-[40%] after:rounded-xl after:bg-[var(--primary-c)]/60 after:transition-all"
        >
          Selos de Garantia
        </MotionTitle>
      </motion.h2>

      <div className='grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 lg:gap-8'>
        {seals.map((seal, i) => (
          <motion.div
            key={seal.title}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.2, type: 'spring', stiffness: 400, damping: 10 }}
            whileHover={{ scale: 1.1 }}
            className="relative flex size-40 flex-col items-center lg:size-64 lg:p-8"
          >
            <Image src={`/assets/images/${seal.image}`} alt={seal.title} fill />
          </motion.div>
        ))}
      </div>
    </div>
  )
}
