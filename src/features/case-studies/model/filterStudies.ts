import { categoryLabels, type CaseStudy, type Category, type WorkType } from './types'

export type ExplorerCriteria = {
  category: Category | null
  workType: WorkType | null
  query: string
}

export function normalizeQuery(raw: string): string {
  return raw.trim().replace(/\s+/g, ' ').slice(0, 120)
}

function claimText(study: CaseStudy): string[] {
  return [
    study.summary,
    ...study.context,
    ...study.objectives,
    ...study.challenges,
    ...study.solution,
    ...study.implementation,
    ...study.execution,
  ].map((claim) => claim.text)
}

export function filterStudies(studies: readonly CaseStudy[], criteria: ExplorerCriteria): CaseStudy[] {
  const tokens = normalizeQuery(criteria.query).toLocaleLowerCase().split(' ').filter(Boolean)

  return studies
    .filter((study) => criteria.category === null || study.categories.includes(criteria.category))
    .filter((study) => criteria.workType === null || study.workType === criteria.workType)
    .filter((study) => {
      const searchable = [
        study.title,
        study.descriptor,
        study.organization.name,
        study.organization.relationship,
        study.organization.industry,
        study.projectDate?.text ?? '',
        study.publicStatus?.text ?? '',
        ...study.categories.map((category) => categoryLabels[category]),
        ...claimText(study),
        ...study.technologies.flatMap((technology) => [technology.name, technology.role]),
        ...study.outcomes.flatMap((outcome) => [outcome.label, outcome.value ?? '', outcome.context, outcome.caveat ?? '']),
        ...study.limitations,
        ...study.tags,
      ].join(' ').toLocaleLowerCase()
      return tokens.every((token) => searchable.includes(token))
    })
    .sort((a, b) => a.displayOrder - b.displayOrder)
}
