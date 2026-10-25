import { Link } from 'react-router'
import { ArrowIcon } from '../components/Icons'

export function NotFoundPage({ kind = 'page' }: { kind?: 'page' | 'study' }) {
  return (
    <main id="main-content" className="not-found page-width" tabIndex={-1}>
      <span className="eyebrow"><span className="eyebrow__dot" aria-hidden="true" /> Route not found</span>
      <h1 tabIndex={-1}>{kind === 'study' ? 'That work profile is unavailable.' : 'This page is outside the collection.'}</h1>
      <p>Return to Work &amp; Impact to browse the available documented profiles.</p>
      <Link className="button button--primary" to="/case-studies">Explore all work <ArrowIcon /></Link>
    </main>
  )
}
