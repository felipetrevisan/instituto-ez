'use client'

import { ChevronLeftIcon, DownloadIcon } from '@ez/shared/icons'
import { FaIcons } from '@ez/shared/icons'
import { cn } from '@ez/shared/lib/utils'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@ez/shared/ui'
import { AnimatedCounter } from '@ez/shared/ui/animated/counter'
import { Card, CardContent } from '@ez/shared/ui/card'
import { Subtitle, Title } from '@ez/shared/ui/title'
import { urlForImage } from '@ez/web/config/image'
import type { Ebook, Media } from '@ez/web/types/ebook'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { AnimatedButton } from './_button'

type CSSVariables = {
  [key: `--${string}`]: string
}

export function Content({ data }: { data: Ebook }) {
  const { id, title, description, metadata, chapters, theme } = data

  const getIcon = (media: Media) => {
    const IconComponent =
      media.type === 'icon' && media.icon?.name
        ? FaIcons[media.icon.name as keyof typeof FaIcons]
        : null

    const ImageComponent =
      media.type === 'image' && media.image ? (
        <Image src={urlForImage(media.image.asset).url()} alt="" width={24} height={24} />
      ) : null

    return IconComponent ? <IconComponent /> : ImageComponent
  }

  const DownloadIconMotion = motion(DownloadIcon)
  const ChevronLeftIconMotion = motion(ChevronLeftIcon)

  const style: React.CSSProperties & CSSVariables = {
    '--primary-c': `${theme?.primary?.hex ?? 'var(--primary)'}`,
    '--secondary-c': `${theme?.secondary?.hex ?? 'var(--secondary)'}`,
  }

  return (
    <>
      <header
        className="relative h-[600px] w-screen text-white overflow-hidden py-12 px-6 bg-gradient-to-br from-[var(--primary-c)]/90 to-[var(--secondary-c)]/90 flex flex-col items-center justify-center bg-ebooks bg-[auto,cover]"
        style={style}
      >
        <Link href="/ebooks" className="w-full">
          <AnimatedButton
            label="Voltar para o Catálogo"
            icon={<ChevronLeftIconMotion />}
            animateMaps={{
              width: { initial: 48, hovered: 260 },
              paddingLeft: { initial: 20, hovered: 16 },
              scale: { initial: 1, hovered: 1.1 },
            }}
            className="absolute text-[var(--primary-c)] fill-[var(--primary-c)] after:absolute after:inset-0 after:rounded-xl after:bg-white/20 after:blur after:animate-pulse"
          />
        </Link>
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
          <motion.div
            className="max-w-xl relative z-10"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <motion.h1
              className="text-3xl md:text-4xl font-extrabold mb-6 leading-tight drop-shadow-md"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              {title}
            </motion.h1>
            <motion.p
              className="text-lg text-white/90 mb-8 text-justify leading-relaxed max-w-prose"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              {description}
            </motion.p>
            <AnimatedButton
              label="Baixe Agora"
              icon={<DownloadIconMotion />}
              animateMaps={{
                width: { initial: 48, hovered: 200 },
                paddingLeft: { initial: 20, hovered: 16 },
                scale: { initial: 1, hovered: 1.1 },
              }}
              className="text-[var(--primary-c)] fill-[var(--primary-c)]"
            />
          </motion.div>
          <motion.div
            className="relative z-10 size-[550px] mt-10 md:mt-0 rounded-xl overflow-hidden"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <Image
              src="/assets/images/ebook-placeholder.png"
              alt="Book Cover"
              fill
              className="object-cover"
              priority
            />
          </motion.div>
        </div>
        <div className="absolute left-0 bottom-0 w-full rotate-180">
          {/* biome-ignore lint/a11y/noSvgWithoutTitle: <explanation> */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
            className="relative block w-[calc(157%+1.3px)] h-77"
          >
            <path
              d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
              className="fill-white"
            />
          </svg>
        </div>
      </header>
      {metadata?.length > 0 && (
        <section className="container bg-white py-12 px-6 flex flex-wrap justify-center gap-10">
          {metadata?.map((meta, index) => (
            <Card
              key={`${id}_${
                // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
                index
              }`}
              variant="custom"
              theme="custom"
              className={cn(
                'h-[180px] w-[200px] transition-all duration-300 shadow-sm hover:shadow-xl hover:-translate-y-1 backdrop-blur-md outline-none shadow-[var(--primary-c)]/50 bg-gradient-to-br from-[var(--primary-c)]/90 to-[var(--secondary-c)]/90 p-0.5',
              )}
              rounded="2xl"
              style={style}
            >
              <CardContent className="bg-white flex justify-center items-center h-full relative rounded-3xl">
                <div className="flex flex-col items-center justify-center">
                  {meta.media.type !== 'none' && (
                    <div className="rounded-full size-14 [&_svg]:size-8 order-1 bg-white shadow-md absolute -top-7">
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 stroke-[1.5] text-[var(--primary-c)]">
                        {getIcon(meta.media)}
                      </div>
                    </div>
                  )}
                  <div className="flex flex-col">
                    <dt className="mb-2 flex flex-col justify-center items-center gap-2 min-h-[72px]">
                      {meta.prefix && (
                        <span className="text-sm font-medium opacity-70 text-[var(--primary-c)]">
                          {meta.prefix}
                        </span>
                      )}
                      {meta.type === 'string' && (
                        <span className="text-3xl font-bold text-[var(--primary-c)]">
                          {meta.value}
                        </span>
                      )}
                      {meta.type === 'number' && Number(meta.value) > 0 && (
                        <span className="text-3xl font-bold text-[var(--primary-c)]">
                          <AnimatedCounter from={0} to={Number(meta.value)} />
                        </span>
                      )}
                      {meta.suffix && (
                        <span className="text-sm font-medium opacity-70 text-[var(--primary-c)]">
                          {meta.suffix}
                        </span>
                      )}
                    </dt>
                    <dd className="text-gray-500">{meta.title}</dd>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </section>
      )}
      <section className="relative py-12 px-6 flex flex-row gap-4 w-screen" style={style}>
        <div className="container flex flex-col justify-center items-center gap-4">
          <Title
            size="2xl"
            className="text-[var(--primary-c)] font-questrial font-semibold text-center relative after:absolute after:w-[40%] after:bg-[var(--primary-c)]/60 after:left-1/2 after:-bottom-1 after:h-[2px] after:rounded-xl after:-translate-x-1/2 after:transition-all"
          >
            O que você vai encontrar nesse Ebook
          </Title>
          <Subtitle size="lg">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. In rem quae nobis atque
            eligendi voluptatem deleniti, enim sint impedit excepturi debitis quidem, dicta, ratione
            doloribus corporis vitae velit amet temporibus.
          </Subtitle>
        </div>
      </section>

      <section
        className="relative bg-gradient-to-b from-[var(--secondary-c)]/50 via-[var(--primary-c)]/20 to-white mt-10 py-52 px-6 flex flex-row gap-4 min-h-[500px] w-screen bg-ebooks-lines bg-[auto,contain]"
        style={style}
      >
        <div className="absolute left-0 top-0 w-full rotate-180 overflow-hidden">
          {/* biome-ignore lint/a11y/noSvgWithoutTitle: <explanation> */}
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path
              d="M602.45,3.86h0S572.9,116.24,281.94,120H923C632,116.24,602.45,3.86,602.45,3.86Z"
              className="fill-white"
            />
          </svg>
        </div>
        <div className="container flex flex-col justify-center items-center gap-4">
          <Title
            size="2xl"
            className="text-[var(--primary-c)] font-questrial font-semibold text-center relative after:absolute after:w-[40%] after:bg-[var(--primary-c)]/60 after:left-1/2 after:-bottom-1 after:h-[2px] after:rounded-xl after:-translate-x-1/2 after:transition-all"
          >
            Visão Geral
          </Title>
          <Subtitle size="lg">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. In rem quae nobis atque
            eligendi voluptatem deleniti, enim sint impedit excepturi debitis quidem, dicta, ratione
            doloribus corporis vitae velit amet temporibus.
          </Subtitle>
          <Title
            size="2xl"
            className="text-[var(--primary-c)] font-questrial font-semibold text-center relative after:absolute after:w-[40%] after:bg-[var(--primary-c)]/60 after:left-1/2 after:-bottom-1 after:h-[2px] after:rounded-xl after:-translate-x-1/2 after:transition-all"
          >
            Capítulos
          </Title>
          {chapters?.length > 0 && (
            <div className="container py-12 px-6 flex flex-wrap justify-center gap-10">
              {chapters?.map((chapter, index) => (
                <Card
                  key={`${id}_${
                    // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
                    index
                  }`}
                  variant="custom"
                  theme="custom"
                  className={cn(
                    'h-[320px] w-[320px] transition-all duration-300 shadow-sm hover:shadow-xl hover:-translate-y-1 backdrop-blur-md outline-none shadow-[var(--primary-c)]/50 bg-gradient-to-br from-[var(--primary-c)]/90 to-[var(--secondary-c)]/90 p-0.5',
                  )}
                  rounded="2xl"
                  style={style}
                >
                  <CardContent className="bg-white flex justify-center items-center h-full relative rounded-3xl">
                    <div className="flex flex-col items-center justify-center">
                      {chapter.media.type !== 'none' && (
                        <div className="rounded-full size-14 [&_svg]:size-8 order-1 bg-white shadow-md">
                          <div className="stroke-[1.5] text-[var(--primary-c)]">
                            {getIcon(chapter.media)}
                          </div>
                        </div>
                      )}
                      <div className="flex flex-col">
                        <h2 className="text-zinc-700 font-questrial font-extrabold text-2xl">
                          {chapter.title}
                        </h2>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      <section
        className="relative bg-gradient-to-b from-[var(--secondary-c)]/50 to-white mt-10 py-52 px-6 flex flex-row gap-4 min-h-[500px] w-screen"
        style={style}
      >
        <div className="absolute left-0 top-0 w-full overflow-hidden">
          {/* biome-ignore lint/a11y/noSvgWithoutTitle: <explanation> */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
            className="h-[83px] w-[calc(100%+1.3px)]"
          >
            <path
              d="M0,0V6c0,21.6,291,111.46,741,110.26,445.39,3.6,459-88.3,459-110.26V0Z"
              className="fill-white"
            />
          </svg>
        </div>
        <div className="container flex flex-col justify-center items-center gap-4">
          <Title
            size="2xl"
            className="text-[var(--primary-c)] font-questrial font-semibold text-center relative after:absolute after:w-[40%] after:bg-[var(--primary-c)]/60 after:left-1/2 after:-bottom-1 after:h-[2px] after:rounded-xl after:-translate-x-1/2 after:transition-all"
          >
            Perguntas Frequentes
          </Title>
          <div className="max-w-3xl w-full">
            <Accordion type="single" rounded="2xl" theme="custom">
              <AccordionItem value="1">
                <AccordionTrigger>Teste</AccordionTrigger>
                <AccordionContent>Teste</AccordionContent>
              </AccordionItem>
              <AccordionItem value="2">
                <AccordionTrigger>Teste</AccordionTrigger>
                <AccordionContent>Teste</AccordionContent>
              </AccordionItem>
              <AccordionItem value="3">
                <AccordionTrigger>Teste</AccordionTrigger>
                <AccordionContent>Teste</AccordionContent>
              </AccordionItem>
              <AccordionItem value="4">
                <AccordionTrigger>Teste</AccordionTrigger>
                <AccordionContent>Teste</AccordionContent>
              </AccordionItem>
              <AccordionItem value="5">
                <AccordionTrigger>Teste</AccordionTrigger>
                <AccordionContent>Teste</AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </section>
    </>
  )
}
