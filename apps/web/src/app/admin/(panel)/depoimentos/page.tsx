'use client'

import {
  Badge,
  Button,
  Card,
  ConfirmButton,
  EmptyState,
  Field,
  Input,
  PageHeader,
  Spinner,
  Switch,
  Textarea,
} from '@ez/web/components/admin/ui'
import {
  deleteTestimonial,
  newTestimonialId,
  revalidateSite,
  saveTestimonial,
  useEbooks,
  useTestimonials,
} from '@ez/web/lib/admin/data'
import { areaLabels } from '@ez/web/lib/admin/labels'
import { cn } from '@ez/web/lib/utils'
import {
  type Testimonial,
  type TestimonialArea,
  testimonialAreas,
  testimonialSchema,
} from '@ez/web/types/catalog'
import { zodResolver } from '@hookform/resolvers/zod'
import { MessageSquareQuote, Pencil, Plus, X } from 'lucide-react'
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { toast } from 'sonner'

function TestimonialEditor({
  initial,
  isNew,
  onClose,
}: {
  initial: Testimonial
  isNew: boolean
  onClose: () => void
}) {
  const ebooks = useEbooks()
  const {
    register,
    control,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<Testimonial>({ resolver: zodResolver(testimonialSchema), defaultValues: initial })
  const areas = watch('areas')

  const onSubmit = handleSubmit(async (values) => {
    try {
      await saveTestimonial(values)
      await revalidateSite()
      toast.success(isNew ? 'Depoimento cadastrado.' : 'Depoimento atualizado.')
      onClose()
    } catch {
      toast.error('Não foi possível salvar o depoimento.')
    }
  })

  return (
    <Card className="mb-6 border-[#f2b544]/30">
      <form noValidate onSubmit={onSubmit}>
        <div className="mb-5 flex items-center justify-between">
          <h2 className="font-semibold text-white">
            {isNew ? 'Novo depoimento' : 'Editar depoimento'}
          </h2>
          <Button aria-label="Fechar editor" onClick={onClose} size="sm" variant="ghost">
            <X aria-hidden className="size-4" />
          </Button>
        </div>
        <div className="grid gap-5 md:grid-cols-[2fr_1fr]">
          <Field error={errors.author?.message} hint="Ex.: “Ana Silva, Professora”." label="Autor">
            {(id) => (
              <Input aria-invalid={Boolean(errors.author)} id={id} {...register('author')} />
            )}
          </Field>
          <Field hint="Menor número aparece primeiro." label="Ordem">
            {(id) => (
              <Input id={id} type="number" {...register('order', { valueAsNumber: true })} />
            )}
          </Field>
          <Field className="md:col-span-2" error={errors.text?.message} label="Depoimento">
            {(id) => (
              <Textarea
                aria-invalid={Boolean(errors.text)}
                className="min-h-40"
                id={id}
                {...register('text')}
              />
            )}
          </Field>

          <Controller
            control={control}
            name="areas"
            render={({ field, fieldState }) => (
              <fieldset className="md:col-span-2">
                <legend className="font-medium text-sm text-white/85">Onde exibir</legend>
                <div className="mt-2 flex flex-wrap gap-2">
                  {testimonialAreas.map((area) => {
                    const checked = field.value.includes(area)
                    return (
                      <label
                        className={cn(
                          'flex cursor-pointer items-center gap-2 rounded-xl border px-3.5 py-2 text-sm transition',
                          checked
                            ? 'border-[#f2b544]/70 bg-[#f2b544]/10 text-white'
                            : 'border-white/10 text-white/65',
                        )}
                        key={area}
                      >
                        <input
                          checked={checked}
                          className="accent-[#f2b544]"
                          onChange={() =>
                            field.onChange(
                              checked
                                ? field.value.filter((item) => item !== area)
                                : [...field.value, area],
                            )
                          }
                          type="checkbox"
                        />
                        {areaLabels[area]}
                      </label>
                    )
                  })}
                </div>
                {fieldState.error && (
                  <p className="mt-1.5 text-rose-300 text-xs">{fieldState.error.message}</p>
                )}
              </fieldset>
            )}
          />

          {areas.includes('ebooks') && (
            <Controller
              control={control}
              name="ebookIds"
              render={({ field }) => (
                <fieldset className="md:col-span-2">
                  <legend className="font-medium text-sm text-white/85">Ebooks</legend>
                  <p className="mt-0.5 text-white/40 text-xs">
                    Nenhum marcado = aparece em todos os ebooks.
                  </p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {(ebooks.items ?? []).map((ebook) => {
                      const checked = field.value.includes(ebook.id)
                      return (
                        <label
                          className={cn(
                            'flex cursor-pointer items-center gap-2 rounded-xl border px-3.5 py-2 text-sm transition',
                            checked
                              ? 'border-[#f2b544]/70 bg-[#f2b544]/10 text-white'
                              : 'border-white/10 text-white/65',
                          )}
                          key={ebook.id}
                        >
                          <input
                            checked={checked}
                            className="accent-[#f2b544]"
                            onChange={() =>
                              field.onChange(
                                checked
                                  ? field.value.filter((item) => item !== ebook.id)
                                  : [...field.value, ebook.id],
                              )
                            }
                            type="checkbox"
                          />
                          {ebook.title}
                        </label>
                      )
                    })}
                  </div>
                </fieldset>
              )}
            />
          )}

          <div className="md:col-span-2">
            <Controller
              control={control}
              name="published"
              render={({ field }) => (
                <Switch
                  checked={field.value}
                  description="Visível no site."
                  label="Publicado"
                  onChange={field.onChange}
                />
              )}
            />
          </div>
        </div>
        <div className="mt-6 flex justify-end gap-2">
          <Button onClick={onClose} variant="ghost">
            Cancelar
          </Button>
          <Button loading={isSubmitting} type="submit">
            Salvar depoimento
          </Button>
        </div>
      </form>
    </Card>
  )
}

export default function TestimonialsPage() {
  const { items, loading, error } = useTestimonials()
  const [editing, setEditing] = useState<{ item: Testimonial; isNew: boolean } | null>(null)
  const [filter, setFilter] = useState<TestimonialArea | 'all'>('all')

  const startNew = () =>
    setEditing({
      isNew: true,
      item: {
        id: newTestimonialId(),
        author: '',
        text: '',
        areas: ['home'],
        ebookIds: [],
        published: true,
        order: (items?.length ?? 0) + 1,
      },
    })

  const togglePublished = async (item: Testimonial) => {
    await saveTestimonial({ ...item, published: !item.published })
    await revalidateSite()
  }

  const onDelete = async (item: Testimonial) => {
    await deleteTestimonial(item.id)
    await revalidateSite()
    toast.success('Depoimento excluído.')
  }

  const visible = (items ?? []).filter((item) => filter === 'all' || item.areas.includes(filter))

  return (
    <>
      <PageHeader
        actions={
          <Button onClick={startNew}>
            <Plus aria-hidden className="size-4" /> Novo depoimento
          </Button>
        }
        description="Depoimentos exibidos na Home, na página da Imersão e nas páginas de ebook."
        title="Depoimentos"
      />

      {editing && (
        <TestimonialEditor
          initial={editing.item}
          isNew={editing.isNew}
          key={editing.item.id}
          onClose={() => setEditing(null)}
        />
      )}

      <div className="mb-5 flex flex-wrap gap-2">
        {(['all', ...testimonialAreas] as const).map((area) => (
          <button
            className={cn(
              'rounded-full px-3.5 py-1.5 text-sm transition',
              filter === area ? 'bg-white/[0.1] text-white' : 'text-white/55 hover:text-white',
            )}
            key={area}
            onClick={() => setFilter(area)}
            type="button"
          >
            {area === 'all' ? 'Todos' : areaLabels[area]}
          </button>
        ))}
      </div>

      {loading && <Spinner />}
      {error && <p className="text-rose-300 text-sm">Não foi possível carregar: {error.message}</p>}
      {items && visible.length === 0 && (
        <EmptyState
          action={<Button onClick={startNew}>Cadastrar depoimento</Button>}
          icon={<MessageSquareQuote className="size-8" />}
          title="Nenhum depoimento aqui"
        />
      )}

      <ul className="grid gap-3">
        {visible.map((item) => (
          <li className="rounded-2xl border border-white/[0.07] bg-[#0c1120] p-5" key={item.id}>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <p className="font-medium text-white">{item.author}</p>
                  {item.areas.map((area) => (
                    <Badge key={area}>{areaLabels[area]}</Badge>
                  ))}
                  {!item.published && <Badge tone="warning">Oculto</Badge>}
                </div>
                <p className="mt-2 line-clamp-2 text-sm text-white/55">{item.text}</p>
              </div>
              <div className="flex shrink-0 items-center gap-1">
                <Button onClick={() => togglePublished(item)} size="sm" variant="ghost">
                  {item.published ? 'Ocultar' : 'Publicar'}
                </Button>
                <Button
                  onClick={() => setEditing({ item, isNew: false })}
                  size="sm"
                  variant="secondary"
                >
                  <Pencil aria-hidden className="size-4" /> Editar
                </Button>
                <ConfirmButton onConfirm={() => onDelete(item)}>Excluir</ConfirmButton>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </>
  )
}
