import { useMemo } from 'react'
import { useLocation, useSearchParams } from 'react-router'
import { caseStudies } from '../data/caseStudies'
import {
  parseComparisonSelection,
  setComparisonSelection,
  toggleComparisonSelection,
} from '../model/comparisonState'

export function useComparisonSelection() {
  const location = useLocation()
  const [, setSearchParams] = useSearchParams()
  const parsed = useMemo(
    () => parseComparisonSelection(location.search, caseStudies),
    [location.search],
  )
  const studies = useMemo(
    () => parsed.slugs
      .map((slug) => caseStudies.find((study) => study.slug === slug))
      .filter((study): study is (typeof caseStudies)[number] => study !== undefined),
    [parsed.slugs],
  )

  function setSelection(slugs: readonly string[]) {
    setSearchParams((current) => setComparisonSelection(current, slugs))
  }

  function toggle(slug: string) {
    setSelection(toggleComparisonSelection(parsed.slugs, slug))
  }

  function remove(slug: string) {
    setSelection(parsed.slugs.filter((value) => value !== slug))
  }

  return {
    slugs: parsed.slugs,
    studies,
    ignoredValues: parsed.ignoredValues,
    toggle,
    remove,
    clear: () => setSelection([]),
  }
}
