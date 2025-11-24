'use client'

import { useShared } from '@ez/shared/hooks/use-shared'
import { Button } from '@ez/shared/ui'
import { StickySection } from '@ez/web/components/ui/sticky-section'
import { ArrowRight } from 'lucide-react'

export const Hero = () => {
  const { setIsContactDialogOpen } = useShared()

  return (
    <StickySection id="hero">
      <div className="relative flex min-h-screen items-center justify-center overflow-hidden pt-16">
        <div
          className="absolute inset-0 bg-center bg-cover opacity-20"
          style={{ backgroundImage: `url(/assets/images/mathematizer/hero.jpeg)` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background" />

        <div className="container relative z-10 mx-auto px-4 py-20 md:py-32">
          <div className="mx-auto max-w-4xl animate-fade-in space-y-8 text-center">
            <h1 className="font-bold text-4xl leading-tight md:text-6xl lg:text-7xl">
              Transforme a Intuição em <span className="text-primary">Precisão</span>
            </h1>

            <p className="mx-auto max-w-3xl text-muted-foreground text-xl leading-relaxed md:text-2xl">
              Use dados matemáticos para descobrir onde sua empresa está perdendo energia e como
              multiplicar seus resultados.
            </p>

            <p className="mx-auto max-w-2xl text-foreground/80 text-lg">
              Os <span className="font-semibold text-accent">Matematizadores</span> são sistemas
              neuroanalíticos que traduzem o comportamento e os processos da sua empresa em métricas
              reais. Clareza, direção e estratégia em números. O{' '}
              <span className="font-semibold text-accent">
                Matematizador de Eficiência Empresarial
              </span>{' '}
            </p>

            <div className="pt-8">
              <Button
                base="mathematizer"
                className="group px-8 py-6 font-semibold"
                onClick={() => setIsContactDialogOpen(true)}
                rounded="lg"
                size="lg"
                theme="accent"
              >
                Quero o Diagnóstico Completo
                <ArrowRight className="ml-2 size-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </div>
          </div>
        </div>

        <div className="absolute right-0 bottom-0 left-0 h-32 bg-gradient-to-t from-background to-transparent" />
      </div>
    </StickySection>
  )
}
