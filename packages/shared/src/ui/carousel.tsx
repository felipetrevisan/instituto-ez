'use client'

import { cn } from '@ez/shared/lib/utils'
import {
  MotionHighlight,
  MotionHighlightItem,
} from '@ez/shared/ui/animated/effects/motion-highlight'
import { cva, type VariantProps } from 'class-variance-authority'
import useEmblaCarousel, { type UseEmblaCarouselType } from 'embla-carousel-react'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import React from 'react'
import { Button } from './button'

type CarouselApi = UseEmblaCarouselType[1]
type UseCarouselParameters = Parameters<typeof useEmblaCarousel>
type CarouselOptions = UseCarouselParameters[0]
type CarouselPlugin = UseCarouselParameters[1]

type CarouselContextProps = {
  carouselRef: ReturnType<typeof useEmblaCarousel>[0]
  api: ReturnType<typeof useEmblaCarousel>[1]
  scrollPrev: () => void
  scrollNext: () => void
  setSelectedIndex: (index: number) => void
  setScrollSnaps: (snaps: number[]) => void
  goToSlide: (index: number) => void
  canScrollPrev: boolean
  canScrollNext: boolean
  scrollSnaps: number[]
  selectedIndex: number
} & CarouselProps

const carouselVariants = cva(
  'relative **:data-[slot=carousel-dot]:outline-none **:data-[slot=carousel-dot]:hover:outline-none',
  {
    variants: {
      theme: {
        default:
          '**:data-[slot=carousel-dot]:shadow-primary **:data-[slot=carousel-dot]:hover:after:shadow-primary',
        secondary:
          '**:data-[slot=carousel-dot]:shadow-secondary **:data-[slot=carousel-dot]:hover:after:shadow-secondary',
        tertiary:
          '**:data-[slot=carousel-dot]:shadow-tertiary **:data-[slot=carousel-dot]:hover:after:shadow-tertiary',
        accent:
          '**:data-[slot=carousel-dot]:shadow-accent **:data-[slot=carousel-dot]:hover:after:shadow-accent',
        custom:
          '**:data-[slot=carousel-dot]:shadow-[var(--secondary)] **:data-[slot=carousel-dot]:hover:after:shadow-[var(--secondary)]',
      },
    },
    defaultVariants: {
      theme: 'default',
    },
  },
)

const CarouselContext = React.createContext<CarouselContextProps | null>(null)

function useCarousel() {
  const context = React.useContext(CarouselContext)

  if (!context) {
    throw new Error('useCarousel must be used within a <Carousel />')
  }

  return context
}

type CarouselProps = {
  opts?: CarouselOptions & { autoplay?: number }
  plugins?: CarouselPlugin
  orientation?: 'horizontal' | 'vertical'
  setApi?: (api: CarouselApi) => void
} & React.ComponentProps<'div'> &
  VariantProps<typeof carouselVariants>

function Carousel({
  orientation = 'horizontal',
  opts,
  setApi,
  plugins,
  className,
  children,
  ...props
}: React.ComponentProps<'div'> & CarouselProps) {
  const [carouselRef, api] = useEmblaCarousel(
    {
      ...opts,
      axis: orientation === 'horizontal' ? 'x' : 'y',
    },
    plugins,
  )
  const [canScrollPrev, setCanScrollPrev] = React.useState(false)
  const [canScrollNext, setCanScrollNext] = React.useState(false)
  const [selectedIndex, setSelectedIndex] = React.useState(0)
  const [scrollSnaps, setScrollSnaps] = React.useState<number[]>([])

  const onSelect = React.useCallback((api: CarouselApi) => {
    if (!api) return
    setCanScrollPrev(api.canScrollPrev())
    setCanScrollNext(api.canScrollNext())
    setSelectedIndex(api.selectedScrollSnap())
    setScrollSnaps(api.scrollSnapList())
  }, [])

  const scrollPrev = React.useCallback(() => {
    api?.scrollPrev()
  }, [api])

  const scrollNext = React.useCallback(() => {
    api?.scrollNext()
  }, [api])

  const handleKeyDown = React.useCallback(
    (event: React.KeyboardEvent<HTMLDivElement>) => {
      if (event.key === 'ArrowLeft') {
        event.preventDefault()
        scrollPrev()
      } else if (event.key === 'ArrowRight') {
        event.preventDefault()
        scrollNext()
      }
    },
    [scrollPrev, scrollNext],
  )

  const goToSlide = React.useCallback(
    (index: number) => {
      if (!api) return
      api.scrollTo(index)
    },
    [api],
  )

  React.useEffect(() => {
    if (!api || !setApi) return
    setApi(api)
  }, [api, setApi])

  React.useEffect(() => {
    if (!api) return

    onSelect(api)
    api.on('reInit', onSelect)
    api.on('select', onSelect)

    return () => {
      api?.off('select', onSelect)
    }
  }, [api, onSelect])

  return (
    <CarouselContext.Provider
      value={{
        carouselRef,
        api: api,
        opts,
        orientation: orientation || (opts?.axis === 'y' ? 'vertical' : 'horizontal'),
        scrollPrev,
        scrollNext,
        canScrollPrev,
        canScrollNext,
        setSelectedIndex,
        selectedIndex,
        setScrollSnaps,
        scrollSnaps,
        goToSlide,
      }}
    >
      {/* biome-ignore lint/a11y/useSemanticElements: false positive */}
      <div
        aria-roledescription="carousel"
        className={className}
        data-slot="carousel"
        onKeyDownCapture={handleKeyDown}
        role="region"
        {...props}
      >
        {children}
      </div>
    </CarouselContext.Provider>
  )
}

