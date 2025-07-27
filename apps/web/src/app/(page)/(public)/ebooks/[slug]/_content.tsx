'use client'

import { DownloadIcon } from '@ez/shared/icons'
import { FaIcons } from '@ez/shared/icons'
import { AnimatedCounter } from '@ez/shared/ui/animated/counter'
import { Card, CardContent } from '@ez/shared/ui/card'
import { Title } from '@ez/shared/ui/title'
import { urlForImage } from '@ez/web/config/image'
import type { Ebook, Media } from '@ez/web/types/ebook'
import { motion, useMotionValue, useTransform } from 'framer-motion'
import Image from 'next/image'
import { useState } from 'react'

export function Content({ data }: { data: Ebook }) {
  const { id, title, description, metadata, chapters } = data

  const [hovered, setHovered] = useState(false)

  const width = useMotionValue(48)
  const justify = useTransform(width, (w) => (w > 100 ? 'flex-start' : 'center'))

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

  return (
    <>
      <header className="relative h-[600px] w-screen bg-gradient-to-br from-primary/90 to-secondary/90 text-white overflow-hidden py-12 px-6">
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
            <motion.button
              className="flex items-center bg-white text-primary font-bold py-3 rounded-full shadow-lg overflow-hidden cursor-pointer"
              style={{ width, justifyContent: justify }}
              initial={{ width: 48, paddingLeft: 20, scale: 1 }}
              animate={{
                width: hovered ? 160 : 48,
                paddingLeft: hovered ? 16 : 20,
                scale: hovered ? 1.10 : 1,
              }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              onHoverStart={() => setHovered(true)}
              onHoverEnd={() => setHovered(false)}
            >
              <DownloadIcon className="size-5 flex-shrink-0" />
              <motion.span
                className="ml-2 overflow-hidden whitespace-nowrap"
                initial={{ opacity: 0, x: -10 }}
                animate={{
                  opacity: hovered ? 1 : 0,
                  x: hovered ? 0 : -10,
                }}
                transition={{
                  type: 'spring',
                  stiffness: 500,
                  damping: 20,
                  bounce: 0.4,
                  delay: 0.05,
                }}
              >
                Download
              </motion.span>
            </motion.button>
            <p className="text-sm mt-2">* Available in PDF, ePUB, Mobi & Kindle.</p>
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
        <section className="container bg-white py-12 px-6 flex flex-row justify-center items-center gap-x-5">
          {metadata?.map((meta, index) => (
            <Card
              key={`${id}_${
                // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
                index
              }`}
              variant="outline"
              className="h-[180px] w-[200px] transition-all duration-300 shadow-sm hover:shadow-xl hover:-translate-y-1 bg-white/80 hover:bg-white/90 backdrop-blur-md"
              rounded="2xl"
            >
              <CardContent className="p-5 flex justify-center items-center h-full relative">
                <div className="flex flex-col items-center justify-center">
                  {meta.media.type !== 'none' && (
                    <div className="rounded-full size-14 [&_svg]:size-8 order-1 border-primary bg-gradient-to-br from-white via-primary/10 to-white text-primary-foreground shadow-md absolute -top-7">
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 stroke-[1.5] text-primary">
                        {getIcon(meta.media)}
                      </div>
                    </div>
                  )}
                  <div className="flex flex-col">
                    <dt className="mb-2 flex flex-col justify-center items-center gap-2 min-h-[72px]">
                      {meta.prefix && (
                        <span className="text-sm font-medium opacity-70">{meta.prefix}</span>
                      )}
                      {meta.type === 'string' && (
                        <span className="text-3xl font-bold text-primary">{meta.value}</span>
                      )}
                      {meta.type === 'number' && Number(meta.value) > 0 && (
                        <span className="text-3xl font-bold text-primary">
                          <AnimatedCounter from={0} to={Number(meta.value)} />
                        </span>
                      )}
                      {meta.suffix && (
                        <span className="text-sm font-medium opacity-70">{meta.suffix}</span>
                      )}
                    </dt>
                    <dd className="text-gray-500 dark:text-gray-400">{meta.title}</dd>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </section>
      )}
      <section className="relative bg-gradient-to-b from-gray-100 via-gray-200 to-gray-300 mt-10 py-12 px-6 flex flex-row gap-4 min-h-[500px] w-screen">
        <div className="absolute left-0 top-0 w-full rotate-180 overflow-hidden">
          {/* biome-ignore lint/a11y/noSvgWithoutTitle: <explanation> */}
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path
              d="M602.45,3.86h0S572.9,116.24,281.94,120H923C632,116.24,602.45,3.86,602.45,3.86Z"
              className="fill-white"
            />
          </svg>
        </div>
        <div className="container flex flex-col justify-center items-center">
          <Title className="">Visão Geral</Title>
          <h3>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. In rem quae nobis atque
            eligendi voluptatem deleniti, enim sint impedit excepturi debitis quidem, dicta, ratione
            doloribus corporis vitae velit amet temporibus.
          </h3>
          {chapters?.length > 0 && (
            <div className="py-12 px-6 flex flex-row justify-center items-center gap-x-5">
              {chapters?.map((meta, index) => (
                <Card
                  key={`${id}_${
                    // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
                    index
                  }`}
                  variant="outline"
                  className="h-[180px] w-[200px] transition-all duration-300 shadow-sm hover:shadow-xl hover:-translate-y-1 bg-white/80 hover:bg-white/90 backdrop-blur-md"
                  rounded="2xl"
                >
                  <CardContent className="p-5 flex justify-center items-center h-full relative">
                    <div className="flex flex-col items-center justify-center">
                      {meta.media.type !== 'none' && (
                        <div className="rounded-full size-14 [&_svg]:size-8 order-1 border-primary bg-gradient-to-br from-white via-primary/10 to-white text-primary shadow-md absolute -top-7">
                          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 stroke-[1.5] text-primary">
                            {getIcon(meta.media)}
                          </div>
                        </div>
                      )}
                      {/* <div className="flex flex-col">
                        <dt className="mb-2 flex flex-col justify-center items-center gap-2 min-h-[72px]">
                          {meta.prefix && (
                            <span className="text-sm font-medium opacity-70">{meta.prefix}</span>
                          )}
                          {meta.type === 'string' && (
                            <span className="text-3xl font-bold text-primary">{meta.value}</span>
                          )}
                          {meta.type === 'number' && Number(meta.value) > 0 && (
                            <span className="text-3xl font-bold text-primary">
                              <AnimatedCounter from={0} to={Number(meta.value)} />
                            </span>
                          )}
                          {meta.suffix && (
                            <span className="text-sm font-medium opacity-70">{meta.suffix}</span>
                          )}
                        </dt>
                        <dd className="text-gray-500 dark:text-gray-400">{meta.title}</dd>
                      </div> */}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  )
}
