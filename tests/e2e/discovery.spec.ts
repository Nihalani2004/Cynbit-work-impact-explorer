import AxeBuilder from '@axe-core/playwright'
import { expect, test } from '@playwright/test'

test('dynamic category and work-type controls expose the documented distribution', async ({ page }) => {
  await page.goto('/case-studies')
  for (const expectation of [
    { name: 'Software development', count: 13, parameter: 'category=software' },
    { name: 'Cloud strategy', count: 3, parameter: 'category=cloud' },
    { name: 'Digital marketing', count: 3, parameter: 'category=marketing' },
  ]) {
    const control = page.getByRole('button', { name: expectation.name })
    await control.click()
    await expect(control).toHaveAttribute('aria-pressed', 'true')
    await expect(page.locator('article.study-card')).toHaveCount(expectation.count)
    await expect(page).toHaveURL(new RegExp(expectation.parameter))
  }

  await page.getByRole('button', { name: 'All categories' }).click()
  await page.getByRole('button', { name: 'Owned initiatives' }).click()
  await expect(page.locator('article.study-card')).toHaveCount(1)
  await expect(page.getByRole('heading', { name: 'BitElevate' })).toBeVisible()
  await page.getByRole('button', { name: 'All work' }).click()
  await expect(page.locator('article.study-card')).toHaveCount(17)
  await expect(page).toHaveURL('/case-studies')

  await page.getByRole('button', { name: 'Published case studies' }).click()
  await expect(page.locator('article.study-card')).toHaveCount(13)
  await expect(page).toHaveURL('/case-studies?type=published-study')
})

test('initial root redirect announces the page without outlining the route heading', async ({ page }) => {
  await page.goto('/')
  const heading = page.getByRole('heading', { name: /Explore the work behind software systems, cloud strategy, and digital growth/i })
  await expect(page).toHaveURL('/case-studies')
  await expect(heading).toBeFocused()
  await expect(heading).toHaveCSS('outline-style', 'none')
  const rotatingPhrases = page.locator('.hero-title-rotator__phrase')
  await expect(rotatingPhrases).toHaveCount(3)
  await expect.poll(
    () => rotatingPhrases.first().evaluate((element) => getComputedStyle(element).animationName),
  ).toBe('hero-title-cycle')
})

test('hover and keyboard focus spotlight one case-study card while preserving peer readability', async ({ page }) => {
  await page.goto('/case-studies')
  const cards = page.locator('article.study-card')
  const activeCard = cards.nth(1)
  const backgroundCard = cards.nth(0)

  await activeCard.hover()
  await expect.poll(() => activeCard.evaluate((element) => getComputedStyle(element).zIndex)).toBe('1')
  await expect.poll(() => backgroundCard.evaluate((element) => Number.parseFloat(getComputedStyle(element).opacity))).toBe(1)

  await backgroundCard.getByRole('link').focus()
  await expect.poll(() => backgroundCard.evaluate((element) => getComputedStyle(element).zIndex)).toBe('1')
  await expect.poll(() => activeCard.evaluate((element) => Number.parseFloat(getComputedStyle(element).opacity))).toBe(1)
})

test('category, type, search, empty state and clearing work together', async ({ page }) => {
  await page.goto('/case-studies')
  await page.getByRole('button', { name: 'Digital marketing' }).click()
  await page.getByRole('button', { name: 'Owned initiatives' }).click()
  await expect(page.locator('article.study-card')).toHaveCount(1)
  await page.getByRole('searchbox', { name: 'Search documented work' }).fill('mentorship')
  await page.getByRole('button', { name: 'Search', exact: true }).click()
  await expect(page.locator('article.study-card')).toHaveCount(1)
  await expect(page.getByRole('status')).toContainText('1 documented profile')
  await expect(page).toHaveURL('/case-studies?category=marketing&type=initiative&q=mentorship')

  await page.getByRole('button', { name: 'Clear search field' }).click()
  await expect(page.getByRole('searchbox', { name: 'Search documented work' })).toHaveValue('')
  await expect(page).toHaveURL('/case-studies?category=marketing&type=initiative')
  await page.getByRole('searchbox', { name: 'Search documented work' }).fill('no-such-work')
  await page.getByRole('searchbox', { name: 'Search documented work' }).press('Enter')
  await expect(page.getByRole('heading', { name: 'No documented work matches' })).toBeVisible()
  await page.getByRole('button', { name: 'Show all work' }).click()
  await expect(page.locator('article.study-card')).toHaveCount(17)
  await expect(page).toHaveURL('/case-studies')
})

