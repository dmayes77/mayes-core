---
name: quality-assurance
description: Evaluates and verifies Mayes Digital websites through structured quality assurance, functional testing, accessibility evaluation, responsive testing, performance measurement, Core Design System compliance, CMS validation, integration testing, organic visibility verification, regression testing, and production release readiness. Use when auditing websites, reviewing implementations, testing functionality, investigating defects, validating changes, evaluating release readiness, or verifying production deployments.
---

# Mayes Digital Quality Assurance

## 1. Purpose

Establish a consistent quality assurance framework for Mayes Digital websites, shared infrastructure, reusable components, and digital products.

Quality Assurance ensures that implementations satisfy approved requirements, preserve established architecture, and provide reliable customer experiences.

Quality must be evaluated throughout development rather than treated as a final inspection performed immediately before publishing.

**Core principle: Implementation is not completion. Verification establishes completion.**

---

## 2. When to Use This Skill

Activate this skill when:

- Reviewing completed development work.
- Auditing existing websites.
- Testing new pages.
- Validating reusable components.
- Evaluating responsive behavior.
- Testing customer journeys.
- Evaluating accessibility.
- Measuring website performance.
- Validating CMS relationships.
- Testing forms and integrations.
- Investigating reported defects.
- Reviewing custom code.
- Evaluating Core releases.
- Performing regression testing.
- Preparing production deployments.
- Verifying published websites.

Quality Assurance may be activated independently or alongside any other Mayes Digital skill.

---

## 3. Quality Philosophy

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

## 4. Quality Framework

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

## 5. Source of Truth

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

## 6. Quality Assurance Independence

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

## 7. Testing Scope

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

## 8. Testing Environments

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

## 9. Evidence Standards

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

## 10. Test Status Definitions

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

## 11. Acceptance Criteria

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

## 12. Core Design System Compliance

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

## 13. Native-First Compliance

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

## 14. Page Shell Verification

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

## 15. Visual Quality Assurance

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

## 16. Experience Quality Assurance

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

## 17. Responsive Testing Strategy

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

Select relevant widths according to the affected implementation.

---

## 18. Responsive Layout Verification

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

## 19. Browser Compatibility

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

## 20. Mobile Device Verification

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

## 21. Navigation and Link Testing

Evaluate navigation across applicable pages.

### Navigation

- [ ] Desktop navigation works.
- [ ] Mobile navigation works.
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

## 22. Component Interaction Testing

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

Test relevant states rather than assuming component reuse guarantees correct behavior.

---

## 23. Native Sheet and Modal Testing

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
- Orientation changes.
- Mobile keyboard appearance.
- Long content.
- Short content.
- Missing optional content.

Verify the current native modal contract before testing.

---

## 24. CMS Quality Assurance

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

---

## 25. Business Data Verification

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

## 26. Form Testing

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

## 27. Multi-Step Quote Testing

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

## 28. Integration Testing

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

## 29. GoHighLevel Integration Verification

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

## 30. ShopFlow Quality Assurance

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

## 31. DetailFlow Quality Assurance

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

## 32. Accessibility Standard

Use WCAG 2.2 Level AA as the proposed Mayes Digital evaluation baseline unless another applicable requirement is established.

Authoritative reference:

https://www.w3.org/TR/WCAG22/

### Accessibility evaluation

Evaluate the four foundational principles:

- Perceivable.
- Operable.
- Understandable.
- Robust.

### Requirements

Use a combination of:

- Automated accessibility evaluation.
- Manual inspection.
- Keyboard testing.
- Contrast measurement.
- Responsive reflow testing.
- Assistive technology testing where available.

Automated testing alone does not establish WCAG conformance.

Do not claim full accessibility compliance unless the scope and evidence support that conclusion.

---

## 33. Semantic Accessibility Testing

Evaluate meaningful document structure.

- [ ] Page titles are descriptive.
- [ ] Page language is defined appropriately.
- [ ] Headings communicate content relationships.
- [ ] Landmarks are appropriate.
- [ ] Lists use appropriate semantics.
- [ ] Links communicate their purpose.
- [ ] Buttons represent actions appropriately.
- [ ] Form controls have accessible names.
- [ ] Meaningful images have appropriate text alternatives.
- [ ] Decorative images are handled appropriately.
- [ ] Dynamic states are communicated appropriately.

Prefer native semantic elements over unnecessary custom ARIA implementations.

ARIA must not be used to conceal incorrect underlying functionality.

---

## 34. Keyboard Accessibility Testing

Evaluate essential functionality without a pointer device.

- [ ] Interactive elements are reachable.
- [ ] Tab order is logical.
- [ ] Focus indicators are visible.
- [ ] Focus is not obscured by fixed content.
- [ ] Links activate appropriately.
- [ ] Buttons activate appropriately.
- [ ] Form controls remain usable.
- [ ] Expandable content remains operable.
- [ ] Modals remain operable.
- [ ] Keyboard traps are avoided.
- [ ] Focus restoration behaves appropriately.
- [ ] Relevant navigation bypass mechanisms are available.

