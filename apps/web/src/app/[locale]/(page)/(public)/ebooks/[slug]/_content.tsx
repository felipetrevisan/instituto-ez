'use client'

import { ChevronLeftIcon, DownloadIcon } from '@ez/shared/icons'
import { FaIcons } from '@ez/shared/icons'
import { cn } from '@ez/shared/lib/utils'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@ez/shared/ui'
import { LiquidButton } from '@ez/shared/ui/animated/button/liquid-button'
import { CountingNumber } from '@ez/shared/ui/animated/counter'
import { Magnetic } from '@ez/shared/ui/animated/effects/magnetic'
import { RollingText } from '@ez/shared/ui/animated/text/rolling'
import { TypingText } from '@ez/shared/ui/animated/text/typing'
import { Card, CardContent } from '@ez/shared/ui/card'
import { Subtitle, Title } from '@ez/shared/ui/title'
import { urlForImage } from '@ez/web/config/image'
import type { Ebook, Media } from '@ez/web/types/ebook'
import { getLocalizedLink } from '@ez/web/utils/get-localized-link'
import { motion } from 'motion/react'
import Image from 'next/image'
import Link from 'next/link'
import HTMLFlipBook from 'react-pageflip'
import { AnimatedButton } from './_button'
import StickyHeader from './_sticky-header'

import './styles.css'
import { useLocale } from 'next-intl'
import { PageBook } from './_chapters/chapter'
import { CoverBook } from './_chapters/cover'

type CSSVariables = {
  [key: `--${string}`]: string
}

const DownloadIconMotion = motion(DownloadIcon)
const ChevronLeftIconMotion = motion(ChevronLeftIcon)

