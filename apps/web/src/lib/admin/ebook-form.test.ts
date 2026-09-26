import { seedEbooks } from '@ez/web/content/ebooks'
import { describe, expect, it } from 'vitest'
import {
  ebookFormSchema,
  ebookToForm,
  emptyEbookForm,
  formToEbook,
  parseYouTubeId,
  slugify,
  splitParagraphs,
} from './ebook-form'

describe('formulário de ebook', () => {
  it('converte ida e volta sem perder dados', () => {
    for (const ebook of seedEbooks) expect(formToEbook(ebookToForm(ebook))).toEqual(ebook)
  })

  it('metadados numéricos voltam como número e textos como texto', () => {
    const form = { ...ebookToForm(seedEbooks[0]) }
    form.metadata = [
      { value: '180', label: 'Páginas', icon: 'book' },
      { value: 'PDF', label: 'Formato', icon: 'file' },
    ]
    expect(formToEbook(form).metadata.map((item) => item.value)).toEqual([180, 'PDF'])
  })

  it('formulário vazio exige título, descrição e capa', () => {
    const result = ebookFormSchema.safeParse(emptyEbookForm('novo-id'))
    expect(result.success).toBe(false)
    const fields = result.success ? [] : result.error.issues.map((issue) => issue.path[0])
    expect(fields).toEqual(expect.arrayContaining(['title', 'description', 'cover', 'slug']))
  })

  it('rejeita link Hotmart inválido', () => {
    const form = {
      ...ebookToForm(seedEbooks[0]),
      provider: 'hotmart' as const,
      hotmartUrl: 'pay.hotmart',
    }
    expect(ebookFormSchema.safeParse(form).success).toBe(false)
  })
})

describe('utilitários', () => {
  it('splitParagraphs separa por linha em branco e descarta vazios', () => {
    expect(splitParagraphs('Um\ncontinua\n\n\n  Dois  \n\n')).toEqual(['Um\ncontinua', 'Dois'])
  })

  it.each([
    ['t-cYk869nKg', 't-cYk869nKg'],
    ['https://youtu.be/t-cYk869nKg', 't-cYk869nKg'],
    ['https://www.youtube.com/watch?v=t-cYk869nKg&t=10', 't-cYk869nKg'],
    ['https://www.youtube.com/embed/t-cYk869nKg', 't-cYk869nKg'],
    ['https://www.youtube.com/shorts/t-cYk869nKg', 't-cYk869nKg'],
    ['https://vimeo.com/123', ''],
    ['', ''],
  ])('parseYouTubeId(%s)', (input, expected) => {
    expect(parseYouTubeId(input)).toBe(expected)
  })

  it('slugify remove acentos e pontuação', () => {
    expect(slugify('O Poder da Inteligência Emocional!')).toBe('o-poder-da-inteligencia-emocional')
    expect(slugify('  --Ação & Reação--  ')).toBe('acao-reacao')
  })
})
