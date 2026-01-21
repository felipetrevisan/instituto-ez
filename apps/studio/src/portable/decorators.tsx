// biome-ignore lint/suspicious/noExplicitAny: using any for decorator props
export const HighlightDecorator = (props: any) => {
  return <span className="bg-tertiary text-tertiary-foreground">{props.children}</span>
}

// biome-ignore lint/suspicious/noExplicitAny: using any for decorator props
export const TextAlignDecorator = (props: any, align: string) => {
  const alignMap = {
    center: 'block text-center',
    right: 'block text-right',
    left: 'block text-left',
    justify: 'block text-justify',
  } as const

  const classes = alignMap[align as keyof typeof alignMap]

  return <div className={classes}>{props.children}</div>
}

// biome-ignore lint/suspicious/noExplicitAny: using any for decorator props
export const FontColorDecorator = (props: any, color: string) => {
  const colorMap = {
    accent: 'text-accent',
    primary: 'text-primary',
    secondary: 'text-secondary',
    tertiary: 'text-tertiary',
    navy: 'text-navy',
    cyan: 'text-cyan',
    coral: 'text-coral',
    white: 'text-white',
    'gradient-primary': 'bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent',
  } as const

  const classes = colorMap[color as keyof typeof colorMap]

  return <span className={classes}>{props.children}</span>
}

// biome-ignore lint/suspicious/noExplicitAny: false positive
export const FontWeightDecorator = (props: any, weight: string) => {
  const weightMap = {
    bold: 'font-bold',
    medium: 'font-medium',
    semibold: 'font-semibold',
    extrabold: 'font-extrabold',
  } as const

  const classes = weightMap[weight as keyof typeof weightMap]

  return <span className={classes}>{props.children}</span>
}
