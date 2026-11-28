# Custom Code

Use when custom JavaScript or CSS, security, privacy, technical SEO implementation, accessibility implementation, performance, troubleshooting, or legacy migration is in scope.

## Custom JavaScript Standards

Introduce custom JavaScript only when justified.

### Requirements

Custom JavaScript should:

- Have a defined responsibility.
- Use understandable naming.
- Minimize global namespace pollution.
- Avoid unnecessary dependencies.
- Handle missing elements safely.
- Handle errors appropriately.
- Preserve existing functionality.
- Support repeated initialization where applicable.
- Avoid duplicate event listeners.
- Respect accessibility requirements.
- Respect reduced-motion preferences.

### DOM integration

Prefer established data attributes and documented component contracts.

Avoid fragile selectors that depend on incidental visual styling or unnecessary DOM depth.

### Initialization

Preserve the approved Core initialization architecture.

Do not create competing initialization systems without justification.

### Security

Do not insert untrusted content into the DOM through unsafe HTML operations.

Validate external data before using it in sensitive contexts.

### Validation

- Check JavaScript syntax.
- Inspect browser console output.
- Test relevant interaction paths.
- Test missing-data conditions.
- Test responsive behavior.
- Perform applicable regression testing.

---

---

## Custom CSS Standards

Use native Webflow styling wherever practical.

### Approved custom CSS responsibilities

Consult the current Core documentation.

Previously documented exceptions include functionality involving:

- Root HTML behavior.
- Hidden states.
- Reduced-motion handling.
- Tap-highlight behavior.
- Modal slide behavior.
- Modal backdrop behavior.
- Scroll-lock behavior.

Verify whether these exceptions remain necessary in the current implementation.

### Requirements

- Reuse existing Core variables.
- Preserve class architecture.
- Avoid unnecessary selector specificity.
- Avoid excessive `!important` declarations.
- Avoid duplicating native Webflow styles.
- Preserve responsive behavior.
- Document non-obvious rules.

### Variable references

Use the current exported Webflow variable names.

The documented Core collection uses the `--_core---` naming namespace.

Do not guess generated CSS variable names.

Inspect the actual published or exported implementation.

---

---

## Security and Credential Management

Protect business information, customer information, and integration credentials.

### Never expose

- Private API keys.
- Administrative access tokens.
- Database credentials.
- Private signing secrets.
- Privileged integration credentials.
- Customer information unrelated to the task.

### Client-side code

Assume JavaScript delivered to the browser can be inspected by visitors.

Do not place privileged credentials in:

- Webflow custom code.
- HTML embeds.
- Client-side JavaScript.
- Public GitHub repositories.
- CMS fields accessible to visitors.

### Server-side operations

Use an approved server-side service or secure integration layer when privileged operations are required.

### Additional requirements

- Apply least-privilege access.
- Validate external input.
- Use HTTPS.
- Avoid logging sensitive information.
- Protect webhook endpoints appropriately.
- Document credential configuration without exposing secret values.

If credentials are accidentally exposed, identify the risk and recommend appropriate rotation and remediation.

---

---

## Privacy and Consent Implementation

Use approved privacy and consent infrastructure.

### Requirements

- Identify applicable data collection.
- Identify optional tracking functionality.
- Preserve user preference controls.
- Respect recorded consent preferences.
- Avoid unnecessary collection of personal information.
- Protect submitted customer information.
- Preserve applicable opt-out functionality.

### Cookie preferences

Use the established consent architecture where applicable.

Inspect the current implementation before introducing a new consent mechanism.

Do not create competing consent systems.

### Legal boundary

Technical implementation does not independently establish legal compliance.

Identify requirements that need legal or business-owner confirmation.

---

---

## Performance-Oriented Development

Development decisions must support efficient website behavior.

### Requirements

- Minimize unnecessary scripts.
- Avoid duplicate dependencies.
- Use appropriately sized images.
- Avoid unnecessary render-blocking resources.
- Preserve efficient layout structures.
- Avoid excessive DOM complexity.
- Load third-party integrations only where justified.
- Avoid unnecessary animation libraries.
- Prevent avoidable layout shifts.

### Images

Use appropriate image formats and dimensions.

Preserve Core image container architecture.

Evaluate loading behavior according to the image's role.

Do not indiscriminately lazy-load critical hero imagery.

### Measurement

Coordinate performance testing with Quality Assurance.

Do not invent performance scores or claim optimization results without measurement.

---

---

## Technical SEO Implementation

Coordinate technical discoverability requirements with Organic Visibility.

Development responsibilities may include:

- Page title configuration.
- Meta descriptions.
- Canonical URLs.
- Sitemap configuration.
- Robots directives.
- Redirects.
- Semantic HTML.
- Structured data.
- Open Graph metadata.
- Dynamic CMS metadata.

### Structured data

Inspect existing Core business structured-data functionality before adding new JSON-LD.

Avoid duplicate or contradictory structured data.

Use verified business information.

### Requirements

- Preserve correct indexing behavior.
- Avoid accidentally blocking production pages.
- Avoid exposing staging content unintentionally.
- Validate redirects.
- Validate canonical destinations.
- Preserve meaningful internal links.

Organic Visibility establishes the search strategy.

Webflow Development implements the technical requirements.

---

---

## Accessibility Implementation

Accessibility is a technical implementation responsibility as well as an experience design responsibility.

Use WCAG 2.2 Level AA as the proposed evaluation baseline unless another applicable requirement is established.

### Requirements

- Use appropriate semantic elements.
- Provide accessible names.
- Preserve meaningful heading hierarchy.
- Support keyboard interaction.
- Maintain visible focus indicators.
- Provide appropriate alternative text.
- Associate labels with form controls.
- Communicate validation errors.
- Preserve appropriate modal focus behavior.
- Respect reduced-motion preferences.

### Native functionality

Native Webflow components must still be evaluated for accessibility.

Do not assume native implementation establishes complete accessibility conformance.

Coordinate detailed verification with Quality Assurance.

---

---

## Troubleshooting Workflow

When investigating a technical problem:

1. Define the reported symptom.
2. Identify the affected project and environment.
3. Reproduce the issue when possible.
4. Inspect relevant implementation.
5. Inspect browser console output.
6. Inspect network behavior where applicable.
7. Identify affected dependencies.
8. Compare expected and actual behavior.
9. Establish the likely root cause.
10. Implement the smallest justified correction.
11. Retest the original issue.
12. Perform relevant regression testing.

### Troubleshooting requirements

- Distinguish symptoms from root causes.
- Avoid speculative changes.
- Avoid modifying multiple unrelated systems simultaneously.
- Preserve existing working functionality.
- Document unresolved conditions.

Do not report a root cause as confirmed without sufficient evidence.

---

---

## Legacy Migration

When migrating legacy functionality to the current Core architecture:

### Preparation

- Identify legacy components.
- Identify legacy classes.
- Identify legacy variables.
- Identify legacy scripts.
- Identify current dependencies.
- Identify affected pages and products.

### Migration

- Map legacy functionality to approved Core resources.
- Prefer native replacements.
- Preserve necessary behavior.
- Avoid duplicate initialization.
- Preserve CMS relationships.
- Preserve existing customer-facing functionality.

### Removal

Before removing legacy resources:

- Verify current usage.
- Verify dependent components.
- Verify replacement functionality.
- Establish rollback options.
- Perform regression testing.

Do not delete a legacy resource solely because its naming differs from the current standard.

---
