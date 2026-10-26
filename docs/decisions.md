# Implementation decisions

## Scope

The experience focuses on finding and evaluating publicly documented Cynbit work. It contains a listing, category and work-type filters, search, reusable detail pages, evidence references, related profiles, a two-to-three-profile comparison workspace, and preserved discovery state. Production inquiries, accounts, analytics, and whole-site redesign remain out of scope.

## Portfolio selection

The thirteen fictional demonstration records were removed. The active catalog combines four Cynbit-owned profiles with all thirteen projects in Cynbit's official case-study library.

The official project pages are valuable first-party portfolio evidence, but research did not locate independent client or partner corroboration. They therefore use the relationship label `Cynbit-published case study; independent client confirmation unavailable` and the evidence label `Cynbit-published · independently unconfirmed`. Their results are attributed to Cynbit and carry a methodology caveat.

## Categories

The original service taxonomy remains stable:

- Software Development: 13 profiles.
- Cloud Strategy: 3 profiles.
- Digital Marketing: 3 profiles.

BitElevate belongs to all three because its official program material describes those learning tracks. The thirteen published projects retain their category from Cynbit's case-study index. Counts are derived from the catalog rather than hard-coded.

## Evidence model

Each substantive claim stores source IDs. The source ledger records publisher, URL, source kind, access date, and a scope note. Runtime validation rejects duplicate IDs, slugs, display order, missing or unlisted references, unsourced claims and technologies, unsupported outcome values, first-party results without caveats, and invalid related links.

First-party documentation establishes what Cynbit publishes. It does not independently validate a client relationship, implementation, adoption, or result. Project-specific technologies are included only when the individual page names them. Missing details are stated in the implementation text and limitations.

## URL contract

- `/case-studies` lists every profile.
- `category=software|cloud|marketing` selects a service category.
- `type=product|initiative|published-study` selects a work type.
- `q=` stores a normalized search query.
- `compare=` stores up to three ordered profile slugs for the comparison workspace.
- `/case-studies/compare` renders the selected profiles side by side. Invalid, duplicate, and excess selection values recover visibly.
- Criteria combine with AND logic.
- Detail and related-profile links retain the current query string.
- Invalid category or type values recover visibly to all values.

Search matches all tokens against titles, descriptors, relationship and industry metadata, category labels, sourced profile content, technology evidence, outcomes, limitations, and tags. Search remains submit-driven so browser history records deliberate changes instead of every keystroke.

## Presentation and accessibility

The public Cynbit site informed the teal palette, pale surfaces, substantial headings, rounded controls, and technical visual vocabulary. Page composition, CSS artwork, and interaction code are original. System fonts keep the app self-contained.

Native buttons expose `aria-pressed`; filters use labelled fieldsets; search has a visible label; result and comparison-selection counts use polite live regions; route changes focus the page heading; source links have descriptive accessible names; first-party evidence status is visible in cards and detail heroes; focus styles are visible; and reduced-motion rules suppress nonessential movement.

## Comparison policy

The comparison workspace is intentionally descriptive rather than evaluative. It places source-backed objectives, challenges, solutions, implementation notes, project-specific technology, outcome classifications, limitations, and public references side by side. It never ranks profiles, infers a capability score, or fills missing evidence with a generic claim. When a reviewed source does not document a project-specific technology or result, the comparison says so directly.

## Technology

React, TypeScript, Vite, and React Router remain appropriate. Content is curated and source-controlled, so a CMS, schema library, or runtime API would add unnecessary complexity. Vitest, Testing Library, Playwright, axe, and ESLint provide the validation layers.
