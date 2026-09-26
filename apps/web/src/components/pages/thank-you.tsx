'use client'

import { Book3D } from '@ez/web/components/experience/book-3d'
import { ContactButton } from '@ez/web/components/experience/contact'
import { LinkButton } from '@ez/web/components/experience/local-link'
import { FadeUp, SplitTitle } from '@ez/web/components/experience/page-hero'
import { useScene } from '@ez/web/components/experience/scene/store'
import { Download } from 'lucide-react'

type Props = {
  ebook: { title: string; cover: string; accent: string; accentSecondary: string } | null
  downloadUrl: string | null
  customerEmail: string | null
}

export function ThankYouPage({ ebook, downloadUrl, customerEmail }: Props) {
  useScene({
    shape: 'orb',
    accent: ebook?.accent ?? '#f2b544',
    accentSecondary: ebook?.accentSecondary ?? '#5b8cff',
    offsetX: 0,
  })

  if (!ebook) {
    return (
      <section className="flex min-h-[100svh] items-center pt-28 pb-20">
        <div className="mx-auto max-w-2xl px-5 text-center">
          <SplitTitle
            className="text-[clamp(2.2rem,5vw,3.6rem)]"
            lines={['Pagamento não confirmado']}
          />
          <FadeUp className="mt-6 text-lg text-white/65" delay={0.4}>
            Não encontramos um pagamento aprovado para este link. Se você concluiu a compra, fale
            com a gente que resolvemos rapidamente.
          </FadeUp>
          <FadeUp className="mt-10 flex flex-wrap justify-center gap-3" delay={0.6}>
            <ContactButton subject="Problema com a compra do eBook">
              Falar com o Instituto
            </ContactButton>
            <LinkButton href="/ebooks">Ver eBooks</LinkButton>
          </FadeUp>
        </div>
      </section>
    )
  }

  return (
    <section className="flex min-h-[100svh] items-center pt-28 pb-20">
      <div className="mx-auto grid w-full max-w-[1100px] items-center gap-12 px-5 sm:px-8 lg:grid-cols-[0.8fr_1.2fr]">
        <FadeUp delay={0.3}>
          <Book3D cover={ebook.cover} spineColor={ebook.accent} title={ebook.title} width={280} />
        </FadeUp>
        <div>
          <FadeUp>
            <p className="ez-eyebrow">Compra confirmada</p>
          </FadeUp>
          <SplitTitle className="mt-5 text-[clamp(2.4rem,5vw,4rem)]" lines={['Obrigado!']} />
          <FadeUp className="mt-6 text-lg text-white/70 leading-relaxed" delay={0.5}>
            Seu eBook <strong className="text-white">{ebook.title}</strong> já é seu.
            {customerEmail && (
              <>
                {' '}
                O recibo foi enviado para <strong className="text-white">{customerEmail}</strong>.
              </>
            )}
          </FadeUp>
          <FadeUp className="mt-10 flex flex-wrap gap-3" delay={0.7}>
            {downloadUrl ? (
              <a className="ez-btn" download href={downloadUrl}>
                <Download aria-hidden className="size-4" /> Baixar eBook (PDF)
              </a>
            ) : (
              <ContactButton subject={`Envio do eBook — ${ebook.title}`}>
                Receber meu eBook
              </ContactButton>
            )}
            <LinkButton href="/">Voltar ao site</LinkButton>
          </FadeUp>
          {downloadUrl && (
            <FadeUp className="mt-5 text-sm text-white/45" delay={0.8}>
              Guarde este link: ele permite baixar o arquivo novamente.
            </FadeUp>
          )}
        </div>
      </div>
    </section>
  )
}
