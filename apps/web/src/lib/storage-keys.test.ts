import { describe, expect, it } from 'vitest'
import { buildObjectKey, publicUrlForKey, resolvePublicFile, safeBaseName } from './storage-keys'

describe('buildObjectKey', () => {
  it('imagens vão para public/ com nome seguro e extensão pelo tipo', () => {
    expect(
      buildObjectKey({
        kind: 'image',
        folder: 'ebooks/abc123',
        filename: 'Capa Final Ação.PNG',
        contentType: 'image/png',
        now: 1,
      }),
    ).toBe('public/ebooks/abc123/1-capa-final-acao.png')
  })

  it('PDFs vão para private/ e só em pastas de ebook', () => {
    expect(
      buildObjectKey({
        kind: 'pdf',
        folder: 'ebooks/abc',
        filename: 'e.pdf',
        contentType: 'application/pdf',
        now: 2,
      }),
    ).toBe('private/ebooks/abc/2-e.pdf')
    expect(
      buildObjectKey({
        kind: 'pdf',
        folder: 'site',
        filename: 'e.pdf',
        contentType: 'application/pdf',
      }),
    ).toBeNull()
  })

  it('recusa tipos e pastas fora do permitido', () => {
    expect(
      buildObjectKey({
        kind: 'image',
        folder: 'site',
        filename: 'x.html',
        contentType: 'text/html',
      }),
    ).toBeNull()
    expect(
      buildObjectKey({
        kind: 'image',
        folder: '../private',
        filename: 'x.png',
        contentType: 'image/png',
      }),
    ).toBeNull()
    expect(
      buildObjectKey({
        kind: 'image',
        folder: 'ebooks/a/b',
        filename: 'x.png',
        contentType: 'image/png',
      }),
    ).toBeNull()
    expect(
      buildObjectKey({
        kind: 'pdf',
        folder: 'ebooks/a',
        filename: 'x.png',
        contentType: 'image/png',
      }),
    ).toBeNull()
  })
})

describe('caminhos públicos', () => {
  it('publicUrlForKey só expõe objetos de public/', () => {
    expect(publicUrlForKey('public/site/1-logo.png')).toBe('/files/site/1-logo.png')
    expect(publicUrlForKey('private/ebooks/a/1-e.pdf')).toBeNull()
  })

  it('resolvePublicFile aceita apenas imagens dentro das pastas conhecidas', () => {
    expect(resolvePublicFile(['site', '1-logo.png'])).toEqual({
      key: 'public/site/1-logo.png',
      contentType: 'image/png',
    })
    expect(resolvePublicFile(['ebooks', 'abc', '1-capa.webp'])).toEqual({
      key: 'public/ebooks/abc/1-capa.webp',
      contentType: 'image/webp',
    })
  })

  it.each([
    [['..', 'private', 'ebooks', 'a.pdf']],
    [['ebooks', 'abc', '1-e.pdf']],
    [['site', '.env']],
    [['outra', '1-logo.png']],
    [['site', 'logo.png%2F..']],
    [['site']],
  ])('recusa %j', (segments) => {
    expect(resolvePublicFile(segments)).toBeNull()
  })
})

describe('safeBaseName', () => {
  it('normaliza e nunca devolve vazio', () => {
    expect(safeBaseName('Página 1 — Introdução.webp')).toBe('pagina-1-introducao')
    expect(safeBaseName('###.png')).toBe('arquivo')
  })
})
