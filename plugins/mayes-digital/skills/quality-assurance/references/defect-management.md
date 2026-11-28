# Defect Management

Read for finding classification, severity, priority, defect records, resolution, QA reports, and recurring quality patterns.

## Defect Classification

Classify findings according to evidence.

### Confirmed defect

Observed behavior fails an approved requirement.

### Confirmed standards violation

Observed implementation fails an applicable technical, architectural, accessibility, or platform requirement.

### Observed concern

An identifiable issue may introduce friction or risk but requires further evaluation.

### Improvement hypothesis

A proposed improvement has not yet been validated.

### Design preference

A subjective preference without a demonstrated quality failure.

### Unverified finding

A possible issue cannot be confirmed using available evidence.

Do not represent every improvement opportunity as a defect.

---

---

## Defect Severity

Use consistent severity classifications.

### Critical

A defect prevents essential functionality or creates substantial security, privacy, accessibility, or production risk.

Examples:

- Essential customer inquiries cannot be submitted.
- Privileged credentials are exposed.
- Primary navigation is unusable.
- Production functionality is broadly unavailable.

### High

A defect substantially impairs an important customer journey or system responsibility.

Examples:

- Mobile users cannot complete a quote request.
- Important integration data is lost.
- A shared component fails across multiple pages.
- Important content is unintentionally inaccessible.

### Medium

A defect creates meaningful friction, inconsistency, or localized functional impairment.

Examples:

- Incorrect secondary navigation behavior.
- Inconsistent component presentation.
- Recoverable form validation issues.
- Localized responsive layout defects.

### Low

A defect has limited impact on essential functionality.

Examples:

- Minor visual inconsistencies.
- Nonessential spacing defects.
- Minor wording problems.

Severity must reflect actual or reasonably supported impact.

Do not inflate severity to make a report appear more substantial.

---

---

## Remediation Priority

Assign implementation priority separately from severity.

| Priority | Meaning |
|---|---|
| P0 | Immediate action or release blocker |
| P1 | Address in the next implementation cycle |
| P2 | Schedule as a meaningful correction |
| P3 | Address when appropriate resources permit |

### Prioritization factors

- Customer impact.
- Business impact.
- Accessibility impact.
- Security impact.
- Frequency.
- Evidence confidence.
- Shared component impact.
- Implementation dependencies.
- Regression risk.

Critical defects normally require P0 treatment.

Any exception requires documented justification and appropriate authorization.

---

---

## Defect Reporting Format

Use the following structure for significant defects.

### Finding ID

Example:

QA-001

### Title

Provide a concise description of the defect.

### Location

Identify the affected page, component, environment, or customer journey.

### Classification

Identify the applicable defect classification.

### Severity

Critical, High, Medium, or Low.

### Priority

P0, P1, P2, or P3.

### Preconditions

Identify relevant setup or test conditions.

### Reproduction steps

Provide clear steps required to reproduce the issue.

### Expected behavior

Describe the approved or intended behavior.

### Actual behavior

Describe what was observed.

### Evidence

Identify supporting screenshots, measurements, logs, or inspection results.

### Impact

Explain the customer, business, or architectural consequences.

### Recommended correction

Describe the smallest appropriate correction.

### Responsible skill

Identify the skill or implementation responsibility.

### Validation

Describe how the correction should be verified.

### Limitations

Identify missing evidence or unresolved conditions.

---

---

## Worked Defect Example

### Finding ID

QA-001

### Title

Mobile quote submission button is obscured by fixed navigation.

### Location

Mobile quote experience at a 402px viewport.

### Classification

Confirmed defect, if reproduced through direct testing.

### Severity

High.

### Priority

P0 when the issue prevents completion of an essential quote journey.

### Reproduction steps

1. Open the affected page at the specified viewport.
2. Open the quote experience.
3. Complete the required information.
4. Navigate to the final submission action.
5. Attempt to activate the submission button.

### Expected behavior

The submission button remains visible and operable.

### Actual behavior

In this illustrative scenario, fixed navigation obscures the submission action.

### Impact

Customers may be unable to complete a quote request.

### Recommended correction

