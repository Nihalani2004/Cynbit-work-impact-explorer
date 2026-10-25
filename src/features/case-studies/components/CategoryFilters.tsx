import type { Category, WorkType } from '../model/types'

type FilterOption<T extends string> = { value: T; label: string; count: number }

type Props = {
  categories: readonly FilterOption<Category>[]
  workTypes: readonly FilterOption<WorkType>[]
  selectedCategory: Category | null
  selectedWorkType: WorkType | null
  allCategoriesCount: number
  allWorkCount: number
  onCategorySelect: (category: Category | null) => void
  onWorkTypeSelect: (workType: WorkType | null) => void
}

function FilterLabel({ label, count }: { label: string; count: number }) {
  return <>{label} <span className="filter-chip__count" aria-hidden="true">{count}</span></>
}

export function CategoryFilters({
  categories: categoryOptions,
  workTypes: workTypeOptions,
  selectedCategory,
  selectedWorkType,
  allCategoriesCount,
  allWorkCount,
  onCategorySelect,
  onWorkTypeSelect,
}: Props) {
  return (
    <div className="explorer-filter-groups">
      <fieldset className="filter-group">
        <legend>Category</legend>
        <div className="category-filters">
          <button type="button" className="filter-chip" aria-pressed={selectedCategory === null} onClick={() => onCategorySelect(null)}>
            <FilterLabel label="All categories" count={allCategoriesCount} />
          </button>
          {categoryOptions.map((option) => (
            <button type="button" className="filter-chip" aria-pressed={selectedCategory === option.value} onClick={() => onCategorySelect(option.value)} key={option.value}>
              <FilterLabel label={option.label} count={option.count} />
            </button>
          ))}
        </div>
      </fieldset>
      <fieldset className="filter-group">
        <legend>Work type</legend>
        <div className="category-filters">
          <button type="button" className="filter-chip" aria-pressed={selectedWorkType === null} onClick={() => onWorkTypeSelect(null)}>
            <FilterLabel label="All work" count={allWorkCount} />
          </button>
          {workTypeOptions.map((option) => (
            <button type="button" className="filter-chip" aria-pressed={selectedWorkType === option.value} onClick={() => onWorkTypeSelect(option.value)} key={option.value}>
              <FilterLabel label={option.label} count={option.count} />
            </button>
          ))}
        </div>
      </fieldset>
    </div>
  )
}
