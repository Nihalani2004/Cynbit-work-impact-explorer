import { Link, useLocation } from 'react-router'
import { useDocumentMetadata } from '../../../app/useDocumentMetadata'
import { ArrowIcon } from '../../../components/Icons'
import { ComparisonTray } from '../components/ComparisonTray'
import { evidenceSources } from '../data/sources'
import { useComparisonSelection } from '../hooks/useComparisonSelection'
import { withoutComparisonSelection } from '../model/comparisonState'
import {
  categoryLabels,
  measurementLabels,
  verificationLabels,
  workTypeLabels,
  type CaseStudy,
  type EvidenceSource,
  type SourcedClaim,
} from '../model/types'

type ComparisonCellProps = {
  study: CaseStudy
  children: React.ReactNode
}

function sourcesFor(study: CaseStudy) {
  return study.sourceIds
    .map((sourceId) => evidenceSources.find((source) => source.id === sourceId))
    .filter((source): source is EvidenceSource => source !== undefined)
}

function EvidenceLinks({ sourceIds, sources }: { sourceIds: readonly string[]; sources: readonly EvidenceSource[] }) {
  const linkedSources = sourceIds
    .map((sourceId) => ({ source: sources.find((item) => item.id === sourceId), sourceId }))
    .filter((entry): entry is { source: EvidenceSource; sourceId: string } => entry.source !== undefined)
  if (linkedSources.length === 0) return null

  return (
    <span className="comparison-source-links" aria-label="Supporting sources">
      {linkedSources.map(({ source, sourceId }) => (
        <a
          href={source.url}
          target="_blank"
          rel="noopener noreferrer"
          key={sourceId}
          aria-label={`[${sources.findIndex((item) => item.id === sourceId) + 1}] Open source: ${source.title} (opens in a new tab)`}
        >
          [{sources.findIndex((item) => item.id === sourceId) + 1}]
        </a>
      ))}
    </span>
  )
}

function Claims({ claims, sources }: { claims: readonly SourcedClaim[]; sources: readonly EvidenceSource[] }) {
  if (claims.length === 0) return <p className="comparison-unavailable">Not publicly documented.</p>
  return (
    <ul className="comparison-claim-list">
      {claims.map((claim) => (
        <li key={claim.text}>{claim.text} <EvidenceLinks sourceIds={claim.sourceIds} sources={sources} /></li>
      ))}
    </ul>
  )
}

function ComparisonCell({ study, children }: ComparisonCellProps) {
  return <td data-profile={study.title}>{children}</td>
}

function ComparisonRow({ label, studies, children }: {
  label: string
  studies: readonly CaseStudy[]
  children: (study: CaseStudy, sources: readonly EvidenceSource[]) => React.ReactNode
}) {
  return (
    <tr>
      <th scope="row">{label}</th>
      {studies.map((study) => <ComparisonCell study={study} key={study.id}>{children(study, sourcesFor(study))}</ComparisonCell>)}
    </tr>
  )
}

