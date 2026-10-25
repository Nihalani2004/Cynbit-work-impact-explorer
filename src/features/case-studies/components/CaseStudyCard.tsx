import { Link } from 'react-router'
import { ArrowIcon } from '../../../components/Icons'
import { categoryLabels, verificationLabels, workTypeLabels, type CaseStudy } from '../model/types'
import { StudyArtwork } from './StudyArtwork'

type Props = { study: CaseStudy; search: string }

export function CaseStudyCard({ study, search }: Props) {
  const featuredOutcome = study.outcomes.find((outcome) => outcome.value)

  return (
    <article className="study-card">
      <Link className="study-card__link" to={`/case-studies/${study.slug}${search}`}>
        <StudyArtwork category={study.categories[0]} order={study.displayOrder} />
        <div className="study-card__body">
          <div className="study-card__badges">
            <span className={`evidence-badge evidence-badge--${study.verificationStatus}`}>{verificationLabels[study.verificationStatus]}</span>
            <span className="work-type-badge">{workTypeLabels[study.workType].replace('Owned ', '')}</span>
          </div>
          <div className="study-card__meta">
            <span>{study.categories.map((category) => categoryLabels[category]).join(' · ')}</span><span aria-hidden="true">/</span><span>{study.organization.industry}</span>
          </div>
          <h3>{study.title}</h3>
          <p className="study-card__descriptor">{study.descriptor}</p>
          <p>{study.summary.text}</p>
          {(featuredOutcome || study.technologies.length > 0) && (
            <dl className="study-card__facts">
              {featuredOutcome && <><dt>Reported result</dt><dd>{featuredOutcome.value}</dd></>}
              {study.technologies.length > 0 && <><dt>Documented technology</dt><dd>{study.technologies.slice(0, 3).map((technology) => technology.name).join(' · ')}</dd></>}
            </dl>
          )}
          <span className="study-card__action">Read documented profile <ArrowIcon /></span>
        </div>
      </Link>
    </article>
  )
}
