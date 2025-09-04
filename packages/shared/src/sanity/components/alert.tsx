import { cn } from '@ez/shared/lib/utils'
import { Alert, AlertDescription, AlertTitle, type alertVariants } from '@ez/shared/ui/alert'
import type { VariantProps } from 'class-variance-authority'
import { DynamicIcon, type IconName } from 'lucide-react/dynamic'

type AlertVariants = VariantProps<typeof alertVariants>

type AlertType = {
  variant: AlertVariants['variant']
  theme: AlertVariants['theme']
  icon?: IconName
  title: string
  message: string
}

const AlertComponent = ({ value }: { value: AlertType }) => {
  const { variant, theme, icon, title, message } = value

  const Icon = icon ? <DynamicIcon name={icon} size={20} /> : null

  return (
    <div className={cn('relative flex justify-center')}>
      <Alert variant={variant} theme={theme}>
        <AlertTitle>
          {Icon}
          {title}
        </AlertTitle>
        <AlertDescription>{message}</AlertDescription>
      </Alert>
    </div>
  )
}

export { AlertComponent }
