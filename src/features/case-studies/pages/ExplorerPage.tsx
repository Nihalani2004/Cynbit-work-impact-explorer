import { useEffect, useMemo, type CSSProperties } from 'react'
import { Link, useLocation, useSearchParams } from 'react-router'
import { ArrowIcon } from '../../../components/Icons'
import { CaseStudyCard } from '../components/CaseStudyCard'
import { CategoryFilters } from '../components/CategoryFilters'
import { EmptyResults } from '../components/EmptyResults'
import { SearchForm } from '../components/SearchForm'
import { caseStudies } from '../data/caseStudies'
import { filterStudies, type ExplorerCriteria } from '../model/filterStudies'
import { parseQuery, toSearchParams } from '../model/queryState'
import {
  categories,
  categoryLabels,
  workTypes,
  workTypeLabels,
  type Category,
  type WorkType,
} from '../model/types'

const heroServices = [
  { label: 'Software Dev', angle: '334deg', tone: 'software' },
  { label: 'Cloud Strategy', angle: '102deg', tone: 'cloud' },
  { label: 'Digital Marketing', angle: '220deg', tone: 'marketing' },
] as const

export function ExplorerPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const location = useLocation()
  const { category, workType, query, invalidCategory, invalidWorkType } = parseQuery(location.search)
  const results = useMemo(
    () => filterStudies(caseStudies, { category, workType, query }),
    [category, workType, query],
  )
  const hasCriteria = category !== null || workType !== null || query !== '' || invalidCategory || invalidWorkType
  const featured = caseStudies.find((study) => study.featured)

  const categoryOptions = categories
    .map((value) => ({
      value,
      label: categoryLabels[value],
      count: caseStudies.filter((study) => study.categories.includes(value)).length,
    }))
    .filter((option) => option.count > 0)

  const workTypeOptions = workTypes
    .map((value) => ({
      value,
      label: workTypeLabels[value],
      count: caseStudies.filter((study) => study.workType === value).length,
    }))
    .filter((option) => option.count > 0)

  useEffect(() => {
    document.title = 'Cynbit Work & Impact | Independent Prototype'
  }, [])

  function update(next: ExplorerCriteria) {
    const params = toSearchParams(next)
    if (params.toString() !== searchParams.toString()) setSearchParams(params)
  }

  function updateCategory(value: Category | null) {
    update({ category: value, workType, query })
  }

  function updateWorkType(value: WorkType | null) {
    update({ category, workType: value, query })
  }

  function clearAll() {
    if (searchParams.toString()) setSearchParams(new URLSearchParams())
  }

  const qualifiers = [
    category ? `in ${categoryLabels[category]}` : '',
    workType ? `for ${workTypeLabels[workType].toLocaleLowerCase()}` : '',
    query ? `matching “${query}”` : '',
  ].filter(Boolean).join(' ')
  const countText = `${results.length} documented ${results.length === 1 ? 'profile' : 'profiles'}${qualifiers ? ` ${qualifiers}` : ''}`

  return (
    <main id="main-content">
      <section className="explorer-hero page-width" aria-labelledby="explorer-title">
        <div className="explorer-hero__copy">
          <span className="eyebrow"><span className="eyebrow__dot" aria-hidden="true" /> Work, evidence and limits</span>
            <h1 id="explorer-title" tabIndex={-1}>
              Explore the<br />work behind
              <span className="visually-hidden"> software systems, cloud strategy, and digital growth.</span>
              <span className="hero-title-rotator" aria-hidden="true">
                <em className="hero-title-rotator__phrase">Software systems.</em>
                <em className="hero-title-rotator__phrase">Cloud strategy.</em>
                <em className="hero-title-rotator__phrase">Digital growth.</em>
              </span>
            </h1>
          <p>Explore Cynbit-owned work and Cynbit-published project studies through public evidence. Every profile separates documented facts, reported outcomes and information the sources do not establish.</p>
          <a className="hero-anchor" href="#explorer-results">Explore documented work <ArrowIcon /></a>
        </div>
        <div className="explorer-hero__visual" aria-hidden="true">
          <div className="hero-orbit hero-orbit--one" />
          <div className="hero-orbit hero-orbit--two" />
          <div className="hero-service-orbit">
            {heroServices.map((service) => (
              <div className="hero-service-orbit__track" style={{ '--service-angle': service.angle } as CSSProperties} key={service.label}>
                <div className={`hero-service-orbit__label hero-service-orbit__label--${service.tone}`}>
                  <span className="hero-service-orbit__mark" />
                  <span>{service.label}</span>
                </div>
              </div>
            ))}
          </div>
          <div className="hero-core"><span>{String(caseStudies.length).padStart(2, '0')}</span><small>PUBLIC PROFILES</small></div>
        </div>
      </section>

      {featured && (
        <section className="featured-work page-width" aria-labelledby="featured-work-title">
          <div>
            <span className="eyebrow eyebrow--compact">Featured documented profile</span>
            <h2 id="featured-work-title">{featured.title}</h2>
            <p>{featured.descriptor}</p>
          </div>
          <Link className="button button--primary" to={`/case-studies/${featured.slug}${location.search}`}>
            Read profile <ArrowIcon />
          </Link>
        </section>
      )}

      <section className="explorer-section" id="explorer-results" aria-labelledby="results-title">
        <div className="page-width">
          <div className="section-intro">
            <div>
              <span className="eyebrow eyebrow--compact">Evidence-aware portfolio</span>
              <h2 id="results-title">Explore by <em>focus.</em></h2>
            </div>
            <p>The collection combines four owned products or initiatives with thirteen case studies published by Cynbit. Evidence labels keep those relationships distinct.</p>
          </div>

          <div className="evidence-note">
            <strong>How to read this collection</strong>
            <p><b>Cynbit-owned</b> identifies products and initiatives documented by Cynbit. <b>Cynbit-published</b> identifies project stories found on Cynbit's case-study pages; their client relationships and reported results were not independently confirmed. Numbered references and evidence limits appear on every profile.</p>
          </div>

          <div className="explorer-controls">
            <SearchForm key={query} query={query} onSearch={(value) => update({ category, workType, query: value })} />
            <CategoryFilters
              categories={categoryOptions}
              workTypes={workTypeOptions}
              selectedCategory={category}
              selectedWorkType={workType}
              totalCount={caseStudies.length}
              onCategorySelect={updateCategory}
              onWorkTypeSelect={updateWorkType}
            />
          </div>

          <div className="results-bar">
            <p className="results-bar__count" role="status" aria-live="polite" aria-atomic="true">{countText}</p>
            {hasCriteria && <button type="button" className="text-button" onClick={clearAll}>Clear all filters <span aria-hidden="true">×</span></button>}
          </div>
          {(invalidCategory || invalidWorkType) && (
            <p className="query-note">
              {invalidCategory && invalidWorkType
                ? 'Those category and work-type filters are unavailable. Showing all values instead.'
                : `That ${invalidCategory ? 'category' : 'work-type'} filter is unavailable. Showing all values instead.`}
            </p>
          )}

          {results.length > 0 ? (
            <div className="study-grid">
              {results.map((study) => <CaseStudyCard key={study.id} study={study} search={location.search} />)}
            </div>
          ) : <EmptyResults onClear={clearAll} />}
        </div>
      </section>

      <aside className="explorer-outro page-width" aria-label="Portfolio evidence policy">
        <span className="explorer-outro__number">01 / EVIDENCE POLICY</span>
        <p>First-party project pages are useful evidence of what Cynbit publishes, but they are not independent confirmation. Reported results remain clearly attributed and carry a methodology caveat.</p>
      </aside>
    </main>
  )
}
