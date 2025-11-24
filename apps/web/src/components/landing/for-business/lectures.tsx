'use client'

import { useShared } from '@ez/shared/hooks/use-shared'
import { Button } from '@ez/shared/ui/button'
import { Card } from '@ez/shared/ui/card'
import { StickySection } from '@ez/web/components/ui/sticky-section'
import { ArrowRight, Brain, HeartPulse } from 'lucide-react'

export const LecturesSection = () => {
  const { setIsContactDialogOpen } = useShared()

  return (
    <StickySection id="lectures">
      <div className="bg-card py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-6xl space-y-12">
            <div className="space-y-4 text-center">
              <h2 className="font-bold text-3xl text-foreground md:text-4xl">
                Aprendizado que inspira mudança
              </h2>
              <p className="mx-auto max-w-2xl text-lg text-muted-foreground leading-relaxed">
                Nossas palestras cuidam da saúde do ser humano de forma integral, unindo mente e
                corpo para promover equilíbrio e bem-estar no cotidiano. Com uma abordagem leve e
                acolhedora, apresentam caminhos simples para fortalecer a saúde emocional, cultivar
                autocuidado e construir uma rotina mais saudável e harmoniosa.
              </p>
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
                    <p className="font-medium text-secondary text-sm">
                      Depressão, Ansiedade e Burnout
                    </p>
                  </div>
                </div>

                <p className="text-muted-foreground leading-relaxed">
                  Fundamentada em neurociência, esta palestra explica de forma clara como
                  identificar e entender sinais de depressão, ansiedade e burnout. O conteúdo aborda
                  seus impactos no desempenho, os principais comportamentos de risco e medidas
                  práticas para prevenção e redução de danos. O objetivo é oferecer consciência,
                  orientação e responsabilidade emocional para empresas que buscam atuar dentro das
                  normas e construir um ambiente mais seguro e saudável.
                </p>

                <Button
                  base="for-business"
                  className="group"
                  fullWidth
                  onClick={() => setIsContactDialogOpen(true)}
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
                    <h3 className="font-bold text-foreground text-xl">Saúde e Bem-estar</h3>
                    <p className="font-medium text-secondary text-sm">
                      Autocuidado, Bem-Estar e Equilíbrio Feminino
                    </p>
                  </div>
                </div>

                <p className="text-muted-foreground leading-relaxed">
                  Esta palestra destaca a importância de cultivar uma rotina que fortaleça corpo,
                  mente e identidade feminina. De forma clara e inspiradora, o conteúdo apresenta
                  práticas de autocuidado, organização interna e escolhas que aumentam vitalidade,
                  clareza e bem-estar diário. São compartilhadas orientações para aprimorar a
                  relação com o próprio corpo, desenvolver consciência emocional e construir uma
                  rotina mais equilibrada e leve. A neurociência complementa esse processo ao
                  mostrar como hábitos positivos e estados mentais saudáveis impactam energia,
                  confiança e qualidade de vida.
                </p>

                <Button
                  base="for-business"
                  className="group"
                  fullWidth
                  onClick={() => setIsContactDialogOpen(true)}
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
