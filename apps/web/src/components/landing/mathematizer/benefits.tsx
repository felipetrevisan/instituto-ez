'use client'

import { StickySection } from '@ez/web/components/ui/sticky-section'
import { BarChart3, CheckCircle, Clock, FileText, Shield, TrendingUp } from 'lucide-react'

const benefits = [
  {
    icon: Clock,
    title: 'Diagnóstico completo em até 3 semanas',
  },
  {
    icon: Shield,
    title: 'Respostas anônimas para garantir sinceridade nas análises',
  },
  {
    icon: BarChart3,
    title: 'Gráficos e indicadores matemáticos claros',
  },
  {
    icon: TrendingUp,
    title: 'Plano de ação estratégico incluído',
  },
  {
    icon: FileText,
    title: 'Relatório executivo com interpretação neuroanalítica',
  },
  {
    icon: CheckCircle,
    title: 'Metodologia validada e resultados mensuráveis',
  },
]

export const Benefits = () => {
  return (
    <StickySection id="benefits">
      <div className="py-20 md:py-32">
        <div className="container mx-auto px-4">
          <h2 className="mb-16 text-center font-bold text-3xl md:text-5xl">
            Benefícios e <span className="text-primary">Diferenciais</span>
          </h2>

          <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-2 lg:grid-cols-3">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon
              return (
                <div
                  className="hover-lift flex items-start gap-4 rounded-lg border border-border bg-card/50 p-6 transition-all duration-300 hover:border-accent/50"
                  // biome-ignore lint/suspicious/noArrayIndexKey: false positive
                  key={index}
                >
                  <div className="flex size-12 flex-shrink-0 items-center justify-center rounded-lg bg-accent/10">
                    <Icon className="ize-6 text-accent" />
                  </div>
                  <p className="font-medium text-lg">{benefit.title}</p>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </StickySection>
  )
}
