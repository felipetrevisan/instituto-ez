'use client'

import { Button } from '@ez/shared/ui/button'
import { Card } from '@ez/shared/ui/card'
import { StickySection } from '@ez/web/components/ui/sticky-section'
import { ArrowRight, MapPin, MessageSquare } from 'lucide-react'

export const CoursesSection = () => {
  return (
    <StickySection id="courses">
      <div className="bg-muted/30 py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-6xl space-y-12">
            <div className="mx-auto max-w-3xl space-y-4 text-center">
              <h2 className="font-bold text-3xl text-foreground md:text-4xl">
                Da comunicação à estratégia: um método de evolução organizacional
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Nossos cursos corporativos unem teoria, prática e neurociência aplicada à gestão.
                São formações voltadas para líderes e equipes que buscam alinhar comportamento,
                propósito e resultado.
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
                  <h3 className="font-bold text-2xl text-foreground">Comunicação Inteligente</h3>
                  <p className="font-medium text-lg text-secondary">
                    Fortaleça as conexões que movem sua empresa.
                  </p>
                </div>

                <p className="text-muted-foreground leading-relaxed">
                  Treinamento prático para aprimorar a comunicação entre equipes, líderes e
                  clientes. Desenvolve escuta ativa, clareza nas mensagens e técnicas de negociação
                  baseadas em comportamento humano. O objetivo é reduzir ruídos, fortalecer
                  relacionamentos e aumentar a eficiência nas decisões.
                </p>

                <Button
                  base="for-business"
                  className="group"
                  rounded="lg"
                  scaleEffect={false}
                  theme="default"
                >
                  Quero melhorar a comunicação da equipe
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
                  <MapPin className="size-7 text-secondary-foreground" />
                </div>

                <div className="space-y-3">
                  <h3 className="font-bold text-2xl text-foreground">Estratégia e Planejamento</h3>
                  <p className="font-medium text-lg text-secondary">
                    Transforme objetivos em direção clara.
                  </p>
                </div>

                <p className="text-muted-foreground leading-relaxed">
                  Formação voltada para líderes e gestores que desejam estruturar metas, definir
                  prioridades e alinhar pessoas em torno de um propósito comum. O curso ensina como
                  transformar o planejamento em execução prática, com ferramentas que aumentam foco,
                  produtividade e previsibilidade de resultados.
                </p>

                <Button
                  base="for-business"
                  className="group"
                  rounded="lg"
                  scaleEffect={false}
                  theme="default"
                >
                  Quero alinhar o direcionamento da empresa
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
