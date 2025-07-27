import { cn } from '@ez/shared/lib/utils'
import { motion } from 'framer-motion'

function Input({
  className,
  type,
  icon: Icon,
  ...props
}: React.ComponentProps<typeof motion.input> & { icon?: React.ElementType }) {
  return (
    <div className="relative">
      {Icon && (
        <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
          <Icon />
        </div>
      )}
      <motion.input
        type={type}
        data-slot="input"
        className={cn(
          'file:text-foreground placeholder:text-muted-foreground selection:bg-tertiary selection:text-tertiary-foreground flex h-12 rounded-3xl border-2 border-tertiary/20 bg-input/10 w-full min-w-0 px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
          'focus-visible:border-tertiary focus-visible:ring-ring/50 focus-visible:ring-[3px]',
          'aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive',
          className,
          {
            'ps-10': Icon,
          },
        )}
        {...props}
      />
    </div>
  )
}

export { Input }
