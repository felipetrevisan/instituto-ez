import React from 'react'
import { render } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { Card, CardContent, CardHeader, CardTitle } from './card'

describe('Card', () => {
  it('matches snapshot', () => {
    const { container } = render(
      <Card theme="landing" variant="landing">
        <CardHeader>
          <CardTitle>Header</CardTitle>
        </CardHeader>
        <CardContent>Body</CardContent>
      </Card>,
    )

    expect(container).toMatchSnapshot()
  })
})
