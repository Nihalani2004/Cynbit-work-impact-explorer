import type { CaseStudy, Category, TechnologyEvidence } from '../model/types'

type PublishedSeed = {
  id: string
  slug: string
  sourceId: string
  name: string
  title: string
  descriptor: string
  category: Category
  industry: string
  summary: string
  objective: string
  challenge: string
  solution: string
  implementation: readonly string[]
  technologies: readonly Omit<TechnologyEvidence, 'sourceIds'>[]
  outcomeValue: string
  outcome: string
  tags: readonly string[]
  relatedIds: readonly string[]
  displayOrder: number
}

function publishedStudy(seed: PublishedSeed): CaseStudy {
  const cited = (text: string) => ({ text, sourceIds: [seed.sourceId] })
  return {
    id: seed.id,
    slug: seed.slug,
    title: seed.name,
    descriptor: seed.title,
    workType: 'published-study',
    verificationStatus: 'official-only',
    organization: {
      name: seed.name,
      relationship: 'Cynbit-published case study; independent client confirmation unavailable',
      industry: seed.industry,
    },
    projectDate: cited('May 2026'),
    publicStatus: cited('Cynbit labels the project “Active & Scaled”.'),
    categories: [seed.category],
    summary: cited(seed.summary),
    context: [
      {
        text: `Cynbit’s public case-study library identifies ${seed.name} under ${seed.category === 'software' ? 'Software Development' : seed.category === 'cloud' ? 'Cloud Strategy' : 'Digital Marketing'}.`,
        sourceIds: ['cynbit-case-index', seed.sourceId],
      },
      cited(seed.summary),
    ],
    objectives: [cited(seed.objective)],
    challenges: [cited(seed.challenge)],
    solution: [cited(seed.solution)],
    implementation: seed.implementation.map(cited),
    execution: [
      cited('The official page records a May 2026 completion and describes the project as active and scaled, but provides no delivery timeline, team composition or client-side release record.'),
    ],
    technologies: seed.technologies.map((technology) => ({ ...technology, sourceIds: [seed.sourceId] })),
    outcomes: [
      {
        label: 'Outcome reported by Cynbit',
        value: seed.outcomeValue,
        context: seed.outcome,
        measurement: 'reported',
        sourceIds: [seed.sourceId],
        caveat: 'This result appears on a Cynbit-controlled page. No independent measurement method, baseline or client-side confirmation was located.',
      },
    ],
    limitations: [
      'The named organization and project relationship are published by Cynbit but were not independently confirmed in the sources reviewed.',
      'Reported outcomes have no public methodology, baseline, sample size or client-side corroboration.',
      'Implementation detail is limited to the architecture and tools named on the official project page.',
    ],
    sourceIds: ['cynbit-case-index', seed.sourceId],
    tags: seed.tags,
    relatedIds: seed.relatedIds,
    displayOrder: seed.displayOrder,
  }
}

