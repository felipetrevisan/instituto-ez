'use client'

import { Icon, iconNames } from '@ez/web/components/experience/icon'
import {
  getIntegrationStatus,
  getPaymentSettings,
  type IntegrationStatus,
  isSlugTaken,
  revalidateSite,
  saveEbook,
} from '@ez/web/lib/admin/data'
import {
  type EbookFormValues,
  ebookFormSchema,
  formToEbook,
  parseYouTubeId,
  slugify,
} from '@ez/web/lib/admin/ebook-form'
import { providerLabels } from '@ez/web/lib/admin/labels'
import { cn } from '@ez/web/lib/utils'
import { type PaymentProvider, type PaymentSettings, paymentProviders } from '@ez/web/types/catalog'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  AlertTriangle,
  ArrowDown,
  ArrowLeft,
  ArrowUp,
  ExternalLink,
  Plus,
  Save,
  Trash2,
} from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Controller, useFieldArray, useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { ImageUrlField, ImageUrlList, PdfField } from './image-fields'
import {
  Badge,
  Button,
  buttonClass,
  Card,
  CardTitle,
  Field,
  Input,
  Select,
  Switch,
  Textarea,
} from './ui'

const tabs = [
  { id: 'geral', label: 'Geral' },
  { id: 'midia', label: 'Mídia' },
  { id: 'conteudo', label: 'Conteúdo' },
  { id: 'perguntas', label: 'Perguntas' },
  { id: 'autor', label: 'Autor' },
  { id: 'venda', label: 'Venda' },
] as const

type TabId = (typeof tabs)[number]['id']

/** Em qual aba cada campo vive — para sinalizar erros e navegar até eles. */
const fieldTab: Partial<Record<keyof EbookFormValues, TabId>> = {
  title: 'geral',
  slug: 'geral',
  description: 'geral',
  accent: 'geral',
  accentSecondary: 'geral',
  cta: 'geral',
  rating: 'geral',
  downloads: 'geral',
  order: 'geral',
  cover: 'midia',
  metadata: 'conteudo',
  questions: 'perguntas',
  price: 'venda',
  hotmartUrl: 'venda',
}

const providerHelp: Record<PaymentProvider, string> = {
  none: 'O botão abre o formulário de contato do site.',
  hotmart: 'O botão leva ao checkout da Hotmart, que cuida do pagamento e da entrega.',
  stripe: 'Checkout da Stripe no próprio site; após o pagamento o cliente recebe o link do PDF.',
  both: 'Cartão via Stripe como opção principal e Hotmart como alternativa.',
}

