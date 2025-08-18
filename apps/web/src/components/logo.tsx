'use client'

import { getLocalizedLink } from '@ez/web/utils/get-localized-link'
import { type HTMLMotionProps, motion } from 'motion/react'
import { useLocale } from 'next-intl'
import Image from 'next/image'
import * as React from 'react'

type LogoProps = {
  src?: string
  showSlogan?: boolean
  linkable?: boolean
} & HTMLMotionProps<'a'>

export const Logo = ({
  className,
  showSlogan = true,
  linkable = true,
  src,
  ...props
}: LogoProps) => {
  const locale = useLocale()

  const logoImage = (
    <>
      <Image
        src={src ?? '/assets/logo.png'}
        alt="Instituto Ez - Desenvolvimento Humano"
        className="h-full"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        priority
        width={57}
        height={57}
      />
      {showSlogan && (
        <span className="flex flex-col justify-center md:hidden xl:flex">
          <p className="font-bold font-oswald text-lg text-primary">Instituto Ez</p>
          <p className="text-nowrap font-light font-questrial text-primary text-sm">
            Desenvolvimento Humano
          </p>
        </span>
      )}
    </>
  )

  return (
    <>
      {linkable ? (
        <motion.a
          className="relative flex h-[3.56rem] w-56 space-x-2 md:w-auto"
          {...props}
          href={getLocalizedLink(locale, '/')}
        >
          {logoImage}
        </motion.a>
      ) : (
        logoImage
      )}
    </>
  )
}
