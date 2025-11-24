import { useShared } from '@ez/shared/hooks/use-shared'
import { Button } from '@ez/shared/ui'
import { StickySection } from '@ez/web/components/ui/sticky-section'
import { ArrowRight, Phone } from 'lucide-react'

export const FinalCTA = () => {
  const { setIsContactDialogOpen } = useShared()

  return (
    <StickySection id="cta">
      <div className="bg-gradient-to-br from-primary/10 via-secondary/5 to-background py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl space-y-8 text-center">
            <h2 className="font-bold text-3xl text-foreground leading-tight md:text-4xl lg:text-5xl">
              Existe um momento em que a vida pede mais leveza e precisão.{' '}
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Quando esse momento chegar, estaremos aqui para ajudar você e sua empresa a
                encontrá-las.
              </span>
            </h2>

            <p className="mx-auto max-w-2xl text-lg text-muted-foreground leading-relaxed md:text-xl">
              Conte-nos sobre seu desafio. Em uma conversa inicial, identificamos as prioridades e
              traçamos o melhor caminho para o seu time evoluir.
            </p>

            <div className="flex flex-col items-center justify-center gap-4 pt-4 sm:flex-row">
              <Button
                base="for-business"
                onClick={() => setIsContactDialogOpen(true)}
                rounded="xl"
                size="lg"
                theme="accent"
              >
                Falar com o Instituto
                <Phone className="size-4 not-even:transition-transform group-hover:rotate-12" />
              </Button>
              <Button
                base="for-business"
                className="group"
                effect="gradient"
                onClick={() => setIsContactDialogOpen(true)}
                rounded="xl"
                scaleEffect={false}
                size="lg"
                theme="tertiary"
              >
                Solicitar proposta personalizada
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </StickySection>
  )
}
