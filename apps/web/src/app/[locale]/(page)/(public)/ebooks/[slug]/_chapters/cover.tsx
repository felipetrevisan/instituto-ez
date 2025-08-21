type CoverBookProps = React.ComponentProps<'div'> & {
  ref?: React.RefObject<HTMLDivElement>
}

export const CoverBook = ({ children, ref }: CoverBookProps) => {
  return (
    <div
      className="--right --hard --simple overflow-hidden bg-white p-20 shadow-2xl"
      ref={ref}
      data-density="hard"
    >
      <div className="flex h-full w-full flex-col items-stretch justify-between">
        <h2 className="font-bold text-3xl">{children}</h2>
      </div>
    </div>
  )
}
