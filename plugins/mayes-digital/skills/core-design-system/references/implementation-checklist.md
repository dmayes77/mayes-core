# Mayes Digital Core Design System 2.0
## Implementation Checklist

### Purpose

Establish a consistent implementation and validation process for creating, modifying, and maintaining Mayes Digital Webflow websites.

This checklist applies to new websites, individual pages, reusable components, design system modifications, responsive improvements, and existing website audits.

**Core principle: Inspect before implementing. Reuse before creating. Validate before completing.**

---

## 1. Source of Truth

Primary repository: `dmayes77/mayes-core`

Consult the latest applicable documentation:

- `docs/ARCHITECTURE.md`
- `docs/DECISIONS.md`
- `docs/NATIVE_FIRST.md`
- `docs/spec/Core_Design_System_2.0_Implementation_Addendum_2026-09-20.md`
- `base/README.md`

Supporting skill references:

- `design-tokens.md`
- `class-architecture.md`
- `component-standards.md`
- `responsive-design.md`

Repository documentation establishes architectural intent.

The current Webflow implementation establishes actual implementation status.

Do not assume documented functionality is deployed.

Identify discrepancies between documentation and implementation before making architectural changes.

---

## 2. Implementation Lifecycle

Every implementation task should follow this sequence:

1. Discover
2. Inspect
3. Plan
4. Reuse
5. Implement
6. Validate
7. Document

Apply the checklist proportionally to the scope of the task.

A minor typography correction does not require a complete website audit. However, changes to shared components require broader validation.

Do not introduce unnecessary process or complexity.

---

## 3. Phase One: Discovery

### Project identification

- [ ] Identify the Webflow project.
- [ ] Identify the affected page or component.
- [ ] Determine whether the project is Core, Base, ShopFlow, DetailFlow, or a client deployment.
- [ ] Understand the requested outcome.
- [ ] Identify the business objective.
- [ ] Determine the intended customer action.
- [ ] Establish the authorized scope of work.

### Architectural context

- [ ] Review applicable Core documentation.
- [ ] Identify relevant architectural decisions.
- [ ] Determine whether the request conflicts with an existing standard.
- [ ] Identify applicable product-specific requirements.
- [ ] Distinguish existing functionality from planned functionality.

### Access and capabilities

- [ ] Confirm access to the relevant Webflow project.
- [ ] Identify available implementation tools.
- [ ] Determine which changes can be performed through available tools.
- [ ] Identify any required manual Designer actions.
- [ ] Disclose limitations before claiming implementation.

### Completion criteria

Discovery is complete when the requested outcome, affected project, applicable standards, and authorized scope are understood.

---

## 4. Phase Two: Existing Implementation Inspection

Before creating or modifying anything, inspect the existing implementation.

### Design variables

- [ ] Inspect the Core collection.
- [ ] Inspect the Theme collection.
- [ ] Inspect the Surface collection.
- [ ] Inspect the Motion collection.
- [ ] Inspect the Primitives collection.
- [ ] Identify existing variables that satisfy the requirement.
- [ ] Identify applicable responsive modes.

### Classes

- [ ] Inspect existing structural classes.
- [ ] Inspect layout utilities.
- [ ] Inspect surface utilities.
- [ ] Inspect responsive modifiers.
- [ ] Inspect component-specific classes.
- [ ] Inspect existing state classes.
- [ ] Identify potential duplication.

### Components

- [ ] Inspect the existing component library.
- [ ] Identify reusable components.
- [ ] Review component properties.
- [ ] Review component slots.
- [ ] Identify available variants.
- [ ] Identify shared component dependencies.

### CMS

- [ ] Inspect relevant collections.
- [ ] Review existing field contracts.
- [ ] Identify current CMS bindings.
- [ ] Identify business data dependencies.
- [ ] Determine whether required content already exists.

### Completion criteria

Inspection is complete when existing resources have been evaluated and opportunities for reuse have been identified.

---

## 5. Phase Three: Implementation Planning

### Scope

- [ ] Define the smallest change that satisfies the requirement.
- [ ] Identify affected components.
- [ ] Identify affected pages.
- [ ] Identify affected classes and variables.
- [ ] Identify CMS dependencies.
- [ ] Identify responsive implications.
- [ ] Identify accessibility implications.

