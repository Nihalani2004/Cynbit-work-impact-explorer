import { useEffect, useRef } from 'react'
import { BrowserRouter, Navigate, Route, Routes, useLocation } from 'react-router'
import { SiteFooter } from '../components/SiteFooter'
import { SiteHeader } from '../components/SiteHeader'
import { DetailPage } from '../features/case-studies/pages/DetailPage'
import { ComparisonPage } from '../features/case-studies/pages/ComparisonPage'
import { ExplorerPage } from '../features/case-studies/pages/ExplorerPage'
import { NotFoundPage } from '../pages/NotFoundPage'
import { ErrorBoundary } from './ErrorBoundary'

function RouteFocus() {
  const { pathname } = useLocation()
  const previousPath = useRef(pathname)

  useEffect(() => {
    if (previousPath.current !== pathname) {
      previousPath.current = pathname
      window.scrollTo(0, 0)
      document.querySelector<HTMLElement>('main h1')?.focus({ preventScroll: true })
    }
  }, [pathname])

  return null
}

function AppShell() {
  return (
    <>
      <a className="skip-link" href="#main-content">Skip to main content</a>
      <SiteHeader />
      <RouteFocus />
      <Routes>
        <Route path="/" element={<Navigate to="/case-studies" replace />} />
        <Route path="/case-studies" element={<ExplorerPage />} />
        <Route path="/case-studies/compare" element={<ComparisonPage />} />
        <Route path="/case-studies/:slug" element={<DetailPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <SiteFooter />
    </>
  )
}

export function App() {
  return (
    <BrowserRouter>
      <ErrorBoundary><AppShell /></ErrorBoundary>
    </BrowserRouter>
  )
}
