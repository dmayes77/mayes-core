# Testing Standards

Read for test scope, environments, evidence, acceptance criteria, and functional verification across Core, pages, CMS, forms, integrations, code, content, and regressions. Search this file for the relevant feature before loading unrelated sections.

## Quality Philosophy

Quality is established through demonstrated outcomes.

A website must do more than appear visually complete.

It must:

- Communicate accurately.
- Function reliably.
- Remain accessible.
- Perform efficiently.
- Support customer objectives.
- Preserve approved architecture.
- Protect customer information.
- Remain maintainable.
- Support sustainable business operations.

Do not sacrifice functional reliability for visual polish or development speed.

Do not treat the absence of reported problems as proof of quality.

---

---

## Quality Framework

Evaluate quality through ten interconnected dimensions.

| Dimension | Governing question |
|---|---|
| Architecture | Does the implementation preserve Core standards? |
| Experience | Can customers understand and use it? |
| Functionality | Does it work as intended? |
| Responsiveness | Does it work across relevant devices? |
| Accessibility | Can people with different abilities use it? |
| Performance | Does it respond efficiently? |
| Content | Is the information accurate and complete? |
| Discoverability | Can relevant search platforms discover it? |
| Security | Are data and integrations appropriately protected? |
| Reliability | Can it be maintained and deployed safely? |

No single quality dimension establishes overall production readiness.

---

---

## Source of Truth

Primary shared repository:

`dmayes77/mayes-core`

Consult current applicable documentation:

- `README.md`
- `docs/ARCHITECTURE.md`
- `docs/DECISIONS.md`
- `docs/NATIVE_FIRST.md`
- `docs/RELEASES.md`
- `base/README.md`
- `check.sh`

Also consult:

- Core Design System skill.
- Experience Design skill.
- Webflow Development skill.
- Organic Visibility skill.
- Applicable product documentation.
- Approved client requirements.
- Current official platform documentation.

### Source hierarchy

Evaluate quality against:

1. Applicable security, privacy, and accessibility requirements.
2. Approved project acceptance criteria.
3. Current approved architectural decisions.
4. Current implementation documentation.
5. Actual observed system behavior.
6. Recognized technical best practices.

Identify conflicts rather than silently choosing an inconsistent standard.

---

---

## Quality Assurance Independence

Quality Assurance must evaluate implementation outcomes independently of the reasoning used to create them.

### Requirements

- Inspect actual behavior.
- Verify stated implementation claims.
- Challenge unsupported assumptions.
- Identify unresolved requirements.
- Distinguish completed work from verified work.
- Report defects even when introduced by the current implementation.
- Avoid approving changes solely because they follow the proposed design.

The skill responsible for implementation may provide context.

That context does not replace independent verification.

---

---

## Testing Scope

Before beginning quality assurance, establish:

- Target website.
- Target environment.
- Requested scope.
- Affected pages.
- Affected components.
- Affected customer journeys.
- Applicable business requirements.
- Relevant dependencies.
- Available testing tools.
- Available access.
- Known limitations.

### Scope categories

- Component verification.
- Page verification.
- Customer journey verification.
- Integration verification.
- Architecture verification.
- Full website audit.
- Regression testing.
- Release readiness assessment.
- Post-deployment verification.

Select the scope appropriate to the requested work.

Do not imply that a component-level test establishes complete website quality.

---

---

## Testing Environments

Distinguish between development, staging, and production.

### Development

Used for initial implementation and targeted verification.

### Staging

Used for broader testing before authorized production deployment.

### Production

Used for verification of the customer-facing experience.

### Requirements

- Identify the tested environment.
- Record the tested URL or project.
- Identify applicable dependency versions.
- Avoid unintended production modifications.
- Avoid triggering unauthorized customer communications.
- Avoid creating unnecessary production records.
- Distinguish staging results from production results.

A successful staging test does not automatically establish successful production behavior.

---

---

## Evidence Standards

Quality Assurance findings must be supported by available evidence.

### Acceptable evidence

- Direct website inspection.
- Webflow Designer inspection.
- Browser screenshots.
- Browser console output.
- Network inspection.
- Functional test results.
- Repository inspection.
- Automated validation results.
- Accessibility evaluation.
- Performance measurements.
- CMS inspection.
- Integration delivery records.
- Physical-device testing.
- Authorized analytics data.

### Requirements

Record relevant context, including:

