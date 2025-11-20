'use client'

import { useShared } from '@ez/shared/hooks/use-shared'
import { Button } from '@ez/shared/ui'
import { StickySection } from '@ez/web/components/ui/sticky-section'
import { ArrowRight, Mail } from 'lucide-react'

export const FinalCTA = () => {
  const { setIsContactDialogOpen } = useShared()

  return (
    <StickySection id="cta">
      <div className="bg-gradient-to-b from-secondary/30 to-background py-20 md:py-32">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl space-y-8 text-center">
            <h2 className="font-bold text-3xl md:text-5xl">
              A hora de medir o invisível é <span className="text-accent">agora</span>
            </h2>

            <div className="space-y-6 text-foreground/90 text-lg leading-relaxed">
              <p>
                Você já tem metas, planos e vontade. O que falta são{' '}
                <span className="font-semibold text-accent">
                  dados reais sobre onde o sistema da sua empresa está perdendo energia
                </span>
                . Sem isso, qualquer estratégia vira tentativa — e tentar custa caro.
              </p>

              <p>
                O Matematizador de Eficiência Empresarial é o divisor entre quem administra por
                instinto e quem lidera com ciência. Ele transforma o que era percepção em clareza
                absoluta, mostrando exatamente onde agir para crescer com precisão.
              </p>

              <p className="pt-4 font-bold text-accent text-xl">
                Pare de gerir no escuro. Comece a decidir com base em verdade matemática.
              </p>
            </div>

            <div className="space-y-4 pt-8">
              <Button
                base="mathematizer"
                className="group px-8 py-6 font-semibold"
                onClick={() => setIsContactDialogOpen(true)}
                rounded="lg"
                size="lg"
                theme="accent"
              >
                <Mail className="mr-2 size-5" />
                Solicitar Diagnóstico Completo
                <ArrowRight className="ml-2 size-5 transition-transform group-hover:translate-x-1" />
              </Button>

              <p className="mx-auto max-w-2xl text-muted-foreground text-sm">
                Aplicações limitadas por trimestre. Prioridade para empresas que buscam resultados
                mensuráveis e alta performance real.
              </p>
            </div>
          </div>
        </div>
      </div>
    </StickySection>
  )
}