### Modal considerations

Evaluate focus entry, focus containment where appropriate, closing behavior, and focus restoration.

Do not assume native modal functionality automatically satisfies every applicable accessibility requirement.

---

## 35. Color Contrast Testing

Measure applicable color combinations.

### Selected WCAG thresholds

| Content type | Minimum contrast |
|---|---|
| Normal text | 4.5:1 |
| Large text | 3:1 |
| Applicable non-text visual information | 3:1 |

Apply the definitions and exceptions established by the relevant WCAG success criteria.

### Evaluate

- Body text.
- Headings.
- Button labels.
- Form labels.
- Placeholder text where applicable.
- Navigation.
- Interactive states.
- Meaningful icons.
- Error messages.
- Text over imagery.
- Focus indicators according to applicable criteria.

Do not estimate contrast ratios from appearance alone.

Use appropriate measurement methods.

---

## 36. Touch Target Testing

Evaluate interactive target size and spacing.

### Practical design target

Approximately 44 × 44 CSS pixels for important touch controls where practical.

### WCAG 2.2 Level AA

The applicable Target Size Minimum criterion establishes a 24 × 24 CSS pixel requirement with defined exceptions.

### Evaluate

- Navigation items.
- Buttons.
- Icon controls.
- Close controls.
- Form controls.
- Expandable content controls.
- Cart controls where applicable.
- Interactive card elements.

Do not incorrectly report the practical 44-pixel target as a universal Level AA requirement.

---

## 37. Text Resizing and Reflow

Evaluate applicable accessibility requirements for resized content.

### Text resizing

- [ ] Text remains usable when resized to 200% under applicable criteria.
- [ ] Important information remains available.
- [ ] Interactive controls remain accessible.
- [ ] Text does not become unintentionally clipped.

### Reflow

Evaluate applicable reflow behavior at a width equivalent to 320 CSS pixels.

- [ ] Content remains readable.
- [ ] Essential functionality remains available.
- [ ] Unnecessary two-dimensional scrolling is avoided.
- [ ] Applicable exceptions are identified.

### Requirements

Distinguish accessibility reflow testing from ordinary responsive breakpoint inspection.

---

## 38. Reduced Motion Testing

Evaluate behavior when reduced-motion preferences are enabled.

- [ ] Nonessential animation is appropriately reduced.
- [ ] Essential content remains visible.
- [ ] Interactions remain understandable.
- [ ] Functionality remains available.
- [ ] Motion does not create unnecessary delay.
- [ ] Approved Core reduced-motion behavior is preserved.

Do not disable essential functionality merely to remove animation.

---

## 39. Performance Quality Assurance

Evaluate performance using appropriate measurements.

### Core Web Vitals

| Metric | Good | Needs improvement | Poor |
|---|---|---|---|
| LCP | 2.5s or less | Above 2.5s through 4s | Above 4s |
| INP | 200ms or less | Above 200ms through 500ms | Above 500ms |
| CLS | 0.1 or less | Above 0.1 through 0.25 | Above 0.25 |

Verify current official metric definitions and thresholds before formal reporting.

### Field data

Evaluate applicable real-user data at the 75th percentile.

### Laboratory data

Use controlled measurements to identify potential performance problems.

Distinguish laboratory measurements from real-user field measurements.

Do not substitute Total Blocking Time for a measured INP result.

---

## 40. Performance Testing Tools

Use available appropriate tools.

Potential tools include:

- Google PageSpeed Insights.
- Lighthouse.
- Chrome DevTools.
- Chrome UX Report.
- Browser network inspection.
- WebPageTest.
- Search Console Core Web Vitals reporting.

### Requirements

Record:

- Tested URL.
- Test date.
- Test environment.
- Device configuration.
- Network conditions where available.
- Available field data.
- Available laboratory data.

### Limitations

Synthetic performance scores can vary between runs.

A single Lighthouse result does not establish consistent real-world performance.

Do not fabricate scores when testing tools are unavailable.

---

## 41. Performance Inspection Checklist

### Resources

- [ ] Unnecessary scripts are avoided.
- [ ] Duplicate dependencies are avoided.
- [ ] Resource loading is appropriate.
- [ ] Third-party dependencies are justified.
- [ ] Render-blocking resources are evaluated.

### Images

- [ ] Image dimensions are appropriate.
- [ ] File sizes are appropriate.
- [ ] Critical imagery loads appropriately.
- [ ] Noncritical imagery uses appropriate loading behavior.
- [ ] Image containers prevent avoidable layout shifts.

### Layout

- [ ] Layout remains stable.
- [ ] Fixed interface elements do not create unexpected shifts.
- [ ] Dynamic content behaves predictably.
- [ ] Unnecessary DOM complexity is avoided.

### Interaction

- [ ] Important controls respond appropriately.
- [ ] Loading feedback is available where necessary.
- [ ] Animations do not unnecessarily delay interaction.
- [ ] Long-running operations are evaluated.

