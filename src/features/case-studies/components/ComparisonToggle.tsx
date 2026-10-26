import { maximumComparisonStudies } from '../model/comparisonState'
import type { CaseStudy } from '../model/types'

type Props = {
  study: CaseStudy
  selectedSlugs: readonly string[]
  onToggle: (slug: string) => void
  compact?: boolean
}

export function ComparisonToggle({ study, selectedSlugs, onToggle, compact = false }: Props) {
  const selected = selectedSlugs.includes(study.slug)
  const selectionFull = !selected && selectedSlugs.length >= maximumComparisonStudies
  const label = selected
    ? `Selected for comparison: ${study.title}. Activate to remove.`
    : selectionFull
      ? `Add to comparison unavailable: remove a profile before adding ${study.title}`
      : `Add to comparison: ${study.title}`

  return (
    <button
      type="button"
      className={`comparison-toggle${compact ? ' comparison-toggle--compact' : ''}`}
      aria-label={label}
      aria-pressed={selected}
      disabled={selectionFull}
      onClick={() => onToggle(study.slug)}
    >
      {selected ? 'Selected for comparison' : 'Add to comparison'}
    </button>
  )
}
