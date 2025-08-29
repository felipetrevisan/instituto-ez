import { cn } from '@ez/shared/lib/utils'
import { type VariantProps, cva } from 'class-variance-authority'

const buttonVariants = cva(
  'group relative cursor-pointer overflow-hidden px-12 py-4 font-bold uppercase shadow-2xl [&_svg]:shrink-0',
  {
    variants: {
      variant: {
        default: 'border border-primary',
      },
      theme: {
        default: 'border border-primary',
        secondary: 'border border-secondary',
        tertiary: 'border border-tertiary',
        custom: 'border border-[--header-button-hover-background]',
      },
      size: {
        default: 'max-w-fit px-4 py-2 [&_svg]:size-4',
        sm: 'h-8 px-3 text-xs [&_svg]:size-4',
        lg: 'h-10 px-8 [&_svg]:size-4',
        xl: 'h-14 px-6 text-md [&_svg]:size-5',
        '2xl': 'h-16 px-8 text-md [&_svg]:size-6',
        '3xl': 'h-16 px-8 text-lg [&_svg]:size-7',
        '4xl': 'h-20 px-10 text-xl [&_svg]:size-8',
      },
      rounded: {
        none: 'rounded-none',
        full: 'rounded-full',
        lg: 'rounded-lg',
        xl: 'rounded-2xl',
        '2xl': 'rounded-3xl',
      },
      fullWidth: {
        true: 'w-full',
      },
      sticky: {
        true: '',
      },
    },
    defaultVariants: {
      variant: 'default',
      theme: 'default',
      size: 'default',
      rounded: 'none',
      fullWidth: false,
      sticky: false,
    },
    compoundVariants: [
      {
        variant: 'default',
        theme: 'custom',
        sticky: false,
        class: 'border-[var(--header-button-hover-background)]',
      },
      {
        variant: 'default',
        theme: 'custom',
        sticky: true,
        class: 'border--[var(--header-sticky-button-hover-background)]',
      },
    ],
  },
)

const buttonTextVariants = cva(
  'relative z-10 flex items-center justify-center gap-4 transition-colors duration-500',
  {
    variants: {
      theme: {
        default: 'text-primary group-hover:text-white',
        secondary: 'text-secondary group-hover:text-white',
        tertiary: 'text-secondary group-hover:text-white',
        custom:
          'text-[var(--header-button-default-text)] group-hover:text-[var(--header-button-hover-text)]',
      },
      sticky: {
        true: '',
      },
    },
    defaultVariants: {
      theme: 'default',
    },
    compoundVariants: [
      {
        theme: 'custom',
        sticky: false,
        class:
          'text-[var(--header-button-default-text)] group-hover:text-[var(--header-button-hover-text)]',
      },
      {
        theme: 'custom',
        sticky: true,
        class:
          'text-[var(--header-sticky-button-default-text)] group-hover:text-[var(--header-sticky-button-hover-text)]',
      },
    ],
  },
)

const buttonBaseVariants = cva('absolute inset-0 z-0', {
  variants: {
    theme: {
      default: 'bg-white',
      secondary: 'bg-white',
      tertiary: 'bg-white',
      custom: 'bg-[var(--header-button-default-background)]',
    },
    rounded: {
      none: 'rounded-none',
      full: 'rounded-full',
      lg: 'rounded-lg',
      xl: 'rounded-2xl',
      '2xl': 'rounded-3xl',
    },
    sticky: {
      true: '',
    },
  },
  defaultVariants: {
    theme: 'default',
    rounded: 'none',
  },
  compoundVariants: [
    {
      theme: 'custom',
      sticky: false,
      class: 'bg-[var(--header-button-default-background)]',
    },
    {
      theme: 'custom',
      sticky: true,
      class: 'bg-[var(--header-sticky-button-default-background)]',
    },
  ],
})

const buttonBlobContainerVariants = cva('absolute inset-0 z-0 overflow-hidden', {
  variants: {
    rounded: {
      none: 'rounded-none',
      full: 'rounded-full',
      lg: 'rounded-lg',
      xl: 'rounded-2xl',
      '2xl': 'rounded-3xl',
    },
  },
  defaultVariants: {
    rounded: 'none',
  },
})

const buttonBlobVariants = cva(
  'absolute top-[140%] h-full w-1/4 scale-[1.6] rounded-full transition-all duration-700 ease-out group-hover:top-0',
  {
    variants: {
      theme: {
        default: 'bg-primary',
        secondary: 'bg-secondary',
        tertiary: 'bg-tertiary',
        custom: 'bg-[var(--header-button-hover-background)]',
      },
      sticky: {
        true: '',
      },
    },
    defaultVariants: {
      theme: 'default',
    },
    compoundVariants: [
      {
        theme: 'custom',
        sticky: false,
        class: 'bg-[var(--header-button-hover-background)]',
      },
      {
        theme: 'custom',
        sticky: true,
        class: 'bg-[var(--header-sticky-button-hover-background)]',
      },
    ],
  },
)

type BlobButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  numOfBlobs?: number
} & VariantProps<typeof buttonVariants>

export default function BlobButton({
  children,
  numOfBlobs = 5,
  className,
  variant,
  theme,
  rounded,
  size,
  sticky,
  fullWidth,
  ...props
}: BlobButtonProps) {
  return (
    <button
      type="button"
      className={cn(
        buttonVariants({ variant, size, theme, sticky, rounded, fullWidth, className }),
      )}
      {...props}
    >
      <span className={cn(buttonTextVariants({ theme, sticky }))} data-slot="button-text">
        {children}
      </span>

      <span
        className={cn(buttonBaseVariants({ theme, rounded, sticky }))}
        data-slot="button-base"
      />

      <span className={buttonBlobContainerVariants({ rounded })} data-slot="button-blobs">
        <span className="relative block h-full w-full [filter:url(#goo)]">
          {Array.from({ length: numOfBlobs }).map((_, i) => (
            <span
              // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
              key={i}
              className={cn(buttonBlobVariants({ theme, sticky }))}
              data-slot="button-blob"
              style={{
                left: `${i * 25}%`,
                transitionDelay: `${i * 120}ms`,
              }}
            />
          ))}
        </span>
      </span>
    </button>
  )
}