- Environment.
- URL or component.
- Device or viewport.
- Browser.
- Test conditions.
- Expected behavior.
- Actual behavior.
- Supporting evidence.

Do not fabricate screenshots, measurements, test results, or observed behavior.

---

---

## Test Status Definitions

Use consistent test statuses.

| Status | Definition |
|---|---|
| Pass | Expected behavior was verified |
| Fail | Actual behavior did not satisfy the requirement |
| Concern | A potential issue or improvement opportunity was observed |
| Blocked | Testing could not proceed because of a dependency or access limitation |
| Not Tested | Verification has not been performed |
| Not Applicable | The requirement does not apply |

### Status requirements

- Pass requires supporting evidence.
- Fail requires an identified discrepancy.
- Concern does not automatically establish a defect.
- Blocked must identify the blocking condition.
- Not Tested must not be represented as Pass.
- Not Applicable must have a reasonable justification.

---

---

## Acceptance Criteria

Establish acceptance criteria before implementing or evaluating significant changes.

Acceptance criteria should be:

- Specific.
- Observable.
- Relevant.
- Testable.
- Consistent with approved requirements.

### Example

Requirement:

The mobile quote sheet must remain usable when its content exceeds the available viewport height.

Acceptance criteria:

- The sheet opens successfully.
- The sheet body scrolls independently as intended.
- Required form fields remain accessible.
- The close control remains available.
- The submission action can be reached.
- Background scrolling behaves according to the approved modal architecture.
- Closing the sheet restores the expected page interaction.

Do not use vague acceptance criteria such as:

- Looks good.
- Works properly.
- Feels modern.
- Is optimized.

Translate subjective requirements into observable conditions where practical.

---

---

## Core Design System Compliance

Evaluate implementation against the current Core Design System.

### Variables

- [ ] Approved variable collections are preserved.
- [ ] Existing variables are reused appropriately.
- [ ] Semantic Theme values are used correctly.
- [ ] Duplicate variables are avoided.
- [ ] Unnecessary hardcoded values are avoided.
- [ ] Primitive values remain appropriately scoped.

### Classes

- [ ] Established class responsibilities are preserved.
- [ ] B4 architecture is respected.
- [ ] Existing utilities are reused.
- [ ] Competing class systems are avoided.
- [ ] Unnecessary overrides are avoided.
- [ ] Legacy classes are not introduced without justification.

### Components

- [ ] Existing components are reused where appropriate.
- [ ] Component properties are preserved.
- [ ] Component slots are preserved.
- [ ] Existing instances remain functional.
- [ ] Component defaults remain appropriate.
- [ ] Product-specific logic remains appropriately scoped.

### Structure

- [ ] Canonical section architecture is preserved.
- [ ] Horizontal gutters remain consistent.
- [ ] Container responsibilities are preserved.
- [ ] Responsive layout utilities are used appropriately.
- [ ] Page Shell responsibilities are preserved.

Consult the Core Design System skill for complete implementation standards.

---

---

## Native-First Compliance

Evaluate whether the implementation appropriately prioritizes native Webflow functionality.

- [ ] Existing components were evaluated.
- [ ] Existing properties and slots were evaluated.
- [ ] Existing classes and variables were evaluated.
- [ ] Native Webflow capabilities were evaluated.
- [ ] Custom code has a documented justification.
- [ ] Unnecessary external dependencies are avoided.
- [ ] Native functionality is not duplicated unnecessarily.
- [ ] Approved custom code responsibilities are preserved.

### Evaluation rule

Custom code is not automatically a defect.

Unnecessary custom code, undocumented architectural duplication, and unjustified replacement of native functionality are quality concerns.

---

---

## Page Shell Verification

For projects using the approved Page Shell architecture:

- [ ] Header renders correctly.
- [ ] Footer renders correctly.
- [ ] Main Content slot contains the intended content.
- [ ] Mobile navigation renders correctly.
- [ ] Shared sheets remain available.
- [ ] Business information is available.
- [ ] Fixed interface elements do not obscure content.
- [ ] Announcement behavior works where applicable.
- [ ] Install banner behavior works where applicable.
- [ ] Shared infrastructure remains consistent across pages.

Verify the current Page Shell contract before testing.

Do not assume planned components are available.

---

---

## Visual Quality Assurance

Evaluate visual consistency and presentation.

### Typography

