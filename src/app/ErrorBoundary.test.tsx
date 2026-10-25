import { render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { ErrorBoundary } from './ErrorBoundary'

function BrokenView(): never {
  throw new Error('demonstration render failure')
}

afterEach(() => {
  vi.restoreAllMocks()
})

describe('ErrorBoundary', () => {
  it('offers a safe recovery route when a child cannot render', () => {
    vi.spyOn(console, 'error').mockImplementation(() => undefined)

    render(
      <ErrorBoundary>
        <BrokenView />
      </ErrorBoundary>,
    )

    expect(screen.getByRole('heading', { name: 'We could not display this view.' })).toBeVisible()
    expect(screen.getByRole('link', { name: 'Open the explorer' })).toHaveAttribute('href', '/case-studies')
  })
})
