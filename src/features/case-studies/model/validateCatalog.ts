import type { CaseStudy, EvidenceSource, SourcedClaim } from './types'

function assertUnique(values: readonly string[], label: string): void {
  if (new Set(values).size !== values.length) throw new Error(`Duplicate ${label} found in work catalog.`)
}

function collectClaims(study: CaseStudy): readonly SourcedClaim[] {
  return [
    study.summary,
    ...(study.projectDate ? [study.projectDate] : []),
    ...(study.publicStatus ? [study.publicStatus] : []),
    ...study.context,
    ...study.objectives,
    ...study.challenges,
    ...study.solution,
    ...study.implementation,
    ...study.execution,
  ]
}

export function validateCatalog(studies: readonly CaseStudy[], sources: readonly EvidenceSource[]): void {
  if (studies.length === 0) throw new Error('The work catalog must contain at least one entry.')

  assertUnique(studies.map((study) => study.id), 'study ID')
  assertUnique(studies.map((study) => study.slug), 'study slug')
  assertUnique(studies.map((study) => String(study.displayOrder)), 'display order')
  assertUnique(sources.map((source) => source.id), 'source ID')

  const studyIds = new Set(studies.map((study) => study.id))
  const sourceIds = new Set(sources.map((source) => source.id))

  const assertSourcesExist = (ids: readonly string[], context: string): void => {
    for (const id of ids) {
      if (!sourceIds.has(id)) throw new Error(`${context} references unknown source "${id}".`)
    }
  }

  for (const study of studies) {
    if (!study.title.trim() || !study.summary.text.trim()) throw new Error(`${study.id} is missing required content.`)
    if (study.categories.length === 0) throw new Error(`${study.id} must have at least one category.`)
    if (!['owned-documented', 'official-only'].includes(study.verificationStatus)) throw new Error(`${study.id} has an unsupported verification status.`)
    if (study.sourceIds.length === 0) throw new Error(`${study.id} must list at least one source.`)
    if (study.displayOrder < 1 || !Number.isInteger(study.displayOrder)) throw new Error(`${study.id} has an invalid display order.`)

    assertUnique(study.sourceIds, `source reference in ${study.id}`)
    assertSourcesExist(study.sourceIds, study.id)
    const profileSourceIds = new Set(study.sourceIds)
    const assertProfileSources = (ids: readonly string[], context: string): void => {
      assertSourcesExist(ids, context)
      for (const id of ids) {
        if (!profileSourceIds.has(id)) throw new Error(`${context} uses source "${id}" without listing it on the profile.`)
      }
    }
    for (const claim of collectClaims(study)) {
      if (!claim.text.trim() || claim.sourceIds.length === 0) throw new Error(`${study.id} contains an unsourced claim.`)
      assertProfileSources(claim.sourceIds, study.id)
    }
    for (const technology of study.technologies) {
      if (technology.sourceIds.length === 0) throw new Error(`${study.id} contains unsourced technology evidence.`)
      assertProfileSources(technology.sourceIds, study.id)
    }
    for (const outcome of study.outcomes) {
      if (outcome.measurement !== 'unavailable' && outcome.sourceIds.length === 0) {
        throw new Error(`${study.id} contains an outcome without evidence.`)
      }
      if (outcome.value && outcome.measurement === 'unavailable') {
        throw new Error(`${study.id} assigns a value to an unavailable outcome.`)
      }
      if (study.verificationStatus === 'official-only' && outcome.measurement === 'reported' && !outcome.caveat?.trim()) {
        throw new Error(`${study.id} contains a first-party reported outcome without a caveat.`)
      }
      assertProfileSources(outcome.sourceIds, study.id)
    }
    for (const relatedId of study.relatedIds) {
      if (relatedId === study.id || !studyIds.has(relatedId)) throw new Error(`${study.id} has an invalid related entry.`)
    }
  }
}
