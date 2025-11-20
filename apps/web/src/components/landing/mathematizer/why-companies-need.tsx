'use client'

import { useShared } from '@ez/shared/hooks/use-shared'
import { Button } from '@ez/shared/ui'
import { StickySection } from '@ez/web/components/ui/sticky-section'
import { ArrowRight } from 'lucide-react'

export const WhyCompaniesNeed = () => {
  const { setIsContactDialogOpen } = useShared()

  return (
    <StickySection id="why-i-need">
      <div className="bg-secondary/30 py-20 md:py-32">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl space-y-8 text-center">
            <h2 className="font-bold text-3xl md:text-5xl">
              Toda estratégia precisa de um <span className="text-accent">mapa</span>.
              <br />O seu começa com dados reais.
            </h2>

            <p className="mx-auto max-w-3xl text-foreground/90 text-xl leading-relaxed">
              As empresas não falham por falta de vontade —{' '}
              <span className="font-semibold text-accent">falham por falta de clareza</span>.
              Enquanto muitas decidem no escuro, o Matematizador oferece uma leitura neuroanalítica
              e matemática do sistema empresarial, mostrando onde estão as falhas invisíveis, as
              oportunidades de ganho e o real potencial de crescimento.
            </p>

            <div className="pt-8">
              <Button
                base="mathematizer"
                className="group px-8 py-6 dark:hover:bg-accent dark:hover:outline-accent"
                onClick={() => setIsContactDialogOpen(true)}
                rounded="lg"
                size="lg"
                theme="background"
                variant="outline"
              >
                Quero clareza sobre meu negócio
                <ArrowRight className="ml-2 size-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </StickySection>
  )
}
