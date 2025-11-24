'use client'

import { Card } from '@ez/shared/ui/card'
import { StickySection } from '@ez/web/components/ui/sticky-section'
import { Brain, Heart, Target, TrendingUp } from 'lucide-react'

export const DiagnosticSection = () => {
  return (
    <StickySection id="diagnostics">
      <div className="bg-card py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-5xl">
            <Card
              base="for-business"
              className="p-8 shadow-[var(--shadow-card)] transition-shadow hover:shadow-[var(--shadow-card-hover)] md:p-12"
              theme="accent"
              variant="landing"
            >
              <div className="grid items-center gap-8 md:grid-cols-2">
                <div className="space-y-6">
                  <div className="inline-flex items-center gap-2 rounded-full bg-secondary/10 px-4 py-2 font-medium text-secondary text-sm">
                    <Target className="h-4 w-4" />
                    <span>Diagnóstico inicial</span>
                  </div>

                  <h2 className="font-bold text-3xl text-foreground leading-tight md:text-4xl">
                    Transformação começa de dentro, onde corpo e mente se alinham.
                  </h2>

                  <p className="text-lg text-muted-foreground leading-relaxed">
                    Compreender nossos processos internos fortalece organização mental, estabilidade
                    emocional e capacidade de adaptação. Quando cuidamos da saúde física e
                    emocional, criamos espaço para decisões mais claras, menos sobrecarga e uma
                    sensação maior de presença e bem-estar ao longo do dia. Esse olhar interno,
                    guiado por conhecimento científico, favorece um ritmo mais equilibrado e
                    sustentável de evolução.
                  </p>
                </div>

                <div className="grid grid-cols-1 gap-4">
                  <div className="flex items-start gap-2 space-y-2 rounded-lg bg-primary/5 p-6 transition-colors hover:bg-primary/10">
                    <TrendingUp className="size-8 text-primary" />
                    <h3 className="font-semibold text-foreground">Desenvolvimento Contínuo</h3>
                  </div>

                  <div className="flex items-start gap-2 space-y-2 rounded-lg bg-secondary/5 p-6 transition-colors hover:bg-secondary/10">
                    <Heart className="size-8 text-secondary" />
                    <h3 className="font-semibold text-foreground">Saúde Integral</h3>
                  </div>

                  <div className="flex items-start gap-2 space-y-2 rounded-lg bg-accent/5 p-6 transition-colors hover:bg-accent/10">
                    <Brain className="size-8 text-accent" />
                    <h3 className="font-semibold text-foreground">Neurociência</h3>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </StickySection>
  )
}