### Architecture

- [ ] Determine whether the change belongs in Core.
- [ ] Determine whether the change belongs in a product.
- [ ] Determine whether the change is client-specific.
- [ ] Preserve established architectural boundaries.
- [ ] Avoid unnecessary changes to shared infrastructure.

### Implementation method

Evaluate implementation options in the following order:

1. Existing Webflow component.
2. Existing component property or slot.
3. Existing component variant.
4. Existing Webflow class or variable.
5. Native Webflow functionality.
6. New reusable component or utility.
7. Custom code when necessary.

Choose the simplest option that satisfies the requirement without compromising usability, accessibility, or maintainability.

### Completion criteria

Planning is complete when the implementation approach, affected dependencies, and validation requirements are understood.

---

## 6. Native-First Validation

Before introducing custom code:

- [ ] Determine whether Webflow supports the required functionality natively.
- [ ] Evaluate Webflow Designer capabilities.
- [ ] Evaluate Webflow Components.
- [ ] Evaluate Webflow Variables.
- [ ] Evaluate Webflow CMS.
- [ ] Evaluate Webflow Interactions.
- [ ] Evaluate native Webflow Modals.
- [ ] Evaluate native form functionality.
- [ ] Evaluate native scrolling and layout capabilities.

If custom code is necessary, document:

- The required functionality.
- The native capability evaluated.
- The limitation preventing native implementation.
- The proposed custom solution.
- The maintenance implications.
- The required testing.

Do not recreate native functionality simply because custom code is familiar or convenient.

---

## 7. Phase Four: Design Token Implementation

Consult `design-tokens.md`.

### Variable usage

- [ ] Existing variables are reused wherever appropriate.
- [ ] Variables belong to the correct collection.
- [ ] Semantic naming is preserved.
- [ ] Existing primitive relationships are maintained.
- [ ] Responsive variable behavior is preserved.
- [ ] Hardcoded values are avoided where suitable variables exist.
- [ ] Duplicate variables are not introduced.

### Typography

- [ ] Existing typography scales are used.
- [ ] Heading hierarchy is maintained.
- [ ] Line heights remain appropriate.
- [ ] Typography remains readable across breakpoints.

### Color

- [ ] Existing semantic color variables are used.
- [ ] Brand and neutral colors remain distinct.
- [ ] Foreground and background combinations are accessible.
- [ ] Deprecated color naming conventions are not reintroduced.

### Spacing

- [ ] Existing spacing scales are used.
- [ ] Section spacing follows established architecture.
- [ ] Layout gaps are used appropriately.
- [ ] Horizontal gutters remain consistent.

### Motion and surfaces

- [ ] Existing motion variables are reused.
- [ ] Existing radius and border values are reused.
- [ ] Surface responsibilities remain separate.
- [ ] Motion supports usability.

---

## 8. Phase Five: Class Architecture Implementation

Consult `class-architecture.md`.

### Canonical section structure

Verify that applicable sections follow:

```text
section-small | section-medium | section-large
    └── padding-global
        └── container-*
            └── section-content
                + layout modifiers
                + gap-*
                    └── content
```

### Structural validation

- [ ] Section classes control vertical spacing.
- [ ] `padding-global` controls horizontal gutters.
- [ ] Container classes control maximum width.
- [ ] Layout utilities control arrangement.
- [ ] Surface utilities control appearance.
- [ ] Radius utilities control corner rounding.
- [ ] Shadow utilities control elevation.

### B4 validation

Evaluate class responsibilities according to:

- Base
- Surface
- Modifier
- Decoration

- [ ] Each class has an identifiable responsibility.
- [ ] Structural and presentational responsibilities remain appropriately separated.
- [ ] Existing modifiers are reused.
- [ ] Decorative classes do not control essential layout.
- [ ] Competing naming systems are avoided.

### Duplication prevention

- [ ] Existing classes were inspected before creating new classes.
- [ ] Duplicate layout utilities were avoided.
- [ ] Duplicate spacing utilities were avoided.
- [ ] Duplicate surface utilities were avoided.
- [ ] New classes have a justified purpose.

Do not delete existing classes without verifying their usage.

---

## 9. Phase Six: Component Implementation

