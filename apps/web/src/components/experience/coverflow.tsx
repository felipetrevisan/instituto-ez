'use client'

import { ChevronLeft, ChevronRight } from 'lucide-react'
import { motion } from 'motion/react'
import { useState } from 'react'

/** Galeria em "coverflow": a imagem central de frente, as laterais giradas em profundidade. */
export function Coverflow({ images, alt }: { images: string[]; alt: string }) {
  const [active, setActive] = useState(Math.floor(images.length / 2))
  const go = (delta: number) =>
    setActive((value) => (value + delta + images.length) % images.length)

  return (
    <div className="relative">
      <section
        aria-label={alt}
        aria-roledescription="galeria"
        className="relative mx-auto h-[460px] w-full overflow-hidden sm:h-[560px]"
        style={{ perspective: 1400 }}
      >
        {images.map((src, index) => {
          let offset = index - active
          if (offset > images.length / 2) offset -= images.length
          if (offset < -images.length / 2) offset += images.length
          const abs = Math.abs(offset)
          const visible = abs <= 3
          return (
            <motion.button
              animate={{
                x: `${offset * 62}%`,
                rotateY: offset === 0 ? 0 : offset > 0 ? -48 : 48,
                z: offset === 0 ? 80 : -120 - abs * 80,
                opacity: visible ? 1 - abs * 0.22 : 0,
              }}
              aria-label={`${alt} — foto ${index + 1}`}
              className="-translate-x-1/2 -translate-y-1/2 absolute top-1/2 left-1/2 aspect-[9/16] h-[88%] overflow-hidden rounded-3xl border border-white/10 shadow-[0_40px_80px_-30px_rgba(0,0,0,0.9)]"
              initial={false}
              key={src}
              onClick={() => setActive(index)}
              style={{ zIndex: 20 - abs, pointerEvents: visible ? 'auto' : 'none' }}
              tabIndex={-1}
              transition={{ type: 'spring', stiffness: 80, damping: 18 }}
              type="button"
            >
              {/* biome-ignore lint/performance/noImgElement: imagens em planos 3D */}
              <img
                alt=""
                className="size-full object-cover"
                draggable={false}
                loading="lazy"
                src={src}
              />
              <div
                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 to-transparent transition-opacity"
                style={{ opacity: offset === 0 ? 0.2 : 0.8 }}
              />
            </motion.button>
          )
        })}
      </section>
      <div className="mt-6 flex items-center justify-center gap-5">
        <button
          aria-label="Foto anterior"
          className="ez-btn-ghost !min-h-11 !px-3"
          onClick={() => go(-1)}
          type="button"
        >
          <ChevronLeft className="size-5" />
        </button>
        <span className="text-sm text-white/55 tabular-nums">
          {active + 1} / {images.length}
        </span>
        <button
          aria-label="Próxima foto"
          className="ez-btn-ghost !min-h-11 !px-3"
          onClick={() => go(1)}
          type="button"
        >
          <ChevronRight className="size-5" />
        </button>
      </div>
    </div>
  )
}
