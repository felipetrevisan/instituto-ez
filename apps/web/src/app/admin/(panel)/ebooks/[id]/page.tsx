'use client'

import { EbookForm } from '@ez/web/components/admin/ebook-form'
import { buttonClass, EmptyState, Spinner } from '@ez/web/components/admin/ui'
import { getEbook, newEbookId } from '@ez/web/lib/admin/data'
import { type EbookFormValues, ebookToForm, emptyEbookForm } from '@ez/web/lib/admin/ebook-form'
import Link from 'next/link'
import { use, useEffect, useState } from 'react'

export default function EbookEditorPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const isNew = id === 'novo'
  const [initial, setInitial] = useState<EbookFormValues | null | undefined>(undefined)

  useEffect(() => {
    if (isNew) {
      setInitial(emptyEbookForm(newEbookId()))
      return
    }
    getEbook(id).then((ebook) => setInitial(ebook ? ebookToForm(ebook) : null))
  }, [id, isNew])

  if (initial === undefined) return <Spinner />
  if (initial === null) {
    return (
      <EmptyState
        action={
          <Link className={buttonClass({ variant: 'secondary' })} href="/admin/ebooks">
            Voltar aos ebooks
          </Link>
        }
        description="Ele pode ter sido excluído."
        title="Ebook não encontrado"
      />
    )
  }

  return <EbookForm initial={initial} isNew={isNew} key={initial.id} />
}
