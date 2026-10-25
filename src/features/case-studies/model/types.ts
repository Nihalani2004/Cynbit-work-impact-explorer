export const categories = ['software', 'cloud', 'marketing'] as const

export type Category = (typeof categories)[number]

export const categoryLabels: Record<Category, string> = {
  software: 'Software development',
  cloud: 'Cloud strategy',
  marketing: 'Digital marketing',
}

export const workTypes = ['product', 'initiative', 'published-study'] as const

export type WorkType = (typeof workTypes)[number]

export const workTypeLabels: Record<WorkType, string> = {
  product: 'Owned products',
  initiative: 'Owned initiatives',
  'published-study': 'Published case studies',
}

export type VerificationStatus = 'owned-documented' | 'official-only'

export type SourceKind =
  | 'cynbit-official'
  | 'official-github'
  | 'official-social'
  | 'credential-record'

export type EvidenceSource = {
  id: string
  title: string
  publisher: string
  url: string
  accessedAt: string
  kind: SourceKind
  note: string
}

export type SourcedClaim = {
  text: string
  sourceIds: readonly string[]
}

export type TechnologyEvidence = {
  name: string
  role: string
  sourceIds: readonly string[]
}

export type MeasurementStatus = 'measured' | 'reported' | 'target' | 'unavailable'

export type Outcome = {
  label: string
  value?: string
  context: string
  measurement: MeasurementStatus
  sourceIds: readonly string[]
  caveat?: string
}

export type CaseStudy = {
  id: string
  slug: string
  title: string
  descriptor: string
  workType: WorkType
  verificationStatus: VerificationStatus
  organization: {
    name: string
    relationship: string
    industry: string
  }
  projectDate?: SourcedClaim
  publicStatus?: SourcedClaim
  categories: readonly Category[]
  summary: SourcedClaim
  context: readonly SourcedClaim[]
  objectives: readonly SourcedClaim[]
  challenges: readonly SourcedClaim[]
  solution: readonly SourcedClaim[]
  implementation: readonly SourcedClaim[]
  execution: readonly SourcedClaim[]
  technologies: readonly TechnologyEvidence[]
  outcomes: readonly Outcome[]
  limitations: readonly string[]
  sourceIds: readonly string[]
  tags: readonly string[]
  relatedIds: readonly string[]
  displayOrder: number
  featured?: boolean
}

export const verificationLabels: Record<VerificationStatus, string> = {
  'owned-documented': 'Cynbit-owned · publicly documented',
  'official-only': 'Cynbit-published · independently unconfirmed',
}

export const measurementLabels: Record<MeasurementStatus, string> = {
  measured: 'Measured result',
  reported: 'Publicly reported',
  target: 'Published target',
  unavailable: 'Outcome data unavailable',
}
