import { useEffect, useRef } from 'react'

// biome-ignore lint/suspicious/noExplicitAny: usage of 'any' is required for generic ref
export const useDimensions = (ref: React.RefObject<any>) => {
  const dimensions = useRef({ width: 0, height: 0 })

  // biome-ignore lint/correctness/useExhaustiveDependencies: ref is stable and intentional
  useEffect(() => {
    dimensions.current.width = ref.current.offsetWidth
    dimensions.current.height = ref.current.offsetHeight
  }, [])

  return dimensions.current
}
