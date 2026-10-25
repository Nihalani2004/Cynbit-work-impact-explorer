import { describe, expect, it } from 'vitest'
import { caseStudies } from '../data/caseStudies'
import { evidenceSources } from '../data/sources'
import { filterStudies, normalizeQuery } from './filterStudies'
import { parseQuery, toSearchParams } from './queryState'
import type { CaseStudy } from './types'
import { validateCatalog } from './validateCatalog'

describe('documented work catalog', () => {
  it('contains 17 unique, source-backed profiles with the approved service taxonomy', () => {
    expect(caseStudies).toHaveLength(17)
    expect(new Set(caseStudies.map((item) => item.id)).size).toBe(17)
    expect(new Set(caseStudies.map((item) => item.slug)).size).toBe(17)
    expect(caseStudies.filter((item) => item.verificationStatus === 'owned-documented')).toHaveLength(4)
    expect(caseStudies.filter((item) => item.verificationStatus === 'official-only')).toHaveLength(13)
    expect(filterStudies(caseStudies, { category: 'software', workType: null, query: '' })).toHaveLength(13)
    expect(filterStudies(caseStudies, { category: 'cloud', workType: null, query: '' })).toHaveLength(3)
    expect(filterStudies(caseStudies, { category: 'marketing', workType: null, query: '' })).toHaveLength(3)
    expect(filterStudies(caseStudies, { category: null, workType: 'product', query: '' })).toHaveLength(3)
    expect(filterStudies(caseStudies, { category: null, workType: 'initiative', query: '' })).toHaveLength(1)
    expect(filterStudies(caseStudies, { category: null, workType: 'published-study', query: '' })).toHaveLength(13)
  })

  it('passes source, outcome and relationship validation', () => {
    expect(() => validateCatalog(caseStudies, evidenceSources)).not.toThrow()
  })

  it('rejects duplicate records and unsupported evidence references', () => {
    expect(() => validateCatalog([...caseStudies, { ...caseStudies[0] }], evidenceSources)).toThrow(/Duplicate study ID/)

    const invalid = [{
      ...caseStudies[0],
      summary: { ...caseStudies[0].summary, sourceIds: ['missing-source'] },
    }] as unknown as readonly CaseStudy[]
    expect(() => validateCatalog(invalid, evidenceSources)).toThrow(/unknown source/)
  })

  it('rejects metrics without evidence', () => {
    const invalid = [{
      ...caseStudies[0],
      outcomes: [{ label: 'Unsupported result', value: '99%', context: 'Unsupported.', measurement: 'measured', sourceIds: [] }],
    }] as unknown as readonly CaseStudy[]
    expect(() => validateCatalog(invalid, evidenceSources)).toThrow(/outcome without evidence/)
  })
})

describe('filterStudies', () => {
  it('matches multiple tokens without case sensitivity', () => {
    expect(filterStudies(caseStudies, { category: null, workType: null, query: '  CAREER   readiness ' }).map((study) => study.slug))
      .toEqual(['cynbit-studio', 'bitelevate'])
  })

  it('combines category, work type and keyword', () => {
    expect(filterStudies(caseStudies, { category: 'marketing', workType: 'initiative', query: 'mentorship' }).map((study) => study.slug))
      .toEqual(['bitelevate'])
    expect(filterStudies(caseStudies, { category: 'cloud', workType: 'product', query: '' })).toEqual([])
  })

  it('searches documented detail content and treats markup as text', () => {
    expect(filterStudies(caseStudies, { category: null, workType: null, query: 'automated reminders' }).map((study) => study.slug))
      .toEqual(['tenantease'])
    expect(filterStudies(caseStudies, { category: null, workType: null, query: '<script>alert(1)</script>' })).toEqual([])
  })

  it('searches verified technology and reported outcome evidence', () => {
    expect(filterStudies(caseStudies, { category: null, workType: null, query: 'Kubernetes PostgreSQL' }).map((study) => study.slug))
      .toEqual(['fintech-payments-evolution'])
    expect(filterStudies(caseStudies, { category: 'cloud', workType: 'published-study', query: 'AWS Snowball' }).map((study) => study.slug))
      .toEqual(['healthcare-cloud-migration'])
  })

  it('does not mutate or reorder the source catalog', () => {
    const originalSlugs = caseStudies.map((study) => study.slug)
    filterStudies(caseStudies, { category: null, workType: null, query: '' })
    expect(caseStudies.map((study) => study.slug)).toEqual(originalSlugs)
  })
})

describe('query state', () => {
  it('normalizes whitespace and limits the committed query', () => {
    expect(normalizeQuery('  career\n readiness  ')).toBe('career readiness')
    expect(normalizeQuery('x'.repeat(150))).toHaveLength(120)
  })

  it('parses and serializes category, work type and search state', () => {
    expect(parseQuery('?category=marketing&type=initiative&q=  mentorship  &other=discard')).toEqual({
      category: 'marketing', workType: 'initiative', query: 'mentorship', invalidCategory: false, invalidWorkType: false,
    })
    expect(toSearchParams({ category: 'marketing', workType: 'initiative', query: ' mentorship ' }).toString())
      .toBe('category=marketing&type=initiative&q=mentorship')
  })

  it('falls back safely from unknown filter values', () => {
    expect(parseQuery('?category=unknown&type=other&q=learning')).toEqual({
      category: null, workType: null, query: 'learning', invalidCategory: true, invalidWorkType: true,
    })
    expect(parseQuery('?q=%20%20')).toEqual({
      category: null, workType: null, query: '', invalidCategory: false, invalidWorkType: false,
    })
  })
})
