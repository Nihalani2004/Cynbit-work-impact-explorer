import type { EvidenceSource } from '../model/types'

type CitationProps = { sourceIds: readonly string[]; sources: readonly EvidenceSource[] }

export function SourceCitations({ sourceIds, sources }: CitationProps) {
  if (sourceIds.length === 0) return null
  return (
    <span className="source-citations" aria-label="Sources">
      {sourceIds.map((sourceId) => {
        const index = sources.findIndex((source) => source.id === sourceId)
        if (index < 0) return null
        const source = sources[index]
        return <a href={`#source-${source.id}`} aria-label={`Source ${index + 1}: ${source.title}`} key={source.id}>{index + 1}</a>
      })}
    </span>
  )
}

export function SourceList({ sources }: { sources: readonly EvidenceSource[] }) {
  return (
    <ol className="source-list">
      {sources.map((source) => (
        <li id={`source-${source.id}`} key={source.id}>
          <div>
            <strong>{source.title}</strong>
            <span>{source.publisher} · Accessed <time dateTime={source.accessedAt}>{source.accessedAt}</time></span>
            <p>{source.note}</p>
          </div>
          <a href={source.url} target="_blank" rel="noopener noreferrer">
            Open source <span className="visually-hidden">: {source.title} (opens in a new tab)</span>
          </a>
        </li>
      ))}
    </ol>
  )
}
