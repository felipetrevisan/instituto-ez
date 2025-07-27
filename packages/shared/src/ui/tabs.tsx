'use client'

import * as TabsPrimitive from '@radix-ui/react-tabs'
import { type HTMLMotionProps, type Transition, motion } from 'motion/react'
import * as React from 'react'

import { cn } from '@ez/shared/lib/utils'
import { MotionHighlight, MotionHighlightItem } from '@ez/shared/ui/animated/motion-highlight'
import { type VariantProps, cva } from 'class-variance-authority'

type TabsProps = React.ComponentProps<typeof TabsPrimitive.Root>

const tabVariants = cva('relative overflow-hidden flex flex-col md:flex-row', {
  variants: {
    variant: {
      default: 'text-center shadow-sm flex divide-x',
      outline: 'outline outline-2 divide-x border-1',
      ghost:
        'shadow-none outline-none bg-transparent after:absolute after:bottom-0 after:w-full after:border-b-1 after:h-[2px] after:border-b-slate-500/40',
    },
    theme: {
      default:
        'shadow-primary/20 bg-linear-to-r from-primary/60 via-primary/80 to-primary/60 text-primary-foreground outline-primary/40 hover:border-primary/40',
      secondary:
        'shadow-secondary/20 bg-linear-to-r from-secondary/60 via-secondary/80 to-secondary/60 text-secondary-foreground outline-secondary/40 hover:border-secondary/40',
      tertiary:
        'shadow-tertiary/20 bg-linear-to-r from-tertiary/60 via-tertiary/80 to-tertiary/60 text-tertiary-foreground outline-tertiary/40 hover:border-tertiary/40',
    },
    rounded: {
      none: 'rounded-none',
      full: 'rounded-full',
      lg: 'rounded-lg',
      xl: 'rounded-2xl',
      '2xl': 'rounded-3xl',
    },
  },
  defaultVariants: {
    variant: 'default',
    theme: 'default',
    rounded: 'xl',
  },
  compoundVariants: [
    {
      variant: 'outline',
      theme: 'default',
      className:
        'shadow-primary/20 bg-transparent text-primary outline-primary/40 hover:border-primary/40',
    },
    {
      variant: 'outline',
      theme: 'secondary',
      className:
        'shadow-secondary/20 bg-transparent text-secondary outline-secondary/40 hover:border-secondary/40',
    },
    {
      variant: 'outline',
      theme: 'tertiary',
      className:
        'shadow-tertiary/20 bg-transparent text-tertiary outline-tertiary/40 hover:border-tertiary/40',
    },
    {
      variant: 'ghost',
      theme: 'default',
      className: 'bg-transparent text-primary rounded-none shadow-none',
    },
    {
      variant: 'ghost',
      theme: 'secondary',
      className: 'bg-transparent text-secondary rounded-none shadow-none',
    },
    {
      variant: 'ghost',
      theme: 'tertiary',
      className: 'bg-transparent text-tertiary rounded-none shadow-none',
    },
  ],
})

const tabHighlightVariants = cva('absolute z-0', {
  variants: {
    variant: {
      default: 'bg-white/80',
      outline: '',
      ghost: '',
    },
    theme: {
      default: 'text-primary shadow-primary shadow-xl',
      secondary: 'text-secondary shadow-secondary shadow-xl',
      tertiary: 'text-tertiary shadow-tertiary shadow-xl',
    },
  },
  defaultVariants: {
    variant: 'default',
    theme: 'default',
  },
  compoundVariants: [
    {
      variant: 'outline',
      theme: 'default',
      className:
        'bg-linear-to-r from-primary/60 via-primary/80 to-primary/60 text-primary shadow-primary',
    },
    {
      variant: 'outline',
      theme: 'secondary',
      className:
        'bg-linear-to-r from-secondary/60 via-secondary/80 to-secondary/60 text-secondary shadow-secondary',
    },
    {
      variant: 'outline',
      theme: 'tertiary',
      className:
        'bg-linear-to-r from-tertiary/60 via-tertiary/80 to-tertiary/60 text-tertiary shadow-tertiary',
    },
    {
      variant: 'ghost',
      theme: 'default',
      className: 'bg-transparent text-primary border-b-2 border-b-primary shadow-none',
    },
    {
      variant: 'ghost',
      theme: 'secondary',
      className: 'bg-transparent text-secondary border-b-2 border-b-secondary shadow-none',
    },
    {
      variant: 'ghost',
      theme: 'tertiary',
      className: 'bg-transparent text-tertiary border-b-2 border-b-tertiary shadow-none',
    },
  ],
})

const tabsTriggerVariants = cva(
  'inline-flex cursor-pointer items-center size-full justify-center whitespace-nowrap p-4 font-bold ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 z-[1]',
  {
    variants: {
      variant: {
        default: 'data-[state=active]:backdrop-blur-md',
        outline: 'data-[state=active]:backdrop-blur-md',
        ghost:
          'border-b border-transparent data-[state=active]:border-b-[3px] data-[state=active]:border-b-current relative hover:after:animation-pulse hover:after:shadow-xl after:absolute after:w-0 after:left-1/2 after:-bottom-1 after:h-[2px] after:-translate-x-1/2 after:transition-all',
      },
      theme: {
        default: 'text-primary-foreground data-[state=active]:text-primary',
        secondary: 'text-secondary-foreground data-[state=active]:text-secondary',
        tertiary: 'text-tertiary-foreground data-[state=active]:text-tertiary',
      },
    },
    defaultVariants: {
      theme: 'default',
    },
    compoundVariants: [
      {
        variant: 'outline',
        theme: 'default',
        className: 'text-primary data-[state=active]:text-primary-foreground',
      },
      {
        variant: 'outline',
        theme: 'secondary',
        className: 'text-secondary data-[state=active]:text-secondary-foreground',
      },
      {
        variant: 'outline',
        theme: 'tertiary',
        className: 'text-tertiary data-[state=active]:text-tertiary-foreground',
      },
      {
        variant: 'ghost',
        theme: 'default',
        className: 'text-primary after:bg-primary',
      },
      {
        variant: 'ghost',
        theme: 'secondary',
        className: 'text-secondary after:bg-secondary',
      },
      {
        variant: 'ghost',
        theme: 'tertiary',
        className: 'text-tertiary after:bg-tertiary',
      },
    ],
  },
)