- [ ] Approved typography styles are used.
- [ ] Heading hierarchy is visually understandable.
- [ ] Body text remains readable.
- [ ] Text does not overflow unexpectedly.
- [ ] Line heights are appropriate.
- [ ] Typography remains consistent across pages.

### Color

- [ ] Semantic color values are used appropriately.
- [ ] Brand presentation remains consistent.
- [ ] Interactive states are distinguishable.
- [ ] Contrast is evaluated.
- [ ] Unintended color overrides are avoided.

### Spacing

- [ ] Section spacing is consistent.
- [ ] Related content is grouped appropriately.
- [ ] Layout gaps remain consistent.
- [ ] Horizontal gutters are preserved.
- [ ] Unnecessary spacing irregularities are avoided.

### Imagery

- [ ] Images render successfully.
- [ ] Aspect ratios are appropriate.
- [ ] Image cropping is appropriate.
- [ ] Images do not appear distorted.
- [ ] Meaningful imagery remains visible.
- [ ] Image containers follow Core standards.

### Components

- [ ] Comparable components remain visually consistent.
- [ ] Buttons use approved variants.
- [ ] Cards preserve established structures.
- [ ] Icons remain consistent.
- [ ] Shared navigation remains consistent.

Distinguish confirmed inconsistencies from subjective design preferences.

---

---

## Experience Quality Assurance

Evaluate the website from the customer's perspective.

- [ ] Business relevance is understandable.
- [ ] Page purposes are clear.
- [ ] Navigation is predictable.
- [ ] Services or products are discoverable.
- [ ] Important information is accessible.
- [ ] Primary actions are identifiable.
- [ ] Customer journeys are understandable.
- [ ] Unnecessary interaction friction is avoided.
- [ ] Trust information is authentic.
- [ ] Confirmation states explain relevant next steps.

Use the Experience Design skill and its audit checklist for detailed evaluation.

Do not invent usability outcomes based solely on visual inspection.

---

---

## Responsive Testing Strategy

Test relevant viewport widths and breakpoint transitions.

### Webflow breakpoint considerations

| Breakpoint | Width |
|---|---|
| Desktop | 992px and above |
| Tablet | 768px through 991px |
| Mobile Landscape | 480px through 767px |
| Mobile Portrait | 479px and below |

Inspect additional larger breakpoints when enabled.

### Recommended test widths

| Width | Purpose |
|---|---|
| 320px | Narrow viewport and reflow evaluation |
| 375px | Compact mobile layout |
| 402px | Contemporary mobile layout |
| 440px | Larger mobile layout |
| 479px | Mobile Portrait upper boundary |
| 480px | Mobile Landscape lower boundary |
| 767px | Mobile Landscape upper boundary |
| 768px | Tablet lower boundary |
| 991px | Tablet upper boundary |
| 992px | Desktop lower boundary |
| 1280px | Compact desktop layout |
| 1440px | Standard desktop design reference |
| 1920px | Large desktop layout |

These are proposed testing widths, not additional Webflow breakpoints.

The app layer starts at 767px and below. At 767px expect the app layer; at 768px and up expect the desktop header with working navigation and no bottom navigation or its spacing.

Select relevant widths according to the affected implementation.

---

---

## Responsive Layout Verification

At applicable widths:

- [ ] No unintended horizontal overflow exists.
- [ ] Content remains readable.
- [ ] Containers maintain appropriate width.
- [ ] Section spacing remains appropriate.
- [ ] Layouts stack as intended.
- [ ] Reading order remains logical.
- [ ] Images resize appropriately.
- [ ] Cards remain usable.
- [ ] Buttons remain accessible.
- [ ] Forms remain usable.
- [ ] Fixed elements do not obscure content.
- [ ] Breakpoint transitions remain consistent.

### Common responsive defects

- Unintended horizontal scrolling.
- Clipped text.
- Fixed-width elements exceeding their containers.
- Incorrect stacking order.
- Overlapping navigation.
- Inaccessible form actions.
- Distorted imagery.
- Inconsistent breakpoint inheritance.

Document the affected viewport rather than reporting a generic mobile issue.

---

---

## Browser Compatibility

Evaluate relevant browser behavior.

### Recommended browser coverage

Desktop:

- Chrome.
- Safari.
- Firefox.
- Edge.

Mobile:

- Safari on iOS.
- Chrome on Android.

Select coverage according to project requirements, available access, and affected functionality.

### Requirements

