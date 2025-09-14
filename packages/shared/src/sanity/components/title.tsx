import { Subtitle, Title, type titleVariants } from '@ez/shared/ui/title'
import type { VariantProps } from 'class-variance-authority'

type TitleVariants = VariantProps<typeof titleVariants>

type TitleType = {
  variant: TitleVariants['variant']
  size: TitleVariants['size']
  title: string
  subtitle?: string
}

const TitleComponent = ({ value }: { value: TitleType }) => {
  const { title, subtitle, variant, size } = value

  return (
    <div className="flex w-full flex-col items-start justify-start">
      <Title separator size={size} variant={variant}>
        {title}
      </Title>
      {subtitle && (
        <Subtitle className="mt-0" size={size} variant={variant}>
          {subtitle}
        </Subtitle>
      )}
    </div>
  )
}

export { TitleComponent }
