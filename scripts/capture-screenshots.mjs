import { spawn } from 'node:child_process'
import { chromium } from '@playwright/test'

const baseUrl = 'http://127.0.0.1:4173'
const vite = spawn(
  process.execPath,
  ['node_modules/vite/bin/vite.js', '--host', '127.0.0.1', '--port', '4173', '--strictPort'],
  { stdio: 'ignore', windowsHide: true },
)

async function waitForServer() {
  for (let attempt = 0; attempt < 40; attempt += 1) {
    try {
      const response = await fetch(`${baseUrl}/case-studies`)
      if (response.ok) return
    } catch {
      // Vite is still starting.
    }
    await new Promise((resolve) => setTimeout(resolve, 250))
  }
  throw new Error('Timed out waiting for the local Vite server.')
}

let browser
try {
  await waitForServer()
  browser = await chromium.launch()

  const desktop = await browser.newPage({ viewport: { width: 1440, height: 1000 }, deviceScaleFactor: 1 })
  await desktop.goto(`${baseUrl}/`, { waitUntil: 'networkidle' })
  await desktop.screenshot({ path: 'docs/screenshots/explorer-desktop.png', fullPage: false })

  const gallery = await browser.newPage({ viewport: { width: 1440, height: 1000 }, deviceScaleFactor: 1 })
  await gallery.goto(`${baseUrl}/case-studies`, { waitUntil: 'networkidle' })
  await gallery.locator('.study-grid').scrollIntoViewIfNeeded()
  await gallery.locator('article.study-card').nth(1).hover()
  await gallery.waitForTimeout(350)
  await gallery.screenshot({ path: 'docs/screenshots/explorer-cards-hover.png', fullPage: false })

  const mobile = await browser.newPage({ viewport: { width: 390, height: 1000 }, deviceScaleFactor: 1 })
  await mobile.goto(`${baseUrl}/case-studies?category=cloud`, { waitUntil: 'networkidle' })
  await mobile.evaluate(() => {
    document.documentElement.style.scrollBehavior = 'auto'
    const results = document.querySelector('#explorer-results')
    window.scrollTo(0, results?.offsetTop ?? 0)
  })
  await mobile.screenshot({ path: 'docs/screenshots/explorer-mobile-cloud.png', fullPage: false })

  const detail = await browser.newPage({ viewport: { width: 1440, height: 1000 }, deviceScaleFactor: 1 })
  await detail.goto(`${baseUrl}/case-studies/fintech-payments-evolution`, { waitUntil: 'networkidle' })
  await detail.screenshot({ path: 'docs/screenshots/globalpay-detail.png', fullPage: false })
} finally {
  await browser?.close()
  vite.kill()
}