- Identify browser and version when available.
- Test relevant interactions.
- Evaluate browser-specific layout behavior.
- Evaluate browser-specific form behavior.
- Evaluate browser-specific scrolling.
- Investigate browser-specific errors.

### Verification limitation

Responsive browser simulation does not establish physical-device compatibility.

Report simulation and physical-device testing separately.

---

---

## Mobile Device Verification

Evaluate device-specific behavior where physical devices or suitable testing environments are available.

### Mobile considerations

- [ ] Touch interaction works.
- [ ] Device safe areas are respected.
- [ ] Fixed navigation remains usable.
- [ ] On-screen keyboards do not obstruct essential actions.
- [ ] Sheets remain usable within the visible viewport.
- [ ] Scrolling behaves predictably.
- [ ] Orientation changes do not break essential layouts.
- [ ] Telephone links behave appropriately.
- [ ] Native browser controls do not create unacceptable obstruction.

### iOS Safari

Pay particular attention to:

- Dynamic viewport height.
- Browser toolbar behavior.
- Safe-area insets.
- Fixed positioning.
- Modal scrolling.
- Background scroll locking.
- Form input behavior.
- Keyboard interaction.

Do not report iOS Safari verification unless appropriate testing was actually performed.

---

---

## Navigation and Link Testing

Evaluate navigation across applicable pages.

### Navigation

- [ ] Desktop navigation works.
- [ ] Mobile navigation works.
- [ ] Phones show one navigation setup: Glass Base with the bottom nav, or Glass App Menu without it.
- [ ] Call appears exactly once at phone widths.
- [ ] Phones have exactly one menu entry point.
- [ ] No empty bottom gap remains at phone widths when the bottom nav is off.
- [ ] Active states are appropriate.
- [ ] Dropdowns work where applicable.
- [ ] Internal links reach intended destinations.
- [ ] External links reach intended destinations.
- [ ] Telephone links use correct numbers.
- [ ] Email links use correct addresses.
- [ ] Direction links use correct locations.
- [ ] Navigation remains keyboard accessible.

### Base mobile navigation

For applicable Base websites, verify the approved structure:

Home | Services | Call | Our Work | Quote

Verify the established first three positions and approved client-specific destinations.

### Link integrity

Identify:

- Broken links.
- Incorrect destinations.
- Unexpected redirects.
- Placeholder links.
- Missing dynamic URLs.
- Inappropriate link behavior.

Do not treat a visually correct navigation component as functionally verified.

---

---

## Component Interaction Testing

Evaluate every affected interactive component.

### Interaction states

Where applicable:

- Default.
- Hover.
- Focus.
- Active.
- Selected.
- Expanded.
- Collapsed.
- Disabled.
- Loading.
- Success.
- Error.

### Requirements

- [ ] States communicate appropriate information.
- [ ] Controls respond as expected.
- [ ] State transitions are predictable.
- [ ] Keyboard interaction works.
- [ ] Touch interaction works.
- [ ] State changes do not depend exclusively on color.
- [ ] Repeated interaction does not introduce errors.
- [ ] Multiple component instances remain functional.
- [ ] Clickable cards, Link Blocks, and other custom clickable elements show the pointer cursor on desktop.

Test relevant states rather than assuming component reuse guarantees correct behavior.

---

---

## Native Sheet and Modal Testing

Evaluate approved native Webflow Modal-based sheets.

### Opening

- [ ] The intended trigger opens the correct sheet.
- [ ] The sheet appears within the intended viewport.
- [ ] The correct title and content are displayed.
- [ ] Focus behavior is appropriate.

### Interaction

- [ ] Sheet content remains readable.
- [ ] Long content scrolls appropriately.
- [ ] Essential controls remain accessible.
- [ ] Background interaction is appropriately restricted.
- [ ] Device safe areas are respected.
- [ ] Keyboard interaction works.
- [ ] Repeated opening does not introduce duplicate behavior.

### Closing

- [ ] The close control works.
- [ ] Escape behavior works where appropriate.
- [ ] Backdrop behavior matches the approved implementation.
- [ ] Focus returns appropriately.
- [ ] Page scrolling is restored.
- [ ] No unintended overlay remains.

### Regression considerations

- Multiple sheets.
- Repeated open and close cycles.
- Rapid taps: opening and closing quickly, or tapping the trigger twice, always ends fully open or fully closed, with focus in the right place and page scrolling restored.
- Orientation changes.
- Mobile keyboard appearance.
- Long content.
- Short content.
- Missing optional content.

