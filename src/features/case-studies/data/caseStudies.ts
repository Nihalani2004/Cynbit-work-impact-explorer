import { validateCatalog } from '../model/validateCatalog'
import type { CaseStudy } from '../model/types'
import { evidenceSources } from './sources'
import { publishedCaseStudies } from './publishedCaseStudies'

const productSources = ['cynbit-products', 'cynbit-github'] as const

const ownedStudies: readonly CaseStudy[] = [
  {
    id: 'work-01',
    slug: 'cynbit-studio',
    title: 'Cynbit Studio',
    descriptor: 'Learning and career readiness in one product ecosystem',
    workType: 'product',
    verificationStatus: 'owned-documented',
    organization: {
      name: 'Cynbit Technologies',
      relationship: 'Cynbit-owned product',
      industry: 'Education technology',
    },
    categories: ['software'],
    summary: {
      text: 'Cynbit presents Studio as a learning and career-readiness platform for students and developers, bringing structured learning, assessment, guided practice and career tools into one product.',
      sourceIds: [...productSources],
    },
    context: [
      {
        text: 'The public product brief frames the transition from learning to employability as the central product problem.',
        sourceIds: ['cynbit-products'],
      },
      {
        text: 'Cynbit identifies Studio as one of the technology products it builds and operates.',
        sourceIds: ['cynbit-github'],
      },
    ],
    objectives: [
      {
        text: 'Help a learner establish a starting level and follow a more structured learning path.',
        sourceIds: ['cynbit-products'],
      },
      {
        text: 'Connect practical coding work, feedback and career preparation in the same experience.',
        sourceIds: [...productSources],
      },
    ],
    challenges: [
      {
        text: 'Cynbit describes a gap between completing learning activities and being able to show practical, career-ready skills.',
        sourceIds: ['cynbit-products'],
      },
      {
        text: 'A single product must support assessment, guided practice, progress visibility and career preparation without losing the learner’s sense of direction.',
        sourceIds: ['cynbit-products'],
      },
    ],
    solution: [
      {
        text: 'The documented experience combines a placement assessment with adaptive paths, coding missions, automated evaluation and mentor-style guidance.',
        sourceIds: [...productSources],
      },
      {
        text: 'Career preparation features described publicly include mock interviews, resume support, job-match analysis, progress tracking and certificates.',
        sourceIds: ['cynbit-products'],
      },
    ],
    implementation: [
      {
        text: 'The public material presents the product as connected modules: assessment establishes a starting point, learning paths organize work, evaluation supplies feedback, and career tools help present progress.',
        sourceIds: ['cynbit-products'],
      },
    ],
    execution: [
      {
        text: 'Cynbit’s official GitHub profile classifies Studio as an owned product and lists its functional areas, while the product page provides the fuller user-facing feature description.',
        sourceIds: [...productSources],
      },
    ],
    technologies: [],
    outcomes: [
      {
        label: 'Measured adoption or learner outcomes',
        context: 'No source reviewed provides a measured adoption figure, completion result, placement result or comparative learner outcome for Cynbit Studio.',
        measurement: 'unavailable',
        sourceIds: [],
      },
    ],
    limitations: [
      'The reviewed sources do not document the product’s engineering architecture or project-specific technology stack.',
      'No independently measured adoption, completion or employment outcome was found.',
      'Feature descriptions come from Cynbit-controlled channels and should be read as product documentation, not independent evaluation.',
    ],
    sourceIds: ['cynbit-products', 'cynbit-github', 'cynbit-studio-linkedin'],
    tags: ['adaptive learning', 'assessment', 'coding missions', 'career readiness', 'AI-assisted feedback'],
    relatedIds: ['work-04'],
    displayOrder: 1,
    featured: true,
  },
  {
    id: 'work-02',
    slug: 'tenantease',
    title: 'TenantEase',
    descriptor: 'A centralized view of property and tenant operations',
    workType: 'product',
    verificationStatus: 'owned-documented',
    organization: {
      name: 'Cynbit Technologies',
      relationship: 'Cynbit-owned product',
      industry: 'Property management software',
    },
    categories: ['software'],
    summary: {
      text: 'TenantEase is documented as a property and tenant management product that centralizes properties, tenants, rent records, payment history, reminders and occupancy information.',
      sourceIds: [...productSources],
    },
    context: [
      {
        text: 'Cynbit positions the product around replacing scattered property records and day-to-day coordination with a single operational view.',
        sourceIds: ['cynbit-products'],
      },
      {
        text: 'The official GitHub profile identifies TenantEase as one of the products Cynbit builds and operates.',
        sourceIds: ['cynbit-github'],
      },
    ],
    objectives: [
      {
        text: 'Bring property, unit, tenant and payment information into one management workflow.',
        sourceIds: [...productSources],
      },
      {
        text: 'Make pending rent, occupancy and transaction history easier for property managers to review.',
        sourceIds: ['cynbit-products'],
      },
    ],
    challenges: [
      {
        text: 'The product brief describes property operations spread across notebooks, chats and manual follow-up as the workflow it intends to address.',
        sourceIds: ['cynbit-products'],
      },
      {
        text: 'Property managers need to connect unit availability, tenant records and payment status without losing the history behind a change.',
        sourceIds: ['cynbit-products'],
      },
    ],
    solution: [
      {
        text: 'Documented modules include property and room tracking, structured tenant profiles, rent and payment records, pending-dues views and automated reminders.',
        sourceIds: [...productSources],
      },
      {
        text: 'A business dashboard is described as presenting occupancy and revenue information for property management decisions.',
        sourceIds: ['cynbit-products'],
      },
    ],
    implementation: [
      {
        text: 'The public workflow centers the property record and connects units, tenants, recurring rent activity, reminders and dashboard summaries around it.',
        sourceIds: ['cynbit-products'],
      },
    ],
    execution: [
      {
        text: 'Two Cynbit-controlled sources consistently describe TenantEase as an owned property-management platform and agree on its core functional areas.',
        sourceIds: [...productSources],
      },
    ],
    technologies: [],
    outcomes: [
      {
        label: 'Operational results',
        context: 'No verified customer deployment, collection improvement, occupancy improvement or time-saving result is documented in the reviewed sources.',
        measurement: 'unavailable',
        sourceIds: [],
      },
    ],
    limitations: [
      'The product page labels 100% collection efficiency as a target; this profile does not present that target as an achieved result.',
      'No customer organization, implementation date or measured operational outcome was publicly substantiated.',
      'The project-specific architecture and technology stack are not publicly documented.',
    ],
    sourceIds: [...productSources],
    tags: ['property management', 'tenant records', 'rent tracking', 'payments', 'occupancy'],
    relatedIds: ['work-03'],
    displayOrder: 2,
  },
  {
    id: 'work-03',
    slug: 'revio',
    title: 'Revio',
    descriptor: 'Review operations and reputation signals across locations',
    workType: 'product',
    verificationStatus: 'owned-documented',
    organization: {
      name: 'Cynbit Technologies',
      relationship: 'Cynbit-owned product',
      industry: 'Reputation management software',
    },
    categories: ['software'],
    summary: {
      text: 'Revio is documented as a reputation and review-management product for monitoring feedback, assisting with responses, examining sentiment and coordinating work across business locations.',
      sourceIds: [...productSources],
    },
    context: [
      {
        text: 'The product addresses the operational problem of reviews and customer feedback appearing across multiple platforms and locations.',
        sourceIds: ['cynbit-products'],
      },
      {
        text: 'Cynbit’s official GitHub profile identifies Revio as one of its owned products.',
        sourceIds: ['cynbit-github'],
      },
    ],
    objectives: [
      {
        text: 'Give teams a centralized view of reviews, ratings and sentiment across locations.',
        sourceIds: [...productSources],
      },
      {
        text: 'Support response workflows and surface feedback that may need timely attention.',
        sourceIds: ['cynbit-products'],
      },
    ],
    challenges: [
      {
        text: 'Multi-location organizations must monitor feedback from several channels while keeping responsibilities appropriate to global, brand and location roles.',
        sourceIds: ['cynbit-products'],
      },
      {
        text: 'Review volume and varying sentiment can make consistent response and escalation difficult to coordinate.',
        sourceIds: ['cynbit-products'],
      },
    ],
    solution: [
      {
        text: 'The documented feature set includes cross-platform review synchronization, AI-assisted responses, sentiment analysis and crisis detection.',
        sourceIds: [...productSources],
      },
      {
        text: 'Multi-location controls and role-based access are described for global administrators, brand managers and location-level advisors.',
        sourceIds: ['cynbit-products'],
      },
    ],
    implementation: [
      {
        text: 'Public materials describe a centralized workflow that collects reputation signals, supports review response and separates access by organizational role.',
        sourceIds: ['cynbit-products'],
      },
    ],
    execution: [
      {
        text: 'The official product page and GitHub organization profile consistently describe the product’s scope, but neither publishes an implementation case history.',
        sourceIds: [...productSources],
      },
    ],
    technologies: [],
    outcomes: [
      {
        label: 'Customer and reputation outcomes',
        context: 'No verified adoption, response-time improvement, rating change or customer-satisfaction result is documented in the reviewed sources.',
        measurement: 'unavailable',
        sourceIds: [],
      },
    ],
    limitations: [
      'The product page displays a 94% sentiment score without a public definition or methodology, so it is excluded as an outcome.',
      'No named customer implementation or independently measured result was found.',
      'The reviewed material does not establish the product-specific models, providers, data architecture or deployment stack.',
    ],
    sourceIds: [...productSources],
    tags: ['review management', 'sentiment', 'AI-assisted responses', 'multi-location', 'role-based access'],
    relatedIds: ['work-02'],
    displayOrder: 3,
  },
  {
    id: 'work-04',
    slug: 'bitelevate',
    title: 'BitElevate',
    descriptor: 'A practical technology learning and readiness initiative',
    workType: 'initiative',
    verificationStatus: 'owned-documented',
    organization: {
      name: 'Cynbit Technologies',
      relationship: 'Cynbit-owned initiative',
      industry: 'Technology education',
    },
    categories: ['software', 'cloud', 'marketing'],
    summary: {
      text: 'BitElevate is Cynbit’s learning and industry-readiness initiative, organized around practical projects, technical tasks, mentorship, assessment and career preparation.',
      sourceIds: ['cynbit-bitelevate', 'cynbit-github'],
    },
    context: [
      {
        text: 'Cynbit frames the initiative around the gap between learning technical concepts and applying them to practical systems.',
        sourceIds: ['cynbit-bitelevate', 'cynbit-github'],
      },
      {
        text: 'Its public program material addresses engineering students and presents both structured tracks and internship or training formats.',
        sourceIds: ['cynbit-bitelevate'],
      },
    ],
    objectives: [
      {
        text: 'Move learners from concept study toward project work, technical assessment and career preparation.',
        sourceIds: ['cynbit-github'],
      },
      {
        text: 'Provide learning routes across software, web development, AI and machine learning, data disciplines, cloud and DevOps.',
        sourceIds: ['cynbit-bitelevate', 'cynbit-github'],
      },
    ],
    challenges: [
      {
        text: 'The initiative’s published rationale identifies a disconnect between academic or conceptual learning and professional execution.',
        sourceIds: ['cynbit-bitelevate'],
      },
      {
        text: 'A multi-track program must make practical work, mentorship, assessment and career preparation coherent for learners with different interests.',
        sourceIds: ['cynbit-github'],
      },
    ],
    solution: [
      {
        text: 'Cynbit documents a project-oriented learning model combining technical tasks, mentorship, assessments and career preparation.',
        sourceIds: ['cynbit-github'],
      },
      {
        text: 'Published specializations include full-stack development, data science and AI, cloud architecture and digital marketing.',
        sourceIds: ['cynbit-bitelevate'],
      },
    ],
    implementation: [
      {
        text: 'The public program is structured around multiple specialization tracks and describes training and internship formats rather than a single software product flow.',
        sourceIds: ['cynbit-bitelevate'],
      },
      {
        text: 'A public credential record documents one 45-day Machine Learning with Data Science training and internship completed between 16 June and 31 July 2025 and issued by Cynbit on 2 August 2025.',
        sourceIds: ['bitelevate-credential'],
      },
    ],
    execution: [
      {
        text: 'The official initiative page provides the program description, while Cynbit’s GitHub profile separately identifies BitElevate as its learning and industry-readiness initiative.',
        sourceIds: ['cynbit-bitelevate', 'cynbit-github'],
      },
    ],
    technologies: [],
    outcomes: [
      {
        label: 'Documented program completion',
        value: '1 public credential record',
        context: 'The reviewed third-party credential page records one participant’s completion of a BitElevate training and internship program.',
        measurement: 'evidence',
        sourceIds: ['bitelevate-credential'],
        caveat: 'This confirms one public completion record only. It does not validate aggregate training, placement or reach claims.',
      },
    ],
    limitations: [
      'The public credential supports one completion record and cannot be generalized to the program as a whole.',
      'Figures shown on Cynbit-controlled pages for students trained, placement or reach were not independently corroborated and are excluded here.',
      'The sources do not provide a cohort-level methodology, completion rate or comparative employment outcome.',
    ],
    sourceIds: ['cynbit-bitelevate', 'cynbit-github', 'bitelevate-credential'],
    tags: ['technology education', 'projects', 'mentorship', 'training', 'career readiness'],
    relatedIds: ['work-01'],
    displayOrder: 4,
  },
]

export const caseStudies: readonly CaseStudy[] = [...ownedStudies, ...publishedCaseStudies]

validateCatalog(caseStudies, evidenceSources)
