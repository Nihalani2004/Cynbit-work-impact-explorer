import type { CaseStudy } from './types'

export const comparisonQueryKey = 'compare'
export const maximumComparisonStudies = 3

export type ParsedComparisonSelection = {
  slugs: readonly string[]
  ignoredValues: boolean
}

type StudyReference = Pick<CaseStudy, 'slug'>

function unique(values: readonly string[]) {
  return values.filter((value, index) => values.indexOf(value) === index)
}

export function parseComparisonSelection(
  search: string,
  catalog: readonly StudyReference[],
): ParsedComparisonSelection {
  const rawValue = new URLSearchParams(search).get(comparisonQueryKey)
  if (!rawValue) return { slugs: [], ignoredValues: false }

  const requested = rawValue.split(',').map((value) => value.trim()).filter(Boolean)
  const requestedUnique = unique(requested)
  const availableSlugs = new Set(catalog.map((study) => study.slug))
  const available = requestedUnique.filter((slug) => availableSlugs.has(slug))
  const slugs = available.slice(0, maximumComparisonStudies)

  return {
    slugs,
    ignoredValues: requested.length !== slugs.length || requestedUnique.length !== requested.length,
  }
}

export function setComparisonSelection(params: URLSearchParams, slugs: readonly string[]) {
  const next = new URLSearchParams(params)
  const normalized = unique(slugs.map((slug) => slug.trim()).filter(Boolean)).slice(0, maximumComparisonStudies)
  if (normalized.length === 0) next.delete(comparisonQueryKey)
  else next.set(comparisonQueryKey, normalized.join(','))
  return next
}

export function toggleComparisonSelection(slugs: readonly string[], slug: string) {
  if (slugs.includes(slug)) return slugs.filter((value) => value !== slug)
  if (slugs.length >= maximumComparisonStudies) return slugs
  return [...slugs, slug]
}

export function withoutComparisonSelection(search: string) {
  const params = new URLSearchParams(search)
  params.delete(comparisonQueryKey)
  const value = params.toString()
  return value ? `?${value}` : ''
}
