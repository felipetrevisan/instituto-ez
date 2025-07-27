import { cn } from '@ez/shared/lib/utils'
import { type VariantProps, cva } from 'class-variance-authority'

const dividerVariants = cva(
  'h-0 overflow-hidden w-screen bg-white shadow-[0_0_15px_3px_rgba(255,255,255,0.7)] my-4 border-0',
  {
    variants: {
      theme: {
        default: 'shadow-primary',
        secondary: 'shadow-secondary',
        tertiary: 'shadow-tertiary',
      },
    },
    defaultVariants: {
      theme: 'default',
    },
  },
)

function Divider({
  className,
  theme,
  ...props
}: React.ComponentProps<'hr'> & VariantProps<typeof dividerVariants>) {
  return (
    <hr
      className={cn(
        dividerVariants({
          theme,
        }),
        className,
      )}
      {...props}
    />
  )
}

export { Divider, dividerVariants }
