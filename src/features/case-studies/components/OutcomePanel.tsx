import { measurementLabels, type EvidenceSource, type Outcome } from '../model/types'
import { SourceCitations } from './EvidenceReferences'

export function OutcomePanel({ outcome, sources }: { outcome: Outcome; sources: readonly EvidenceSource[] }) {
  return (
    <article className={`outcome-panel outcome-panel--${outcome.measurement}`}>
      <span className="outcome-panel__status">{measurementLabels[outcome.measurement]}</span>
      <h3>{outcome.label}</h3>
      {outcome.value && <strong className="outcome-panel__value">{outcome.value}</strong>}
      <p>{outcome.context} <SourceCitations sourceIds={outcome.sourceIds} sources={sources} /></p>
      {outcome.caveat && <p className="outcome-panel__caveat">{outcome.caveat}</p>}
    </article>
  )
}
