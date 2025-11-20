'use client'

import { StickySection } from '@ez/web/components/ui/sticky-section'

export const WhatIs = () => {
  return (
    <StickySection id="what-is">
      <div className="bg-secondary/30 py-20 md:py-32">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl space-y-8">
            <h2 className="mb-12 text-center font-bold text-3xl md:text-5xl">
              O que é o <span className="text-accent">Matematizador de Eficiência Empresarial</span>
            </h2>

            <div className="space-y-6 text-foreground/90 text-lg leading-relaxed">
              <p>
                O Matematizador de Eficiência Empresarial é uma ferramenta diagnóstica e analítica
                desenvolvida para{' '}
                <span className="font-medium text-accent">
                  quantificar o desempenho real de uma empresa
                </span>{' '}
                com base em dados e métodos matemáticos. Ele revela como a organização funciona por
                dentro — em aspectos como comunicação, produtividade, alinhamento estratégico,
                engajamento e bem-estar corporativo.
              </p>

              <p>
                Mais do que uma avaliação, é um{' '}
                <span className="font-medium text-accent">
                  sistema completo de mensuração de eficiência humana e estrutural
                </span>
                , criado para transformar percepções subjetivas — como clima, motivação, estresse e
                sinergia entre equipes — em informações objetivas e interpretáveis.
              </p>

              <p>
                O Matematizador é composto por ferramentas neuroanalíticas, cada uma desenvolvida
                para atender uma necessidade específica da empresa:{' '}
                <span className="font-medium">Matematização Empresarial</span> (estrutura e clima
                organizacional), <span className="font-medium">Matematização de Processos</span>{' '}
                (gargalos e ineficiências operacionais),{' '}
                <span className="font-medium">Matematização Administrativa</span> (gestão, direção e
                coerência estratégica) e <span className="font-medium">Matematização Pessoal</span>{' '}
                (bem-estar e motivação individual).
              </p>

              <p className="pt-4 font-semibold text-accent text-xl">
                Ser neuroanalítico é unir a precisão da matemática à leitura do comportamento humano
                — transformando sensações em números e entregando clareza profunda à direção da
                empresa.
              </p>
            </div>
          </div>
        </div>
      </div>
    </StickySection>
  )
}
