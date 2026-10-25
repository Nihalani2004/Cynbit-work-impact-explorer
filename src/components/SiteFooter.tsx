import { Link } from 'react-router'
import { ArrowIcon } from './Icons'

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="page-width site-footer__inner">
        <div>
          <span className="eyebrow eyebrow--light">Evidence-aware portfolio</span>
          <p>Documented Cynbit work, presented with its sources and limits.</p>
          <small>Independent prototype. Owned work and Cynbit-published studies are identified separately; first-party results are attributed and independently unconfirmed.</small>
        </div>
        <div className="site-footer__links">
          <Link to="/case-studies">Explore all work <ArrowIcon /></Link>
          <a href="https://www.cynbit.in/contact" target="_blank" rel="noopener noreferrer">Visit Cynbit contact <ArrowIcon /></a>
        </div>
      </div>
    </footer>
  )
}
