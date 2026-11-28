# Release Checklist

Read for release gates, blockers, readiness classifications, pre-publish checks, post-publish checks, and rollback verification.

## Release Readiness Gates

Evaluate production readiness through six proposed quality gates.

### Gate 1: Architecture

- [ ] Approved Core architecture is preserved.
- [ ] Existing resources are reused appropriately.
- [ ] Custom code is justified.
- [ ] Product boundaries are preserved.

### Gate 2: Functionality

- [ ] Essential customer journeys work.
- [ ] Navigation works.
- [ ] The top nav and bottom nav pairing follows the pairing rule, with Call shown once on phones.
- [ ] Forms work.
- [ ] Required integrations are verified.
- [ ] No unresolved critical functional defects remain.

### Gate 3: Experience and Accessibility

- [ ] Relevant responsive behavior is verified.
- [ ] Important usability requirements are satisfied.
- [ ] Applicable accessibility requirements are evaluated.
- [ ] Each template is tested with real-sized content: a very long headline and a short one, 1 service and 10, a missing photo, and long business names, with no broken layout.
- [ ] Significant accessibility findings are addressed or appropriately escalated.

### Gate 4: Performance and Discoverability

- [ ] Relevant performance behavior is evaluated.
- [ ] Essential resources load.
- [ ] Call and page text work on a throttled slow connection before images load.
- [ ] Production indexing configuration is appropriate.
- [ ] Relevant metadata and structured data are evaluated.

### Gate 5: Security and Data Integrity

- [ ] Privileged credentials are protected.
- [ ] Relevant customer data handling is verified.
- [ ] Consent behavior is evaluated.
- [ ] Significant security and privacy risks are addressed.

### Gate 6: Release Control

- [ ] Approved dependency versions are identified.
- [ ] Applicable repository checks are completed.
- [ ] Relevant regression testing is completed.
- [ ] Rollback considerations are documented.
- [ ] Remaining limitations are disclosed.
- [ ] Production publishing is authorized.

A release is not ready merely because most checklist items pass.

---

---

## Release Blockers

Do not recommend production release when unresolved conditions create unacceptable risk.

### Typical blockers

- Essential customer journeys are broken.
- Required form delivery cannot be established.
- Privileged credentials are exposed.
- Significant customer information is mishandled.
- Critical accessibility barriers prevent essential tasks.
- Required dependencies fail to load.
- Shared Core changes introduce significant regressions.
- Production indexing is unintentionally disabled.
- Material business information is incorrect.
- Required deployment authorization is unavailable.

### Unverified requirements

An untested requirement is not automatically a confirmed defect.

However, unverified essential functionality may prevent a responsible release recommendation.

Identify the missing verification and required next action.

---

---

## Release Readiness Classification

Use one of the following statuses.

### Not Ready

One or more release blockers remain.

### Verification Incomplete

Implementation may be complete, but required evidence is unavailable or testing remains unfinished.

### Ready with Documented Exceptions

Required quality gates are satisfied except for explicitly documented, appropriately authorized, nonblocking exceptions.

### Ready for Authorized Release

Applicable acceptance criteria and quality gates have been satisfied.

Production publishing has not yet occurred.

### Published, Verification Pending

Publishing is confirmed, but post-deployment verification remains incomplete.

### Published and Verified

Publishing is confirmed and the applicable production verification scope has been completed.

Do not use Published and Verified without evidence of both deployment and verification.

---

---

## Pre-Publish Checklist

Before an authorized production deployment:

- [ ] Correct project identified.
- [ ] Correct production domain identified.
- [ ] Requested changes reviewed.
- [ ] Relevant content verified.
- [ ] Applicable architecture verified.
- [ ] Essential functionality verified.
- [ ] Relevant responsive behavior verified.
- [ ] Accessibility implications evaluated.
- [ ] Integration configuration verified.
- [ ] Dependency versions verified.
- [ ] Applicable regression testing completed.
- [ ] Indexing configuration evaluated.
- [ ] Security and privacy implications evaluated.
- [ ] Rollback options identified.
- [ ] Release blockers resolved.
- [ ] Remaining limitations disclosed.
- [ ] Publishing authorization confirmed.

Do not publish solely because this checklist has been presented.

---

---

## Post-Publish Verification

After confirmed production publishing:

- [ ] Production website loads.
- [ ] Correct domain resolves.
- [ ] HTTPS behavior is appropriate.
- [ ] Affected pages are available.
- [ ] Shared dependencies load.
- [ ] Navigation works.
- [ ] Relevant components render correctly.
- [ ] Essential customer actions work.
- [ ] Relevant form delivery is verified where authorized.
- [ ] Required integrations behave appropriately.
- [ ] Production metadata is appropriate.
- [ ] Production indexing configuration is appropriate.
- [ ] Unexpected console or network errors are investigated.

### Requirements

Verify the published website rather than relying exclusively on Designer or staging previews.

Document any production behavior that differs from the tested environment.

---

---

## Rollback Verification

Before recommending rollback:

- Identify the affected release.
- Identify the last known working state.
- Identify affected dependencies.
- Identify unrelated valid changes.
- Evaluate available recovery mechanisms.
- Obtain appropriate authorization.

After rollback:

- [ ] Expected version or configuration is restored.
- [ ] Essential functionality is verified.
- [ ] Relevant dependencies load.
- [ ] Customer journeys are restored.
- [ ] Related functionality remains operational.
- [ ] Remaining issues are documented.

Do not assume a rollback succeeded merely because a previous version was selected.

---