Verify the current native modal contract before testing.

---

---

## CMS Quality Assurance

Evaluate structured content and dynamic presentation.

### Collection integrity

- [ ] Required collections exist.
- [ ] Required fields exist.
- [ ] Field types are appropriate.
- [ ] Reference relationships are valid.
- [ ] Required content is populated.
- [ ] Published and draft states are appropriate.

### Dynamic bindings

- [ ] Text bindings are correct.
- [ ] Image bindings are correct.
- [ ] Link bindings are correct.
- [ ] Reference bindings are correct.
- [ ] Conditional visibility works.
- [ ] Collection filters work.
- [ ] Collection sorting works.
- [ ] Collection limits are appropriate.

### Content states

Evaluate:

- Fully populated items.
- Partially populated items.
- Missing optional fields.
- Empty collections.
- Long content.
- Short content.
- Multiple collection items.

### Requirements

Missing optional content must not create broken layouts, empty labels, or misleading information.

Do not verify CMS functionality using only one ideal content example.

Apply the same test to static template sections: try a very long headline and a short one, 1 item and 10, a missing photo, and long business names.

---

---

## Business Data Verification

For projects using the documented centralized business data architecture:

- [ ] Business Settings data is available.
- [ ] Business Hours data is available.
- [ ] Required page-level `shell-data` is present.
- [ ] Business identity is accurate.
- [ ] Telephone information is accurate.
- [ ] Location information is accurate.
- [ ] Business hours are accurate.
- [ ] Social links are accurate.
- [ ] Shared components receive expected values.
- [ ] Missing-data conditions are handled appropriately.
- [ ] Business information is not unnecessarily duplicated.

### Documented collection limits

- Business Settings: one item.
- Business Hours: up to seven items.

Verify current architectural requirements before evaluating these limits.

### Cross-page verification

Confirm that business information remains consistent across representative pages.

Do not assume one successful page establishes correct configuration on every page.

---

---

## Form Testing

Test forms using authorized test information.

### Presentation

- [ ] Labels are understandable.
- [ ] Required fields are identified.
- [ ] Input types are appropriate.
- [ ] Field order is logical.
- [ ] Form controls remain accessible.

### Validation

Test applicable scenarios:

- Empty required fields.
- Invalid email addresses.
- Invalid telephone values where validation applies.
- Invalid selection states.
- Excessively long input.
- Special characters.
- Correctly completed submissions.

### Submission

- [ ] Valid submissions are accepted.
- [ ] Invalid submissions receive appropriate feedback.
- [ ] Loading behavior is understandable.
- [ ] Duplicate submission behavior is appropriate.
- [ ] Success is reported only after the relevant operation succeeds.
- [ ] Failed submissions receive meaningful feedback.
- [ ] Submitted information reaches the intended destination.

### Consent

- [ ] Required consent behavior is appropriate.
- [ ] Optional consent is not misleadingly preselected.
- [ ] Consent information reaches the intended destination where required.
- [ ] Applicable privacy information remains accessible.

Do not trigger unauthorized production communications or customer workflows during testing.

---

---

## Multi-Step Quote Testing

For approved multi-step quote experiences, verify:

- [ ] Initial service selection works.
- [ ] Relevant follow-up questions appear.
- [ ] Irrelevant questions are avoided.
- [ ] Required selections are enforced.
- [ ] Back navigation works.
- [ ] Previous answers are preserved appropriately.
- [ ] Progress indicators are accurate.
- [ ] Contact fields work.
- [ ] Consent behavior is appropriate.
- [ ] Final submission contains expected values.
- [ ] Successful submission receives confirmation.
- [ ] Failed submission provides recovery options.

### Path coverage

Test representative valid paths and relevant invalid paths.

Where conditional questions exist, evaluate each meaningful branch.

### Implementation boundary

Verify whether the documented quiz-style quote architecture is available in the current project.

Do not treat planned migration work as completed functionality.

---

---

## Integration Testing

Evaluate approved third-party integrations according to their actual responsibilities.

### Configuration

- [ ] Correct integration account is identified.
- [ ] Correct environment is identified.
- [ ] Authentication is configured appropriately.
- [ ] Required permissions are available.
- [ ] Field mappings are correct.
- [ ] Destination resources are correct.

### Functional behavior