const publishedSeeds: readonly PublishedSeed[] = [
  {
    id: 'case-01', slug: 'wizhealth-ai-diagnostic', sourceId: 'case-wizhealth', name: 'WizHealth',
    title: 'AI-assisted triage for prioritizing patient symptoms', category: 'software', industry: 'Healthcare',
    descriptor: 'AI-assisted triage for prioritizing patient symptoms',
    summary: 'Cynbit describes a diagnostic-triage system intended to rank incoming symptoms by severity and urgency for clinical review.',
    objective: 'Help clinical teams identify urgent cases sooner while connecting the prioritization workflow with existing patient records.',
    challenge: 'The published brief says a high volume of symptom reports made it difficult for clinicians to prioritize urgent cases effectively.',
    solution: 'Cynbit says it built an AI model that categorizes symptoms by severity and urgency and integrates the result with existing patient records.',
    implementation: [
      'The documented workflow uses symptom classification to create a priority signal for clinical triage.',
      'Integration with existing patient records is named, but the page does not identify the model, data pipeline, clinical validation process or deployment environment.',
    ],
    technologies: [
      { name: 'AI classification model', role: 'Categorizes symptoms by published severity and urgency criteria.' },
      { name: 'Patient-record integration', role: 'Connects the prioritization output with existing records.' },
    ],
    outcomeValue: '+25% triage efficiency',
    outcome: 'Cynbit reports a 25% improvement in triage efficiency and shorter turnaround for urgent consultations.',
    tags: ['healthcare', 'AI', 'triage', 'patient records', 'workflow'], relatedIds: ['case-02', 'case-12'], displayOrder: 5,
  },
  {
    id: 'case-02', slug: 'pragya-healths-remote-monitoring', sourceId: 'case-pragya', name: 'Pragya Healths',
    title: 'Remote patient monitoring for rural healthcare', category: 'software', industry: 'Healthcare',
    descriptor: 'Remote patient monitoring for rural healthcare',
    summary: 'Cynbit publishes a remote-monitoring project connecting wearable vital signs to a mobile and clinician-facing workflow.',
    objective: 'Give clinicians more continuous visibility into chronic patients in remote areas and surface conditions that need intervention.',
    challenge: 'The project page says inconsistent monitoring of chronic patients in remote areas contributed to avoidable emergencies.',
    solution: 'The published solution is a mobile application that synchronizes wearable-device vitals with a central clinician dashboard and automated alerts.',
    implementation: [
      'Wearable readings are described as moving through a mobile experience into a centralized clinical view.',
      'Automated alerts provide the escalation mechanism; device protocols, alert thresholds and clinical governance are not documented.',
    ],
    technologies: [
      { name: 'Mobile application', role: 'Connects the patient-side monitoring experience.' },
      { name: 'Wearable-device synchronization', role: 'Transfers vital-sign readings to the clinician workflow.' },
      { name: 'Automated alerts', role: 'Flags readings for clinical attention.' },
    ],
    outcomeValue: '−40% emergency-room visits',
    outcome: 'Cynbit reports a 40% reduction in emergency-room visits among patients enrolled in the monitoring program.',
    tags: ['healthcare', 'remote monitoring', 'wearables', 'mobile app', 'alerts'], relatedIds: ['case-01', 'case-12'], displayOrder: 6,
  },
  {
    id: 'case-03', slug: 'wild-basil-supply-chain', sourceId: 'case-wild-basil', name: 'Wild Basil',
    title: 'QR-based sourcing transparency from farm to table', category: 'software', industry: 'Food and sustainability',
    descriptor: 'QR-based sourcing transparency from farm to table',
    summary: 'Cynbit presents a traceability experience that lets customers inspect a meal’s documented journey through the supply chain.',
    objective: 'Make sourcing information visible to customers seeking evidence behind organic product labels.',
    challenge: 'The published brief says customer demand for proof of organic sourcing was difficult to satisfy through manual processes.',
    solution: 'Cynbit says it built a QR-based tracking system through which customers can view a meal’s journey from farm to table.',
    implementation: [
      'A scannable QR entry point connects the physical meal to its digital sourcing record.',
      'The page does not describe the ledger design, data contributors, verification controls or why the title calls the approach “blockchain-lite”.',
    ],
    technologies: [{ name: 'QR-based tracking', role: 'Opens a customer-facing record of the published sourcing journey.' }],
    outcomeValue: '+20% premium subscriptions',
    outcome: 'Cynbit reports stronger brand trust and a 20% increase in premium subscription orders.',
    tags: ['food', 'traceability', 'QR', 'supply chain', 'sustainability'], relatedIds: ['case-07', 'case-11'], displayOrder: 7,
  },
  {
    id: 'case-04', slug: 'sofiasa-erp-modernization', sourceId: 'case-sofiasa', name: 'Sofiasa',
    title: 'A React modernization for a legacy ERP interface', category: 'software', industry: 'Enterprise software',
    descriptor: 'A React modernization for a legacy ERP interface',
    summary: 'Cynbit describes a frontend re-engineering effort aimed at making a complex ERP product easier to learn and navigate.',
    objective: 'Reduce interface friction in the ERP experience and make common employee workflows easier to understand.',
    challenge: 'The official page attributes slow onboarding and high error rates to an outdated, difficult-to-navigate interface.',
    solution: 'Cynbit reports rebuilding the frontend with React and a custom design system focused on efficiency and lower cognitive load.',
    implementation: [
      'React is the only named application framework in the project record.',
      'A custom design system is described as the consistency layer for the reworked interface, but component scope and migration sequencing are not published.',
    ],
    technologies: [
      { name: 'React', role: 'Named frontend framework for the re-engineered interface.' },
      { name: 'Custom design system', role: 'Provides the documented interface and interaction foundation.' },
    ],
    outcomeValue: '−60% onboarding · +30% DAU',
    outcome: 'Cynbit reports 60% shorter employee onboarding and a 30% increase in daily active users.',
    tags: ['ERP', 'React', 'design system', 'frontend', 'modernization'], relatedIds: ['case-10', 'case-13'], displayOrder: 8,
  },
  {
    id: 'case-05', slug: 'econtentprep-adaptive-learning', sourceId: 'case-econtentprep', name: 'EContentPrep',
    title: 'Adaptive learning paths driven by student performance', category: 'software', industry: 'Education technology',
    descriptor: 'Adaptive learning paths driven by student performance',
    summary: 'Cynbit publishes an adaptive-learning project that changes lesson difficulty and format in response to learner performance data.',
    objective: 'Move beyond a single static curriculum path for learners with different levels of progress.',
    challenge: 'The case-study page connects static curriculum paths with disengagement and lower completion across diverse learner groups.',
    solution: 'Cynbit describes an adaptive engine that analyzes performance data and adjusts lesson difficulty and presentation format.',
    implementation: [
      'Performance data is the documented input to the adaptive decision flow.',
      'Difficulty and content format are the named variables; the source does not identify the model, decision rules, learning standard or evaluation method.',
    ],
    technologies: [{ name: 'Adaptive learning engine', role: 'Uses published learner-performance signals to adjust difficulty and format.' }],
    outcomeValue: '+45% course completion',
    outcome: 'Cynbit reports a 45% increase in course completion and an improvement in student satisfaction, without publishing the satisfaction measure.',
    tags: ['education', 'adaptive learning', 'performance data', 'LMS', 'personalization'], relatedIds: ['work-01', 'work-04'], displayOrder: 9,
  },
  {
    id: 'case-06', slug: 'cloudy-tales-collaboration', sourceId: 'case-cloudy-tales', name: 'Cloudy Tales',
    title: 'Real-time collaboration with WebSockets and CRDTs', category: 'cloud', industry: 'Digital publishing',
    descriptor: 'Real-time collaboration with WebSockets and CRDTs',
    summary: 'Cynbit presents a collaboration-engine refactor designed to reduce editing lag and document conflicts for simultaneous writers.',
    objective: 'Support concurrent writing with responsive synchronization and fewer conflicting edits.',
    challenge: 'The published problem centers on lag and document conflicts when multiple writers edit at the same time.',
    solution: 'Cynbit says it refactored the communication layer with optimized WebSockets and conflict-free replicated data types.',
    implementation: [
      'WebSockets are named as the real-time communication channel.',
      'CRDTs are named as the conflict-management approach; the specific data model, persistence strategy and hosting environment are not published.',
    ],
    technologies: [
      { name: 'WebSockets', role: 'Provides the documented real-time communication layer.' },
      { name: 'CRDTs', role: 'Coordinates concurrent edits through conflict-free replicated data types.' },
    ],
    outcomeValue: '50k+ active writers',
    outcome: 'Cynbit reports a “zero-latency” collaborative environment supporting more than 50,000 active writers globally.',
    tags: ['collaboration', 'WebSockets', 'CRDT', 'real-time', 'publishing'], relatedIds: ['case-08', 'case-13'], displayOrder: 10,
  },
  {
    id: 'case-07', slug: 'urban-wardrobe-ar-integration', sourceId: 'case-urban-wardrobe', name: 'Urban Wardrobe',
    title: 'Mobile augmented-reality fitting for fashion commerce', category: 'software', industry: 'Fashion retail',
    descriptor: 'Mobile augmented-reality fitting for fashion commerce',
    summary: 'Cynbit publishes an augmented-reality fitting experience intended to address sizing uncertainty in online fashion shopping.',
    objective: 'Give shoppers a mobile visual and sizing aid before purchase and reduce the operational impact of returns.',
    challenge: 'The official page says sizing and fit issues were driving high return rates and eroding the boutique’s margins.',
    solution: 'Cynbit describes a mobile-optimized AR fitting room using camera data for size recommendations and visual overlays.',
    implementation: [
      'The customer’s mobile camera is the documented input for the try-on experience.',
      'The page identifies recommendations and visual overlays as outputs but does not document the AR framework, sizing model, device coverage or privacy controls.',
    ],
    technologies: [
      { name: 'Augmented reality', role: 'Powers the documented virtual fitting experience.' },
      { name: 'Camera-data processing', role: 'Supports size recommendations and visual overlays.' },
    ],
    outcomeValue: '−22% returns · +15% AOV',
    outcome: 'Cynbit reports a 22% reduction in returns and a 15% increase in average order value.',
    tags: ['fashion', 'commerce', 'AR', 'mobile', 'size recommendations'], relatedIds: ['case-03', 'case-10'], displayOrder: 11,
  },
  {
    id: 'case-08', slug: 'evento-ticketing-scalability', sourceId: 'case-evento', name: 'Evento',
    title: 'Serverless scaling for high-demand ticket releases', category: 'software', industry: 'Live entertainment',
    descriptor: 'Serverless scaling for high-demand ticket releases',
    summary: 'Cynbit presents a ticketing architecture intended to absorb sharp concurrency spikes during major event releases.',
    objective: 'Keep ticket purchasing available during high-demand drops while prioritizing requests predictably.',
    challenge: 'The official page says legacy servers crashed during high-demand ticket drops, causing lost revenue and customer frustration.',
    solution: 'Cynbit reports implementing elastic serverless scaling and a prioritized queue using AWS Lambda and Amazon SQS.',
    implementation: [
      'AWS Lambda supplies the named elastic compute layer for demand spikes.',
      'Amazon SQS provides the documented queuing mechanism; queue policy, ordering, data store and observability are not described.',
    ],
    technologies: [
      { name: 'AWS Lambda', role: 'Provides the published serverless compute and scaling layer.' },
      { name: 'Amazon SQS', role: 'Implements the prioritized request queue described by Cynbit.' },
    ],
    outcomeValue: '100k+ concurrent users',
    outcome: 'Cynbit reports serving more than 100,000 concurrent users with zero downtime during a named tour ticket release.',
    tags: ['ticketing', 'serverless', 'AWS Lambda', 'SQS', 'scalability'], relatedIds: ['case-06', 'case-13'], displayOrder: 12,
  },
  {
    id: 'case-09', slug: 'marketing-addict-ai-optimization', sourceId: 'case-marketing-addict', name: 'Marketing Addict',
    title: 'Unified AI-assisted analytics for cross-channel campaigns', category: 'marketing', industry: 'Marketing services',
    descriptor: 'Unified AI-assisted analytics for cross-channel campaigns',
    summary: 'Cynbit publishes a campaign-analytics project joining Meta, Google and TikTok data in a real-time recommendation workflow.',
    objective: 'Reduce fragmented reporting and give campaign managers a consolidated view of spend and performance.',
    challenge: 'The project page describes manual cross-channel management and fragmented data silos that obscured true return on investment.',
    solution: 'Cynbit says it integrated an AI-driven analytics engine that unifies Meta, Google and TikTok data and produces real-time spend recommendations.',
    implementation: [
      'The documented data scope spans three advertising platforms.',
      'A recommendation layer is described, but the source does not identify platform APIs, attribution rules, model design or decision safeguards.',
    ],
    technologies: [
      { name: 'AI analytics engine', role: 'Generates the published real-time spend recommendations.' },
      { name: 'Meta, Google and TikTok data', role: 'Forms the documented cross-channel input.' },
    ],
    outcomeValue: '+35% ROI · −50% reporting time',
    outcome: 'Cynbit reports a 35% improvement in client ROI and a 50% reduction in manual reporting time.',
    tags: ['marketing', 'campaign analytics', 'Meta', 'Google', 'TikTok'], relatedIds: ['case-11', 'work-03'], displayOrder: 13,
  },
  {
    id: 'case-10', slug: 'fashion-headless-commerce', sourceId: 'case-elitevogue', name: 'EliteVogue',
    title: 'Headless commerce with Next.js and GraphQL', category: 'software', industry: 'Fashion commerce',
    descriptor: 'Headless commerce with Next.js and GraphQL',
    summary: 'Cynbit describes separating a fashion storefront from its commerce backend to improve mobile performance and global scalability.',
    objective: 'Replace a slow monolithic storefront with a faster frontend and independently scalable commerce services.',
    challenge: 'The official brief says the legacy commerce platform was too slow for mobile users and difficult to scale globally.',
    solution: 'Cynbit reports a headless architecture using Next.js for the frontend and a decoupled GraphQL API for backend services.',
    implementation: [
      'Next.js is named as the customer-facing frontend framework.',
      'A GraphQL API separates the frontend from backend commerce services; hosting, commerce provider, caching and migration sequencing are not documented.',
    ],
    technologies: [
      { name: 'Next.js', role: 'Runs the published headless storefront.' },
      { name: 'GraphQL', role: 'Provides the decoupled API boundary for backend services.' },
    ],
    outcomeValue: '0.8s load · +38% conversion',
    outcome: 'Cynbit reports an average load time of 0.8 seconds and a 38% increase in conversion during the first quarter.',
    tags: ['commerce', 'Next.js', 'GraphQL', 'headless', 'performance'], relatedIds: ['case-07', 'case-04'], displayOrder: 14,
  },
  {
    id: 'case-11', slug: 'retail-seo-growth', sourceId: 'case-trendmart', name: 'TrendMart',
    title: 'Location-led technical SEO for a retail footprint', category: 'marketing', industry: 'Retail',
    descriptor: 'Location-led technical SEO for a retail footprint',
    summary: 'Cynbit publishes a local-search project combining location-specific landing pages with automated technical SEO auditing.',
    objective: 'Make physical retail locations more visible in relevant local search results and connect discovery to store visits.',
    challenge: 'The official page says the retailer had low local-search visibility despite a strong physical presence.',
    solution: 'Cynbit describes a custom location-based landing-page engine and an automated technical SEO audit system.',
    implementation: [
      'Location-specific pages form the published local discovery layer.',
      'Automated technical audits are described as the quality-control mechanism; keyword scope, attribution and analytics tooling are not named.',
    ],
    technologies: [
      { name: 'Location-page engine', role: 'Generates the documented local landing-page experience.' },
      { name: 'Automated SEO auditing', role: 'Checks the technical search foundation described by Cynbit.' },
    ],
    outcomeValue: '+140% organic traffic · +60% visits',
    outcome: 'Cynbit reports a 140% increase in organic traffic and a 60% increase in store visits attributed to search results.',
    tags: ['SEO', 'local search', 'retail', 'landing pages', 'technical audit'], relatedIds: ['case-09', 'case-03'], displayOrder: 15,
  },
  {
    id: 'case-12', slug: 'healthcare-cloud-migration', sourceId: 'case-careplus', name: 'CarePlus Health',
    title: 'A phased healthcare migration built around continuity', category: 'cloud', industry: 'Healthcare',
    descriptor: 'A phased healthcare migration built around continuity',
    summary: 'Cynbit presents a cloud migration for a large sensitive-data estate that had to remain available to emergency medical services.',
    objective: 'Move critical health data while preserving availability, data integrity and a security-audit path.',
    challenge: 'The official page describes petabytes of sensitive information that had to remain available around the clock for emergency services.',
    solution: 'Cynbit reports a phased migration using AWS Snowball, real-time database replication and a zero-trust security architecture.',
    implementation: [
      'AWS Snowball is named for bulk data movement within the phased migration.',
      'Real-time replication supports continuity while zero-trust principles frame security; cloud destination, database products and audit standard are not specified.',
    ],
    technologies: [
      { name: 'AWS Snowball', role: 'Supports the documented bulk data-transfer stage.' },
      { name: 'Real-time database replication', role: 'Maintains continuity during the phased migration.' },
      { name: 'Zero-trust architecture', role: 'Provides the published security approach.' },
    ],
    outcomeValue: '3 months early · zero data loss',
    outcome: 'Cynbit reports completing the migration three months early, with zero data loss and a 100% security-audit pass rate.',
    tags: ['healthcare', 'cloud migration', 'AWS Snowball', 'replication', 'zero trust'], relatedIds: ['case-01', 'case-02'], displayOrder: 16,
  },
  {
    id: 'case-13', slug: 'fintech-payments-evolution', sourceId: 'case-globalpay', name: 'GlobalPay',
    title: 'A microservices ledger for cross-border payments', category: 'software', industry: 'Financial technology',
    descriptor: 'A microservices ledger for cross-border payments',
    summary: 'Cynbit publishes a payment-platform project centered on latency, jurisdictional compliance and elastic transaction processing.',
    objective: 'Support cross-border transaction volume while reducing latency and accommodating multiple regulatory environments.',
    challenge: 'The official page says existing systems struggled with latency and complex compliance requirements across jurisdictions.',
    solution: 'Cynbit describes a Node.js and PostgreSQL microservices ledger running on an auto-scaling Kubernetes cluster with real-time fraud detection.',
    implementation: [
      'Node.js services and PostgreSQL form the named ledger application and data layers.',
      'Kubernetes supplies the published orchestration and scaling layer, while real-time fraud detection is part of the transaction flow; service boundaries and compliance controls are not detailed.',
    ],
    technologies: [
      { name: 'Node.js', role: 'Runs the published microservices-based ledger.' },
      { name: 'PostgreSQL', role: 'Provides the named ledger data store.' },
      { name: 'Kubernetes', role: 'Orchestrates and auto-scales the documented services.' },
      { name: 'Real-time fraud detection', role: 'Screens the published transaction flow.' },
    ],
    outcomeValue: '2.4M+ daily users · <200ms',
    outcome: 'Cynbit reports more than 2.4 million active daily users, transaction latency below 200 milliseconds and compliance across 15 countries.',
    tags: ['fintech', 'Node.js', 'PostgreSQL', 'Kubernetes', 'payments'], relatedIds: ['case-08', 'case-04'], displayOrder: 17,
  },
]

export const publishedCaseStudies: readonly CaseStudy[] = publishedSeeds.map(publishedStudy)
