'use client'

import * as TabsPrimitive from '@radix-ui/react-tabs'
import { type HTMLMotionProps, type Transition, motion } from 'motion/react'
import * as React from 'react'

import { cn } from '@ez/shared/lib/utils'
import {
  MotionHighlight,
  MotionHighlightItem,
} from '@ez/shared/ui/animated/effects/motion-highlight'
import { type VariantProps, cva } from 'class-variance-authority'

type TabsProps = React.ComponentProps<typeof TabsPrimitive.Root>

const tabVariants = cva(
  'relative flex flex-col items-center overflow-hidden rounded-full bg-neutral-100 text-center text-white shadow-lg md:flex-row',
  {
    variants: {
      variant: {
        default: 'border border-neutral-200 shadow-sm',
        outline: 'border border-1 border-neutral-200 outline outline-2',
        ghost: 'border-none bg-transparent shadow-none',
        custom: '',
      },
      theme: {
        default:
          'text-primary-foreground shadow-primary/20 outline-primary/40 hover:border-primary/40',
        secondary:
          'text-secondary-foreground shadow-secondary/20 outline-secondary/40 hover:border-secondary/40',
        tertiary:
          'text-tertiary-foreground shadow-tertiary/20 outline-tertiary/40 hover:border-tertiary/40',
        custom: '',
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
          'bg-transparent text-primary shadow-primary/20 outline-primary/40 hover:border-primary/40',
      },
      {
        variant: 'outline',
        theme: 'secondary',
        className:
          'bg-transparent text-secondary shadow-secondary/20 outline-secondary/40 hover:border-secondary/40',
      },
      {
        variant: 'outline',
        theme: 'tertiary',
        className:
          'bg-transparent text-tertiary shadow-tertiary/20 outline-tertiary/40 hover:border-tertiary/40',
      },
      {
        variant: 'ghost',
        theme: 'default',
        className:
          'rounded-none bg-transparent text-primary text-primary shadow-none shadow-primary/20 outline-primary/40 hover:border-primary/40',
      },
      {
        variant: 'ghost',
        theme: 'secondary',
        className:
          'rounded-none bg-transparent text-secondary text-secondary shadow-none shadow-secondary/20 outline-secondary/40 hover:border-secondary/40',
      },
      {
        variant: 'ghost',
        theme: 'tertiary',
        className:
          'rounded-none bg-transparent text-tertiary text-tertiary shadow-none shadow-tertiary/20 outline-tertiary/40 hover:border-tertiary/40',
      },
    ],
  },
)

const tabHighlightVariants = cva('absolute rounded-full', {
  variants: {
    variant: {
      default: '',
      outline: 'border-2 outline-2',
      ghost: '',
      custom: ''
    },
    theme: {
      default: 'bg-gradient-to-r from-primary/40 to-primary/80 text-primary opacity-30 blur-sm',
      secondary:
        'bg-gradient-to-r from-secondary/40 to-secondary/80 text-secondary opacity-30 blur-sm',
      tertiary: 'bg-gradient-to-r from-tertiary/40 to-tertiary/80 text-tertiary opacity-30 blur-sm',
      custom: ''
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
        'border-primary bg-none bg-white text-primary opacity-1 shadow-primary outline-primary',
    },
    {
      variant: 'outline',
      theme: 'secondary',
      className:
        'border-secondary bg-none bg-white text-secondary opacity-1 shadow-secondary outline-secondary',
    },
    {
      variant: 'outline',
      theme: 'tertiary',
      className:
        'border-tertiary bg-none bg-white text-tertiary opacity-1 shadow-tertiary outline-tertiary',
    },
    {
      variant: 'ghost',
      theme: 'default',
      className:
        'border-primary bg-none bg-white text-primary opacity-1 shadow-primary outline-primary',
    },
    {
      variant: 'ghost',
      theme: 'secondary',
      className:
        'border-secondary bg-none bg-white text-secondary opacity-1 shadow-secondary outline-secondary',
    },
    {
      variant: 'ghost',
      theme: 'tertiary',
      className:
        'border-tertiary bg-none bg-white text-tertiary opacity-1 shadow-tertiary outline-tertiary',
    },
  ],
})

const tabsTriggerVariants = cva(
  'relative z-1 inline-flex size-full cursor-pointer items-center justify-center whitespace-nowrap p-4 font-bold ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'data-[state=active]:bg-transparent data-[state=active]:backdrop-blur-md',
        outline: 'data-[state=active]:border-1 data-[state=active]:backdrop-blur-md',
        ghost: 'data-[state=active]:border-1 data-[state=active]:backdrop-blur-md',
        custom: ''
      },
      theme: {
        default: 'text-primary data-[state=active]:text-primary-foreground',
        secondary: 'text-secondary data-[state=active]:text-secondary-foreground',
        tertiary: 'text-tertiary data-[state=active]:text-tertiary-foreground',
        custom: ''
      },
    },
    defaultVariants: {
      theme: 'default',
    },
    compoundVariants: [
      {
        variant: 'outline',
        theme: 'default',
        className: 'data-[state=active]:border-primary data-[state=active]:text-primary',
      },
      {
        variant: 'outline',
        theme: 'secondary',
        className: 'data-[state=active]:border-secondary data-[state=active]:text-secondary',
      },
      {
        variant: 'outline',
        theme: 'tertiary',
        className: 'data-[state=active]:border-tertiary data-[state=active]:text-tertiary',
      },
      {
        variant: 'ghost',
        theme: 'default',
        className:
          'data-[state=active]:border-primary data-[state=active]:bg-primary/10 data-[state=active]:text-primary',
      },
      {
        variant: 'ghost',
        theme: 'secondary',
        className:
          'data-[state=active]:border-secondary data-[state=active]:bg-secondary/10 data-[state=active]:text-secondary',
      },
      {
        variant: 'ghost',
        theme: 'tertiary',
        className:
          'data-[state=active]:border-tertiary data-[state=active]:bg-tertiary/10 data-[state=active]:text-tertiary',
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
  VariantProps<typeof tabsTriggerVariants> & {
    rootClassName?: string
  }

function TabsTrigger({
  rootClassName,
  className,
  value,
  variant,
  theme,
  ...props
}: TabsTriggerProps) {
  return (
    <MotionHighlightItem
      value={value}
      className={cn('size-full', rootClassName)}
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