function Tabs({ className, ...props }: TabsProps) {
  return (
    <TabsPrimitive.Root
      data-slot="tabs"
      className={cn('flex flex-col gap-2', className)}
      {...props}
    />
  )
}

type TabsListProps = React.ComponentProps<typeof TabsPrimitive.List> & {
  activeClassName?: string
  transition?: Transition
  ref?: React.RefObject<HTMLDivElement>
} & VariantProps<typeof tabVariants>

function TabsList({
  ref,
  children,
  className,
  activeClassName,
  transition = {
    type: 'spring',
    stiffness: 200,
    damping: 25,
  },
  variant,
  theme,
  rounded,
  ...props
}: TabsListProps) {
  const localRef = React.useRef<HTMLDivElement | null>(null)
  React.useImperativeHandle(ref, () => localRef.current as HTMLDivElement)

  const [activeValue, setActiveValue] = React.useState<string | undefined>(undefined)

  const getActiveValue = React.useCallback(() => {
    if (!localRef.current) return
    const activeTab = localRef.current.querySelector<HTMLElement>('[data-state="active"]')
    if (!activeTab) return
    setActiveValue(activeTab.getAttribute('data-value') ?? undefined)
  }, [])

  React.useEffect(() => {
    getActiveValue()

    const observer = new MutationObserver(getActiveValue)

    if (localRef.current) {
      observer.observe(localRef.current, {
        attributes: true,
        childList: true,
        subtree: true,
      })
    }

    return () => {
      observer.disconnect()
    }
  }, [getActiveValue])

  return (
    <MotionHighlight
      controlledItems
      // className={cn('rounded-sm bg-background shadow-sm', activeClassName)}
      className={cn(tabHighlightVariants({ variant, theme }), activeClassName)}
      value={activeValue}
      transition={transition}
    >
      <TabsPrimitive.List
        ref={localRef}
        data-slot="tabs-list"
        // className={cn(
        // 	'bg-muted text-muted-foreground inline-flex h-10 w-fit items-center justify-center rounded-lg p-[4px]',
        // 	className,
        // )}
        className={cn('mb-10', tabVariants({ variant, rounded, theme, className }))}
        {...props}
      >
        {children}
      </TabsPrimitive.List>
    </MotionHighlight>
  )
}

type TabsTriggerProps = React.ComponentProps<typeof TabsPrimitive.Trigger> &
  VariantProps<typeof tabsTriggerVariants>

function TabsTrigger({ className, value, variant, theme, ...props }: TabsTriggerProps) {
  return (
    <MotionHighlightItem
      value={value}
      className="size-full"
      transition={{ type: 'spring', stiffness: 200, damping: 20 }}
    >
      <TabsPrimitive.Trigger
        data-slot="tabs-trigger"
        className={cn(tabsTriggerVariants({ theme, variant, className }))}
        value={value}
        {...props}
      />
    </MotionHighlightItem>
  )
}

type TabsContentProps = React.ComponentProps<typeof TabsPrimitive.Content> &
  HTMLMotionProps<'div'> & {
    transition?: Transition
  }

function TabsContent({
  className,
  children,
  transition = {
    duration: 0.5,
    ease: 'easeInOut',
  },
  ...props
}: TabsContentProps) {
  return (
    <TabsPrimitive.Content asChild {...props}>
      <motion.div
        data-slot="tabs-content"
        className={cn('flex-1 outline-none', className)}
        layout
        initial={{ opacity: 0, y: -10, filter: 'blur(4px)' }}
        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        exit={{ opacity: 0, y: 10, filter: 'blur(4px)' }}
        transition={transition}
        {...props}
      >
        {children}
      </motion.div>
    </TabsPrimitive.Content>
  )
}

type TabsContentsProps = HTMLMotionProps<'div'> & {
  children: React.ReactNode
  className?: string
  transition?: Transition
}

function TabsContents({
  children,
  className,
  transition = { type: 'spring', stiffness: 200, damping: 25 },
  ...props
}: TabsContentsProps) {
  const containerRef = React.useRef<HTMLDivElement | null>(null)

  const [height, setHeight] = React.useState(0)

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  React.useEffect(() => {
    if (!containerRef.current) return

    const resizeObserver = new ResizeObserver((entries) => {
      const newHeight = entries?.[0]?.contentRect.height
      if (!newHeight) return
      requestAnimationFrame(() => {
        setHeight(newHeight)
      })
    })

    resizeObserver.observe(containerRef.current)

    return () => {
      resizeObserver.disconnect()
    }
  }, [children])

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  React.useLayoutEffect(() => {
    if (containerRef.current) {
      const initialHeight = containerRef.current.getBoundingClientRect().height
      setHeight(initialHeight)
    }
  }, [children])

  return (
    <motion.div
      data-slot="tabs-contents"
      layout
      animate={{ height: height }}
      transition={transition}
      className={className}
      {...props}
    >
      <div ref={containerRef}>{children}</div>
    </motion.div>
  )
}

export {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
  TabsContents,
  type TabsProps,
  type TabsListProps,
  type TabsTriggerProps,
  type TabsContentProps,
  type TabsContentsProps,
}
