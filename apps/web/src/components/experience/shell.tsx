'use client'

import type { ReactNode } from 'react'
import { useEffect } from 'react'
import { ContactDialog } from './contact'
import { Footer } from './footer'
import { Header } from './header'
import { NeuralField } from './scene/neural-field'
import { sceneStore } from './scene/store'
import './experience.css'

/** Casca persistente da experiência: cena WebGL, cabeçalho, rodapé e contato. */
export function ExperienceShell({ children }: { children: ReactNode }) {
  // Propaga a cor da página para o <html>, alcançando também portais (dialogs).
  useEffect(() => {
    const apply = () => {
      const { accent, accentSecondary } = sceneStore.get()
      document.documentElement.style.setProperty('--ez-accent', accent)
      document.documentElement.style.setProperty('--ez-accent-2', accentSecondary)
    }
    apply()
    return sceneStore.subscribe(apply)
  }, [])

  return (
    <div className="ez-root">
      <div aria-hidden className="ez-backdrop" />
      <NeuralField />
      <div aria-hidden className="ez-vignette" />
      <Header />
      <main className="ez-content">{children}</main>
      <div className="ez-content">
        <Footer />
      </div>
      <ContactDialog />
    </div>
  )
}
