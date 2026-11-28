# Deployment

Use for repository changes, versioned Core dependencies, validation, environments, publishing, rollback, and delivery reporting.

## GitHub Repository Management

GitHub provides version control for applicable shared code, product code, documentation, and releases.

### Repository inspection

Before modifying repository code:

- Confirm the correct repository.
- Confirm the target branch.
- Inspect the current file structure.
- Review relevant documentation.
- Review existing implementation.
- Identify build and validation procedures.
- Identify affected dependencies.

### Change requirements

- Keep changes scoped to the requested outcome.
- Preserve established architecture.
- Avoid unrelated refactoring.
- Update relevant documentation.
- Execute applicable validation.
- Use meaningful commit descriptions.
- Preserve existing public interfaces where practical.

### Shared Core changes

Maintain product neutrality.

Do not introduce client-specific or product-specific logic into universal Core modules.

### Authorization

Do not commit, push, merge, tag, or release changes outside the authorized scope.

---

---

## Versioned Core Releases

Production websites must use approved versioned Core dependencies.

### Requirements

- Identify the currently deployed version.
- Identify the current approved release.
- Use matching release versions for related Core CSS and JavaScript.
- Pin production dependencies to approved tags.
- Avoid loading production dependencies directly from `@main`.
- Evaluate compatibility before upgrading.
- Document migration requirements.

### Illustrative dependency pattern

```text
Repository CDN URL
    + approved release tag
    + approved distribution file
```

Retrieve the actual dependency URLs from current repository documentation.

Do not invent CDN paths or release tags.

### Release upgrades

Before upgrading:

1. Review release documentation.
2. Identify changed functionality.
3. Identify breaking changes.
4. Identify affected projects.
5. Validate compatibility.
6. Establish rollback procedures.
7. Update dependencies consistently.
8. Verify deployed behavior.

Do not hardcode a permanently designated latest version into this skill.

---

---

## Repository Validation

Consult the current repository validation scripts.

The documented Mayes Core `check.sh` process includes checks involving:

- JavaScript syntax.
- Source and distribution consistency.
- Product neutrality.
- Module version declarations.

Inspect the current script before execution.

### Validation requirements

- Run applicable checks.
- Investigate failures.
- Rebuild distribution files when required.
- Preserve source and distribution consistency.
- Document actual results.

### Reporting

Distinguish between:

- Checks executed successfully.
- Checks executed with failures.
- Checks not executed.
- Checks not applicable.

Do not claim that tests passed when they were not executed.

---

---

## Development Change Control

Classify changes according to their scope.

| Change type | Scope |
|---|---|
| Content | Text, images, or CMS values |
| Presentation | Styling or visual properties |
| Component | Reusable structure or behavior |
| Functional | Interactions, forms, or business functionality |
| Integration | External services or data relationships |
| Architectural | Shared Core contracts or infrastructure |
| Release | Versioned dependencies or deployment |

### Approval requirements

Seek appropriate authorization before:

- Changing shared architectural contracts.
- Introducing new external dependencies.
- Removing existing functionality.
- Changing integration destinations.
- Performing destructive CMS operations.
- Publishing production changes.
- Creating or promoting releases.

Minor changes within an explicitly authorized task do not require unnecessary repeated confirmation.

---

---

## Staging and Production

Distinguish development, staging, and production environments.

### Development

Used for implementation and initial inspection.

### Staging

Used for applicable functional, responsive, accessibility, and integration testing before production deployment.

### Production

The customer-facing environment.

### Requirements

- Identify the target environment.
- Avoid unintended production changes.
- Protect staging from unintended indexing.
- Avoid sending test data into production workflows unnecessarily.
- Validate environment-specific configuration.
- Confirm deployment authorization.

Do not assume that behavior verified in one environment is identical in another.

---

---

## Deployment and Publishing

Publishing is a separate action from implementation.

### Before publishing

Confirm:

- Requested changes are complete.
- Applicable Core standards are preserved.
- Required dependencies are correctly versioned.
- Relevant functionality has been tested.
- Responsive behavior has been evaluated.
- Accessibility implications have been evaluated.
- Integration configuration is appropriate.
- Critical unresolved issues are disclosed.
- Publishing authorization exists.

### After publishing

Where access permits:

- Verify the published website.
- Verify affected pages.
- Verify relevant interactions.
- Verify dependency loading.
- Verify form and integration behavior where authorized.
- Investigate unexpected errors.

Do not claim production deployment or successful publishing without confirmation.

---

---

## Rollback and Recovery

Consider rollback requirements before significant changes.

### Potential rollback resources

- Webflow backups.
- Previous approved Core releases.
- GitHub version history.
- Documented configuration.
- Previous integration settings.
- Existing component definitions.

Verify availability before relying on any recovery mechanism.

### Rollback requirements

- Identify the affected change.
- Identify the last known working state.
- Evaluate dependencies.
- Preserve unrelated valid changes.
- Obtain appropriate authorization.
- Verify restored functionality.

Do not perform destructive restoration without understanding its impact.

---

---

## Development Validation Checklist

Before reporting implementation completion, evaluate applicable requirements.

### Architecture

- [ ] Correct project identified.
- [ ] Current implementation inspected.
- [ ] Approved Core architecture preserved.
- [ ] Existing resources reused.
- [ ] Product and client boundaries preserved.

### Native implementation

- [ ] Native alternatives evaluated.
- [ ] Existing components reused where appropriate.
- [ ] Custom code justified.
- [ ] Unnecessary dependencies avoided.

### CMS

- [ ] Existing collections evaluated.
- [ ] Field contracts preserved.
- [ ] Dynamic bindings verified.
- [ ] Missing content handled appropriately.

### Functionality

- [ ] Relevant interactions tested.
- [ ] Navigation destinations verified.
- [ ] Forms evaluated.
- [ ] Integration behavior evaluated.
- [ ] Error states evaluated.

### Code

- [ ] Syntax checks completed where applicable.
- [ ] Existing functionality preserved.
- [ ] Source and distribution consistency evaluated.
- [ ] Browser errors investigated.

### Security

- [ ] Privileged credentials protected.
- [ ] Sensitive information handled appropriately.
- [ ] Consent requirements evaluated.
- [ ] Integration permissions appropriate.

### Release

- [ ] Approved dependencies identified.
- [ ] Production versions pinned.
- [ ] Regression risks evaluated.
- [ ] Deployment status accurately reported.

---

---

## Development Reporting

At the completion of an implementation task, provide a report proportional to the work performed.

### Requested outcome

Describe the authorized objective.

### Implementation

Identify:

- Pages modified.
- Components modified.
- CMS resources modified.
- Code files modified.
- Integrations modified.
- Dependencies modified.

### Existing resources reused

Identify applicable Core components, classes, variables, native functionality, and shared modules.

### Technical decisions

Explain significant implementation choices.

When custom code was introduced, explain why native functionality was insufficient.

### Validation

Report:

- Tests performed.
- Tests passed.
- Tests failed.
- Tests not performed.
- Remaining verification requirements.

### Deviations

Identify departures from approved architecture.

Explain their justification and authorization status.

### Remaining risks

Disclose:

- Missing access.
- Unavailable tool capabilities.
- Unverified integrations.
- Incomplete testing.
- Potential regressions.
- Pending manual Designer actions.

### Deployment status

Use an accurate status:

- Proposed.
- Implemented but unverified.
- Implemented and verified.
- Ready for authorized publishing.
- Published and verified.

---
