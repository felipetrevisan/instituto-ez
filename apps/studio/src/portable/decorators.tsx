// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export const HighlightDecorator = (props: any) => {
  return <span className="bg-tertiary text-tertiary-foreground">{props.children}</span>
}

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export const TextAlignDecorator = (props: any, align: string) => {
  const alignMap = {
    center: 'text-center',
    right: 'text-right',
    left: 'text-left',
    justify: 'text-justify',
  } as const

  const classes = alignMap[align as keyof typeof alignMap]

  return <div className={classes}>{props.children}</div>
}
