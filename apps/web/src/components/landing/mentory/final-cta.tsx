'use client'

import { useShared } from '@ez/shared/hooks/use-shared'
import { Button } from '@ez/shared/ui'
import { Icon } from '@ez/web/components/ui/icon'
import { StickySection } from '@ez/web/components/ui/sticky-section'
import type { SectionMentoringCTA } from '@ez/web/types/landing/mentoring'
import { createPortableComponents } from '@ez/web/utils/create-portable-components'
import { PortableText } from '@portabletext/react'
import { motion } from 'motion/react'

export const FinalCTA = ({ data, locale }: { data: SectionMentoringCTA; locale: string }) => {
  const { setIsContactDialogOpen } = useShared()

  const left = data.items.filter((item) => item.position === 'left')
  const right = data.items.filter((item) => item.position === 'right')

  return (
    <StickySection id="cta">
      <div className="relative overflow-hidden bg-gradient-to-br from:bg-gray-light to:bg-background py-16 sm:py-20 md:py-28">
        <div className="container mx-auto px-6 md:px-8">
          <div className="relative mx-auto max-w-6xl">
            {left.length > 0 && (
              <div className="-left-12 absolute top-1/4 hidden animate-fade-in lg:block">
                <div className="flex flex-col gap-4">
                  {left?.map((item, index) => {
                    return (
                      <div className="text-right" key={`left-${index}`}>
                        <div className="rounded-2xl border border-white/20 bg-white/10 p-6 shadow-elegant backdrop-blur-sm">
                          <div className="flex items-center gap-4">
                            <div>
                              <p className="font-bold text-navy">{item.title[locale]}</p>
                              <p className="text-gray-warm text-sm">{item.description[locale]}</p>
                            </div>
                            {item.icon && (
                              <div className="rounded-xl bg-coral/20 p-3">
                                <Icon className="size-6 text-coral" name={item.icon} />
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            )}

            {right.length > 0 && (
              <div className="-right-12 absolute top-1/4 hidden animate-fade-in lg:block">
                <div className="flex flex-col gap-4">
                  {right?.map((item, index) => {
                    return (
                      <div key={`right-${index}`}>
                        <div className="rounded-2xl border border-white/20 bg-white/10 p-6 shadow-elegant backdrop-blur-sm">
                          <div className="flex items-center gap-4">
                            {item.icon && (
                              <div className="rounded-xl bg-cyan/20 p-3">
                                <Icon className="size-6 text-cyan" name={item.icon} />
                              </div>
                            )}
                            <div>
                              <p className="font-bold text-navy">{item.title[locale]}</p>
                              <p className="text-gray-warm text-sm">{item.description[locale]}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            )}

            {/* <div
              className="-left-12 absolute top-1/4 hidden animate-fade-in lg:block"
              style={{ animationDelay: '0.2s' }}
            >
              <div className="w-64 rounded-2xl border border-white/20 bg-white/10 p-6 shadow-elegant backdrop-blur-sm">
                <div className="mb-3 flex items-center gap-4">
                  <div className="rounded-xl bg-coral/20 p-3">
                    <TrendingUp className="h-6 w-6 text-coral" />
                  </div>
                  <div>
                    <p className="font-bold text-2xl text-navy">15+</p>
                    <p className="text-gray-warm text-sm">Anos de Experiência</p>
                  </div>
                </div>
              </div>
            </div> */}

            {/* <div
              className="-right-12 absolute top-1/4 hidden animate-fade-in lg:block"
              style={{ animationDelay: '0.4s' }}
            >
              <div className="w-64 rounded-2xl border border-white/20 bg-white/10 p-6 shadow-elegant backdrop-blur-sm">
                <div className="mb-3 flex items-center gap-4">
                  <div className="rounded-xl bg-cyan/20 p-3">
                    <Target className="h-6 w-6 text-cyan" />
                  </div>
                  <div>
                    <p className="font-bold text-2xl text-navy">100%</p>
                    <p className="text-gray-warm text-sm">Método Comprovado</p>
                  </div>
                </div>
              </div>
            </div> */}

            {/* <div
              className="-left-16 absolute bottom-1/4 hidden animate-fade-in lg:block"
              style={{ animationDelay: '0.6s' }}
            >
              <div className="w-64 rounded-2xl border border-white/20 bg-white/10 p-6 shadow-elegant backdrop-blur-sm">
                <div className="mb-3 flex items-center gap-4">
                  <div className="rounded-xl bg-coral/20 p-3">
                    <CheckCircle2 className="h-6 w-6 text-coral" />
                  </div>
                  <div>
                    <p className="font-semibold text-navy text-sm">Resultados</p>
                    <p className="text-gray-warm text-sm">Mensuráveis e Reais</p>
                  </div>
                </div>
              </div>
            </div> */}

            {/* <div
              className="-right-16 absolute bottom-1/4 hidden animate-fade-in lg:block"
              style={{ animationDelay: '0.8s' }}
            >
              <div className="w-64 rounded-2xl border border-white/20 bg-white/10 p-6 shadow-elegant backdrop-blur-sm">
                <div className="mb-3 flex items-center gap-4">
                  <div className="rounded-xl bg-cyan/20 p-3">
                    <Zap className="h-6 w-6 text-cyan" />
                  </div>
                  <div>
                    <p className="font-semibold text-navy text-sm">Execução</p>
                    <p className="text-gray-warm text-sm">De Alto Impacto</p>
                  </div>
                </div>
              </div>
            </div> */}

            <div className="relative z-10 mx-auto max-w-3xl text-center">
              <motion.h2
                className="mb-6 font-bold text-3xl md:text-4xl lg:text-5xl"
                initial={{ opacity: 0, y: 30 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                whileInView={{ opacity: 1, y: 0 }}
              >
                <PortableText
                  components={createPortableComponents()}
                  value={data.heading[locale]}
                />
                {/* <span className="text-navy">Decida Elevar Sua Empresa Para o </span>
                <span className="text-cyan">Próximo Nível Agora</span> */}
              </motion.h2>
              <motion.p
                className="mx-auto mb-10 max-w-2xl text-gray-warm text-lg leading-relaxed md:text-xl"
                initial={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true }}
                whileInView={{ opacity: 1, y: 0 }}
              >
                <PortableText components={createPortableComponents()} value={data.text[locale]} />
                {/* A estagnação custa caro. Avanço exige método, clareza e direção executiva. Se a sua
                empresa precisa organizar processos, fortalecer a liderança, eliminar retrabalhos e
                agir com precisão, este é o momento de transformar intenção em estratégia aplicada.
                Aqui você encontra um acompanhamento estruturado, decisões guiadas, análises
                profundas e um plano real de evolução. Clique e dê o passo que separa quem apenas
                administra do que lidera com visão estratégica. */}
              </motion.p>

              {data.cta && data.cta.length > 0 && (
                <motion.div
                  className="flex flex-col items-center justify-center gap-4 pt-4 sm:flex-row"
                  initial={{ opacity: 0, y: 20 }}
                  transition={{ duration: 0.6, delay: 0.4, ease: 'easeOut' }}
                  viewport={{ once: true, amount: 0.3 }}
                  whileInView={{ opacity: 1, y: 0 }}
                >
                  {data.cta.map((button) => {
                    return (
                      <Button
                        base="mentory"
                        className="group px-8 py-6 font-semibold"
                        effect={button.theme.effect}
                        key={button._key}
                        rounded={button.theme.rounded}
                        size={button.theme.size}
                        theme={button.theme.theme}
                      >
                        {button.iconPrefix && (
                          <Icon className="mr-2 size-5" name={button.iconPrefix} />
                        )}
                        {button.label[locale]}
                        {button.iconSuffix && (
                          <Icon
                            className="ml-2 size-5 transition-transform group-hover:translate-x-1"
                            name={button.iconSuffix}
                          />
                        )}
                      </Button>
                    )
                  })}
                </motion.div>
              )}
              {/* <motion.div
                initial={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
                whileInView={{ opacity: 1, y: 0 }}
              >
                <Button
                  base="mentory"
                  className="group"
                  effect="gradient"
                  onClick={() => setIsContactDialogOpen(true)}
                  rounded="xl"
                  size="lg"
                  theme="accent"
                >
                  Começar Agora
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </motion.div> */}
            </div>
          </div>
        </div>
      </div>
    </StickySection>
  )
}
