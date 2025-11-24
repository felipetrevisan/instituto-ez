'use client'

import { StickySection } from '@ez/web/components/ui/sticky-section'

export const WhatIs = () => {
  return (
    <StickySection id="what-is">
      <div className='bg-secondary py-20 md:py-32 dark:bg-secondary/30'>
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl space-y-8">
            <h2 className="mb-12 text-center font-bold text-3xl md:text-5xl">
              O que é um <span className="text-accent">Matematizador</span>
            </h2>

            <div className="space-y-6 text-foreground/90 text-lg leading-relaxed">
              <p>
                Matematizador é uma ferramenta diagnóstica e analítica criada para{' '}
                <span className="font-medium text-accent">
                  quantificar o desempenho real de uma empresa
                </span>{' '}
                com base em dados e métodos matemáticos. Ele revela como a organização funciona
                internamente, analisando comunicação, produtividade, alinhamento estratégico,
                engajamento e bem-estar corporativo.
              </p>
              <p>
                Mais do que uma avaliação, é um{' '}
                <span className="font-medium text-accent">
                  sistema completo de mensuração de eficiência humana e estrutural
                </span>
                , desenvolvido para transformar percepções subjetivas, como clima, motivação,
                estresse e sinergia entre equipes, em informações objetivas e interpretáveis.
              </p>

              <p>
                O Matematizador é composto por ferramentas neuroanalíticas, cada uma criada para
                atender a uma necessidade específica da empresa. O{' '}
                <span className="font-medium">Matematizador</span> Empresarial avalia estrutura e
                clima organizacional. O{' '}
                <span className="font-medium">Matematizador de Processos</span> identifica gargalos
                e ineficiências operacionais. O{' '}
                <span className="font-medium">Matematizador Administrativo</span> analisa gestão,
                direção e coerência estratégica. O{' '}
                <span className="font-medium">Matematizador Pessoal</span> investiga bem-estar e
                motivação individual.
              </p>

              <p className="pt-4 font-semibold text-accent text-xl">
                Ser neuroanalítico é unir a precisão da matemática à leitura do comportamento
                humano, transformando sensações em números e oferecendo clareza profunda para a
                tomada de decisão.
              </p>
            </div>
          </div>
        </div>
      </div>
    </StickySection>
  )
}
