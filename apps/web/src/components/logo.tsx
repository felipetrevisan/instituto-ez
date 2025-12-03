'use client'

import { useDeviceType } from '@ez/shared/hooks/use-media-query'
import { cn } from '@ez/shared/lib/utils'
import { useSite } from '@ez/web/hooks/use-site'
import { getLocalizedLink } from '@ez/web/utils/get-localized-link'
import { type HTMLMotionProps, motion } from 'motion/react'
import Image from 'next/image'
import { useLocale } from 'next-intl'
import { Fragment } from 'react'

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
  const { isTablet, isMobile } = useDeviceType()

  const logoImage = (
    <Fragment>
      <Image
        alt={`${data?.title[locale]} - ${data?.slogan[locale]}`}
        className="h-full"
        height={57}
        priority
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        src={src ?? '/assets/logo.png'}
        width={57}
      />
      {showSlogan && (!isTablet && !isMobile) && (
        <span className="flex flex-col justify-center" data-slot="logo">
          <p className={cn('font-bold font-oswald text-lg text-primary')}>{data?.title[locale]}</p>
          <p className={cn('text-nowrap font-light font-questrial text-primary text-sm')}>
            {data?.slogan[locale]}
          </p>
        </span>
      )}
    </Fragment>
  )

  return (
    <Fragment>
      {linkable ? (
        <motion.a
          className="relative flex h-[3.56rem] space-x-2 md:w-auto"
          {...props}
          href={getLocalizedLink(locale, '/')}
        >
          {logoImage}
        </motion.a>
      ) : (
        logoImage
      )}
    </Fragment>
  )
}