Consult `component-standards.md`.

### Component reuse

- [ ] Existing components were evaluated.
- [ ] Existing properties were evaluated.
- [ ] Existing slots were evaluated.
- [ ] Existing variants were evaluated.
- [ ] New components are justified.

### Shared components

- [ ] Page Shell architecture is preserved.
- [ ] Header architecture is preserved.
- [ ] Footer architecture is preserved.
- [ ] Mobile navigation architecture is preserved.
- [ ] Native sheet architecture is preserved.
- [ ] Shared button architecture is preserved.
- [ ] Existing card patterns are reused.

### Component properties

- [ ] Property names remain consistent.
- [ ] Existing property contracts are preserved.
- [ ] Default values are appropriate.
- [ ] Visibility controls function correctly.
- [ ] Unnecessary properties are avoided.

### Component slots

- [ ] Slots provide meaningful flexibility.
- [ ] Existing slot relationships are preserved.
- [ ] Content remains appropriately scoped.
- [ ] Slots are not introduced unnecessarily.

### Shared component impact

Before modifying a shared component:

- [ ] Identify affected instances.
- [ ] Identify affected pages.
- [ ] Identify product or client dependencies.
- [ ] Determine whether the change should apply globally.
- [ ] Establish regression testing requirements.

---

## 10. Image Implementation

### Image structure

- [ ] Every image sits in a media wrapper.
- [ ] Images fill the wrapper (`card-image`) and have alt text.
- [ ] Parent layouts control available width.
- [ ] Wrappers control aspect ratio.
- [ ] Images control cropping.

### Supported wrappers

- `media-4x3` (default)
- `media-3x4` (portrait)
- `media-16x9`
- `media-1x1`

### House rules

- [ ] Every button sits in a `button-group`, and no empty group is visible.
- [ ] `container-xlarge` is used on desktop unless the content calls for another width.
- [ ] No 4:5 or other unapproved ratios were added.
- [ ] Existing radius treatments are reused.
- [ ] The app layer starts at 767px; tablets show the desktop header with working navigation.

### Hero imagery

- [ ] Established hero image architecture is preserved.
- [ ] Hero content remains readable.
- [ ] Image positioning is appropriate.
- [ ] Responsive cropping is verified.
- [ ] Important visual subjects remain visible.

### Accessibility and performance

- [ ] Meaningful images have appropriate alternative text.
- [ ] Decorative images are handled appropriately.
- [ ] Image dimensions are appropriate.
- [ ] Unnecessary image loading is avoided.
- [ ] Images do not introduce avoidable layout shifts.

---

## 11. CMS and Business Data Implementation

### CMS architecture

- [ ] Existing collections are reused.
- [ ] Existing field contracts are preserved.
- [ ] CMS bindings remain intact.
- [ ] Duplicate fields are avoided.
- [ ] Business information is not unnecessarily hardcoded.

### Business data layer

Where applicable:

- [ ] The `shell-data` structure is preserved.
- [ ] Business Settings data is available.
- [ ] Business Hours data is available.
- [ ] Required data attributes remain intact.
- [ ] Core Business receives the expected data.
- [ ] Missing-data warnings are investigated.

### New pages

- [ ] The established Page Template is evaluated.
- [ ] Page Shell is present.
- [ ] Main Content slot is used appropriately.
- [ ] Required business data bindings are present.
- [ ] Shared components are not duplicated.

### Content integrity

- [ ] Business information is accurate.
- [ ] Service information is accurate.
- [ ] Reviews are authentic.
- [ ] Missing content is handled appropriately.
- [ ] Placeholder content is not presented as verified business information.

---

## 12. Responsive Implementation

Consult `responsive-design.md`.

### Layout

- [ ] Existing responsive variables are reused.
- [ ] Existing responsive modifiers are reused.
- [ ] Layouts adapt to available space.
- [ ] Content stacks logically.
- [ ] No unintended horizontal overflow exists.
- [ ] Important content remains accessible.

### Mobile navigation

For projects using the standard Base mobile architecture:

- [ ] Flush top navigation is preserved.
- [ ] Flush bottom navigation is preserved.
- [ ] Home remains in its established position.
- [ ] Services remains in its established position.
- [ ] Call remains the central action.
- [ ] Remaining navigation positions match business requirements.
- [ ] Active states function correctly.
- [ ] Fixed navigation does not obscure content.

