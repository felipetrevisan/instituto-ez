'use client'

import { Button } from '@ez/shared/ui/button'
import { Card } from '@ez/shared/ui/card'
import { StickySection } from '@ez/web/components/ui/sticky-section'
import { LineChart, Target, TrendingUp } from 'lucide-react'

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
                    Antes de agir, entendemos como a empresa realmente funciona
                  </h2>

                  <p className="text-lg text-muted-foreground leading-relaxed">
                    Através do{' '}
                    <strong className="text-foreground">
                      Matematizador de Eficiência Empresarial
                    </strong>
                    , identificamos gargalos de comunicação, desalinhamentos estratégicos e fatores
                    que afetam o desempenho humano e estrutural. O diagnóstico mostra onde estão as
                    oportunidades de melhoria e direciona o plano de ação com dados reais.
                  </p>

                  <Button
                    base="for-business"
                    className="mt-4 w-full md:w-auto"
                    rounded="xl"
                    size="lg"
                    theme="accent"
                  >
                    Diagnosticar minha empresa
                  </Button>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2 rounded-lg bg-primary/5 p-6 transition-colors hover:bg-primary/10">
                    <LineChart className="size-8 text-primary" />
                    <h3 className="font-semibold text-foreground">Análise de dados</h3>
                    <p className="text-muted-foreground text-sm">
                      Métricas objetivas de performance
                    </p>
                  </div>

                  <div className="space-y-2 rounded-lg bg-secondary/5 p-6 transition-colors hover:bg-secondary/10">
                    <TrendingUp className="size-8 text-secondary" />
                    <h3 className="font-semibold text-foreground">Oportunidades</h3>
                    <p className="text-muted-foreground text-sm">Identificação de gargalos</p>
                  </div>

                  <div className="col-span-2 space-y-2 rounded-lg bg-accent/5 p-6 transition-colors hover:bg-accent/10">
                    <Target className="size-8 text-accent" />
                    <h3 className="font-semibold text-foreground">Plano direcionado</h3>
                    <p className="text-muted-foreground text-sm">
                      Ações baseadas em evidências concretas
                    </p>
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
