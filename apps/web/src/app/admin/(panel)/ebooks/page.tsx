'use client'

import {
  Badge,
  buttonClass,
  ConfirmButton,
  EmptyState,
  PageHeader,
  Spinner,
} from '@ez/web/components/admin/ui'
import { deleteEbook, revalidateSite, useEbooks } from '@ez/web/lib/admin/data'
import { providerLabels } from '@ez/web/lib/admin/labels'
import { formatPrice } from '@ez/web/lib/format'
import { BookOpen, ExternalLink, Pencil, Plus } from 'lucide-react'
import Link from 'next/link'
import { toast } from 'sonner'

export default function EbooksPage() {
  const { items, loading, error } = useEbooks()

  const onDelete = async (id: string, title: string) => {
    await deleteEbook(id)
    await revalidateSite()
    toast.success(`“${title}” foi excluído.`)
  }

  return (
    <>
      <PageHeader
        actions={
          <Link className={buttonClass()} href="/admin/ebooks/novo">
            <Plus aria-hidden className="size-4" /> Novo ebook
          </Link>
        }
        description="Cadastre ebooks, defina preço e forma de pagamento. Somente os publicados aparecem no site."
        title="Ebooks"
      />

      {loading && <Spinner />}
      {error && <p className="text-rose-300 text-sm">Não foi possível carregar: {error.message}</p>}

      {items && items.length === 0 && (
        <EmptyState
          action={
            <Link className={buttonClass()} href="/admin/ebooks/novo">
              <Plus aria-hidden className="size-4" /> Cadastrar primeiro ebook
            </Link>
          }
          description="Os ebooks cadastrados aparecem no catálogo e ganham página própria no site."
          icon={<BookOpen className="size-8" />}
          title="Nenhum ebook cadastrado"
        />
      )}

      {items && items.length > 0 && (
        <ul className="grid gap-3">
          {items.map((ebook) => (
            <li
              className="flex flex-col gap-4 rounded-2xl border border-white/[0.07] bg-[#0c1120] p-4 sm:flex-row sm:items-center"
              key={ebook.id}
            >
              <div className="flex min-w-0 flex-1 items-center gap-4">
                {ebook.cover ? (
                  // biome-ignore lint/performance/noImgElement: miniatura com URL dinâmica
                  <img
                    alt=""
                    className="h-20 w-14 shrink-0 rounded-md object-cover"
                    src={ebook.cover}
                  />
                ) : (
                  <span className="h-20 w-14 shrink-0 rounded-md bg-white/5" />
                )}
                <div className="min-w-0">
                  <p className="truncate font-medium text-white">{ebook.title}</p>
                  <p className="truncate text-sm text-white/45">/ebooks/{ebook.slug}</p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    <Badge tone={ebook.published ? 'success' : 'neutral'}>
                      {ebook.published ? 'Publicado' : 'Rascunho'}
                    </Badge>
                    <Badge tone="accent">{formatPrice(ebook.price.regular)}</Badge>
                    <Badge>{providerLabels[ebook.payment.provider]}</Badge>
                  </div>
                </div>
              </div>
              <div className="flex gap-1 sm:justify-end">
                {ebook.published && (
                  <a
                    aria-label="Ver no site"
                    className={buttonClass({ size: 'sm', variant: 'ghost' })}
                    href={`/ebooks/${ebook.slug}`}
                    rel="noopener"
                    target="_blank"
                  >
                    <ExternalLink aria-hidden className="size-4" />
                  </a>
                )}
                <Link
                  className={buttonClass({ size: 'sm', variant: 'secondary' })}
                  href={`/admin/ebooks/${ebook.id}`}
                >
                  <Pencil aria-hidden className="size-4" /> Editar
                </Link>
                <ConfirmButton onConfirm={() => onDelete(ebook.id, ebook.title)}>
                  Excluir
                </ConfirmButton>
              </div>
            </li>
          ))}
        </ul>
      )}
    </>
  )
}