- [ ] Expected requests are generated.
- [ ] Expected responses are received.
- [ ] Submitted values are preserved accurately.
- [ ] Required records are created or updated.
- [ ] Duplicate handling is appropriate.
- [ ] Failure behavior is understandable.
- [ ] Sensitive information remains protected.

### Failure scenarios

Where safe and practical, evaluate:

- Invalid input.
- Missing required values.
- Authentication failure.
- Service unavailability.
- Timeout.
- Duplicate requests.
- Unexpected response.

Use sandbox environments or authorized test methods where available.

Do not intentionally disrupt production integrations.

---

---

## GoHighLevel Integration Verification

For applicable lead-management implementations:

- [ ] The correct location or sub-account is identified.
- [ ] Contact creation behaves as intended.
- [ ] Field mappings are correct.
- [ ] Source information is preserved where applicable.
- [ ] Duplicate contact handling is appropriate.
- [ ] Relevant opportunity creation works.
- [ ] Approved workflow triggers operate correctly.
- [ ] Appointment behavior works where applicable.
- [ ] Consent information is preserved where required.
- [ ] Opt-out behavior is evaluated where applicable.

### Verification boundary

A successful Webflow form submission does not establish successful GoHighLevel delivery.

Verify the receiving system when access permits.

If receiving-system access is unavailable, report integration delivery as unverified.

---

---

## ShopFlow Quality Assurance

Apply these requirements only to supported ShopFlow functionality.

### Product presentation

- [ ] Product information is accurate.
- [ ] Product images are correct.
- [ ] Prices match the authoritative source.
- [ ] Availability matches the authoritative source.
- [ ] Variant selections behave correctly.

### Cart

- [ ] Products can be added where available.
- [ ] Quantities update correctly.
- [ ] Items can be removed.
- [ ] Totals reflect the expected cart state.
- [ ] Empty-cart behavior is appropriate.
- [ ] Invalid or unavailable items are handled appropriately.

### Checkout

- [ ] Checkout transitions reach the correct destination.
- [ ] Selected items are preserved.
- [ ] Relevant pricing information remains accurate.
- [ ] Failure behavior is understandable.

### Architecture

- [ ] Product-specific code remains outside universal Core.
- [ ] Privileged Shopify credentials are protected.
- [ ] Approved Storesynk integration behavior is preserved.

Do not perform real purchases without explicit authorization.

Do not assume planned functionality exists.

---

---

## DetailFlow Quality Assurance

Apply these requirements only to supported DetailFlow functionality.

### Service presentation

- [ ] Service names are accurate.
- [ ] Service scope is accurate.
- [ ] Pricing is accurate where displayed.
- [ ] Maintenance eligibility is represented correctly.
- [ ] Optional enhancements are distinguishable.

### Customer experience

- [ ] Service selection works.
- [ ] Relevant vehicle information is collected appropriately.
- [ ] Quote requests work.
- [ ] Booking behavior works where supported.
- [ ] Confirmation accurately reflects the outcome.

### Operational integration

- [ ] Approved customer records are created or updated.
- [ ] Required vehicle information is preserved.
- [ ] Appointment information reaches the intended destination.
- [ ] Communication preferences are respected.
- [ ] Customer information remains protected.

### Architecture

- [ ] Detailing-specific logic remains outside universal Core.
- [ ] Approved operational integrations are preserved.
- [ ] Known API limitations are documented.

Verify current product requirements before testing.

Do not report planned functionality as operational.

---

---

## Browser Console Verification

Inspect browser console output where access permits.

Evaluate:

- Uncaught JavaScript exceptions.
- Failed resource loading.
- Integration errors.
- Initialization errors.
- Security-related warnings.
- Content Security Policy violations where applicable.
- Missing dependency errors.
- Repeated error messages.

### Requirements

Distinguish:

- Confirmed implementation errors.
- Third-party warnings.
- Browser extension messages.
- Development-only warnings.
- Unrelated external errors.

Do not classify every console warning as a production defect.

Investigate errors according to their actual impact.

---

---

## Network Verification

Inspect relevant network behavior where appropriate.

### Evaluate

- Resource availability.
- HTTP response status.
- Failed requests.
- Redirect behavior.
- Duplicate requests.
- Dependency loading.
- Form submission requests.
- Integration requests.
- Unexpected external requests.

### Requirements

- Protect sensitive request information.
- Avoid exposing credentials.
- Distinguish expected requests from unnecessary requests.
- Verify relevant response behavior.
- Investigate failed essential resources.

Do not report integration success based solely on an HTTP success status when the business outcome remains unverified.

