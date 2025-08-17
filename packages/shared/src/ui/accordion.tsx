'use client'

import { cn } from '@ez/shared/lib/utils'
import * as AccordionPrimitive from '@radix-ui/react-accordion'
import { type VariantProps, cva } from 'class-variance-authority'
import { ChevronDownIcon } from 'lucide-react'
import { AnimatePresence, type HTMLMotionProps, type Transition, motion } from 'motion/react'
import * as React from 'react'

const accordionVariants = cva('relative', {
  variants: {
    theme: {
      default:
        '**:data-[slot=accordion-item]:border-primary **:data-[slot=accordion-content]:text-primary **:data-[slot=accordion-trigger]:text-primary **:data-[slot=accordion-trigger]:hover:bg-primary/10',
      secondary:
        '**:data-[slot=accordion-item]:border-secondary **:data-[slot=accordion-content]:text-secondary **:data-[slot=accordion-trigger]:text-secondary **:data-[slot=accordion-trigger]:hover:bg-secondary/10',
      tertiary:
        '**:data-[slot=accordion-item]:border-tertiary **:data-[slot=accordion-content]:text-tertiary **:data-[slot=accordion-trigger]:text-tertiary **:data-[slot=accordion-trigger]:hover:bg-tertiary/10',
      custom: '**:data-[slot=accordion-item]:white **:data-[slot=accordion-item]:border-[var(--secondary-c)] **:data-[slot=accordion-content]:text-[var(--secondary-c)] **:data-[slot=accordion-trigger]:text-[var(--secondary-c)] **:data-[slot=accordion-trigger]:hover:bg-[var(--secondary-c)]/10',
    },
    rounded: {
      none: '**:data-[slot=accordion-item]:rounded-none **:data-[slot=accordion-trigger]:rounded-none',
      full: '**:data-[slot=accordion-item]:rounded-full **:data-[slot=accordion-trigger]:rounded-full',
      lg: '**:data-[slot=accordion-item]:rounded-lg **:data-[slot=accordion-trigger]:rounded-lg',
      xl: '**:data-[slot=accordion-item]:rounded-2xl **:data-[slot=accordion-trigger]:rounded-2xl',
      '2xl':
        '**:data-[slot=accordion-item]:rounded-3xl **:data-[slot=accordion-trigger]:rounded-3xl',
    },
    size: {
      default:
        '**:data-[slot=accordion-trigger]:clamp-[text,base,lg] [**:data-[slot=accordion-content]>div]:clamp-[text,base,lg]',
      sm: '**:data-[slot=accordion-trigger]:clamp-[text,sm,base] [**:data-[slot=accordion-content]>div]:clamp-[text,sm,base]',
      lg: '**:data-[slot=accordion-trigger]:clamp-[text,lg,xl] [**:data-[slot=accordion-content]>div]:clamp-[text,lg,xl]',
      xl: '**:data-[slot=accordion-trigger]:clamp-[text,xl,2xl] [**:data-[slot=accordion-content]>div]:clamp-[text,xl,2xl]',
    },
  },
  defaultVariants: {
    theme: 'default',
    rounded: 'none',
    size: 'default',
  },
})

type AccordionItemContextType = {
  isOpen: boolean
  setIsOpen: (open: boolean) => void
}
const AccordionItemContext = React.createContext<AccordionItemContextType | undefined>(undefined)

const useAccordionItem = (): AccordionItemContextType => {
  const context = React.useContext(AccordionItemContext)
  if (!context) {
    throw new Error('useAccordionItem must be used within an AccordionItem')
  }
  return context
}

type AccordionProps = React.ComponentProps<typeof AccordionPrimitive.Root> &
  VariantProps<typeof accordionVariants>

function Accordion({ theme, rounded, size, className, ...props }: AccordionProps) {
  return (
    <AccordionPrimitive.Root
      data-slot="accordion"
      {...props}
      className={cn(accordionVariants({ theme, rounded, size }), className)}
    />
  )
}

type AccordionItemProps = React.ComponentProps<typeof AccordionPrimitive.Item> & {
  children: React.ReactNode
}