Prioritize meaningful customer experience over arbitrary perfect performance scores.

---

## 42. Browser Console Verification

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

## 43. Network Verification

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

## 44. Custom Code Verification

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

## 45. GitHub Repository Validation

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

## 46. Dependency and Release Verification

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

## 47. Security Verification

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

## 48. Privacy and Consent Verification

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

## 49. Content Quality Assurance

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

## 50. Organic Visibility Verification

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

## 51. Structured Data Testing

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

## 52. Analytics and Conversion Verification

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

## 53. Regression Testing

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

## 54. Shared Core Regression Matrix

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

## 55. Defect Classification

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

## 56. Defect Severity

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

## 57. Remediation Priority

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

## 58. Defect Reporting Format

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

## 59. Worked Defect Example

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

## 60. Defect Resolution Workflow

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

## 61. Release Readiness Gates

Evaluate production readiness through six proposed quality gates.

### Gate 1: Architecture

- [ ] Approved Core architecture is preserved.
- [ ] Existing resources are reused appropriately.
- [ ] Custom code is justified.
- [ ] Product boundaries are preserved.

### Gate 2: Functionality

- [ ] Essential customer journeys work.
- [ ] Navigation works.
- [ ] Forms work.
- [ ] Required integrations are verified.
- [ ] No unresolved critical functional defects remain.

### Gate 3: Experience and Accessibility

- [ ] Relevant responsive behavior is verified.
- [ ] Important usability requirements are satisfied.
- [ ] Applicable accessibility requirements are evaluated.
- [ ] Significant accessibility findings are addressed or appropriately escalated.

### Gate 4: Performance and Discoverability

- [ ] Relevant performance behavior is evaluated.
- [ ] Essential resources load.
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

## 62. Release Blockers

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

## 63. Release Readiness Classification

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

## 64. Pre-Publish Checklist

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

## 65. Post-Publish Verification

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

## 66. Rollback Verification

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

## 67. Quality Assurance Report

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

## 68. Quality Metrics

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

## 69. Continuous Quality Improvement

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

## 70. Cross-Skill Coordination

### Experience Design

Quality Assurance verifies:

- Customer journeys.
- Usability.
- Interaction clarity.
- Visual hierarchy.
- Conversion experience.

### Core Design System

Quality Assurance verifies:

- Variables.
- Classes.
- Components.
- Structural architecture.
- Responsive consistency.

### Webflow Development

Quality Assurance verifies:

- Functional implementation.
- CMS configuration.
- Custom code.
- Integrations.
- Dependencies.
- Deployment behavior.

### Organic Visibility

Quality Assurance verifies:

- Metadata.
- Indexing-related configuration.
- Structured data.
- Internal links.
- Conversion tracking where applicable.

### Quality Assurance

Owns:

- Evidence standards.
- Test status.
- Defect classification.
- Severity.
- Regression evaluation.
- Release readiness.
- Verification reporting.

Quality Assurance evaluates outcomes without replacing the implementation responsibilities of the other skills.

---

## 71. Quality Assurance Completion Criteria

A quality assurance task is complete when:

- [ ] The requested scope is understood.
- [ ] Applicable acceptance criteria are identified.
- [ ] Available evidence is evaluated.
- [ ] Relevant tests are performed.
- [ ] Test outcomes are accurately recorded.
- [ ] Confirmed defects are documented.
- [ ] Concerns are distinguished from confirmed defects.
- [ ] Findings are appropriately prioritized.
- [ ] Relevant regression risks are evaluated.
- [ ] Verification limitations are disclosed.
- [ ] Release readiness is accurately classified when applicable.
- [ ] Appropriate next steps are identified.

A completed audit does not establish that every requirement passed.

It establishes that the defined scope was evaluated and accurately reported.

---

## 72. Prohibited Quality Assurance Practices

Do not:

- Fabricate test results.
- Invent performance measurements.
- Invent accessibility findings.
- Report untested functionality as verified.
- Treat native functionality as automatically compliant.
- Treat visual inspection as complete functional testing.
- Treat browser simulation as physical-device testing.
- Ignore shared component regressions.
- Conceal unresolved defects.
- Inflate defect severity.
- Assign arbitrary quality scores.
- Claim complete security without sufficient evidence.
- Claim accessibility conformance without sufficient evidence.
- Claim successful integration delivery without verification.
- Treat planned functionality as implemented.
- Recommend release with undisclosed critical defects.
- Publish without authorization.
- Declare completion before required verification.

---

## Operating Standard

**Requirements before implementation.**

**Inspection before assumptions.**

**Evidence before conclusions.**

**Functionality before visual polish.**

**Accessibility before convenience.**

**Customer impact before arbitrary scores.**

**Regression testing before release.**

**Authorization before publishing.**

**Production verification before deployment completion.**

**Quality is not what we intended to build. Quality is what we can demonstrate works.**