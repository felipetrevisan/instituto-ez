'use client'

import { useShared } from '@ez/shared/hooks/use-shared'
import { Button } from '@ez/shared/ui'
import { StickySection } from '@ez/web/components/ui/sticky-section'
import { ArrowRight, Building2 } from 'lucide-react'

export const Hero = () => {
  const { setIsContactDialogOpen } = useShared()

  return (
    <StickySection id="hero">
      <div className="relative flex min-h-[90vh] items-center justify-center overflow-hidden bg-gradient-to-br from-background via-background to-muted/30">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,hsl(var(--primary)/0.05),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,hsl(var(--secondary)/0.05),transparent_50%)]" />

        <div className="container relative z-10 mx-auto px-4 py-20">
          <div className="fade-in slide-in-from-bottom-4 mx-auto max-w-4xl animate-in space-y-8 text-center duration-1000">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 font-medium text-primary text-sm">
              <Building2 className="size-4" />
              <span>Soluções Corporativas</span>
            </div>

            <h1 className="font-bold text-4xl text-foreground leading-tight md:text-5xl lg:text-6xl">
              Evoluir o desempenho da empresa começa pelo{' '}
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                desenvolvimento das pessoas
              </span>
            </h1>

            <p className="mx-auto max-w-3xl text-lg text-muted-foreground leading-relaxed md:text-xl">
              Unimos ciência do comportamento, saúde mental e autoconsciência para promover
              equilíbrio, bem-estar e relações mais saudáveis no ambiente de trabalho.
            </p>

            <div className="flex flex-col items-center justify-center gap-4 pt-4 sm:flex-row">
              <Button
                base="for-business"
                className="group"
                effect="gradient"
                onClick={() => setIsContactDialogOpen(true)}
                rounded="xl"
                size="lg"
                theme="accent"
              >
                Solicitar proposta
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
              </Button>
              <Button
                base="for-business"
                onClick={() => setIsContactDialogOpen(true)}
                rounded="xl"
                size="lg"
                theme="tertiary"
              >
                Falar com o Instituto
              </Button>
            </div>
          </div>
        </div>
      </div>
    </StickySection>
  )
}
