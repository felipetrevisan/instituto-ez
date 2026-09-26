import { Fragment } from 'react'

/** Renderiza texto com trechos **destacados** vindos do conteúdo fixo. */
export function Rich({
  text,
  markClassName = 'ez-mark',
}: {
  text: string
  markClassName?: string
}) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g)

  return (
    <>
      {parts.map((part, index) => {
        const key = `${index}-${part.slice(0, 8)}`
        if (part.startsWith('**') && part.endsWith('**')) {
          return (
            <strong className={markClassName} key={key}>
              {part.slice(2, -2)}
            </strong>
          )
        }
        return <Fragment key={key}>{part}</Fragment>
      })}
    </>
  )
}
