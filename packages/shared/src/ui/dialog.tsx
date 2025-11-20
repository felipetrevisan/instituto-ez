'use client'

import { cn } from '@ez/shared/lib/utils'
import * as DialogPrimitive from '@radix-ui/react-dialog'
import { XIcon } from 'lucide-react'
import { AnimatePresence, type HTMLMotionProps, motion, type Transition } from 'motion/react'
import { createContext, useCallback, useContext, useEffect, useState } from 'react'

type DialogContextType = {
  isOpen: boolean
}

const DialogContext = createContext<DialogContextType | undefined>(undefined)

const useDialog = (): DialogContextType => {
  const context = useContext(DialogContext)
  if (!context) {
    throw new Error('useDialog must be used within a Dialog')
  }
  return context
}

function Dialog({ children, ...props }: React.ComponentProps<typeof DialogPrimitive.Root>) {
  const [isOpen, setIsOpen] = useState(props?.open ?? props?.defaultOpen ?? false)

  useEffect(() => {
    if (props?.open !== undefined) setIsOpen(props.open)
  }, [props?.open])

  const handleOpenChange = useCallback(
    (open: boolean) => {
      setIsOpen(open)
      props.onOpenChange?.(open)
    },
    // biome-ignore lint/correctness/useExhaustiveDependencies: false positive
    [props],
  )

  return (
    <DialogContext.Provider value={{ isOpen }}>
      <DialogPrimitive.Root data-slot="dialog" {...props} onOpenChange={handleOpenChange}>
        {children}
      </DialogPrimitive.Root>
    </DialogContext.Provider>
  )
}

function DialogTrigger({ ...props }: React.ComponentProps<typeof DialogPrimitive.Trigger>) {
  return <DialogPrimitive.Trigger data-slot="dialog-trigger" {...props} />
}

function DialogPortal({ ...props }: React.ComponentProps<typeof DialogPrimitive.Portal>) {
  return <DialogPrimitive.Portal data-slot="dialog-portal" {...props} />
}

function DialogClose({ ...props }: React.ComponentProps<typeof DialogPrimitive.Close>) {
  return <DialogPrimitive.Close data-slot="dialog-close" {...props} />
}

function DialogOverlay({
  className,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Overlay>) {
  return (
    <DialogPrimitive.Overlay
      className={cn(
        'data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-100 bg-background/50 backdrop-blur-xl data-[state=closed]:animate-out data-[state=open]:animate-in',
        className,
      )}
      data-slot="dialog-overlay"
      {...props}
    />
  )
}

type FlipDirection = 'top' | 'bottom' | 'left' | 'right'

type DialogContentProps = React.ComponentProps<typeof DialogPrimitive.Content> &
  HTMLMotionProps<'div'> & {
    from?: FlipDirection
    transition?: Transition
    onClose: () => void
  }

function DialogContent({
  className,
  children,
  from = 'top',
  transition = { type: 'spring', stiffness: 150, damping: 25 },
  onClose,
  ...props
}: DialogContentProps) {
  const { isOpen } = useDialog()

  const initialRotation = from === 'top' || from === 'left' ? '20deg' : '-20deg'
  const isVertical = from === 'top' || from === 'bottom'
  const rotateAxis = isVertical ? 'rotateX' : 'rotateY'

  return (
    <AnimatePresence onExitComplete={onClose}>
      {isOpen && (
        <DialogPortal data-slot="dialog-portal">
          <DialogOverlay asChild>
            <motion.div
              animate={{ opacity: 1, filter: 'blur(0px)' }}
              exit={{ opacity: 0, filter: 'blur(4px)' }}
              initial={{ opacity: 0, filter: 'blur(4px)' }}
              key="dialog-overlay"
              transition={{ duration: 0.2, ease: 'easeInOut' }}
            />
          </DialogOverlay>
          <DialogPrimitive.Content asChild forceMount {...props}>
            <motion.div
              animate={{
                opacity: 1,
                filter: 'blur(0px)',
                transform: `perspective(500px) ${rotateAxis}(0deg) scale(1)`,
              }}
              className={cn(
                'data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 fixed top-[50%] left-[50%] z-100 grid w-full max-w-4xl translate-x-[-50%] translate-y-[-50%] gap-4 rounded-3xl border-2 border-secondary bg-background p-6 shadow-lg shadow-lg duration-200 data-[state=closed]:animate-out data-[state=open]:animate-in sm:max-w-lg',
                className,
              )}
              data-slot="dialog-content"
              exit={{
                opacity: 0,
                filter: 'blur(4px)',
                transform: `perspective(500px) ${rotateAxis}(${initialRotation}) scale(0.8)`,
              }}
              initial={{
                opacity: 0,
                filter: 'blur(4px)',
                transform: `perspective(500px) ${rotateAxis}(${initialRotation}) scale(0.8)`,
              }}
              key="dialog-content"
              transition={transition}
              {...props}
            >
              {children}
              <DialogTrigger asChild>
                <DialogPrimitive.Close className="absolute top-4 right-4 cursor-pointer rounded-full opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-hidden focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-transparent data-[state=open]:text-muted-foreground [&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [&_svg]:shrink-0">
                  <XIcon className="size-8" />
                  <span className="sr-only">Close</span>
                </DialogPrimitive.Close>
              </DialogTrigger>
            </motion.div>
          </DialogPrimitive.Content>
        </DialogPortal>
      )}
    </AnimatePresence>
  )
}

function DialogHeader({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      className={cn(
        'flex flex-col gap-2 rounded-t border-background/30 border-b py-4 text-center sm:text-left md:py-5',
        className,
      )}
      data-slot="dialog-header"
      {...props}
    />
  )
}

function DialogFooter({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      className={cn('flex gap-2 py-6 sm:flex-row sm:justify-end', className)}
      data-slot="dialog-footer"
      {...props}
    />
  )
}

function DialogTitle({ className, ...props }: React.ComponentProps<typeof DialogPrimitive.Title>) {
  return (
    <DialogPrimitive.Title
      className={cn('font-semibold text-primary text-xl leading-none', className)}
      data-slot="dialog-title"
      {...props}
    />
  )
}

function DialogDescription({
  className,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Description>) {
  return (
    <DialogPrimitive.Description
      className={cn('text-muted-foreground text-sm', className)}
      data-slot="dialog-description"
      {...props}
    />
  )
}

export {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
}