test('direct detail navigation, citations, refresh and return preserve discovery state', async ({ page }) => {
  await page.goto('/case-studies?category=software&type=product&q=payments')
  await expect(page.locator('article.study-card')).toHaveCount(1)
  await page.getByRole('link', { name: /TenantEase/ }).click()
  await expect(page).toHaveURL('/case-studies/tenantease?category=software&type=product&q=payments')
  await expect(page.getByRole('heading', { name: 'TenantEase' })).toBeFocused()
  await expect(page.locator('meta[name="description"]')).toHaveAttribute('content', /TenantEase/)
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', /\/case-studies\/tenantease$/)
  await expect(page.getByRole('complementary', { name: 'Work profile summary' }).getByText('Cynbit-owned product', { exact: true })).toBeVisible()
  await expect(page.getByRole('heading', { name: 'Sources used in this profile.' })).toBeVisible()
  await expect(page.getByRole('link', { name: /Source 1:/ }).first()).toBeVisible()
  await expect(page.getByText(/100% collection efficiency as a target/)).toBeVisible()
  await expect.poll(() => page.evaluate(() => window.scrollY)).toBe(0)
  await page.reload()
  await expect(page.getByRole('heading', { name: 'TenantEase' })).toBeVisible()
  await page.getByRole('link', { name: 'Back to results' }).click()
  await expect(page.locator('article.study-card')).toHaveCount(1)
  await expect(page.getByRole('button', { name: 'Software development' })).toHaveAttribute('aria-pressed', 'true')
  await expect(page.getByRole('button', { name: 'Owned products' })).toHaveAttribute('aria-pressed', 'true')
  await expect(page).toHaveURL('/case-studies?category=software&type=product&q=payments')
})

test('related-profile navigation retains the discovery query', async ({ page }) => {
  await page.goto('/case-studies/tenantease?type=product')
  await page.getByRole('region', { name: 'Related documented work.' }).getByRole('link', { name: /Revio/ }).click()
  await expect(page).toHaveURL('/case-studies/revio?type=product')
  await expect(page.getByRole('heading', { name: 'Revio' })).toBeFocused()
  await expect(page.getByText(/94% sentiment score/)).toBeVisible()
})

test('published case studies expose implementation evidence, attributed outcomes and limitations', async ({ page }) => {
  await page.goto('/case-studies?category=software&type=published-study&q=Kubernetes')
  await expect(page.locator('article.study-card')).toHaveCount(1)
  await expect(page.getByRole('heading', { name: 'GlobalPay' })).toBeVisible()
  await expect(page.getByText('2.4M+ daily users · <200ms')).toBeVisible()
  await page.getByRole('link', { name: /GlobalPay/ }).click()
  await expect(page).toHaveURL('/case-studies/fintech-payments-evolution?category=software&type=published-study&q=Kubernetes')
  await expect(page.getByRole('heading', { name: 'GlobalPay' })).toBeFocused()
  await expect(page.getByText(/published by Cynbit; the named engagement and reported outcomes have not been independently confirmed/)).toBeVisible()
  await expect(page.getByRole('heading', { name: 'Project-specific technology and capability evidence.' })).toBeVisible()
  await expect(page.getByRole('complementary', { name: 'Editorial synthesis note' })).toBeVisible()
  await expect(page.locator('.technology-list').getByText('PostgreSQL', { exact: true })).toBeVisible()
  await expect(page.getByText(/No independent measurement method/)).toBeVisible()
  await expect(page.getByRole('link', { name: /Source 2: Cross-Border Payments Evolution/ }).first()).toBeVisible()
})

test('browser Back and Forward restore filter and search controls', async ({ page }) => {
  await page.goto('/case-studies')
  await page.getByRole('button', { name: 'Digital marketing' }).click()
  await page.getByRole('button', { name: 'Owned initiatives' }).click()
  await page.getByRole('searchbox', { name: 'Search documented work' }).fill('mentorship')
  await page.getByRole('searchbox', { name: 'Search documented work' }).press('Enter')
  await expect(page.locator('article.study-card')).toHaveCount(1)
  await page.goBack()
  await expect(page).toHaveURL('/case-studies?category=marketing&type=initiative')
  await expect(page.getByRole('searchbox', { name: 'Search documented work' })).toHaveValue('')
  await page.goBack()
  await expect(page.locator('article.study-card')).toHaveCount(3)
  await expect(page.getByRole('button', { name: 'All work' })).toHaveAttribute('aria-pressed', 'true')
  await expect(page).toHaveURL('/case-studies?category=marketing')
  await page.goBack()
  await expect(page.locator('article.study-card')).toHaveCount(17)
  await page.goForward()
  await page.goForward()
  await page.goForward()
  await expect(page).toHaveURL('/case-studies?category=marketing&type=initiative&q=mentorship')
  await expect(page.getByRole('searchbox', { name: 'Search documented work' })).toHaveValue('mentorship')
  await expect(page.getByRole('button', { name: 'Owned initiatives' })).toHaveAttribute('aria-pressed', 'true')
})

