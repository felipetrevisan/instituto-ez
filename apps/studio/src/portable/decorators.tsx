// biome-ignore lint/suspicious/noExplicitAny: using any for decorator props
export const HighlightDecorator = (props: any) => {
  return <span className="bg-tertiary text-tertiary-foreground">{props.children}</span>
}

// biome-ignore lint/suspicious/noExplicitAny: using any for decorator props
export const TextAlignDecorator = (props: any, align: string) => {
  const alignMap = {
    center: 'text-center',
    right: 'text-right',
    left: 'text-left',
    justify: 'text-justify inline',
  } as const

  const classes = alignMap[align as keyof typeof alignMap]

  return <div className={classes}>{props.children}</div>
}