function AccordionItem({ children, className, ...props }: AccordionItemProps) {
  const [isOpen, setIsOpen] = React.useState(false)

  return (
    <AccordionItemContext.Provider value={{ isOpen, setIsOpen }}>
      <AccordionPrimitive.Item
        data-slot="accordion-item"
        className={cn('relative mb-3 border shadow-xl backdrop-blur-md', className)}
        {...props}
      >
        {children}
      </AccordionPrimitive.Item>
    </AccordionItemContext.Provider>
  )
}

type AccordionTriggerProps = React.ComponentProps<typeof AccordionPrimitive.Trigger> & {
  transition?: Transition
  chevron?: boolean
  ref?: React.RefObject<HTMLButtonElement>
}

function AccordionTrigger({
  ref,
  className,
  children,
  transition = { type: 'spring', stiffness: 150, damping: 22 },
  chevron = true,
  ...props
}: AccordionTriggerProps) {
  const triggerRef = React.useRef<HTMLButtonElement | null>(null)
  React.useImperativeHandle(ref, () => triggerRef.current as HTMLButtonElement)
  const { isOpen, setIsOpen } = useAccordionItem()

  React.useEffect(() => {
    const node = triggerRef.current
    if (!node) return

    const observer = new MutationObserver((mutationsList) => {
      // biome-ignore lint/complexity/noForEach: <explanation>
      mutationsList.forEach((mutation) => {
        if (mutation.attributeName === 'data-state') {
          const currentState = node.getAttribute('data-state')
          setIsOpen(currentState === 'open')
        }
      })
    })
    observer.observe(node, {
      attributes: true,
      attributeFilter: ['data-state'],
    })
    const initialState = node.getAttribute('data-state')
    setIsOpen(initialState === 'open')
    return () => {
      observer.disconnect()
    }
  }, [setIsOpen])

  return (
    <AccordionPrimitive.Header data-slot="accordion-header" className="flex">
      <AccordionPrimitive.Trigger
        ref={triggerRef}
        data-slot="accordion-trigger"
        className={cn(
          'flex flex-1 items-start justify-between gap-4 px-4 py-5 text-left font-semibold text-md outline-none transition-all focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50 [&[data-state=open]>svg]:rotate-180',
          className,
        )}
        {...props}
      >
        {children}

        {chevron && (
          <motion.div
            data-slot="accordion-trigger-chevron"
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={transition}
          >
            <ChevronDownIcon className="size-5 shrink-0" />
          </motion.div>
        )}
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  )
}

type AccordionContentProps = React.ComponentProps<typeof AccordionPrimitive.Content> &
  HTMLMotionProps<'div'> & {
    transition?: Transition
  }

function AccordionContent({
  className,
  children,
  transition = { type: 'spring', stiffness: 150, damping: 22 },
  ...props
}: AccordionContentProps) {
  const { isOpen } = useAccordionItem()

  return (
    <AnimatePresence>
      {isOpen && (
        <AccordionPrimitive.Content forceMount {...props}>
          <motion.div
            key="accordion-content"
            data-slot="accordion-content"
            initial={{ height: 0, opacity: 0, '--mask-stop': '0%' }}
            animate={{ height: 'auto', opacity: 1, '--mask-stop': '100%' }}
            exit={{ height: 0, opacity: 0, '--mask-stop': '0%' }}
            transition={transition}
            style={{
              maskImage: 'linear-gradient(black var(--mask-stop), transparent var(--mask-stop))',
              WebkitMaskImage:
                'linear-gradient(black var(--mask-stop), transparent var(--mask-stop))',
            }}
            className="overflow-hidden"
            {...props}
          >
            <div className={cn('pt-0 pb-4', className)}>{children}</div>
          </motion.div>
        </AccordionPrimitive.Content>
      )}
    </AnimatePresence>
  )
}

export {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
  useAccordionItem,
  type AccordionItemContextType,
  type AccordionProps,
  type AccordionItemProps,
  type AccordionTriggerProps,
  type AccordionContentProps,
  accordionVariants,
}
