'use client'

import { Card, CardContent } from '@ez/shared/ui/card'
import { StickySection } from '@ez/web/components/ui/sticky-section'
import { Building2, LineChart, User, Workflow } from 'lucide-react'

const matematizadores = [
  {
    icon: Building2,
    title: 'Matematizador Empresarial',
    problems: 'Desconexão entre áreas, falhas de comunicação e liderança sem clareza',
    action:
      'Mede engajamento, estresse, propósito e sinergia entre setores, convertendo o clima em indicadores concretos',
    result: 'Decisões rápidas, embasadas e estratégicas',
  },
  {
    icon: Workflow,
    title: 'Matematizador de Processos',
    problems: 'Retrabalho, gargalos e burocracia',
    action: 'Mapeia fluxos, integra setores e quantifica a eficiência operacional',
    result: 'Operação fluida e previsível, com redução de desperdícios',
  },
  {
    icon: LineChart,
    title: 'Matematização Administrativa',
    problems: 'Decisões imprecisas, falta de coerência e ruídos na liderança',
    action: 'Avalia gestão, finanças e coerência entre estratégia e execução',
    result: 'Direção sólida e lógica, com domínio sobre o futuro da empresa',
  },
  {
    icon: User,
    title: 'Matematização Pessoal',
    problems: 'Colaboradores desmotivados, estresse e desconexão',
    action: 'Mede saúde emocional e propósito individual, correlacionando com desempenho coletivo',
    result: 'Equipes equilibradas, produtivas e alinhadas à cultura da empresa',
  },
]

export const Mathematizer = () => {
  return (
    <StickySection id="mathematizers">
      <div className="py-20 md:py-32">
        <div className="container mx-auto px-4">
          <h2 className="mb-16 text-center font-bold text-3xl md:text-5xl">
            Os 4 <span className="text-primary">Matematizadores</span>
          </h2>

          <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-2">
            {matematizadores.map((item, index) => {
              const Icon = item.icon
              return (
                // biome-ignore lint/suspicious/noArrayIndexKey: false positive
                <Card base="mathematizer" className="hover-lift" key={index} variant="outline">
                  <CardContent className="space-y-6 p-8">
                    <div className="flex size-16 items-center justify-center rounded-lg bg-accent/10">
                      <Icon className="size-8 text-accent" />
                    </div>

                    <h3 className="font-bold text-2xl">{item.title}</h3>

                    <div className="space-y-4 text-foreground/80">
                      <div>
                        <p className="mb-2 font-semibold text-accent text-sm">
                          Problemas que resolve:
                        </p>
                        <p>{item.problems}</p>
                      </div>

                      <div>
                        <p className="mb-2 font-semibold text-accent text-sm">Como atua:</p>
                        <p>{item.action}</p>
                      </div>

                      <div>
                        <p className="mb-2 font-semibold text-accent text-sm">Resultado:</p>
                        <p className="font-medium text-foreground">{item.result}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </div>
    </StickySection>
  )
}
