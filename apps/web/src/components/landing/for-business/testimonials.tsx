'use client'

import { useShared } from '@ez/shared/hooks/use-shared'
import { Button } from '@ez/shared/ui/button'
import { Card } from '@ez/shared/ui/card'
import { StickySection } from '@ez/web/components/ui/sticky-section'
import { ArrowRight, Heart, TrendingDown, TrendingUp } from 'lucide-react'

export const TestimonialsSection = () => {
  const { setIsContactDialogOpen } = useShared()

  return (
    <StickySection id="testimonials">
      <div className="bg-card py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-6xl space-y-12">
            <div className="space-y-4 text-center">
              <h2 className="font-bold text-3xl text-foreground md:text-4xl">
                O impacto real nas empresas
              </h2>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              <Card
                base="for-business"
                className="hover:-translate-y-1 space-y-4 bg-gradient-to-br from-card to-primary/5 p-6 text-center hover:shadow-[var(--shadow-card-hover)]"
                theme="accent"
                variant="landing"
              >
                <div className="mx-auto flex size-16 items-center justify-center rounded-full bg-primary/10">
                  <TrendingDown className="size-8 text-primary" />
                </div>
                <div className="space-y-2">
                  <p className="font-bold text-4xl text-primary">30%</p>
                  <p className="font-semibold text-foreground">Redução em conflitos internos</p>
                  <p className="text-muted-foreground text-sm">Após o curso de comunicação</p>
                </div>
              </Card>

              <Card
                base="for-business"
                className="hover:-translate-y-1 space-y-4 bg-gradient-to-br from-card to-secondary/5 p-6 text-center hover:shadow-[var(--shadow-card-hover)]"
                theme="accent"
                variant="landing"
              >
                <div className="mx-auto flex size-16 items-center justify-center rounded-full bg-secondary/10">
                  <TrendingUp className="size-8 text-secondary" />
                </div>
                <div className="space-y-2">
                  <p className="font-bold text-4xl text-secondary">40%</p>
                  <p className="font-semibold text-foreground">Mais produtividade</p>
                  <p className="text-muted-foreground text-sm">Após as palestras de saúde</p>
                </div>
              </Card>

              <Card
                base="for-business"
                className="hover:-translate-y-1 space-y-4 bg-gradient-to-br from-card to-accent/5 p-6 text-center hover:shadow-[var(--shadow-card-hover)]"
                theme="accent"
                variant="landing"
              >
                <div className="mx-auto flex size-16 items-center justify-center rounded-full bg-accent/10">
                  <Heart className="size-8 text-accent" />
                </div>
                <div className="space-y-2">
                  <p className="font-bold text-4xl text-accent">+</p>
                  <p className="font-semibold text-foreground">Clima organizacional</p>
                  <p className="text-muted-foreground text-sm">Queda nas ausências por estresse</p>
                </div>
              </Card>
            </div>

            <div className="pt-4 text-center">
              <Button
                base="for-business"
                className="group"
                effect="gradient"
                onClick={() => setIsContactDialogOpen(true)}
                rounded="xl"
                size="lg"
                theme="accent"
              >
                Quero levar esse impacto para minha empresa
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </StickySection>
  )
}