For projects using the top nav only option:

- [ ] Navigation / Glass uses the App Menu variant.
- [ ] The bottom navigation is turned off.
- [ ] Page Shell leaves no empty bottom gap at phone widths.
- [ ] The Menu button opens Sheet / Menu as a bottom sheet.

For every project:

- [ ] The site uses one phone navigation setup, never both.
- [ ] Call appears exactly once on phones.

Do not impose Base website navigation requirements on product-specific experiences when approved product architecture differs.

### Device safe areas

- [ ] Header safe areas are respected.
- [ ] Bottom navigation safe areas are respected.
- [ ] Sheet safe areas are respected.
- [ ] Primary actions remain reachable.
- [ ] Content remains accessible around fixed elements.

### Typography and imagery

- [ ] Text remains readable.
- [ ] Headings wrap appropriately.
- [ ] Images scale correctly.
- [ ] Important image subjects remain visible.
- [ ] Content is not clipped.

### Touch interactions

- [ ] Touch targets are appropriately sized.
- [ ] Adjacent controls have adequate spacing.
- [ ] Essential interactions do not depend on hover.
- [ ] Interactive feedback remains visible.

---

## 13. Native Sheet Validation

For tasks affecting native sheets:

- [ ] Native Webflow Modals are used where applicable.
- [ ] Established sheet components are reused.
- [ ] Sheet identifiers remain consistent.
- [ ] Opening mechanisms function correctly.
- [ ] Closing mechanisms function correctly.
- [ ] Background interaction is appropriately restricted.
- [ ] Scroll behavior functions correctly.
- [ ] Keyboard interaction is supported.
- [ ] Focus behavior is verified.
- [ ] Safe-area behavior is preserved.
- [ ] Footer actions remain accessible.
- [ ] The retired custom sheet engine is not unnecessarily reintroduced.

Do not assume that native modal functionality automatically guarantees accessibility.

---

## 14. Accessibility Validation

Use WCAG 2.2 Level AA as the proposed baseline for accessibility evaluation unless a project establishes a different applicable requirement.

Detailed conformance testing belongs to the Quality Assurance skill.

### Content structure

- [ ] Heading hierarchy is logical.
- [ ] Content order is meaningful.
- [ ] Semantic elements are used appropriately.
- [ ] Links have understandable purposes.

### Visual accessibility

- [ ] Normal text meets applicable contrast requirements.
- [ ] Large text meets applicable contrast requirements.
- [ ] Interactive controls remain distinguishable.
- [ ] Information is not communicated through color alone.

### Interaction accessibility

- [ ] Interactive elements have accessible names.
- [ ] Keyboard navigation functions correctly.
- [ ] Focus indicators remain visible.
- [ ] Focus is not obscured.
- [ ] Modal focus behavior is appropriate.
- [ ] Touch targets meet applicable requirements.

### Forms

- [ ] Form fields have accessible labels.
- [ ] Required fields are identified.
- [ ] Validation messages are understandable.
- [ ] Errors can be corrected.
- [ ] Submission outcomes are communicated.

### Responsive accessibility

- [ ] Text resizing remains usable.
- [ ] Layout reflow is evaluated.
- [ ] Reduced-motion preferences are respected.
- [ ] Essential functionality remains available across devices.

Do not claim WCAG conformance based solely on this checklist or automated testing.

---

## 15. Custom Code Validation

For tasks involving custom JavaScript or CSS:

- [ ] Native alternatives were evaluated.
- [ ] The custom implementation has a documented purpose.
- [ ] Existing Core functionality was inspected.
- [ ] Duplicate behavior was avoided.
- [ ] Product-specific behavior remains outside universal Core modules.
- [ ] Existing public interfaces are preserved.
- [ ] Unnecessary dependencies are avoided.
- [ ] Existing initialization behavior is preserved.
- [ ] Browser console errors are investigated.
- [ ] Relevant automated tests are executed.

### Core repository checks

Where applicable, inspect and execute the current repository validation procedures.

The documented `check.sh` process includes checks for:

