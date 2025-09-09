'use client'

import { useIsMobile } from '@ez/web/hooks/use-mobile'
import { useSite } from '@ez/web/hooks/use-site'
import { getLocalizedLink } from '@ez/web/utils/get-localized-link'
import { type HTMLMotionProps, motion } from 'motion/react'
import Image from 'next/image'
import { useLocale } from 'next-intl'

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
  const { data } = useSite()
  const isTablet = useIsMobile(1179)

  const logoImage = (
    <>
      <Image
        src={src ?? '/assets/logo.png'}
        alt={`${data?.title[locale]} - ${data?.slogan[locale]}`}
        className="h-full"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        priority
        width={57}
        height={57}
      />
      {showSlogan && !isTablet && (
        <span className="flex flex-col justify-center">
          <p className="font-bold font-oswald text-lg text-primary">{data?.title[locale]}</p>
          <p className="text-nowrap font-light font-questrial text-primary text-sm">
            {data?.slogan[locale]}
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
