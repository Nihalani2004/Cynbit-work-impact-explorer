type Props = { onClear: () => void }

export function EmptyResults({ onClear }: Props) {
  return (
    <div className="empty-results">
      <span className="empty-results__symbol" aria-hidden="true">&empty;</span>
      <h2>No documented work matches</h2>
      <p>Try another term or clear the filters to see every public work profile.</p>
      <button type="button" className="button button--primary" onClick={onClear}>Show all work</button>
    </div>
  )
}