Inspect existing sheet layout, scrollable body behavior, safe-area spacing, and fixed navigation clearance.

Use the approved Core architecture before introducing custom overrides.

### Responsible skills

- Core Design System.
- Webflow Development.
- Quality Assurance.

### Validation

Repeat the original reproduction steps.

Evaluate adjacent mobile widths and relevant modal interactions.

### Limitation

This is an illustrative defect report, not a verified finding on an existing Mayes Digital website.

---

---

## Defect Resolution Workflow

When a defect is identified:

1. Record the finding.
2. Confirm the observed behavior.
3. Determine applicable severity.
4. Establish remediation priority.
5. Identify the responsible implementation layer.
6. Investigate the root cause.
7. Determine the smallest appropriate correction.
8. Obtain authorization where required.
9. Implement the correction.
10. Retest the original defect.
11. Perform relevant regression testing.
12. Update the defect status.

### Resolution statuses

- Open.
- Investigating.
- Blocked.
- Correction implemented.
- Awaiting verification.
- Resolved and verified.
- Deferred with authorization.
- Reopened.

Do not mark a defect resolved solely because implementation changes were made.

---

---

## Quality Assurance Report

Provide a report proportional to the requested scope.

### Executive summary

Describe:

- Project evaluated.
- Testing scope.
- Environment.
- Overall findings.
- Release readiness.
- Most consequential risks.

### Test coverage

| Quality area | Status | Evidence |
|---|---|---|
| Core architecture | Status | Inspection or test |
| Native-first implementation | Status | Inspection or test |
| Visual consistency | Status | Inspection or test |
| Customer experience | Status | Inspection or test |
| Responsive behavior | Status | Inspection or test |
| Functional behavior | Status | Inspection or test |
| CMS | Status | Inspection or test |
| Forms | Status | Inspection or test |
| Integrations | Status | Inspection or test |
| Accessibility | Status | Inspection or test |
| Performance | Status | Inspection or test |
| Organic visibility | Status | Inspection or test |
| Security and privacy | Status | Inspection or test |
| Regression testing | Status | Inspection or test |
| Release readiness | Status | Assessment |

### Findings summary

Report actual counts of:

- Critical defects.
- High-severity defects.
- Medium-severity defects.
- Low-severity defects.
- Concerns.
- Blocked tests.
- Untested requirements.

### Recommendations

Identify prioritized corrections and responsible implementation layers.

### Verification limitations

Identify:

- Missing access.
- Unavailable tools.
- Untested browsers.
- Untested devices.
- Unverified integrations.
- Missing performance data.
- Incomplete accessibility evaluation.
- Unavailable production access.

Do not assign an arbitrary overall quality score.

---

---

## Quality Metrics

Where sufficient evidence exists, use meaningful quality metrics.

### Potential metrics

- Tests executed.
- Tests passed.
- Tests failed.
- Tests blocked.
- Confirmed defects by severity.
- Verified defect resolutions.
- Regression defects.
- Applicable performance measurements.
- Essential customer journey completion.

### Test pass rate

When appropriate:

Pass rate = Passed tests / (Passed tests + Failed tests) × 100

Report blocked, untested, and nonapplicable requirements separately.

### Coverage limitation

A high pass rate does not establish sufficient test coverage.

A single critical failure may prevent release even when most tests pass.

Do not use pass rate as the sole release readiness criterion.

---

---

## Continuous Quality Improvement

Use recurring findings to improve Mayes Digital systems.

### Evaluate patterns

- Repeated component defects.
- Repeated responsive issues.
- Repeated CMS configuration problems.
- Repeated integration failures.
- Repeated accessibility concerns.
- Repeated release regressions.
- Repeated documentation gaps.

### Improvement workflow

1. Identify recurring issues.
2. Determine whether the root cause is shared.
3. Evaluate an appropriate Core improvement.
4. Identify affected products and clients.
5. Obtain architectural approval where required.
6. Implement the reusable correction.
7. Update relevant documentation.
8. Perform regression testing.
9. Evaluate whether recurrence decreases.

Do not repeatedly correct the same shared defect independently across client projects when an approved reusable correction is appropriate.

---
