import {
  getEbookBySlug,
  getEbooks,
  getEbooksByCollection,
  getEbooksCollection,
} from '@ez/web/server/get-ebook'
import type { Ebook, EbookCollection } from '@ez/web/types/ebook'
import { useQuery } from '@tanstack/react-query'

export function useEbooks() {
  const { data, isLoading, isPending } = useQuery<Ebook[]>({
    queryKey: ['ebooks'],
    queryFn: () => getEbooks(),
  })

  return { data, isLoading, isPending }
}

export function useEbook(slug: string, locale: string) {
  const { data, isLoading, isPending } = useQuery<Ebook>({
    queryKey: ['ebooks', locale, slug],
    queryFn: () => getEbookBySlug(slug, locale),
  })

  return { data, isLoading, isPending }
}

export function useEbooksCollection() {
  const { data, isLoading, isPending } = useQuery<EbookCollection[]>({
    queryKey: ['ebooks-collection'],
    queryFn: () => getEbooksCollection(),
  })

  return { data, isLoading, isPending }
}

export function useEbookByCollection(id: string) {
  const { data, isLoading, isPending } = useQuery<EbookCollection>({
    queryKey: ['ebooks', id],
    queryFn: () => getEbooksByCollection(id),
  })

  return { data, isLoading, isPending }
}