test('keyboard recovery, invalid routes and responsive layouts work', async ({ page }) => {
  await page.goto('/case-studies?category=unknown&type=other&q=%3Cscript%3E')
  await expect(page.getByText('Those category and work-type filters are unavailable. Showing all values instead.')).toBeVisible()
  await expect(page.getByRole('heading', { name: 'No documented work matches' })).toBeVisible()
  await page.getByRole('button', { name: 'Show all work' }).focus()
  await page.keyboard.press('Enter')
  await expect(page.locator('article.study-card')).toHaveCount(17)
  for (const width of [320, 390, 768, 1440]) {
    await page.setViewportSize({ width, height: 900 })
    expect(await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth), `no horizontal overflow at ${width}px`).toBe(false)
  }
  await page.setViewportSize({ width: 640, height: 900 })
  await page.evaluate(() => { document.documentElement.style.fontSize = '200%' })
  expect(await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth), 'no overflow with 200% text scaling').toBe(false)
  await page.evaluate(() => { document.documentElement.style.fontSize = '' })
  await page.emulateMedia({ reducedMotion: 'reduce' })
  const transition = await page.locator('.hero-anchor').evaluate((element) => getComputedStyle(element).transitionDuration)
  expect(transition.split(',').every((value) => Number.parseFloat(value.trim()) <= 0.001)).toBe(true)
  await page.goto('/case-studies/not-a-profile')
  await expect(page.getByRole('heading', { name: 'That work profile is unavailable.' })).toBeVisible()
  await page.goto('/outside-the-prototype')
  await expect(page.getByRole('heading', { name: 'This page is outside the collection.' })).toBeVisible()
})

test('skip navigation is first in the focus order and keyboard operable', async ({ page }) => {
  await page.goto('/case-studies')
  const skipLink = page.getByRole('link', { name: 'Skip to main content' })
  const firstFocusableText = await page.locator('a[href], button, input, select, textarea, [tabindex]:not([tabindex="-1"])').first().innerText()
  expect(firstFocusableText).toContain('Skip to main content')
  await skipLink.focus()
  await expect(skipLink).toBeFocused()
  await expect(skipLink).toBeVisible()
  await page.keyboard.press('Enter')
  await expect(page).toHaveURL(/#main-content$/)
  await expect(page.getByRole('main')).toBeFocused()
})

test('the core journey has no remote runtime dependency', async ({ page }) => {
  const remoteRequests: string[] = []
  page.on('request', (request) => {
    const requestUrl = new URL(request.url())
    if (!['127.0.0.1', 'localhost'].includes(requestUrl.hostname)) remoteRequests.push(request.url())
  })
  await page.route('**/*', async (route) => {
    if (route.request().resourceType() === 'image') await route.abort()
    else await route.continue()
  })
  await page.goto('/case-studies')
  await page.getByRole('button', { name: 'Owned products' }).click()
  await expect(page.locator('article.study-card')).toHaveCount(3)
  await expect(page.locator('.study-art').first()).toBeVisible()
  expect(remoteRequests).toEqual([])
})

test('primary routes render without browser console errors', async ({ page }) => {
  const errors: string[] = []
  page.on('pageerror', (error) => errors.push(error.message))
  page.on('console', (message) => { if (message.type() === 'error') errors.push(message.text()) })
  for (const path of ['/case-studies', '/case-studies?category=marketing&type=initiative&q=mentorship', '/case-studies/bitelevate', '/case-studies/fintech-payments-evolution']) {
    await page.goto(path)
    await expect(page.getByRole('main')).toBeVisible()
  }
  expect(errors).toEqual([])
})

test('listing, empty state and detail have no serious automated accessibility violations', async ({ page }) => {
  for (const path of ['/case-studies', '/case-studies?q=unmatched', '/case-studies/cynbit-studio', '/case-studies/fintech-payments-evolution']) {
    await page.goto(path)
    const results = await new AxeBuilder({ page }).analyze()
    expect(results.violations.filter((item) => ['critical', 'serious'].includes(item.impact ?? '')), path).toEqual([])
  }
})

test('hover and keyboard spotlight states have no serious automated accessibility violations', async ({ page }) => {
  await page.goto('/case-studies')
  const cards = page.locator('article.study-card')

  await cards.nth(1).hover()
  let results = await new AxeBuilder({ page }).analyze()
  expect(results.violations.filter((item) => ['critical', 'serious'].includes(item.impact ?? ''))).toEqual([])

  await cards.nth(0).getByRole('link').focus()
  results = await new AxeBuilder({ page }).analyze()
  expect(results.violations.filter((item) => ['critical', 'serious'].includes(item.impact ?? ''))).toEqual([])
})
