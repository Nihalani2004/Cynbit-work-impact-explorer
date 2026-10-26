import { Link } from 'react-router'
import { ArrowIcon } from '../../../components/Icons'
import { maximumComparisonStudies } from '../model/comparisonState'
import type { CaseStudy } from '../model/types'

type Props = {
  studies: readonly CaseStudy[]
  search: string
  onRemove: (slug: string) => void
  onClear: () => void
}

export function ComparisonTray({ studies, search, onRemove, onClear }: Props) {
  if (studies.length === 0) return null

  const ready = studies.length >= 2
  const countText = `${studies.length} of ${maximumComparisonStudies} profile${studies.length === 1 ? '' : 's'} selected`

  return (
    <aside className="comparison-tray" aria-label="Comparison selection">
      <div className="comparison-tray__summary">
        <span className="eyebrow eyebrow--compact">Comparison shortlist</span>
        <p role="status" aria-live="polite" aria-atomic="true">{countText}</p>
      </div>
      <ul className="comparison-tray__items" aria-label="Selected profiles">
        {studies.map((study) => (
          <li key={study.id}>
            <span>{study.title}</span>
            <button type="button" onClick={() => onRemove(study.slug)} aria-label={`Remove ${study.title} from comparison`}>
              <span aria-hidden="true">×</span>
            </button>
          </li>
        ))}
      </ul>
      <div className="comparison-tray__actions">
        {ready ? (
          <Link className="button button--primary comparison-tray__compare" to={`/case-studies/compare${search}`}>
            Compare profiles <ArrowIcon />
          </Link>
        ) : <p>Choose one more profile to begin a side-by-side review.</p>}
        <button type="button" className="text-button" onClick={onClear}>Clear selection</button>
      </div>
    </aside>
  )
}
