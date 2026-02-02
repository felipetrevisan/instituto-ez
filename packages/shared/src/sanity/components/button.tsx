import { useShared } from '@ez/shared/hooks/use-shared'
import { cn } from '@ez/shared/lib/utils'
import { Button, type buttonVariants } from '@ez/shared/ui/button'
import { Link } from '@ez/shared/ui/link'
import type { VariantProps } from 'class-variance-authority'
import type { IconName } from 'lucide-react/dynamic'
import { DynamicIcon } from 'lucide-react/dynamic'

type ButtonVariants = VariantProps<typeof buttonVariants>

type ButtonType = {
  link: { slug: { current: string } }
  variant: ButtonVariants['variant']
  theme: ButtonVariants['theme']
  size: ButtonVariants['size']
  fullWidth: ButtonVariants['fullWidth']
  label: string
  action: 'link' | 'dialog'
  subject: ''
  icon?: IconName
}

const ButtonComponent = ({ value }: { value: ButtonType }) => {
  const { setIsContactDialogOpen, setContactSubject } = useShared()

  const { label, link, variant, theme, size, fullWidth, action, icon, subject } = value

  const handleClick = () => {
    if (action === 'dialog') {
      setIsContactDialogOpen(true)
      setContactSubject(subject)
    }
  }

  const path = link?.slug?.current ? `/${link.slug.current}` : '/'

  const button = (
    <Button
      className="p-5 font-bold"
      fullWidth={fullWidth}
      onClick={action === 'dialog' ? handleClick : undefined}
      size={size}
      theme={theme}
      variant={variant}
    >
      {icon && <DynamicIcon name={icon} />}
      {label}
    </Button>
  )

  return (
    <div className={cn('flex justify-center p-4', { 'w-full': fullWidth })}>
      {action === 'link' ? (
        <Link className={cn({ 'w-full': fullWidth })} href={path}>
          {button}
        </Link>
      ) : (
        button
      )}
    </div>
  )
}

export { ButtonComponent }
