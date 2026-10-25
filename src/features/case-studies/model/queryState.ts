import { categories, workTypes, type Category, type WorkType } from './types'
import { normalizeQuery, type ExplorerCriteria } from './filterStudies'

export type ParsedQuery = ExplorerCriteria & {
  invalidCategory: boolean
  invalidWorkType: boolean
}

export function parseQuery(search: string): ParsedQuery {
  const params = new URLSearchParams(search)
  const rawCategory = params.get('category')
  const rawWorkType = params.get('type')
  const category = categories.includes(rawCategory as Category) ? rawCategory as Category : null
  const workType = workTypes.includes(rawWorkType as WorkType) ? rawWorkType as WorkType : null

  return {
    category,
    workType,
    query: normalizeQuery(params.get('q') ?? ''),
    invalidCategory: rawCategory !== null && category === null,
    invalidWorkType: rawWorkType !== null && workType === null,
  }
}

export function toSearchParams(criteria: ExplorerCriteria): URLSearchParams {
  const params = new URLSearchParams()
  if (criteria.category) params.set('category', criteria.category)
  if (criteria.workType) params.set('type', criteria.workType)
  const query = normalizeQuery(criteria.query)
  if (query) params.set('q', query)
  return params
}