---

---

## Custom Code Verification

Evaluate applicable custom JavaScript and CSS.

### JavaScript

- [ ] Syntax is valid.
- [ ] Initialization behaves appropriately.
- [ ] Missing elements are handled safely.
- [ ] Repeated initialization is handled appropriately.
- [ ] Duplicate event listeners are avoided.
- [ ] Error handling is appropriate.
- [ ] Existing functionality is preserved.
- [ ] Privileged credentials are not exposed.

### CSS

- [ ] Existing variables are reused.
- [ ] Selector responsibilities are appropriate.
- [ ] Unnecessary overrides are avoided.
- [ ] Responsive behavior is preserved.
- [ ] Native styling is not unnecessarily duplicated.
- [ ] Approved exceptions are documented.

### Architecture

- [ ] Universal Core remains product-neutral.
- [ ] Product-specific code remains appropriately scoped.
- [ ] Source and distribution files remain consistent.
- [ ] Applicable version declarations remain consistent.

---

---

## GitHub Repository Validation

Before approving repository changes:

- [ ] Correct repository identified.
- [ ] Correct branch identified.
- [ ] Relevant changes inspected.
- [ ] Unrelated changes identified.
- [ ] Applicable documentation reviewed.
- [ ] Build requirements evaluated.
- [ ] Validation requirements evaluated.
- [ ] Distribution files evaluated where applicable.
- [ ] Regression risks evaluated.

### Mayes Core validation

Consult the current `check.sh` implementation.

Previously documented validation areas include:

- JavaScript syntax.
- Source and distribution consistency.
- Product neutrality.
- Version declarations.

Do not assume the script's current behavior without inspecting it.

### Reporting

Report the actual commands executed and their outcomes when applicable.

Do not report repository checks as passed unless they were executed successfully.

---

---

## Dependency and Release Verification

Evaluate shared Core dependencies.

- [ ] Current deployed version is identified.
- [ ] Approved target version is identified.
- [ ] CSS and JavaScript versions are consistent.
- [ ] Production dependencies use approved release tags.
- [ ] Production dependencies do not load directly from `@main`.
- [ ] Required distribution files are available.
- [ ] Dependencies load successfully.
- [ ] Compatibility requirements are evaluated.
- [ ] Migration requirements are evaluated.
- [ ] Rollback options are identified.

### Release documentation

Review the applicable release notes before approving an upgrade.

Do not assume the newest release is automatically appropriate for every client project.

---

---

## Security Verification

Evaluate applicable security requirements.

### Credentials

- [ ] Privileged credentials are not exposed in client-side code.
- [ ] Private tokens are not exposed in public repositories.
- [ ] Sensitive configuration is appropriately protected.
- [ ] Integration permissions are appropriate.

### Data handling

- [ ] Customer information is collected appropriately.
- [ ] Unnecessary sensitive information is avoided.
- [ ] Sensitive information is not unnecessarily logged.
- [ ] Submitted information reaches approved destinations.
- [ ] External data is handled appropriately.

### Website security

- [ ] HTTPS behavior is appropriate.
- [ ] Mixed-content issues are evaluated.
- [ ] Unsafe handling of untrusted input is evaluated.
- [ ] Relevant external dependencies are reviewed.

### Scope limitation

This checklist is not a substitute for a comprehensive penetration test or formal security assessment.

Do not claim that a website is completely secure.

---

---

## Privacy and Consent Verification

Evaluate approved privacy and consent behavior.

- [ ] Applicable privacy information is accessible.
- [ ] Cookie preferences are accessible where required.
- [ ] Optional tracking behavior reflects applicable preferences.
- [ ] Preference changes behave appropriately.
- [ ] Optional marketing consent is not misleadingly preselected.
- [ ] Consent information is preserved where required.
- [ ] Customer information reaches approved destinations.
- [ ] Applicable opt-out behavior is evaluated.
- [ ] Unnecessary personal information collection is avoided.

### Verification boundary

Technical verification does not establish complete legal compliance.

Identify unresolved legal, regulatory, or contractual requirements.

---

---

## Content Quality Assurance

Evaluate website content for accuracy and completeness.

### Business information

- [ ] Business name is accurate.
- [ ] Telephone information is accurate.
- [ ] Address or service area is accurate.
- [ ] Business hours are accurate.
- [ ] Service information is accurate.
- [ ] Pricing is accurate where displayed.