function ColorField({
  label,
  value,
  onChange,
  error,
}: {
  label: string
  value: string
  onChange: (value: string) => void
  error?: string
}) {
  return (
    <Field error={error} label={label}>
      {(id) => (
        <div className="flex gap-2">
          <input
            aria-label={`${label} (seletor)`}
            className="h-11 w-14 shrink-0 cursor-pointer rounded-xl border border-white/10 bg-transparent p-1"
            onChange={(event) => onChange(event.target.value)}
            type="color"
            value={/^#[0-9a-f]{6}$/i.test(value) ? value : '#000000'}
          />
          <Input
            aria-invalid={Boolean(error)}
            id={id}
            onChange={(event) => onChange(event.target.value)}
            value={value}
          />
        </div>
      )}
    </Field>
  )
}

export function EbookForm({ initial, isNew }: { initial: EbookFormValues; isNew: boolean }) {
  const router = useRouter()
  const [tab, setTab] = useState<TabId>('geral')
  const [settings, setSettings] = useState<PaymentSettings | null>(null)
  const [status, setStatus] = useState<IntegrationStatus | null>(null)
  const [slugEdited, setSlugEdited] = useState(!isNew)

  const form = useForm<EbookFormValues>({
    resolver: zodResolver(ebookFormSchema),
    defaultValues: initial,
    mode: 'onTouched',
  })
  const {
    register,
    control,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors, isDirty, isSubmitting },
  } = form

  const metadata = useFieldArray({ control, name: 'metadata' })
  const questions = useFieldArray({ control, name: 'questions' })
  // Pasta do ebook no armazenamento (public/… para imagens, private/… para o PDF).
  const folder = `ebooks/${initial.id}`

  const title = watch('title')
  const provider = watch('provider')
  const published = watch('published')
  const slug = watch('slug')
  const video = watch('video')

  useEffect(() => {
    getPaymentSettings().then(setSettings)
    getIntegrationStatus().then(setStatus)
  }, [])

  // Sugere o slug a partir do título até o usuário editá-lo manualmente.
  useEffect(() => {
    if (!slugEdited) setValue('slug', slugify(title ?? ''), { shouldValidate: Boolean(title) })
  }, [title, slugEdited, setValue])

  useEffect(() => {
    if (!isDirty) return
    const warn = (event: BeforeUnloadEvent) => event.preventDefault()
    window.addEventListener('beforeunload', warn)
    return () => window.removeEventListener('beforeunload', warn)
  }, [isDirty])

  const tabErrors = new Set(
    (Object.keys(errors) as (keyof EbookFormValues)[]).map((key) => fieldTab[key]).filter(Boolean),
  )

  const onSubmit = handleSubmit(
    async (values) => {
      try {
        if (await isSlugTaken(values.slug, values.id)) {
          form.setError('slug', { message: 'Já existe um ebook com este endereço.' })
          setTab('geral')
          return
        }
        const ebook = formToEbook(values)
        await saveEbook(ebook)
        await revalidateSite()
        reset(values)
        toast.success(isNew ? 'Ebook criado.' : 'Alterações salvas.')
        if (isNew) router.replace(`/admin/ebooks/${ebook.id}`)
      } catch (error) {
        console.error(error)
        toast.error('Não foi possível salvar. Verifique os campos e sua conexão.')
      }
    },
    (fieldErrors) => {
      const first = Object.keys(fieldErrors)[0] as keyof EbookFormValues | undefined
      const target = first ? fieldTab[first] : undefined
      if (target) setTab(target)
      toast.error('Revise os campos destacados.')
    },
  )

  const stripeUnavailable =
    (provider === 'stripe' || provider === 'both') &&
    (settings?.stripeEnabled === false || status?.stripe === false)
  const hotmartUnavailable =
    (provider === 'hotmart' || provider === 'both') && settings?.hotmartEnabled === false

  return (
    <form noValidate onSubmit={onSubmit}>
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="min-w-0">
          <Link
            className="inline-flex items-center gap-1.5 text-sm text-white/50 hover:text-white"
            href="/admin/ebooks"
          >
            <ArrowLeft aria-hidden className="size-4" /> Ebooks
          </Link>
          <h1 className="mt-2 truncate font-semibold text-2xl text-white tracking-tight">
            {isNew ? 'Novo ebook' : title || 'Editar ebook'}
          </h1>
        </div>
        <div className="flex items-center gap-2">
          {!isNew && published && (
            <a
              className={buttonClass({ variant: 'ghost' })}
              href={`/ebooks/${slug}`}
              rel="noopener"
              target="_blank"
            >
              <ExternalLink aria-hidden className="size-4" /> Ver no site
            </a>
          )}
          <Button loading={isSubmitting} type="submit">
            <Save aria-hidden className="size-4" /> Salvar
          </Button>
        </div>
      </div>

      <div className="-mx-4 mb-6 overflow-x-auto px-4 [scrollbar-width:none]" role="tablist">
        <div className="flex w-max gap-1 rounded-xl border border-white/[0.07] bg-[#0c1120] p-1">
          {tabs.map((item) => (
            <button
              aria-selected={tab === item.id}
              className={cn(
                'relative rounded-lg px-4 py-2 text-sm transition',
                tab === item.id ? 'bg-white/[0.08] text-white' : 'text-white/55 hover:text-white',
              )}
              key={item.id}
              onClick={() => setTab(item.id)}
              role="tab"
              type="button"
            >
              {item.label}
              {tabErrors.has(item.id) && (
                <>
                  <span
                    aria-hidden
                    className="absolute top-1.5 right-1.5 size-1.5 rounded-full bg-rose-400"
                  />
                  <span className="sr-only"> (contém erros)</span>
                </>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Geral */}
      <div className={cn('grid gap-6', tab !== 'geral' && 'hidden')} role="tabpanel">
        <Card>
          <CardTitle title="Informações principais" />
          <div className="grid gap-5 md:grid-cols-2">
            <Field className="md:col-span-2" error={errors.title?.message} label="Título">
              {(fieldId) => (
                <Input aria-invalid={Boolean(errors.title)} id={fieldId} {...register('title')} />
              )}
            </Field>
            <Field
              className="md:col-span-2"
              error={errors.slug?.message}
              hint={`Endereço da página: /ebooks/${slug || '…'}`}
              label="Endereço (slug)"
            >
              {(fieldId) => (
                <Input
                  aria-invalid={Boolean(errors.slug)}
                  id={fieldId}
                  {...register('slug', { onChange: () => setSlugEdited(true) })}
                />
              )}
            </Field>
            <Field className="md:col-span-2" error={errors.description?.message} label="Descrição">
              {(fieldId) => (
                <Textarea
                  aria-invalid={Boolean(errors.description)}
                  className="min-h-40"
                  id={fieldId}
                  {...register('description')}
                />
              )}
            </Field>
            <Field
              error={errors.cta?.message}
              hint="Texto dos botões de compra."
              label="Texto do botão"
            >
              {(fieldId) => <Input id={fieldId} {...register('cta')} />}
            </Field>
            <Field hint="Menor número aparece primeiro no catálogo." label="Ordem">
              {(fieldId) => (
                <Input id={fieldId} type="number" {...register('order', { valueAsNumber: true })} />
              )}
            </Field>
          </div>
        </Card>

        <Card>
          <CardTitle
            description="Cores usadas na página do ebook e nas partículas 3D."
            title="Identidade visual"
          />
          <div className="grid gap-5 md:grid-cols-2">
            <Controller
              control={control}
              name="accent"
              render={({ field, fieldState }) => (
                <ColorField
                  error={fieldState.error?.message}
                  label="Cor principal"
                  onChange={field.onChange}
                  value={field.value}
                />
              )}
            />
            <Controller
              control={control}
              name="accentSecondary"
              render={({ field, fieldState }) => (
                <ColorField
                  error={fieldState.error?.message}
                  label="Cor secundária"
                  onChange={field.onChange}
                  value={field.value}
                />
              )}
            />
          </div>
        </Card>

        <Card>
          <CardTitle title="Selos do topo" />
          <div className="grid gap-5 md:grid-cols-3">
            <Field error={errors.rating?.message} label="Estrelas (0–5)">
              {(fieldId) => (
                <Input
                  id={fieldId}
                  max={5}
                  min={0}
                  type="number"
                  {...register('rating', { valueAsNumber: true })}
                />
              )}
            </Field>
            <Field error={errors.downloads?.message} label="Downloads">
              {(fieldId) => (
                <Input
                  id={fieldId}
                  min={0}
                  type="number"
                  {...register('downloads', { valueAsNumber: true })}
                />
              )}
            </Field>
            <Field label="Atualizado em">
              {(fieldId) => <Input id={fieldId} placeholder="2026" {...register('updated')} />}
            </Field>
          </div>
        </Card>

        <Card>
          <Controller
            control={control}
            name="published"
            render={({ field }) => (
              <Switch
                checked={field.value}
                description="Quando ativo, o ebook aparece no catálogo e sua página fica acessível."
                label="Publicado"
                onChange={field.onChange}
              />
            )}
          />
        </Card>
      </div>

      {/* Mídia */}
      <div className={cn('grid gap-6', tab !== 'midia' && 'hidden')} role="tabpanel">
        <Card>
          <CardTitle
            description="Proporção recomendada 1:1,41 (ex.: 1414 × 2000 px). Use um arquivo do site (/assets/…) ou qualquer link público de imagem (https://…)."
            title="Capa"
          />
          <Controller
            control={control}
            name="cover"
            render={({ field, fieldState }) => (
              <Field error={fieldState.error?.message} label="Imagem da capa">
                {(fieldId) => (
                  <ImageUrlField
                    folder={folder}
                    id={fieldId}
                    invalid={Boolean(fieldState.error)}
                    onChange={field.onChange}
                    value={field.value}
                  />
                )}
              </Field>
            )}
          />
        </Card>
        <Card>
          <CardTitle
            description="Aparecem no livro folheável “Folheie e conheça o Ebook por dentro”."
            title="Páginas de amostra"
          />
          <Controller
            control={control}
            name="pages"
            render={({ field }) => (
              <ImageUrlList folder={folder} onChange={field.onChange} value={field.value} />
            )}
          />
        </Card>
        <Card>
          <CardTitle
            description="Usada ao compartilhar o link em redes sociais. Se vazia, usa a capa."
            title="Imagem de compartilhamento"
          />
          <Controller
            control={control}
            name="heroImage"
            render={({ field }) => (
              <ImageUrlField
                aspect="aspect-square"
                folder={folder}
                onChange={field.onChange}
                value={field.value}
              />
            )}
          />
        </Card>
      </div>

      {/* Conteúdo */}
      <div className={cn('grid gap-6', tab !== 'conteudo' && 'hidden')} role="tabpanel">
        <Card>
          <CardTitle
            description={
              <>
                Separe parágrafos com uma linha em branco. Use{' '}
                <code className="text-[#f6c566]">**texto**</code> para destacar trechos.
              </>
            }
            title="Apresentação"
          />
          <div className="grid gap-5">
            <Field label="Título da seção">
              {(fieldId) => <Input id={fieldId} {...register('indexTitle')} />}
            </Field>
            <Field label="Texto">
              {(fieldId) => (
                <Textarea className="min-h-64" id={fieldId} {...register('indexText')} />
              )}
            </Field>
            <Field label="Frase final (em destaque)">
              {(fieldId) => <Textarea id={fieldId} {...register('indexClosing')} />}
            </Field>
          </div>
        </Card>
        <Card>
          <CardTitle title="Vídeo" />
          <div className="grid gap-5 md:grid-cols-2">
            <Field label="Título do vídeo">
              {(fieldId) => <Input id={fieldId} {...register('videoTitle')} />}
            </Field>
            <Field
              hint={
                video && !parseYouTubeId(video)
                  ? 'Não reconhecemos este link do YouTube.'
                  : 'Cole o link do YouTube. Deixe vazio para ocultar.'
              }
              label="Link do YouTube"
            >
              {(fieldId) => (
                <Input id={fieldId} placeholder="https://youtu.be/…" {...register('video')} />
              )}
            </Field>
          </div>
        </Card>
        <Card>
          <CardTitle
            description="Números exibidos logo abaixo do topo da página."
            title="Destaques"
          />
          <div className="grid gap-3">
            {metadata.fields.map((item, index) => (
              <div
                className="grid items-start gap-3 rounded-xl border border-white/[0.07] p-3 sm:grid-cols-[1fr_2fr_1fr_auto]"
                key={item.id}
              >
                <Input
                  aria-label="Valor"
                  placeholder="180"
                  {...register(`metadata.${index}.value`)}
                  aria-invalid={Boolean(errors.metadata?.[index]?.value)}
                />
                <Input
                  aria-label="Rótulo"
                  placeholder="Total de Páginas"
                  {...register(`metadata.${index}.label`)}
                  aria-invalid={Boolean(errors.metadata?.[index]?.label)}
                />
                <Select aria-label="Ícone" {...register(`metadata.${index}.icon`)}>
                  {iconNames.map((name) => (
                    <option key={name} value={name}>
                      {name}
                    </option>
                  ))}
                </Select>
                <div className="flex items-center gap-1">
                  <span className="grid size-11 place-items-center text-[#f6c566]">
                    <Icon className="size-5" name={watch(`metadata.${index}.icon`)} />
                  </span>
                  <Button
                    aria-label="Remover destaque"
                    onClick={() => metadata.remove(index)}
                    size="sm"
                    variant="ghost"
                  >
                    <Trash2 aria-hidden className="size-4" />
                  </Button>
                </div>
              </div>
            ))}
            <Button
              className="w-fit"
              onClick={() => metadata.append({ value: '', label: '', icon: 'book' })}
              size="sm"
              variant="secondary"
            >
              <Plus aria-hidden className="size-4" /> Adicionar destaque
            </Button>
          </div>
        </Card>
      </div>

      {/* Perguntas */}
      <div className={cn('grid gap-6', tab !== 'perguntas' && 'hidden')} role="tabpanel">
        <Card>
          <CardTitle
            description="Seção de perguntas frequentes da página. Deixe vazia para ocultar."
            title="Perguntas frequentes"
          />
          <div className="grid gap-3">
            {questions.fields.map((item, index) => (
              <div className="grid gap-3 rounded-xl border border-white/[0.07] p-4" key={item.id}>
                <div className="flex items-center justify-between">
                  <Badge>Pergunta {index + 1}</Badge>
                  <div className="flex gap-1">
                    <Button
                      aria-label="Mover para cima"
                      disabled={index === 0}
                      onClick={() => questions.move(index, index - 1)}
                      size="sm"
                      variant="ghost"
                    >
                      <ArrowUp aria-hidden className="size-4" />
                    </Button>
                    <Button
                      aria-label="Mover para baixo"
                      disabled={index === questions.fields.length - 1}
                      onClick={() => questions.move(index, index + 1)}
                      size="sm"
                      variant="ghost"
                    >
                      <ArrowDown aria-hidden className="size-4" />
                    </Button>
                    <Button
                      aria-label="Remover pergunta"
                      onClick={() => questions.remove(index)}
                      size="sm"
                      variant="ghost"
                    >
                      <Trash2 aria-hidden className="size-4" />
                    </Button>
                  </div>
                </div>
                <Input
                  aria-invalid={Boolean(errors.questions?.[index]?.question)}
                  aria-label="Pergunta"
                  placeholder="Pergunta"
                  {...register(`questions.${index}.question`)}
                />
                <Textarea
                  aria-invalid={Boolean(errors.questions?.[index]?.answer)}
                  aria-label="Resposta"
                  placeholder="Resposta"
                  {...register(`questions.${index}.answer`)}
                />
              </div>
            ))}
            <Button
              className="w-fit"
              onClick={() => questions.append({ question: '', answer: '' })}
              size="sm"
              variant="secondary"
            >
              <Plus aria-hidden className="size-4" /> Adicionar pergunta
            </Button>
          </div>
        </Card>
      </div>

      {/* Autor */}
      <div className={cn('grid gap-6', tab !== 'autor' && 'hidden')} role="tabpanel">
        <Card>
          <CardTitle title="Sobre o autor" />
          <div className="grid gap-6 md:grid-cols-[auto_1fr]">
            <Controller
              control={control}
              name="authorPhoto"
              render={({ field }) => (
                <Field hint="PNG com fundo transparente fica melhor." label="Foto">
                  {(fieldId) => (
                    <ImageUrlField
                      folder={folder}
                      id={fieldId}
                      onChange={field.onChange}
                      value={field.value}
                    />
                  )}
                </Field>
              )}
            />
            <div className="grid content-start gap-5">
              <Field label="Nome">
                {(fieldId) => <Input id={fieldId} {...register('authorName')} />}
              </Field>
              <Field hint="Separe parágrafos com uma linha em branco." label="Biografia">
                {(fieldId) => (
                  <Textarea className="min-h-48" id={fieldId} {...register('authorText')} />
                )}
              </Field>
              <Field label="Frase final">
                {(fieldId) => <Textarea id={fieldId} {...register('authorClosing')} />}
              </Field>
            </div>
          </div>
        </Card>
      </div>

      {/* Venda */}
      <div className={cn('grid gap-6', tab !== 'venda' && 'hidden')} role="tabpanel">
        <Card>
          <CardTitle title="Preço" />
          <div className="grid gap-5 md:grid-cols-2">
            <Field
              error={errors.price?.message}
              hint={
                settings
                  ? `Moeda definida em Pagamentos: ${settings.currency.toUpperCase()}`
                  : undefined
              }
              label="Preço"
            >
              {(fieldId) => (
                <Input
                  aria-invalid={Boolean(errors.price)}
                  id={fieldId}
                  min={0}
                  step="0.01"
                  type="number"
                  {...register('price', { valueAsNumber: true })}
                />
              )}
            </Field>
            <Field hint="Texto acima do preço, ex.: “Apenas”." label="Rótulo do preço">
              {(fieldId) => <Input id={fieldId} {...register('priceLabel')} />}
            </Field>
          </div>
        </Card>

        <Card>
          <CardTitle description="Como o cliente compra este ebook." title="Forma de pagamento" />
          <Controller
            control={control}
            name="provider"
            render={({ field }) => (
              <div className="grid gap-3 sm:grid-cols-2" role="radiogroup">
                {paymentProviders.map((option) => (
                  <label
                    className={cn(
                      'flex cursor-pointer flex-col gap-1 rounded-xl border p-4 transition',
                      field.value === option
                        ? 'border-[#f2b544]/70 bg-[#f2b544]/[0.07]'
                        : 'border-white/10 hover:border-white/25',
                    )}
                    key={option}
                  >
                    <span className="flex items-center gap-2">
                      <input
                        checked={field.value === option}
                        className="accent-[#f2b544]"
                        name={field.name}
                        onChange={() => field.onChange(option)}
                        type="radio"
                        value={option}
                      />
                      <span className="font-medium text-sm text-white">
                        {providerLabels[option]}
                      </span>
                    </span>
                    <span className="pl-6 text-white/50 text-xs leading-relaxed">
                      {providerHelp[option]}
                    </span>
                  </label>
                ))}
              </div>
            )}
          />

          {(stripeUnavailable || hotmartUnavailable) && (
            <p className="mt-4 flex items-start gap-2 rounded-xl border border-amber-400/30 bg-amber-400/10 p-3 text-amber-100 text-sm">
              <AlertTriangle aria-hidden className="mt-0.5 size-4 shrink-0" />
              <span>
                {stripeUnavailable &&
                  'A Stripe está desativada ou sem chave configurada — o botão de cartão não aparecerá. '}
                {hotmartUnavailable && 'A Hotmart está desativada em Pagamentos. '}
                <Link className="underline" href="/admin/pagamentos">
                  Ajustar pagamentos
                </Link>
              </span>
            </p>
          )}
        </Card>

        {(provider === 'hotmart' || provider === 'both') && (
          <Card>
            <CardTitle
              description="Na Hotmart, abra o produto → Ferramentas → Links de divulgação e copie o link do checkout (pay.hotmart.com)."
              title="Hotmart"
            />
            <Field error={errors.hotmartUrl?.message} label="Link do checkout">
              {(fieldId) => (
                <Input
                  aria-invalid={Boolean(errors.hotmartUrl)}
                  id={fieldId}
                  placeholder="https://pay.hotmart.com/XXXXXXXX"
                  {...register('hotmartUrl')}
                />
              )}
            </Field>
          </Card>
        )}

        {(provider === 'stripe' || provider === 'both') && (
          <Card>
            <CardTitle
              description="Entregue ao cliente somente após o pagamento confirmado na Stripe. Envie o PDF (fica em pasta privada e o cliente recebe um link que expira em minutos) ou informe um link externo."
              title="Arquivo do ebook (PDF)"
            />
            <Controller
              control={control}
              name="file"
              render={({ field }) => (
                <PdfField folder={folder} onChange={field.onChange} value={field.value} />
              )}
            />
            <Field
              className="mt-5"
              error={errors.downloadUrl?.message}
              hint="Alternativa ao envio: Google Drive (Compartilhar → Qualquer pessoa com o link) ou Dropbox. Se houver PDF enviado, ele tem prioridade."
              label="Ou link externo do PDF"
            >
              {(fieldId) => (
                <Input
                  aria-invalid={Boolean(errors.downloadUrl)}
                  id={fieldId}
                  placeholder="https://drive.google.com/…"
                  {...register('downloadUrl')}
                />
              )}
            </Field>
          </Card>
        )}
      </div>

      <div className="sticky bottom-4 z-20 mt-8 flex items-center justify-between gap-4 rounded-2xl border border-white/[0.08] bg-[#0c1120]/95 p-3 pl-5 backdrop-blur">
        <span className="text-sm text-white/55">
          {isDirty ? 'Alterações não salvas' : 'Tudo salvo'}
        </span>
        <Button loading={isSubmitting} type="submit">
          <Save aria-hidden className="size-4" /> Salvar
        </Button>
      </div>
    </form>
  )
}
