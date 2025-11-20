import { animate } from 'motion/react'

export function scrollToId(id: string) {
  const el = document.getElementById(id)
  if (!el) return

  const top = el.getBoundingClientRect().top + window.scrollY

  animate(window.scrollY, top, {
    duration: 0.8,
    onUpdate: (latest) => window.scrollTo(0, latest),
  })
}
