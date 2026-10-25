import { Link, useLocation, useParams } from 'react-router'
import { useDocumentMetadata } from '../../../app/useDocumentMetadata'
import { ArrowIcon } from '../../../components/Icons'
import { NotFoundPage } from '../../../pages/NotFoundPage'
import { SourceCitations, SourceList } from '../components/EvidenceReferences'
import { OutcomePanel } from '../components/OutcomePanel'
import { RelatedStudies } from '../components/RelatedStudies'
import { StudyArtwork } from '../components/StudyArtwork'
import { caseStudies } from '../data/caseStudies'
import { evidenceSources } from '../data/sources'
import {
  categoryLabels,
  verificationLabels,
  workTypeLabels,
  type EvidenceSource,
  type SourcedClaim,
} from '../model/types'

type DetailSectionProps = {
  step: string
  title: string
  id: string
  claims: readonly SourcedClaim[]
  sources: readonly EvidenceSource[]
}

function DetailSection({ step, title, id, claims, sources }: DetailSectionProps) {
  return (
    <section aria-labelledby={id}>
      <span className="detail-content__step">{step}</span>
      <h2 id={id}>{title}</h2>
      <div className="claim-list">
        {claims.map((claim) => (
          <p key={claim.text}>{claim.text} <SourceCitations sourceIds={claim.sourceIds} sources={sources} /></p>
        ))}
      </div>
    </section>
  )
}

