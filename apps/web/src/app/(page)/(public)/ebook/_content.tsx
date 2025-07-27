'use client'

import { LayersIcon } from '@ez/shared/icons'
import { AnimatedCounter } from '@ez/shared/ui/animated/counter'
import { Card, CardContent } from '@ez/shared/ui/card'
import { Subtitle, Title } from '@ez/shared/ui/title'
import * as App from '@ez/web/components/app'
import Image from 'next/image'

export function Content() {
  return (
    <>
      <header className="bg-gradient-to-t from-primary to-secondary text-white py-12 px-6 w-screen relative h-[600px]">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
          <div className="max-w-xl">
            <h1 className="text-4xl font-bold mb-4">
              Perfect Landing Page Template to Present Your eBook
            </h1>
            <p className="mb-6">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quam sapien, recusandae
              voluptas incidunt.
            </p>
            {/* biome-ignore lint/a11y/useButtonType: <explanation> */}
            <button className="bg-white text-orange-500 px-6 py-3 font-bold rounded shadow">
              Download Now!
            </button>
            <p className="text-sm mt-2">*Available in PDF, ePUB, Mobi & Kindle.</p>
          </div>
          <div className="relative z-10 size-[550px]">
            <Image src="/assets/images/ebook-placeholder.png" alt="Book Cover" fill />
          </div>
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
      <section className="container bg-white py-12 px-6 flex flex-row justify-center items-center gap-x-5">
        <Card variant="outline" className="h-[150px] w-[200px]" rounded="2xl">
          <CardContent className="p-5 flex justify-center items-center h-full relative">
            <div className="flex flex-col items-center justify-center">
              <div className="rounded-full size-14 [&_svg]:size-10 border-1 border-primary bg-white text-primary shadow-sm shadow-primary absolute -top-7">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 stroke-muted-foreground">
                  <LayersIcon />
                </div>
              </div>
              <dt className="mb-2 text-3xl font-extrabold">
                <AnimatedCounter from={0} to={100} />
              </dt>
              <dd className="text-gray-500 dark:text-gray-400">Total de Páginas</dd>
            </div>
          </CardContent>
        </Card>
        <Card variant="outline" className="h-[150px] w-[200px]" rounded="2xl">
          <CardContent className="p-5 flex justify-center items-center h-full relative">
            <div className="flex flex-col items-center justify-center">
              <div className="rounded-full size-14 [&_svg]:size-10 border-1 border-primary bg-white text-primary shadow-sm shadow-primary absolute -top-7">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 stroke-muted-foreground">
                  <LayersIcon />
                </div>
              </div>
              <dt className="mb-2 text-3xl font-extrabold">
                <AnimatedCounter from={0} to={50} />
              </dt>
              <dd className="text-gray-500 dark:text-gray-400">Capítulos</dd>
            </div>
          </CardContent>
        </Card>
        <Card variant="outline" className="h-[150px] w-[200px]" rounded="2xl">
          <CardContent className="p-5 flex justify-center items-center h-full relative">
            <div className="flex flex-col items-center justify-center">
              <div className="rounded-full size-14 [&_svg]:size-10 border-1 border-primary bg-white text-primary shadow-sm shadow-primary absolute -top-7">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 stroke-muted-foreground">
                  <LayersIcon />
                </div>
              </div>
              <dt className="mb-2 text-3xl font-extrabold">
                <AnimatedCounter from={500} to={10_000} />
              </dt>
              <dd className="text-gray-500 dark:text-gray-400">Vendas</dd>
            </div>
          </CardContent>
        </Card>
      </section>
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
        </div>
      </section>
    </>
  )
}