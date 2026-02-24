import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { Button } from './button'

describe('Button', () => {
  it('applies outline theme styles', () => {
    render(
      <Button theme="coral" variant="outline">
        Action
      </Button>,
    )

    const button = screen.getByRole('button', { name: 'Action' })
    expect(button).toHaveClass('border-coral')
    expect(button).toHaveClass('text-coral')
  })

  it('applies size styles', () => {
    render(<Button size="lg">Large</Button>)

    const button = screen.getByRole('button', { name: 'Large' })
    expect(button).toHaveClass('h-12')
    expect(button).toHaveClass('px-6')
  })
})
