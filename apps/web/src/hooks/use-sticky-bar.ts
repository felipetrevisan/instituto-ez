import { useEffect, useState } from 'react'

// biome-ignore lint/suspicious/noExplicitAny: generic debounce utility needs any
function debounce<T extends (...args: any[]) => void>(fn: T, delay: number) {
  let timeoutId: ReturnType<typeof setTimeout>
  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId)
    timeoutId = setTimeout(() => fn(...args), delay)
  }
}

export function useStickyBar(scrollThreshold = 200, debounceDelay = 100) {
  const [showSticky, setShowSticky] = useState(false)

  useEffect(() => {
    const handleScroll = debounce(() => {
      if (window.scrollY > scrollThreshold) {
        setShowSticky(true)
      } else {
        setShowSticky(false)
      }
    }, debounceDelay)

    window.addEventListener('scroll', handleScroll)
    handleScroll()

    return () => window.removeEventListener('scroll', handleScroll)
  }, [scrollThreshold, debounceDelay])

  return showSticky
}
