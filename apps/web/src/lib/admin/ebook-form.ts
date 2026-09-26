import { type Ebook, ebookSchema, paymentProviders, slugPattern } from '@ez/web/types/catalog'
import { z } from 'zod'

/**
 * O formulário edita parágrafos como texto corrido (separados por linha em branco)
 * e valores de metadados como texto — estas funções convertem de/para o modelo salvo.
 */
export const ebookFormSchema = z.object({
  id: z.string(),
  slug: z.string().regex(slugPattern, 'Use apenas letras minúsculas, números e hífens'),
  title: z.string().trim().min(1, 'Informe o título'),
  description: z.string().trim().min(1, 'Informe a descrição'),
  accent: z.string().regex(/^#[0-9a-fA-F]{6}$/, 'Cor inválida'),
  accentSecondary: z.string().regex(/^#[0-9a-fA-F]{6}$/, 'Cor inválida'),
  cover: z.string().min(1, 'Envie a capa do ebook'),
  pages: z.array(z.string()),
  heroImage: z.string(),
  rating: z.coerce.number().int().min(0).max(5),
  downloads: z.coerce.number().int().min(0),
  updated: z.string(),
  metadata: z.array(
    z.object({
      value: z.string().min(1, 'Obrigatório'),
      label: z.string().min(1, 'Obrigatório'),
      icon: z.string(),
    }),
  ),
  indexTitle: z.string(),
  videoTitle: z.string(),
  video: z.string(),
  indexText: z.string(),
  indexClosing: z.string(),
  questions: z.array(
    z.object({
      question: z.string().min(1, 'Obrigatório'),
      answer: z.string().min(1, 'Obrigatório'),
    }),
  ),
  authorName: z.string(),
  authorPhoto: z.string(),
  authorText: z.string(),
  authorClosing: z.string(),
  price: z.coerce.number().min(0, 'Preço inválido'),
  priceLabel: z.string(),
  cta: z.string().min(1, 'Informe o texto do botão'),
  provider: z.enum(paymentProviders),
  hotmartUrl: z.union([
    z.literal(''),
    z.string().url('Informe a URL completa, ex.: https://pay.hotmart.com/...'),
  ]),
  downloadUrl: z.union([z.literal(''), z.string().url('Informe o link completo (https://…)')]),
  file: z.object({ key: z.string(), name: z.string() }).nullable(),
  published: z.boolean(),
  order: z.coerce.number().int(),
})

export type EbookFormValues = z.infer<typeof ebookFormSchema>

export const splitParagraphs = (text: string) =>
  text
    .split(/\n\s*\n/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean)

export const joinParagraphs = (paragraphs: string[]) => paragraphs.join('\n\n')

/** Aceita o ID puro ou qualquer URL do YouTube (watch, youtu.be, embed, shorts). */
export function parseYouTubeId(input: string) {
  const value = input.trim()
  if (!value) return ''
  if (/^[\w-]{11}$/.test(value)) return value
  const match = value.match(/(?:v=|youtu\.be\/|embed\/|shorts\/)([\w-]{11})/)
  return match?.[1] ?? ''
}

export function slugify(text: string) {
  return text
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

export function emptyEbookForm(id: string): EbookFormValues {
  return {
    id,
    slug: '',
    title: '',
    description: '',
    accent: '#e54c5b',
    accentSecondary: '#b94c23',
    cover: '',
    pages: [],
    heroImage: '',
    rating: 5,
    downloads: 0,
    updated: String(new Date().getFullYear()),
    metadata: [{ value: 'PDF', label: 'Acesso Imediato', icon: 'file' }],
    indexTitle: '',
    videoTitle: 'Veja o vídeo e conheça mais!',
    video: '',
    indexText: '',
    indexClosing: '',
    questions: [],
    authorName: 'Enzo Pasqualetti',
    authorPhoto: '/assets/images/enzo-pasqualetti.webp',
    authorText: '',
    authorClosing: '',
    price: 0,
    priceLabel: 'Apenas',
    cta: 'Quero Meu Ebook!',
    provider: 'none',
    hotmartUrl: '',
    downloadUrl: '',
    file: null,
    published: false,
    order: 0,
  }
}

export function ebookToForm(ebook: Ebook): EbookFormValues {
  return {
    id: ebook.id,
    slug: ebook.slug,
    title: ebook.title,
    description: ebook.description,
    accent: ebook.accent,
    accentSecondary: ebook.accentSecondary,
    cover: ebook.cover,
    pages: ebook.pages,
    heroImage: ebook.heroImage,
    rating: ebook.badges.rating,
    downloads: ebook.badges.downloads,
    updated: ebook.badges.updated,
    metadata: ebook.metadata.map((item) => ({ ...item, value: String(item.value) })),
    indexTitle: ebook.index.title,
    videoTitle: ebook.index.videoTitle,
    video: ebook.index.videoId,
    indexText: joinParagraphs(ebook.index.paragraphs),
    indexClosing: ebook.index.closing,
    questions: ebook.questions,
    authorName: ebook.author.name,
    authorPhoto: ebook.author.photo,
    authorText: joinParagraphs(ebook.author.paragraphs),
    authorClosing: ebook.author.closing,
    price: ebook.price.regular,
    priceLabel: ebook.price.label,
    cta: ebook.cta,
    provider: ebook.payment.provider,
    hotmartUrl: ebook.payment.hotmartUrl,
    downloadUrl: ebook.downloadUrl,
    file: ebook.file,
    published: ebook.published,
    order: ebook.order,
  }
}

export function formToEbook(values: EbookFormValues): Ebook {
  return ebookSchema.parse({
    id: values.id,
    slug: values.slug,
    title: values.title.trim(),
    description: values.description.trim(),
    accent: values.accent,
    accentSecondary: values.accentSecondary,
    cover: values.cover,
    pages: values.pages,
    heroImage: values.heroImage,
    badges: { rating: values.rating, downloads: values.downloads, updated: values.updated },
    metadata: values.metadata.map((item) => ({
      ...item,
      value: /^\d+$/.test(item.value.trim()) ? Number(item.value) : item.value.trim(),
    })),
    index: {
      title: values.indexTitle,
      videoTitle: values.videoTitle,
      videoId: parseYouTubeId(values.video),
      paragraphs: splitParagraphs(values.indexText),
      closing: values.indexClosing,
    },
    questions: values.questions,
    author: {
      name: values.authorName,
      photo: values.authorPhoto,
      paragraphs: splitParagraphs(values.authorText),
      closing: values.authorClosing,
    },
    price: { regular: values.price, label: values.priceLabel },
    cta: values.cta,
    payment: { provider: values.provider, hotmartUrl: values.hotmartUrl.trim() },
    downloadUrl: values.downloadUrl.trim(),
    file: values.file,
    published: values.published,
    order: values.order,
  })
}