export function Content({ data }: { data: Ebook }) {
  const locale = useLocale()
  const { id, title, description, metadata, chapters, questions, overview, theme } = data

  const getIcon = (media: Media) => {
    const IconComponent =
      media.type === 'icon' && media.icon?.name
        ? FaIcons[media.icon.name as keyof typeof FaIcons]
        : null

    const ImageComponent =
      media.type === 'image' && media.image ? (
        <Image
          src={urlForImage(media.image.asset).width(24).height(24).auto('format').quality(80).url()}
          alt=""
          width={24}
          height={24}
        />
      ) : null

    return IconComponent ? <IconComponent /> : ImageComponent
  }

  const style: React.CSSProperties & CSSVariables = {
    '--primary-c': `${theme?.primary?.hex ?? 'var(--primary)'}`,
    '--secondary-c': `${theme?.secondary?.hex ?? 'var(--secondary)'}`,
  }

  return (
    <div className="flex w-full flex-col items-center justify-center space-y-14" style={style}>
      <div className="relative flex w-screen flex-col items-center justify-center">
        <header className="relative flex w-screen flex-col items-center justify-center overflow-hidden bg-[auto,cover] bg-ebooks bg-gradient-to-br from-[var(--primary-c)]/90 to-[var(--secondary-c)]/90 px-6 py-12 text-white md:h-[600px]">
          <Link href={getLocalizedLink(locale, '/ebooks')} className="absolute top-4 right-4 w-full">
            <AnimatedButton
              label="Voltar para o Catálogo"
              icon={<ChevronLeftIconMotion />}
              animateMaps={{
                width: { initial: 48, hovered: 260 },
                paddingLeft: { initial: 20, hovered: 16 },
                scale: { initial: 1, hovered: 1.1 },
              }}
              className="mb-10 fill-[var(--primary-c)] text-[var(--primary-c)] after:absolute after:inset-0 after:animate-pulse after:rounded-xl after:bg-white/20 after:blur md:absolute md:mb-0"
            />
          </Link>
          <div className="container mx-auto flex flex-col items-center justify-between gap-10 md:flex-row">
            <motion.div
              className="relative z-10 flex min-h-[200px] max-w-xl flex-col"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <TypingText
                asChild="h1"
                text={title as string}
                className="mt-20 mb-6 font-extrabold text-3xl leading-tight drop-shadow-md md:text-4xl"
              />
              <div className="flex flex-col gap-4">
                <TypingText
                  text={description as string}
                  cursor
                  duration={1.1}
                  holdDelay={1}
                  className="mb-6 max-w-prose font-semibold text-lg text-white/90 leading-relaxed md:text-justify"
                />
                <LiquidButton
                  variant="outline"
                  theme="custom"
                  size="2xl"
                  rounded="2xl"
                  //className="fill-[var(--primary-c)] text-[var(--primary-c)]"
                  className="w-full max-w-[250px]"
                >
                  <DownloadIconMotion /> Baixe Agora
                </LiquidButton>
              </div>
            </motion.div>
            <motion.div
              className="relative z-10 mt-10 size-[550px] overflow-hidden rounded-xl md:mt-0"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <Image
                src={urlForImage(data.image.large.asset).auto('format').quality(80).url()}
                alt="Book Cover"
                fill
                className="object-cover"
                priority
              />
            </motion.div>
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
        </header>
        <StickyHeader {...data} />
        {metadata?.length > 0 && (
          <section className="container flex flex-wrap justify-center gap-10 bg-white px-6 py-12">
            {metadata?.map((meta, index) => (
              <Magnetic
                key={`${id}_${
                  // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
                  index
                }`}
                strength={0.25}
              >
                <Card
                  variant="custom"
                  theme="custom"
                  className={cn(
                    'hover:-translate-y-1 h-[180px] w-[200px] bg-gradient-to-br from-[var(--primary-c)]/40 to-[var(--secondary-c)]/40 p-0.5 shadow-[var(--primary-c)]/50 shadow-sm outline-none backdrop-blur-md transition-all duration-300 hover:shadow-xl',
                  )}
                  rounded="2xl"
                >
                  <CardContent className="relative flex h-full items-center justify-center rounded-3xl bg-white px-6 py-0">
                    <div className="flex flex-col items-center justify-center">
                      {meta.media.type !== 'none' && (
                        <div className="-top-7 absolute order-1 size-14 rounded-full bg-white shadow-md [&_svg]:size-8">
                          <div className="-translate-x-1/2 -translate-y-1/2 absolute top-1/2 left-1/2 stroke-[1.5] text-[var(--primary-c)]">
                            {getIcon(meta.media)}
                          </div>
                        </div>
                      )}
                      <div className="flex flex-col">
                        <dt className="mb-2 flex min-h-[72px] flex-col items-center justify-center gap-2">
                          {meta.prefix && (
                            <span className="font-medium text-[var(--primary-c)] text-sm opacity-70">
                              {meta.prefix}
                            </span>
                          )}
                          {meta.type === 'string' && (
                            <span className="font-bold text-3xl text-[var(--primary-c)]">
                              {meta.value}
                            </span>
                          )}
                          {meta.type === 'number' && Number(meta.value) > 0 && (
                            <span className="font-bold text-3xl text-[var(--primary-c)]">
                              <CountingNumber
                                number={meta.value ?? 0}
                                decimalSeparator=","
                                inView
                              />
                            </span>
                          )}
                          {meta.suffix && (
                            <span className="font-medium text-[var(--primary-c)] text-sm opacity-70">
                              {meta.suffix}
                            </span>
                          )}
                        </dt>
                        <dd className="text-center font-bold text-[var(--primary-c)]">
                          <RollingText text={meta.title} />
                        </dd>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Magnetic>
            ))}
          </section>
        )}
        <section className="relative flex w-screen flex-row gap-4 px-6 py-12">
          <div className="container flex flex-col items-center justify-center gap-4">
            <Title
              size="2xl"
              className="after:-bottom-1 after:-translate-x-1/2 relative text-center font-questrial font-semibold text-[var(--primary-c)] after:absolute after:left-1/2 after:h-[2px] after:w-[40%] after:rounded-xl after:bg-[var(--primary-c)]/60 after:transition-all"
            >
              O que você vai encontrar nesse Ebook
            </Title>
            <Subtitle size="lg">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. In rem quae nobis atque
              eligendi voluptatem deleniti, enim sint impedit excepturi debitis quidem, dicta,
              ratione doloribus corporis vitae velit amet temporibus.
            </Subtitle>
          </div>
        </section>

        <section className="relative mt-10 flex min-h-[500px] w-screen flex-row gap-4 bg-[auto,contain] bg-ebooks bg-gradient-to-b from-slate-100 via-slate-200 to-white px-6 py-52">
          <div className="absolute top-0 left-0 w-full rotate-180 overflow-hidden">
            {/* biome-ignore lint/a11y/noSvgWithoutTitle: <explanation> */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 1200 120"
              preserveAspectRatio="none"
            >
              <path
                d="M602.45,3.86h0S572.9,116.24,281.94,120H923C632,116.24,602.45,3.86,602.45,3.86Z"
                className="fill-white"
              />
            </svg>
          </div>
          <div className="container flex flex-col items-center justify-center gap-20">
            {overview?.description && (
              <div className="flex flex-col items-center justify-center gap-2">
                <Title
                  size="2xl"
                  className="after:-bottom-1 after:-translate-x-1/2 relative text-center font-questrial font-semibold text-[var(--primary-c)] after:absolute after:left-1/2 after:h-[2px] after:w-[40%] after:rounded-xl after:bg-[var(--primary-c)]/60 after:transition-all"
                >
                  {overview?.title ?? 'Visão Geral'}
                </Title>
                <Subtitle size="lg">{overview.description}</Subtitle>
              </div>
            )}
            <div className="flex flex-col items-center justify-center gap-2">
              <Title
                size="2xl"
                className="after:-bottom-1 after:-translate-x-1/2 relative text-center font-questrial font-semibold text-[var(--primary-c)] after:absolute after:left-1/2 after:h-[2px] after:w-[40%] after:rounded-xl after:bg-[var(--primary-c)]/60 after:transition-all"
              >
                Capítulos
              </Title>
              {chapters?.length > 0 && (
                <div className="px-6 py-12">
                  <HTMLFlipBook
                    width={550}
                    height={733}
                    size="fixed"
                    minWidth={315}
                    maxWidth={1000}
                    minHeight={400}
                    maxHeight={1533}
                    maxShadowOpacity={0.5}
                    showCover={true}
                    mobileScrollSupport={true}
                    drawShadow
                    usePortrait={false}
                    autoSize={false}
                    className="open-book rounded-2xl shadow-lg"
                  >
                    <CoverBook>
                      <Image
                        src={urlForImage(data.image.large.asset).auto('format').quality(80).url()}
                        alt="Book Cover"
                        fill
                        className="object-cover"
                        priority
                      />
                    </CoverBook>
                    {chapters?.map((chapter, index) => (
                      <PageBook
                        key={chapter.id}
                        className={cn('--hard --left', {
                          '--left': index % 2 === 0,
                          '--right': index % 2 !== 0,
                        })}
                        chapter={chapter}
                      />
                    ))}
                  </HTMLFlipBook>
                </div>
              )}
            </div>
          </div>
        </section>
        {questions && questions?.length > 0 && (
          <section className="relative mt-10 flex min-h-[500px] w-screen flex-row gap-4 bg-white px-6 py-52">
            <div className="container flex flex-col items-center justify-center gap-10">
              <Title
                size="2xl"
                className="after:-bottom-1 after:-translate-x-1/2 relative text-center font-questrial font-semibold text-[var(--primary-c)] after:absolute after:left-1/2 after:h-[2px] after:w-[40%] after:rounded-xl after:bg-[var(--primary-c)]/60 after:transition-all"
              >
                Perguntas Frequentes
              </Title>
              <div className="w-full max-w-3xl">
                <Accordion type="multiple" rounded="2xl" theme="custom">
                  {questions?.map((question, index) => (
                    <AccordionItem
                      value={`item-${id}-${index}`}
                      key={`question_${id}-${
                        // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
                        index
                      }`}
                    >
                      <AccordionTrigger>{question.title}</AccordionTrigger>
                      <AccordionContent className="m-3">{question.text}</AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            </div>
          </section>
        )}
      </div>
    </div>
  )
}