- JavaScript syntax.
- Distribution and source consistency.
- Product neutrality.
- Module version declarations.

Verify the current script before relying on these checks.

Do not claim a repository check passed unless it was actually executed successfully.

---

## 16. Release and Deployment Validation

Consult the current Mayes Core release documentation.

### Release requirements

- [ ] The currently deployed Core version is identified.
- [ ] The required release version is identified.
- [ ] Production dependencies use approved tagged releases.
- [ ] Production websites do not load unversioned development-branch code.
- [ ] Compatibility implications are evaluated.
- [ ] Relevant repository checks are completed.
- [ ] Rollback considerations are identified.

Do not hardcode the latest release version into this skill.

Retrieve the current approved version from the authoritative repository.

### Publishing

- [ ] Publishing authorization is confirmed.
- [ ] The intended deployment environment is identified.
- [ ] Unresolved release blockers are disclosed.
- [ ] Required validation is completed.
- [ ] Changes are published only when authorized.

Saving changes in Webflow Designer and publishing those changes are separate actions.

Do not confuse implementation completion with production deployment.

---

## 17. Phase Seven: Functional Verification

Test functionality affected by the implementation.

### Navigation

- [ ] Internal links work.
- [ ] External links work.
- [ ] Telephone links work.
- [ ] Active navigation states work.
- [ ] Mobile navigation works.

### Forms

- [ ] Fields accept appropriate input.
- [ ] Required-field validation works.
- [ ] Submission behavior works.
- [ ] Success states work.
- [ ] Error states work.
- [ ] Connected integrations behave as expected.

Use authorized test submissions and avoid creating unintended production leads.

### Components

- [ ] Component properties work.
- [ ] Component variants work.
- [ ] Visibility controls work.
- [ ] CMS content displays correctly.
- [ ] Sheets open and close correctly.
- [ ] Relevant interactions work.

### Regression testing

- [ ] Existing functionality remains intact.
- [ ] Shared components remain functional.
- [ ] Unrelated pages were not unintentionally modified.
- [ ] Previously working interactions remain functional.

---

## 18. Responsive Testing Matrix

Use the following proposed viewport widths as practical testing targets.

| Viewport | Purpose |
|---|---|
| 320px | Narrow mobile |
| 375px | Common mobile |
| 402px | Mobile design reference |
| 440px | Larger mobile reference |
| 480px | Mobile breakpoint boundary |
| 767px | Upper mobile landscape |
| 768px | Tablet boundary |
| 991px | Upper tablet boundary |
| 992px | Desktop boundary |
| 1024px | Compact desktop |
| 1440px | Desktop design reference |
| 1920px | Large desktop |

These are testing targets, not additional Webflow breakpoints.

Select relevant widths according to the implementation scope.

### Browser coverage

Where available, evaluate:

- Chrome
- Safari
- Firefox
- Edge
- iOS Safari
- Android Chrome

Physical-device testing should supplement browser simulation when practical.

Do not report simulated testing as physical-device testing.

---

## 19. Validation Status Definitions

Every applicable validation item must receive an accurate status.

| Status | Definition |
|---|---|
| Pass | Requirement was inspected or tested and verified |
| Fail | A confirmed violation or malfunction exists |
| Not Tested | Requirement could not be verified |
| Not Applicable | Requirement does not apply to the task |

Do not mark a requirement as Pass based on:

- Assumptions.
- Documentation alone.
- Expected native behavior.
- Successful code generation.
- Successful API responses without visual or functional verification.
- Previous testing of a different implementation.

A successful implementation operation does not establish successful website behavior.

---

## 20. Issue Severity

Use the following proposed severity classifications when reporting findings.

### Critical

Issues that prevent essential functionality, expose sensitive information, or create substantial production risk.

Examples:

- Website unavailable.
- Essential forms cannot submit.
- Sensitive information is exposed.
- Primary navigation is unusable.

### High

Issues that significantly impair usability, accessibility, functionality, or architectural integrity.

Examples:

- Mobile navigation obscures essential content.
- Important controls cannot be operated by keyboard.
- Shared component changes break multiple pages.
- Required CMS data is unavailable.

### Medium

Issues that create noticeable inconsistency, maintenance risk, or usability friction.

Examples:

- Duplicate design variables.
- Inconsistent section spacing.
- Unnecessary component duplication.
- Nonessential responsive layout problems.

### Low

Minor issues that do not substantially impair functionality.

Examples:

- Minor visual inconsistencies.
- Documentation improvements.
- Nonessential decorative refinements.

Severity must reflect actual impact rather than personal design preference.

---

## 21. Implementation Completion Criteria

An implementation may be considered complete when:

- [ ] The requested outcome has been achieved.
- [ ] Existing Core standards have been preserved.
- [ ] Existing resources were reused where appropriate.
- [ ] Native functionality was prioritized.
- [ ] No unauthorized architectural changes were introduced.
- [ ] Relevant responsive behavior was verified.
- [ ] Relevant accessibility requirements were evaluated.
- [ ] Affected functionality was tested.
- [ ] Shared component implications were evaluated.
- [ ] Remaining limitations were documented.

Critical or high-severity unresolved issues must be disclosed before describing an implementation as production-ready.

If required testing cannot be completed, report the implementation as awaiting verification.

Do not claim production readiness without sufficient evidence.

---

## 22. Implementation Report

At the completion of each task, provide a concise report proportional to the work performed.

### Summary

Describe the requested outcome and implementation result.

### Existing resources reused

Identify applicable:

- Components
- Classes
- Variables
- CMS collections
- Native Webflow functionality
- Existing Core modules

### Changes made

Identify:

- Modified pages.
- Modified components.
- Created resources.
- Updated properties.
- Updated CMS relationships.
- Custom code changes, if applicable.

### Validation results

Use the following format:

| Validation | Status | Evidence |
|---|---|---|
| Design tokens | Pass / Fail / Not Tested / Not Applicable | Inspection or test performed |
| Class architecture | Pass / Fail / Not Tested / Not Applicable | Inspection or test performed |
| Components | Pass / Fail / Not Tested / Not Applicable | Inspection or test performed |
| Responsive behavior | Pass / Fail / Not Tested / Not Applicable | Viewports tested |
| Accessibility | Pass / Fail / Not Tested / Not Applicable | Checks performed |
| Functionality | Pass / Fail / Not Tested / Not Applicable | Tests performed |
| Release readiness | Pass / Fail / Not Tested / Not Applicable | Release checks performed |

### Deviations

Identify any deviations from established Core standards.

Explain:

- Why the deviation exists.
- Whether it was authorized.
- Its expected impact.
- Any required follow-up.

### Remaining risks

Identify unresolved issues, missing access, incomplete testing, and potential regressions.

### Deployment status

Report whether the implementation is:

- Proposed
- Implemented but unverified
- Implemented and verified
- Ready for authorized publishing
- Published and verified

Do not report a deployment status that has not been confirmed.

---

## 23. Cross-Skill Coordination

The Core Design System skill governs structural and visual consistency.

Use the other Mayes Digital skills when their responsibilities apply.

| Skill | Responsibility |
|---|---|
| Experience Design | Usability, customer journeys, interaction design, and visual hierarchy |
| Core Design System | Variables, classes, components, and responsive architecture |
| Webflow Development | Technical implementation, CMS, integrations, and custom code |
| Organic Visibility | Technical SEO, local visibility, and content discoverability |
| Quality Assurance | Comprehensive testing, accessibility, performance, and release readiness |

Do not duplicate the complete responsibilities of another skill within this checklist.

When multiple skills apply, use their complementary standards together.

If standards conflict, consult the authoritative repository and applicable approved project decisions.

---

## 24. Prohibited Implementation Practices

Do not:

- Create duplicate design systems.
- Introduce competing class architectures.
- Duplicate reusable components unnecessarily.
- Hardcode CMS-driven business information without justification.
- Replace native functionality without a documented reason.
- Introduce product-specific logic into universal Core modules.
- Delete shared resources without verifying dependencies.
- Modify unrelated pages or components.
- Treat proposed functionality as implemented.
- Claim testing that was not performed.
- Conceal implementation limitations.
- Publish without authorization.

---

## Operating Standard

**Inspect before implementing.**

**Reuse before creating.**

**Native before custom.**

**Consistency before novelty.**

**Evidence before assumptions.**

**Validate before publishing.**