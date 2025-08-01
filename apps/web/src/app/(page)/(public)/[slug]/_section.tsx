'use client'

import { cn } from '@ez/shared/lib/utils'
import { Title } from '@ez/shared/ui/title'
import { urlForImage } from '@ez/web/config/image'
import type { Section } from '@ez/web/types/page'
import { createPortableComponents } from '@ez/web/utils/create-portable-components'
import { PortableText } from '@portabletext/react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { Parallax } from 'react-parallax'
import ReactPlayer from 'react-player/youtube'

const cards = [
  {
    title: 'Aprenda com exemplos práticos',
    description: 'Nosso conteúdo é direto ao ponto e focado em resolver problemas reais.',
    image:
      'https://cdn.sanity.io/images/pu7kz9iu/production/3be4a9a452a6925419f75419173b65e74c1d152a-767x1000.png?fit=max&auto=format',
  },
  {
    title: 'Domine os fundamentos',
    description: 'Você vai entender os conceitos essenciais para construir projetos do zero.',
    image: '/images/example2.jpg',
  },
  {
    title: 'Evolua com confiança',
    description: 'Construa conhecimento progressivo com base sólida e apoio visual.',
    image: '/images/example3.jpg',
  },
]

export function SectionContent({
  title,
  content,
  background,
  media,
  slug,
}: Section & { slug: string }) {
  return (
    <div className="flex flex-col gap-10">
      <div className="relative w-screen h-full flex flex-col">
        <div className="absolute top-0 left-0 w-full overflow-hidden z-10">
          {/* biome-ignore lint/a11y/noSvgWithoutTitle: <explanation> */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
            className="relative w-[calc(141%+1.3px)] h-[85px]"
          >
            <path
              d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
              opacity=".25"
              className="fill-white"
            />
            <path
              d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z"
              opacity=".5"
              className="fill-white"
            />
            <path
              d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z"
              className="fill-white"
            />
          </svg>
        </div>
        <Parallax
          bgImage={urlForImage(background.image.asset).url()}
          strength={-200}
          className="w-full overflow-hidden"
        >
          {media.type === 'IMAGE' && media.image ? (
            <div className="relative flex h-full md:py-20 my-20">
              <div className="flex flex-col gap-10 justify-center items-center font-bold font-oswald w-full text-white">
                <div className="relative overflow-hidden rounded-2xl shadow h-[300px] lg:h-[500px] md:max-h-[500px] max-w-full w-[90vw] md:w-[60vw] mt-10">
                  <Image
                    src={urlForImage(media.image.asset).url()}
                    alt=""
                    fill
                    placeholder="blur"
                    blurDataURL={media.image.metadata.lqip}
                  />
                </div>
              </div>
            </div>
          ) : (
            <div className="relative flex h-full">
              <div className="flex flex-col gap-10 justify-center items-center font-bold font-oswald w-full text-white">
                <div className="overflow-hidden rounded-2xl shadow h-[300px] lg:h-[650px] max-w-full w-[90vw] md:w-screen">
                  {/* <ReactPlayer
										url={media.video?.url}
										width="100%"
										height="100%"
										controls={false}
										config={{
											playerVars: { playsinline: 1, fs: 0 },
										}}
									/> */}
                </div>
              </div>
            </div>
          )}
        </Parallax>
        <div className="absolute bottom-0 left-0 w-full overflow-hidden rotate-180">
          {/* biome-ignore lint/a11y/noSvgWithoutTitle: <explanation> */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
            className="relative w-[calc(141%+1.3px)] h-[85px]"
          >
            <path
              d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
              opacity=".25"
              className="fill-white"
            />
            <path
              d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z"
              opacity=".5"
              className="fill-white"
            />
            <path
              d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z"
              className="fill-white"
            />
          </svg>
        </div>
      </div>
      <div
        className={cn('container flex flex-col gap-10 justify-center items-center', {
          'w-screen xl:w-[65vw]': slug !== 'ebooks',
          'w-screen': slug === 'ebooks',
        })}
      >
        {title && <Title className="text-center">{title}</Title>}
        <div
          className={cn(
            'flex flex-col gap-5 justify-center items-center w-full lg:max-w-[90vw] py-10 lg:p-0 [&>*:not(hr)]:w-full',
            {
              'gap-10': slug === 'ebooks',
            },
          )}
        >
          <PortableText value={content} components={createPortableComponents()} />
        </div>
      </div>
    </div>
  )
}
