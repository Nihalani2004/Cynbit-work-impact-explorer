# Validation record

Final verification executed locally on 25 October 2026 with Node.js 25.5.0 and npm 11.8.0 on Windows. Deployment was intentionally excluded.

## Automated checks

| Check | Observed result |
| --- | --- |
| `npm run lint` | Passed. |
| `npm run typecheck` | Passed. |
| `npm test` | Passed: 3 suites, 19 unit/component tests. |
| `npm run test:e2e` | Passed: 33 tests across Chromium, Firefox, and WebKit in 2.5 minutes. |
| `npm run build` | Passed: 62 modules transformed. |
| `npm run check:bundle` | Passed: JavaScript 99.69 KiB gzip against 150 KiB; CSS 6.02 KiB gzip against 30 KiB. |
| `npm audit --json` | Passed: zero reported vulnerabilities across 429 dependencies. This advisory check is not a complete security audit. |
| `npm run docs:screenshots` | Passed: desktop explorer, 390-pixel Cloud Strategy, and GlobalPay detail screenshots regenerated and visually inspected. |

The browser suite verifies the Software Development 13, Cloud Strategy 3, and Digital Marketing 3 distribution; product, initiative, and 13-entry published-study filters; keyword and verified-technology search; combined criteria; clear controls; empty recovery; result announcements; URL synchronization; browser Back/Forward; direct detail access and refresh; related-profile navigation; return-state preservation; claim citations; first-party outcome caveats; keyboard activation; skip navigation; invalid filters/routes; 320/390/768/1440-pixel layouts; 200% root text scaling; reduced motion; image blocking; no remote runtime request; browser console errors; and axe scans.

Axe found no serious or critical violations on the listing, empty state, owned detail, or published-study detail route in Chromium, Firefox, and WebKit. Automated scanning does not replace evaluation with real assistive technology.

## Content validation

- Catalog validation runs at module load and is covered by unit tests.
- All 17 IDs, slugs, and display-order values are unique.
- Every narrative claim has a valid source that is also listed on its profile.
- Every named technology has profile-specific source evidence.
- Every reported value has a valid source, evidence classification, and caveat where the evidence is first-party only.
- Related IDs resolve and never point to the current entry.
- The source ledger records publisher, URL, access date, source type, and scope note.
- The former fictional records are absent.
- The published studies retain the category on Cynbit's official index; BitElevate is assigned to all three service categories from its documented tracks.

## Browser and visual review

- Chromium: 11/11 browser tests passed.
- Firefox: 11/11 browser tests passed.
- WebKit: 11/11 browser tests passed.
- The 1440-pixel explorer, 390-pixel Cloud Strategy view, and 1440-pixel GlobalPay detail view were regenerated and inspected.
- No unintended horizontal overflow was detected at tested widths or with 200% root text scaling.
- Detail pages use a readable two-column desktop hierarchy and a single-column mobile reflow.
- Evidence labels, outcome caveats, source references, limitations, and related navigation remain visually distinct.

## Findings fixed during validation

- Expanded filtering expectations from the earlier 4/1/1 catalog to the current 13/3/3 distribution.
- Expanded Back/Forward coverage to account for three Digital Marketing results before the work-type filter is applied.
- Scoped selectors where topic tags and technology lists intentionally repeat the same term.
- Added first-party-specific badge and callout styling so published studies cannot be mistaken for owned or independently verified work.
- Extended search to include technology roles, outcomes, caveats, and limitations.
- Strengthened validation so a claim cannot reference a source omitted from its profile and a first-party outcome cannot omit its caveat.
- Replaced stale screenshots and added a repeatable local capture command.

## Limits

- No deployment, public URL, or hosted-route smoke test was performed.
- Browser zoom UI cannot be controlled consistently across Playwright engines. The suite uses 320-pixel reflow and 200% root text scaling as repeatable checks; manual browser zoom remains appropriate before deployment.
- Lighthouse and field Core Web Vitals were not measured. Bundle budgets, runtime-network independence, and console checks provide local safeguards without implying field performance.
- The thirteen published project stories and their metrics remain first-party claims without independent client corroboration or public methodology.
- External reference pages can change after the recorded access date.
- The current directory is not recognized as a Git repository, and no Git history or remote operation was created.
