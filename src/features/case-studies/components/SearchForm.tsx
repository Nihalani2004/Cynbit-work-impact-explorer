import { useLayoutEffect, useState, type FormEvent } from 'react'
import { CloseIcon, SearchIcon } from '../../../components/Icons'

type Props = {
  query: string
  onSearch: (query: string) => void
}

export function SearchForm({ query, onSearch }: Props) {
  const [draft, setDraft] = useState(query)

  useLayoutEffect(() => {
    setDraft(query)
  }, [query])

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    onSearch(draft)
  }

  return (
    <form className="search-form" role="search" onSubmit={submit}>
      <label htmlFor="study-search">Search documented work</label>
      <div className="search-form__field">
        <SearchIcon className="search-form__icon" />
        <input
          id="study-search"
          name="q"
          type="search"
          maxLength={120}
          value={draft}
          onChange={(event) => setDraft(event.target.value)}
          placeholder="Try learning, payments or sentiment"
          autoComplete="off"
        />
        {draft && (
          <button type="button" className="search-form__clear" aria-label="Clear search field" onClick={() => { setDraft(''); onSearch('') }}>
            <CloseIcon />
          </button>
        )}
        <button type="submit" className="search-form__submit">Search</button>
      </div>
    </form>
  )
}
