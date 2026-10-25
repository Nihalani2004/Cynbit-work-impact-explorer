import { Link } from 'react-router'
import { BrandLogo } from './BrandLogo'
import { ArrowIcon } from './Icons'
import { PrototypeNotice } from './PrototypeNotice'

export function SiteHeader() {
  return (
    <header className="site-header">
      <PrototypeNotice />
      <div className="site-header__bar page-width">
        <Link className="brand" to="/case-studies" aria-label="YNBIT — Cynbit Work and Impact home">
          <BrandLogo />
        </Link>
        <nav className="site-nav" aria-label="Primary">
          <Link to="/case-studies" className="site-nav__active" aria-current="page">Work &amp; impact</Link>
          <a href="https://www.cynbit.in/" target="_blank" rel="noopener noreferrer">Cynbit website <ArrowIcon /><span className="visually-hidden"> (opens in a new tab)</span></a>
        </nav>
      </div>
    </header>
  )
}
