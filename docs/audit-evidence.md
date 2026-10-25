# Audit evidence behind the prototype

> Historical note: this document records the original Phase 0 finding and the first fictional-data acceptance target. The approved Work & Impact revision later removed all fictional entries. Current content decisions and evidence are recorded in `content-evidence.md` and `content-policy.md`.

**Observed:** 25 October 2026, public unauthenticated website. This file records the narrow evidence relevant to the selected improvement. The complete Phase 0 planning report was delivered in the conversation before implementation.

## Finding F01: case-study filters did not change the visible collection

Source: [Cynbit case studies](https://www.cynbit.in/case-studies).

The listing presented thirteen cards and four category buttons: All Success Stories, Software Dev, Cloud Strategy, and Digital Marketing. Card labels gave a distribution of nine software, two cloud, and two marketing studies.

Reproduction:

1. Open the case-study listing.
2. Activate Cloud Strategy.
3. Observe that all thirteen cards remain present and All Success Stories retains the selected styling.
4. Repeat with Software Dev and Digital Marketing. The cards remain unfiltered.

Cloud Strategy also left all thirteen cards present at a 390-pixel browser viewport. The outcome was observed through browser inspection and a screenshot in the audit session. No screenshot file was saved here.

**Original fixed-prototype acceptance:** The initial demonstration used a 9/2/2 fictional distribution. The current evidence-backed revision keeps the same category names and derives counts from 17 profiles: 13 Software Development, 3 Cloud Strategy, and 3 Digital Marketing. BitElevate is documented in all three categories, while the thirteen published studies retain their official index category. Search and category can be combined, and URL state, selected state, visible results, empty recovery, and detail return state remain required.

## Related observations

- Detail pages used a shared challenge/solution/outcome structure and generic browser titles in the inspected sample. The prototype supplies descriptive detail titles.
- Product and service inquiries already exist on Cynbit's website. The explorer stays focused on work discovery and does not simulate their delivery.
- The original project's source code and page content were not imported. Former fictional demonstration records have been removed; current summaries are original paraphrases linked to public evidence.

## Evidence limits

The audit did not measure visitor traffic, lead conversion, Core Web Vitals, or actual business outcomes. The prototype may demonstrate a working journey, but it cannot prove a commercial uplift without real evaluation data.
