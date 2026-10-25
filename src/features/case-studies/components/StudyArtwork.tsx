import type { Category } from '../model/types'

type ArtworkProps = {
  category: Category
  order: number
}

export function StudyArtwork({ category, order }: ArtworkProps) {
  return (
    <div className={`study-art study-art--${category}`} aria-hidden="true">
      <div className="study-art__grid" />
      <div className="study-art__ring study-art__ring--outer" />
      <div className="study-art__ring study-art__ring--inner" />
      <div className="study-art__core"><span>{String(order).padStart(2, '0')}</span></div>
      <div className="study-art__line study-art__line--one" />
      <div className="study-art__line study-art__line--two" />
      <div className="study-art__spark study-art__spark--one" />
      <div className="study-art__spark study-art__spark--two" />
      <span className="study-art__caption">CYNBIT / DOCUMENTED WORK</span>
    </div>
  )
}
