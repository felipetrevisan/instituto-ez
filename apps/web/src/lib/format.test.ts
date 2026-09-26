import { describe, expect, it } from 'vitest'
import { formatPrice } from './format'

// Intl usa espaço não separável entre símbolo e valor.
const normalize = (value: string) => value.replace(/\s/g, ' ')

describe('formatPrice', () => {
  it('formata em reais por padrão', () => {
    expect(normalize(formatPrice(49.9))).toBe('R$ 49,90')
  })

  it('respeita a moeda configurada', () => {
    expect(normalize(formatPrice(10, 'usd'))).toBe('$10.00')
    expect(normalize(formatPrice(10, 'eur'))).toBe('10,00 €')
  })
})
