import { useEffect } from 'react'

type DocumentMetadata = {
  title: string
  description: string
  path: string
}

function upsertMeta(attribute: 'name' | 'property', key: string, content: string) {
  const selector = `meta[${attribute}="${key}"]`
  const existing = document.head.querySelector<HTMLMetaElement>(selector)
  const meta = existing ?? document.createElement('meta')

  if (!existing) {
    meta.setAttribute(attribute, key)
    document.head.append(meta)
  }

  meta.content = content
}

function upsertCanonical(path: string) {
  const existing = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]')
  const canonical = existing ?? document.createElement('link')

  if (!existing) {
    canonical.rel = 'canonical'
    document.head.append(canonical)
  }

  canonical.href = new URL(path, window.location.origin).href
}

export function useDocumentMetadata({ title, description, path }: DocumentMetadata) {
  useEffect(() => {
    document.title = title
    upsertMeta('name', 'description', description)
    upsertMeta('property', 'og:title', title)
    upsertMeta('property', 'og:description', description)
    upsertMeta('property', 'og:type', 'website')
    upsertCanonical(path)
  }, [description, path, title])
}
