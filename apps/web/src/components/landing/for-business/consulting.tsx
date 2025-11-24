'use client'

import { useShared } from '@ez/shared/hooks/use-shared'
import { Button } from '@ez/shared/ui/button'
import { Card } from '@ez/shared/ui/card'
import { StickySection } from '@ez/web/components/ui/sticky-section'
import { Calendar, Target, TrendingUp, Users } from 'lucide-react'

export const ConsultingSection = () => {
  const { setIsContactDialogOpen } = useShared()

  return (
    <StickySection id="consulting">
      <div className="bg-gradient-to-br from-muted/30 to-background py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-5xl">
            <Card
              base="for-business"
              className="p-8 shadow-[var(--shadow-card)] transition-shadow hover:shadow-[var(--shadow-card-hover)] md:p-12"
              theme="accent"
              variant="landing"
            >
              <div className="space-y-8">
                <div className="space-y-4 text-center">
                  <h2 className="font-bold text-3xl text-foreground md:text-4xl">
                    Para empresas que buscam evolução contínua
                  </h2>
                  <p className="mx-auto max-w-2xl text-lg text-muted-foreground leading-relaxed">
                    Quando a transformação precisa ser mais profunda, o Instituto EZ oferece
                    consultorias personalizadas com mentoria estratégica.
                  </p>
                </div>

                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                  <div className="space-y-2 rounded-lg bg-primary/5 p-5 text-center transition-colors hover:bg-primary/10">
                    <Users className="mx-auto size-8 text-primary" />
                    <h4 className="font-semibold text-foreground">Desenvolvimento empresarial</h4>
                  </div>

                  <div className="space-y-2 rounded-lg bg-secondary/5 p-5 text-center transition-colors hover:bg-secondary/10">
                    <Target className="mx-auto size-8 text-secondary" />
                    <h4 className="font-semibold text-foreground">Alinhamento de processos</h4>
                  </div>

                  <div className="space-y-2 rounded-lg bg-accent/5 p-5 text-center transition-colors hover:bg-accent/10">
                    <TrendingUp className="mx-auto size-8 text-accent" />
                    <h4 className="font-semibold text-foreground">Indicadores de desempenho</h4>
                  </div>

                  <div className="space-y-2 rounded-lg bg-primary/5 p-5 text-center transition-colors hover:bg-primary/10">
                    <Calendar className="mx-auto size-8 text-primary" />
                    <h4 className="font-semibold text-foreground">Acompanhamento contínuo</h4>
                  </div>
                </div>

                <div className="space-y-4 pt-4 text-center">
                  <p className="text-muted-foreground leading-relaxed">
                    O resultado é uma{' '}
                    <strong className="text-foreground">
                      cultura organizacional mais coerente, humana e eficiente
                    </strong>
                    .
                  </p>
                  <Button
                    base="for-business"
                    className="group"
                    effect="gradient"
                    onClick={() => setIsContactDialogOpen(true)}
                    rounded="xl"
                    size="lg"
                    theme="accent"
                  >
                    Clique aqui para saber mais
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </StickySection>
  )
}
