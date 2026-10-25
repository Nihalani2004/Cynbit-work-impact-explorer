import { Link } from 'react-router'
import { ArrowIcon } from '../../../components/Icons'
import type { CaseStudy } from '../model/types'

export function RelatedStudies({ studies, search }: { studies: readonly CaseStudy[]; search: string }) {
  if (studies.length === 0) return null
  return (
    <section className="related-work" aria-labelledby="related-work-title">
      <span className="eyebrow eyebrow--compact">Keep exploring</span>
      <h2 id="related-work-title">Related documented work.</h2>
      <div className="related-work__grid">
        {studies.map((study) => (
          <Link to={`/case-studies/${study.slug}${search}`} key={study.id}>
            <span>{study.organization.relationship}</span><strong>{study.title}</strong><small>{study.descriptor}</small>
            <span className="related-work__action">Open profile <ArrowIcon /></span>
          </Link>
        ))}
      </div>
    </section>
  )
}
