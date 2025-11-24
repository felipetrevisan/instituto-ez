'use client'

import { useShared } from '@ez/shared/hooks/use-shared'
import { Button } from '@ez/shared/ui/button'
import { Card } from '@ez/shared/ui/card'
import { StickySection } from '@ez/web/components/ui/sticky-section'
import { ArrowRight, Brain, MessageSquare } from 'lucide-react'

export const CoursesSection = () => {
  const { setIsContactDialogOpen } = useShared()

  return (
    <StickySection id="courses">
      <div className="bg-muted/30 py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-6xl space-y-12">
            <div className="mx-auto max-w-3xl space-y-4 text-center">
              <h2 className="font-bold text-3xl text-foreground md:text-4xl">
                Quando a comunicação se alinha à mente, tudo avança com mais consistência
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Nossos workshops combinam teoria, prática e conhecimentos da neurociência para
                ampliar competências de gestão e comportamento. São formações desenvolvidas para
                profissionais e equipes que buscam alinhar propósito, evolução e desempenho.
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-2">
              <Card
                base="for-business"
                className="hover:-translate-y-1 space-y-6 p-8 hover:shadow-[var(--shadow-card-hover)]"
                theme="accent"
                variant="landing"
              >
                <div className="flex size-14 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-primary/70">
                  <MessageSquare className="size-7 text-primary-foreground" />
                </div>

                <div className="space-y-3">
                  <h3 className="font-bold text-2xl text-foreground">
                    Rapport Comunicação Inteligente
                  </h3>
                  <p className="font-medium text-lg text-secondary">
                    Aprenda a criar conexões genuínas e estratégicas por meio de uma comunicação
                    consciente e eficaz.
                  </p>
                </div>

                <p className="text-muted-foreground leading-relaxed">
                  Neste workshop, você aprende as bases técnicas do rapport e como ajustar linguagem
                  verbal e não verbal para gerar empatia, confiança e sintonia em qualquer
                  interação. Com fundamentos da neurociência e da psicologia social, o conteúdo
                  mostra como identificar padrões emocionais, interpretar sinais comportamentais e
                  adaptar sua comunicação de forma assertiva. Exercícios práticos demonstram como a
                  inteligência comunicativa fortalece negociações, melhora relações corporativas e
                  potencializa resultados.
                </p>
                <div className="space-y-2 text-muted-foreground text-sm">
                  <p>
                    <span className="font-semibold text-foreground">Formato:</span> Workshop
                    presencial, 1h30 a 2h
                  </p>
                  <p>
                    <span className="font-semibold text-foreground">Foco:</span> Comunicação,
                    conexão e persuasão
                  </p>
                </div>

                <Button
                  base="for-business"
                  className="group"
                  fullWidth
                  onClick={() => setIsContactDialogOpen(true)}
                  rounded="lg"
                  scaleEffect={false}
                  theme="default"
                >
                  Quero esse workshop
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Card>

              <Card
                base="for-business"
                className="hover:-translate-y-1 space-y-6 p-8 hover:shadow-[var(--shadow-card-hover)]"
                theme="accent"
                variant="landing"
              >
                <div className="flex size-14 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-secondary/70">
                  <Brain className="size-7 text-secondary-foreground" />
                </div>

                <div className="space-y-3">
                  <h3 className="font-bold text-2xl text-foreground">
                    Neurociência do Pensamento Positivo
                  </h3>
                  <p className="font-medium text-lg text-secondary">
                    Entenda, de forma científica, como pensamentos moldam emoções, decisões e
                    resultados.
                  </p>
                </div>

                <p className="text-muted-foreground leading-relaxed">
                  Neste workshop, você descobre como padrões de pensamento influenciam diretamente o
                  funcionamento cerebral, regulando emoções, fortalecendo a resiliência e moldando a
                  forma como lidamos com desafios. Com base em estudos da neurociência, o conteúdo
                  explica como estados mentais positivos ativam redes neurais relacionadas à
                  criatividade, foco e tomada de decisão. Estratégias práticas mostram como treinar
                  o cérebro para adotar perspectivas mais construtivas, aumentando clareza,
                  equilíbrio emocional e desempenho.
                </p>
                <div className="space-y-2 text-muted-foreground text-sm">
                  <p>
                    <span className="font-semibold text-foreground">Formato:</span> Workshop
                    presencial, 1h30 a 2h
                  </p>
                  <p>
                    <span className="font-semibold text-foreground">Foco:</span> Ciência,
                    mentalidade e resiliência
                  </p>
                </div>

                <Button
                  base="for-business"
                  className="group"
                  fullWidth
                  onClick={() => setIsContactDialogOpen(true)}
                  rounded="lg"
                  scaleEffect={false}
                  theme="default"
                >
                  Quero esse workshop
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