function CarouselContent({
  className,
  rootClassName,
  ...props
}: React.ComponentProps<'div'> & { rootClassName?: string }) {
  const { carouselRef, orientation } = useCarousel()

  return (
    <div
      className={cn('overflow-hidden', rootClassName)}
      data-slot="carousel-content"
      ref={carouselRef}
    >
      <div
        className={cn('flex', orientation === 'horizontal' ? '-ml-4' : '-mt-4 flex-col', className)}
        {...props}
      />
    </div>
  )
}

function CarouselItem({ className, ...props }: React.ComponentProps<'div'>) {
  const { orientation } = useCarousel()

  return (
    <>
      {/* biome-ignore lint/a11y/useSemanticElements: false positive */}
      <div
        aria-roledescription="slide"
        className={cn(
          'min-w-0 shrink-0 grow-0 basis-full',
          orientation === 'horizontal' ? 'pl-4' : 'pt-4',
          className,
        )}
        data-slot="carousel-item"
        role="group"
        {...props}
      />
    </>
  )
}

function CarouselPrevious({
  className,
  variant = 'outline',
  ...props
}: React.ComponentProps<typeof Button>) {
  const { orientation, scrollPrev, canScrollPrev } = useCarousel()

  return (
    <Button
      className={cn(
        'absolute size-8 rounded-full',
        orientation === 'horizontal'
          ? '-left-12 -translate-y-1/2 top-1/2'
          : '-top-12 -translate-x-1/2 left-1/2 rotate-90',
        className,
      )}
      data-slot="carousel-previous"
      disabled={!canScrollPrev}
      onClick={scrollPrev}
      variant={variant}
      {...props}
    >
      <ArrowLeft />
      <span className="sr-only">Previous slide</span>
    </Button>
  )
}

function CarouselNext({
  className,
  variant = 'outline',
  ...props
}: React.ComponentProps<typeof Button>) {
  const { orientation, scrollNext, canScrollNext } = useCarousel()

  return (
    <Button
      className={cn(
        'absolute size-8 rounded-full',
        orientation === 'horizontal'
          ? '-right-12 -translate-y-1/2 top-1/2'
          : '-bottom-12 -translate-x-1/2 left-1/2 rotate-90',
        className,
      )}
      data-slot="carousel-next"
      disabled={!canScrollNext}
      onClick={scrollNext}
      variant={variant}
      {...props}
    >
      <ArrowRight />
      <span className="sr-only">Next slide</span>
    </Button>
  )
}

function CarouselDots({
  className,
  rootClassName,
  theme,
  ...props
}: React.ComponentProps<'div'> &
  VariantProps<typeof carouselVariants> & { rootClassName?: string }) {
  const { scrollSnaps, selectedIndex, goToSlide } = useCarousel()

  if (!scrollSnaps.length || scrollSnaps.length < 2) return null

  return (
    <div
      className={cn(
        'flex flex-wrap items-center justify-center gap-2',
        carouselVariants({ theme }),
        rootClassName,
      )}
      data-slot="carousel-dots"
      {...props}
    >
      <MotionHighlight
        className="flex flex-row bg-transparent"
        controlledItems
        hover
        mode="children"
      >
        {scrollSnaps.map((_, index) => (
          <MotionHighlightItem
            activeClassName={cn({
              'after:bg-primary': theme === 'default',
              'after:bg-secondary': theme === 'secondary',
              'after:bg-tertiary': theme === 'tertiary',
              'after:bg-accent': theme === 'accent',
              'after:bg-[var(--primary)]': theme === 'custom',
            })}
            // biome-ignore lint/suspicious/noArrayIndexKey: using index as key is acceptable here
            key={index}
          >
            <Button
              className={cn(
                'rounded-full border-none bg-linear-none px-1 after:flex after:size-2 after:items-center after:rounded-full after:shadow-[0_0_0_0.17rem] hover:bg-transparent',
                {
                  'after:bg-primary after:shadow-primary':
                    theme === 'default' && selectedIndex === index,
                  'after:bg-secondary after:shadow-secondary':
                    theme === 'secondary' && selectedIndex === index,
                  'after:bg-tertiary after:shadow-tertiary':
                    theme === 'tertiary' && selectedIndex === index,
                  'after:bg-accent after:shadow-accent':
                    theme === 'accent' && selectedIndex === index,
                  '[--tw-shadow:_var(--primary)] after:bg-[var(--primary)] after:shadow-[0_0_0_0.17rem_var(--primary)]':
                    theme === 'custom' && selectedIndex === index,

                  'after:shadow-primary/70': theme === 'default' && selectedIndex !== index,
                  'after:shadow-secondary/70': theme === 'secondary' && selectedIndex !== index,
                  'after:shadow-tertiary/70': theme === 'tertiary' && selectedIndex !== index,
                  'after:shadow-accent/70': theme === 'accent' && selectedIndex !== index,
                  '[--tw-shadow:_var(--primary)] after:shadow-[0_0_0_0.17rem_var(--primary)]':
                    theme === 'custom' && selectedIndex !== index,
                },
                className,
              )}
              data-slot="carousel-dot"
              onClick={() => goToSlide(index)}
              theme={theme}
              variant="outline"
            >
              <span className="sr-only">Dot</span>
            </Button>
          </MotionHighlightItem>
        ))}
      </MotionHighlight>
    </div>
  )
}

export {
  type CarouselApi,
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
  CarouselDots,
}