function ComparisonMatrix({ studies, onRemove }: { studies: readonly CaseStudy[]; onRemove: (slug: string) => void }) {
  return (
    <div className="comparison-table-wrap" aria-label="Side-by-side comparison table">
      <table className="comparison-matrix">
        <caption>Side-by-side comparison of public project evidence</caption>
        <thead>
          <tr>
            <th scope="col"><span className="visually-hidden">Comparison category</span></th>
            {studies.map((study) => (
              <th scope="col" key={study.id}>
                <span className="comparison-matrix__profile-label">Documented profile</span>
                <strong>{study.title}</strong>
                <span>{study.descriptor}</span>
                <button type="button" onClick={() => onRemove(study.slug)} aria-label={`Remove ${study.title} from comparison`}>
                  Remove
                </button>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          <ComparisonRow label="Evidence and relationship" studies={studies}>
            {(study) => <p><strong>{verificationLabels[study.verificationStatus]}</strong><br />{study.organization.relationship}<br />{workTypeLabels[study.workType]}</p>}
          </ComparisonRow>
          <ComparisonRow label="Focus" studies={studies}>
            {(study) => <p>{study.categories.map((category) => categoryLabels[category]).join(' · ')}<br /><span>{study.organization.industry}</span></p>}
          </ComparisonRow>
          <ComparisonRow label="Objectives" studies={studies}>
            {(study, sources) => <Claims claims={study.objectives} sources={sources} />}
          </ComparisonRow>
          <ComparisonRow label="Documented challenge" studies={studies}>
            {(study, sources) => <Claims claims={study.challenges} sources={sources} />}
          </ComparisonRow>
          <ComparisonRow label="Documented solution" studies={studies}>
            {(study, sources) => <Claims claims={study.solution} sources={sources} />}
          </ComparisonRow>
          <ComparisonRow label="Implementation" studies={studies}>
            {(study, sources) => <Claims claims={study.implementation} sources={sources} />}
          </ComparisonRow>
          <ComparisonRow label="Technology and capability" studies={studies}>
            {(study, sources) => study.technologies.length > 0 ? (
              <ul className="comparison-technology-list">
                {study.technologies.map((technology) => <li key={technology.name}><strong>{technology.name}</strong><span>{technology.role}</span> <EvidenceLinks sourceIds={technology.sourceIds} sources={sources} /></li>)}
              </ul>
            ) : <p className="comparison-unavailable">No project-specific technology is publicly documented.</p>}
          </ComparisonRow>
          <ComparisonRow label="Outcomes and evidence" studies={studies}>
            {(study, sources) => (
              <ul className="comparison-outcome-list">
                {study.outcomes.map((outcome) => (
                  <li key={outcome.label}>
                    <strong>{outcome.label}</strong>
                    {outcome.value && <span className="comparison-outcome-list__value">{outcome.value}</span>}
                    <span className="comparison-outcome-list__status">{measurementLabels[outcome.measurement]}</span>
                    <p>{outcome.context} <EvidenceLinks sourceIds={outcome.sourceIds} sources={sources} /></p>
                    {outcome.caveat && <p className="comparison-outcome-list__caveat">{outcome.caveat}</p>}
                  </li>
                ))}
              </ul>
            )}
          </ComparisonRow>
          <ComparisonRow label="Evidence limits" studies={studies}>
            {(study) => <ul className="comparison-claim-list">{study.limitations.map((limitation) => <li key={limitation}>{limitation}</li>)}</ul>}
          </ComparisonRow>
          <ComparisonRow label="Public sources" studies={studies}>
            {(_study, sources) => (
              <ol className="comparison-reference-list">
                {sources.map((source, index) => <li key={source.id}><a href={source.url} target="_blank" rel="noopener noreferrer">[{index + 1}] {source.title}<span className="visually-hidden"> (opens in a new tab)</span></a></li>)}
              </ol>
            )}
          </ComparisonRow>
        </tbody>
      </table>
    </div>
  )
}

export function ComparisonPage() {
  const location = useLocation()
  const comparison = useComparisonSelection()
  const selectedStudies = comparison.studies
  const canCompare = selectedStudies.length >= 2

  useDocumentMetadata({
    title: 'Compare Work Evidence | Cynbit Work & Impact',
    description: 'Compare two or three Cynbit Work & Impact profiles using only their documented public evidence and stated limitations.',
    path: '/case-studies/compare',
  })

  return (
    <main id="main-content" className="comparison-page" tabIndex={-1}>
      <div className="page-width">
        <Link className="back-link" to={`/case-studies${location.search}`}><ArrowIcon /> Back to results</Link>
        <header className="comparison-hero">
          <span className="eyebrow"><span className="eyebrow__dot" aria-hidden="true" /> Evidence-aware review</span>
          <h1 tabIndex={-1}>Compare the <em>public record.</em></h1>
          <p>Review what each source establishes side by side. Claims, technologies, outcomes and gaps stay attached to their evidence rather than being turned into a score.</p>
        </header>

        {comparison.ignoredValues && (
          <p className="query-note" role="status">Unavailable, duplicate or excess comparison selections were omitted. You can compare up to three profiles at a time.</p>
        )}

        <ComparisonTray
          studies={selectedStudies}
          search={location.search}
          onRemove={comparison.remove}
          onClear={comparison.clear}
        />

        {canCompare ? <ComparisonMatrix studies={selectedStudies} onRemove={comparison.remove} /> : (
          <section className="comparison-empty" aria-labelledby="comparison-empty-title">
            <span aria-hidden="true">+</span>
            <h2 id="comparison-empty-title">Choose {selectedStudies.length === 0 ? 'two or three profiles' : 'one more profile'} to compare.</h2>
            <p>Selections are preserved in the URL, along with any search and filter state, so this review can be revisited or shared.</p>
            <Link className="button button--primary" to={`/case-studies${withoutComparisonSelection(location.search)}`}>Browse documented work <ArrowIcon /></Link>
          </section>
        )}
      </div>
    </main>
  )
}
