import { afterEach, describe, expect, it } from 'vitest'
import { cleanup, render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter, Route, Routes, useLocation } from 'react-router'
import { DetailPage } from './DetailPage'
import { ExplorerPage } from './ExplorerPage'

afterEach(cleanup)

function LocationProbe() {
  const location = useLocation()
  return <div data-testid="location">{`${location.pathname}${location.search}`}</div>
}

function renderExplorer(entry = '/case-studies') {
  render(
    <MemoryRouter initialEntries={[entry]}>
      <LocationProbe />
      <Routes>
        <Route path="/case-studies" element={<ExplorerPage />} />
        <Route path="/case-studies/:slug" element={<DetailPage />} />
      </Routes>
    </MemoryRouter>,
  )
}

describe('work explorer interactions', () => {
  it('filters dynamic categories, exposes counts, and resets the URL', async () => {
    const user = userEvent.setup()
    renderExplorer()
    expect(screen.getAllByRole('article')).toHaveLength(17)
    expect(screen.getByRole('button', { name: 'Software development' })).toBeVisible()

    const cloud = screen.getByRole('button', { name: 'Cloud strategy' })
    await user.click(cloud)
    expect(cloud).toHaveAttribute('aria-pressed', 'true')
    expect(screen.getAllByRole('article')).toHaveLength(3)
    expect(screen.getByTestId('location')).toHaveTextContent('/case-studies?category=cloud')
    expect(screen.getByRole('status')).toHaveTextContent('3 documented profiles in Cloud strategy')

    await user.click(screen.getByRole('button', { name: /Clear all filters/ }))
    expect(screen.getAllByRole('article')).toHaveLength(17)
    expect(screen.getByTestId('location')).toHaveTextContent('/case-studies')
  })

  it('combines category, work type and submitted keyword search', async () => {
    const user = userEvent.setup()
    renderExplorer()
    await user.click(screen.getByRole('button', { name: 'Digital marketing' }))
    await user.click(screen.getByRole('button', { name: 'Owned initiatives' }))
    const search = screen.getByRole('searchbox', { name: 'Search documented work' })
    await user.type(search, 'mentorship{Enter}')

    expect(screen.getAllByRole('article')).toHaveLength(1)
    expect(screen.getByRole('heading', { name: 'BitElevate' })).toBeVisible()
    expect(screen.getByTestId('location')).toHaveTextContent('/case-studies?category=marketing&type=initiative&q=mentorship')
  })

  it('shows a useful empty state and recovers', async () => {
    const user = userEvent.setup()
    renderExplorer('/case-studies?q=zz-no-match')
    expect(screen.queryByRole('article')).not.toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'No documented work matches' })).toBeVisible()
    await user.click(screen.getByRole('button', { name: 'Show all work' }))
    expect(screen.getAllByRole('article')).toHaveLength(17)
  })

  it('keeps all criteria through detail and return navigation', async () => {
    const user = userEvent.setup()
    renderExplorer('/case-studies?category=software&type=product&q=payments')
    const card = screen.getByRole('article')
    await user.click(within(card).getByRole('link'))
    expect(screen.getByRole('heading', { name: 'TenantEase' })).toBeVisible()
    expect(screen.getByTestId('location')).toHaveTextContent('/case-studies/tenantease?category=software&type=product&q=payments')
    expect(screen.getByText('What public sources do not establish.')).toBeVisible()
    expect(screen.getByRole('heading', { name: 'Sources used in this profile.' })).toBeVisible()
    await user.click(screen.getByRole('link', { name: 'Back to results' }))
    expect(screen.getByTestId('location')).toHaveTextContent('/case-studies?category=software&type=product&q=payments')
    expect(screen.getAllByRole('article')).toHaveLength(1)
  })

  it('renders a published case study with technology, results and an explicit verification caveat', () => {
    renderExplorer('/case-studies/fintech-payments-evolution')
    expect(screen.getByRole('heading', { name: 'GlobalPay' })).toBeVisible()
    expect(screen.getAllByText('Node.js').length).toBeGreaterThan(0)
    expect(screen.getByText('2.4M+ daily users · <200ms')).toBeVisible()
    expect(screen.getAllByText(/not been independently confirmed|not independently verify/).length).toBeGreaterThan(0)
    expect(screen.getByRole('heading', { name: 'Sources used in this profile.' })).toBeVisible()
  })

  it('shows safe invalid filter recovery', () => {
    renderExplorer('/case-studies?category=invalid&type=unknown')
    expect(screen.getByText('Those category and work-type filters are unavailable. Showing all values instead.')).toBeVisible()
    expect(screen.getAllByRole('article')).toHaveLength(17)
  })
})
