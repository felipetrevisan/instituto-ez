'use client'

import { Button } from '@ez/shared/ui/button'
import { Card } from '@ez/shared/ui/card'
import { StickySection } from '@ez/web/components/ui/sticky-section'
import { ArrowRight, Brain, HeartPulse } from 'lucide-react'

export const LecturesSection = () => {
  return (
    <StickySection id="lectures">
      <div className="bg-card py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-6xl space-y-12">
            <div className="space-y-4 text-center">
              <h2 className="font-bold text-3xl text-foreground md:text-4xl">
                Aprendizado que inspira mudança
              </h2>
            </div>

            <div className="grid gap-8 md:grid-cols-2">
              <Card
                base="for-business"
                className="space-y-6 border-l-4 border-l-primary p-8 hover:shadow-[var(--shadow-card-hover)]"
                theme="accent"
                variant="landing"
              >
                <div className="flex items-start gap-4">
                  <div className="flex size-12 flex-shrink-0 items-center justify-center rounded-lg bg-primary/10">
                    <Brain className="size-6 text-primary" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-bold text-foreground text-xl">Saúde Mental nas Empresas</h3>
                    <div className="inline-block rounded-full bg-primary/10 px-3 py-1 font-semibold text-primary text-xs">
                      NR-1 e NR-12
                    </div>
                  </div>
                </div>

                <p className="text-muted-foreground leading-relaxed">
                  Capacitação atualizada conforme as normas NR-1 e NR-12. Aborda segurança em
                  máquinas e equipamentos e prevenção de riscos psicossociais, promovendo ambientes
                  de trabalho mais saudáveis, conscientes e produtivos.
                </p>

                <Button
                  base="for-business"
                  className="group"
                  fullWidth
                  rounded="lg"
                  scaleEffect={false}
                  theme="secondary"
                >
                  Solicitar palestra NR-1 e NR-12
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Card>

              <Card
                base="for-business"
                className="space-y-6 border-l-4 border-l-secondary p-8 hover:shadow-[var(--shadow-card-hover)]"
                theme="accent"
                variant="landing"
              >
                <div className="flex items-start gap-4">
                  <div className="flex size-12 flex-shrink-0 items-center justify-center rounded-lg bg-secondary/10">
                    <HeartPulse className="size-6 text-secondary" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-bold text-foreground text-xl">Saúde da Mulher</h3>
                    <p className="font-medium text-secondary text-sm">Corpo e Mente no Trabalho</p>
                  </div>
                </div>

                <p className="text-muted-foreground leading-relaxed">
                  Conteúdo voltado à valorização da saúde feminina dentro das empresas. Une
                  neurociência e bem-estar para abordar temas como autocuidado, equilíbrio hormonal,
                  saúde emocional e produtividade sustentável.
                </p>

                <Button
                  base="for-business"
                  className="group"
                  fullWidth
                  rounded="lg"
                  scaleEffect={false}
                  theme="secondary"
                >
                  Quero levar essa palestra
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </StickySection>
  )
}