### Presentation

- [ ] Placeholder content is removed.
- [ ] Obvious spelling errors are addressed.
- [ ] Grammar is appropriate.
- [ ] Headings are meaningful.
- [ ] CTA labels are accurate.
- [ ] Images support the intended content.

### Credibility

- [ ] Reviews are authentic.
- [ ] Project evidence is authentic.
- [ ] Claims are supportable.
- [ ] Qualifications are verified.
- [ ] Guarantees reflect actual business commitments.

Do not mark unverified business claims as accurate.

---

---

## Organic Visibility Verification

Coordinate strategy with the Organic Visibility skill.

### Metadata

- [ ] Important pages have appropriate titles.
- [ ] Meta descriptions are appropriate.
- [ ] Dynamic CMS metadata behaves correctly.
- [ ] Open Graph metadata is appropriate.
- [ ] Social sharing imagery is appropriate where configured.

### Discoverability

- [ ] Intended public pages are accessible.
- [ ] Indexing directives reflect approved intent.
- [ ] Robots configuration is appropriate.
- [ ] XML sitemap is accessible.
- [ ] Canonical URLs are appropriate.
- [ ] Redirects work.
- [ ] Important internal links work.

### Structured data

- [ ] Applicable markup is valid.
- [ ] Business information is accurate.
- [ ] Markup reflects visible content.
- [ ] Duplicate or contradictory entities are avoided.
- [ ] Existing Core structured-data architecture is preserved.

### Important distinction

Technical SEO verification does not establish guaranteed indexing, rankings, or rich-result eligibility.

---

---

## Structured Data Testing

Evaluate structured data using appropriate inspection and validation methods.

Potential tools:

- Schema Markup Validator.
- Google Rich Results Test.
- Browser source inspection.
- Rendered DOM inspection.

### Requirements

- Verify actual generated markup.
- Verify relevant entity types.
- Verify required properties where applicable.
- Verify business information.
- Verify canonical relationships.
- Identify duplicate entities.
- Identify contradictory values.
- Evaluate current rich-result eligibility.

### Core boundary

Inspect existing Core-generated business structured data before recommending additional page-level JSON-LD.

Valid Schema.org markup does not automatically qualify for Google rich results.

---

---

## Analytics and Conversion Verification

Where approved analytics are configured:

- [ ] Correct analytics property is identified.
- [ ] Expected page activity is recorded.
- [ ] Relevant conversion events are recorded.
- [ ] Duplicate event tracking is avoided.
- [ ] Consent behavior is respected.
- [ ] Relevant source information is preserved where available.
- [ ] Unnecessary personal information is not transmitted.

### Conversion verification

Distinguish:

- Button click.
- Form submission.
- Successful integration delivery.
- Qualified inquiry.
- Appointment.
- Completed transaction.

Do not treat these events as interchangeable.

A recorded conversion event does not necessarily establish a completed business outcome.

---

---

## Regression Testing

Regression testing verifies that existing functionality remains operational after a change.

### Trigger conditions

Perform relevant regression testing after:

- Shared component changes.
- Core variable changes.
- Global class changes.
- Page Shell changes.
- Native modal changes.
- CMS architecture changes.
- Integration changes.
- Custom code changes.
- Dependency upgrades.
- Release migrations.

### Regression scope

Evaluate:

- Directly affected functionality.
- Dependent components.
- Representative pages.
- Related customer journeys.
- Applicable product implementations.
- Relevant responsive behavior.

### Requirements

Do not limit testing to the newly implemented functionality when shared resources have changed.

---

---

## Shared Core Regression Matrix

Use this matrix to identify likely regression areas.

| Changed resource | Evaluate |
|---|---|
| Core typography variables | Headings, body text, buttons, forms |
| Theme variables | Surfaces, text, controls, contrast |
| Spacing variables | Sections, cards, layouts, sheets |
| Layout utilities | Grids, rows, columns, stacking |
| Page Shell | Header, footer, navigation, shared data |
| Image components | Cards, hero imagery, portfolios |
| Button components | CTAs, forms, navigation actions |
| Native sheet architecture | Opening, closing, scrolling, focus |
| Business data modules | Contact information, hours, structured data |
| Consent modules | Preferences, tracking, persistence |
| Motion behavior | Visibility, interaction, reduced motion |
| Core dependency version | All affected shared functionality |

This matrix is a starting point.

Inspect actual dependencies before determining regression coverage.

---
