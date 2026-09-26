'use client'

import { ImageUrlField } from '@ez/web/components/admin/image-fields'
import {
  Button,
  Card,
  CardTitle,
  Field,
  Input,
  PageHeader,
  Spinner,
  Textarea,
} from '@ez/web/components/admin/ui'
import { getSiteSettingsDoc, revalidateSite, saveSiteSettings } from '@ez/web/lib/admin/data'
import {
  DEFAULT_FAVICON,
  phoneHref,
  type SiteSettings,
  siteSettingsSchema,
} from '@ez/web/types/site'
import { zodResolver } from '@hookform/resolvers/zod'
import { Save, X } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { toast } from 'sonner'

function BrowserTabPreview({ icon, title }: { icon: string; title: string }) {
  return (
    <div className="w-full max-w-sm overflow-hidden rounded-xl border border-white/10 bg-[#1f2330]">
      <div className="flex items-end gap-1 px-2 pt-2">
        <div className="flex min-w-0 max-w-60 items-center gap-2 rounded-t-lg bg-[#2d3242] px-3 py-2">
          {/* biome-ignore lint/performance/noImgElement: prévia com URL dinâmica */}
          <img alt="" className="size-4 shrink-0 rounded-sm object-contain" src={icon} />
          <span className="truncate text-white/85 text-xs">{title}</span>
          <X aria-hidden className="size-3 shrink-0 text-white/40" />
        </div>
      </div>
      <div className="h-6 bg-[#2d3242]" />
    </div>
  )
}

function SiteSettingsForm({ initial }: { initial: SiteSettings }) {
  const router = useRouter()
  const {
    register,
    control,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isDirty, isSubmitting },
  } = useForm<SiteSettings>({ resolver: zodResolver(siteSettingsSchema), defaultValues: initial })

  const name = watch('name')
  const logo = watch('logo')
  const favicon = watch('favicon')
  const phone = watch('contact.phone')

  const onSubmit = handleSubmit(async (values) => {
    try {
      await saveSiteSettings(values)
      await revalidateSite()
      reset(values)
      router.refresh()
      toast.success('Informações do site atualizadas.')
    } catch {
      toast.error('Não foi possível salvar.')
    }
  })

  return (
    <form noValidate onSubmit={onSubmit}>
      <PageHeader
        actions={
          <Button disabled={!isDirty} loading={isSubmitting} type="submit">
            <Save aria-hidden className="size-4" /> Salvar
          </Button>
        }
        description="Nome, logo, ícone e dados de contato exibidos no site, no rodapé e no formulário de contato."
        title="Site e contato"
      />

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardTitle title="Identidade" />
          <div className="grid gap-5">
            <Field
              error={errors.name?.message}
              hint="Aparece no cabeçalho, no rodapé e no título das abas."
              label="Nome do site"
            >
              {(id) => <Input aria-invalid={Boolean(errors.name)} id={id} {...register('name')} />}
            </Field>
            <Field hint="Linha curta abaixo do nome, ex.: “Desenvolvimento Humano”." label="Slogan">
              {(id) => <Input id={id} {...register('slogan')} />}
            </Field>
            <Field hint="Usada nos buscadores e ao compartilhar o link do site." label="Descrição">
              {(id) => <Textarea className="min-h-24" id={id} {...register('description')} />}
            </Field>
          </div>
        </Card>

        <Card>
          <CardTitle
            description="O formulário de contato envia as mensagens para este e-mail."
            title="Contato"
          />
          <div className="grid gap-5">
            <Field
              error={errors.contact?.email?.message}
              hint="Deve ser de um domínio verificado no Resend (ex.: @institutoez.com.br) para o envio funcionar."
              label="E-mail"
            >
              {(id) => (
                <Input
                  aria-invalid={Boolean(errors.contact?.email)}
                  id={id}
                  type="email"
                  {...register('contact.email')}
                />
              )}
            </Field>
            <Field
              hint={phone ? `Link gerado: ${phoneHref(phone)}` : 'Deixe vazio para ocultar.'}
              label="Telefone"
            >
              {(id) => (
                <Input
                  id={id}
                  placeholder="(11) 99999-9999"
                  type="tel"
                  {...register('contact.phone')}
                />
              )}
            </Field>
            <Field label="Localização">
              {(id) => (
                <Input id={id} placeholder="São Paulo - Brasil" {...register('contact.location')} />
              )}
            </Field>
          </div>
        </Card>

        <Card>
          <CardTitle
            description="Imagem quadrada (PNG ou SVG), idealmente com fundo transparente. Use um arquivo do site (/assets/…) ou qualquer link público de imagem (https://…)."
            title="Logo"
          />
          <div className="flex flex-wrap items-start gap-6">
            <Controller
              control={control}
              name="logo"
              render={({ field, fieldState }) => (
                <Field error={fieldState.error?.message} label="Link da imagem">
                  {(id) => (
                    <ImageUrlField
                      aspect="aspect-square"
                      folder="site"
                      id={id}
                      invalid={Boolean(fieldState.error)}
                      onChange={field.onChange}
                      value={field.value}
                    />
                  )}
                </Field>
              )}
            />
            <div className="flex flex-col gap-2">
              <span className="font-medium text-sm text-white/85">Prévia no cabeçalho</span>
              <div className="flex items-center gap-3 rounded-full border border-white/10 bg-[#03050d] py-2 pr-5 pl-2">
                {logo ? (
                  // biome-ignore lint/performance/noImgElement: prévia com URL dinâmica
                  <img
                    alt=""
                    className="size-10 rounded-full object-cover ring-1 ring-white/15"
                    src={logo}
                  />
                ) : (
                  <span className="size-10 rounded-full bg-white/10" />
                )}
                <span className="leading-none">
                  <span className="block font-semibold text-sm text-white">
                    {name || 'Nome do site'}
                  </span>
                  <span className="mt-1 block text-[10px] text-white/50 uppercase tracking-[0.2em]">
                    {watch('slogan')}
                  </span>
                </span>
              </div>
            </div>
          </div>
        </Card>

        <Card>
          <CardTitle
            description="Ícone da aba do navegador e dos atalhos no celular. Use PNG quadrado de 512 × 512 px (ou .ico / .svg). Vazio = ícone padrão."
            title="Ícone do site (favicon)"
          />
          <div className="flex flex-wrap items-start gap-6">
            <Controller
              control={control}
              name="favicon"
              render={({ field }) => (
                <Field label="Link da imagem">
                  {(id) => (
                    <ImageUrlField
                      aspect="aspect-square"
                      folder="site"
                      id={id}
                      onChange={field.onChange}
                      placeholder="https://… ou /favicon.ico"
                      value={field.value}
                    />
                  )}
                </Field>
              )}
            />
            <div className="flex flex-col gap-2">
              <span className="font-medium text-sm text-white/85">Prévia na aba</span>
              <BrowserTabPreview icon={favicon || DEFAULT_FAVICON} title={name || 'Nome do site'} />
              <p className="max-w-sm text-white/40 text-xs">
                Navegadores guardam o ícone em cache: pode levar algum tempo para a troca aparecer.
              </p>
            </div>
          </div>
        </Card>
      </div>
    </form>
  )
}

export default function SiteSettingsPage() {
  const [initial, setInitial] = useState<SiteSettings | null>(null)

  useEffect(() => {
    getSiteSettingsDoc().then(setInitial)
  }, [])

  if (!initial) return <Spinner />
  return <SiteSettingsForm initial={initial} />
}