export function DetailPage() {
  const { slug } = useParams()
  const location = useLocation()
  const study = caseStudies.find((item) => item.slug === slug)

  useDocumentMetadata({
    title: study ? `${study.title} | Cynbit Work & Impact` : 'Work Profile Not Found | Cynbit Work & Impact',
    description: study
      ? `${study.title}: ${study.descriptor}. Review public sources, evidence limits, documented technology and attributed outcomes.`
      : 'The requested Cynbit Work & Impact profile is unavailable.',
    path: study ? `/case-studies/${study.slug}` : '/case-studies',
  })

  if (!study) return <NotFoundPage kind="study" />

  const sources = study.sourceIds
    .map((sourceId) => evidenceSources.find((source) => source.id === sourceId))
    .filter((source): source is EvidenceSource => source !== undefined)
  const relatedStudies = study.relatedIds
    .map((id) => caseStudies.find((candidate) => candidate.id === id))
    .filter((candidate): candidate is NonNullable<typeof candidate> => candidate !== undefined)
  const isPublishedStudy = study.verificationStatus === 'official-only'

  return (
    <main id="main-content" className="detail-page" tabIndex={-1}>
      <div className="page-width">
        <Link className="back-link" to={`/case-studies${location.search}`}><ArrowIcon /> Back to results</Link>
        <div className="detail-hero">
          <div className="detail-hero__copy">
            <span className="eyebrow"><span className="eyebrow__dot" aria-hidden="true" /> {verificationLabels[study.verificationStatus]}</span>
            <p className="detail-hero__category">{workTypeLabels[study.workType]} <span aria-hidden="true">/</span> {study.categories.map((category) => categoryLabels[category]).join(' · ')}</p>
            <h1 tabIndex={-1}>{study.title}</h1>
            <p className="detail-hero__descriptor">{study.descriptor}</p>
            <p className="detail-hero__summary">{study.summary.text} <SourceCitations sourceIds={study.summary.sourceIds} sources={sources} /></p>
            <p className={`detail-hero__evidence detail-hero__evidence--${study.verificationStatus}`}>
              {isPublishedStudy
                ? 'Evidence status: published by Cynbit; the named engagement and reported outcomes have not been independently confirmed.'
                : 'Evidence status: documented across Cynbit-controlled sources; unsupported adoption and business outcomes are omitted.'}
            </p>
            <div className="detail-hero__tags" aria-label="Topics">
              {study.tags.map((tag) => <span key={tag}>{tag}</span>)}
            </div>
          </div>
          <StudyArtwork category={study.categories[0]} order={study.displayOrder} />
        </div>

        <div className="detail-content">
          <aside className="detail-content__aside" aria-label="Work profile summary">
            <span className="eyebrow eyebrow--compact">Profile snapshot</span>
            <dl>
              <dt>Organization</dt><dd>{study.organization.name}</dd>
              <dt>Relationship</dt><dd>{study.organization.relationship}</dd>
              <dt>Work type</dt><dd>{workTypeLabels[study.workType]}</dd>
              <dt>Categories</dt><dd>{study.categories.map((category) => categoryLabels[category]).join(', ')}</dd>
              {study.projectDate && <><dt>Published project date</dt><dd>{study.projectDate.text} <SourceCitations sourceIds={study.projectDate.sourceIds} sources={sources} /></dd></>}
              {study.publicStatus && <><dt>Published status</dt><dd>{study.publicStatus.text} <SourceCitations sourceIds={study.publicStatus.sourceIds} sources={sources} /></dd></>}
              <dt>Public sources</dt><dd>{sources.length}</dd>
            </dl>
            <p>{isPublishedStudy
              ? 'This profile summarizes a Cynbit-published case study. The source establishes what Cynbit says about the project; it does not independently verify the client relationship or results.'
              : 'This profile documents Cynbit-owned work. It does not imply an independently verified client engagement or measured business result.'}</p>
          </aside>

          <div className="detail-content__sections">
            {isPublishedStudy && (
              <aside className="editorial-note" aria-label="Editorial synthesis note">
                <strong>Editorial synthesis</strong>
                <p>The extended context and implementation narrative below synthesize the cited Cynbit page. Numbered references identify source-backed claims; the page does not independently verify the named engagement or its reported results.</p>
              </aside>
            )}
            <DetailSection step="01 / CONTEXT" title="Why this work exists." id="context-title" claims={study.context} sources={sources} />
            <DetailSection step="02 / OBJECTIVES" title="What the public brief sets out to achieve." id="objectives-title" claims={study.objectives} sources={sources} />
            <DetailSection step="03 / CHALLENGES" title="The problem being addressed." id="challenges-title" claims={study.challenges} sources={sources} />
            <DetailSection step="04 / SOLUTION" title="The documented solution." id="solution-title" claims={study.solution} sources={sources} />
            <DetailSection step="05 / IMPLEMENTATION" title="How the work was implemented." id="implementation-title" claims={study.implementation} sources={sources} />
            <DetailSection step="06 / EXECUTION" title="What the public record establishes." id="execution-title" claims={study.execution} sources={sources} />

            <section aria-labelledby="technology-title">
              <span className="detail-content__step">07 / TECHNOLOGY</span>
              <h2 id="technology-title">Project-specific technology and capability evidence.</h2>
              {study.technologies.length > 0 ? (
                <ul className="technology-list">
                  {study.technologies.map((technology) => (
                    <li key={technology.name}><strong>{technology.name}</strong><span>{technology.role}</span><SourceCitations sourceIds={technology.sourceIds} sources={sources} /></li>
                  ))}
                </ul>
              ) : <p className="evidence-gap">The reviewed sources do not identify a project-specific technology stack. Cynbit’s company-wide technology list is not attributed to this profile.</p>}
            </section>

            <section aria-labelledby="outcomes-title">
              <span className="detail-content__step">08 / OUTCOMES</span>
              <h2 id="outcomes-title">Results, with their evidence status.</h2>
              <div className="outcome-grid">
                {study.outcomes.map((outcome) => <OutcomePanel outcome={outcome} sources={sources} key={outcome.label} />)}
              </div>
            </section>

            <section aria-labelledby="limits-title" className="limitations-panel">
              <span className="detail-content__step">09 / EVIDENCE LIMITS</span>
              <h2 id="limits-title">What public sources do not establish.</h2>
              <ul>{study.limitations.map((limitation) => <li key={limitation}>{limitation}</li>)}</ul>
            </section>

            <section aria-labelledby="sources-title" className="sources-section">
              <span className="detail-content__step">10 / REFERENCES</span>
              <h2 id="sources-title">Sources used in this profile.</h2>
              <p>References were reviewed on the dates shown. External pages can change after review.</p>
              <SourceList sources={sources} />
            </section>
          </div>
        </div>

        <RelatedStudies studies={relatedStudies} search={location.search} />
        <div className="detail-next">
          <span className="eyebrow eyebrow--compact">Return to discovery</span>
          <h2>Continue from the same filters.</h2>
          <Link className="button button--primary" to={`/case-studies${location.search}`}>Return to your results <ArrowIcon /></Link>
        </div>
      </div>
    </main>
  )
}
