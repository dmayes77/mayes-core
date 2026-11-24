# Mayes Digital Core Design System 2.0
## Component Standards Reference

### Purpose

Establish consistent rules for designing, building, modifying, and maintaining reusable Webflow components across Mayes Digital websites.

The component system must support rapid website development, consistent user experiences, client-specific customization, and long-term maintainability.

**Core principle: Build reusable structures once. Customize through properties, slots, variables, and CMS content rather than duplicating components.**

---

## 1. Source of Truth

Primary repository: `dmayes77/mayes-core`

Authoritative documentation:

- `docs/ARCHITECTURE.md`
- `docs/DECISIONS.md`
- `docs/NATIVE_FIRST.md`
- `docs/spec/Core_Design_System_2.0_Implementation_Addendum_2026-09-20.md`
- `base/README.md`

Consult the latest applicable architectural decisions before modifying components.

The current Webflow Core Design System 2.0 master determines which components and properties are implemented.

Documentation describing planned functionality must not be treated as proof of implementation.

When documentation and the current Webflow project differ, identify the discrepancy before proceeding.

---

## 2. Component Architecture

Mayes Digital follows a shared-component architecture.

Core owns reusable structures.

Products and client websites consume those structures and provide their own content, branding, and integrations.

### Core responsibilities

Core owns:

- Page Shell
- Header and navigation
- Footer
- Buttons
- Cards
- Icons
- Section components
- Image components
- Layout utilities
- Surface treatments
- Native sheet infrastructure
- Shared interaction patterns
- Motion infrastructure

### Client responsibilities

Client implementations own:

- Business identity
- Branding
- Copy
- Images
- Services
- Projects
- Reviews
- Client-specific compositions
- Business-specific integrations
- CMS content

Do not introduce client-specific business logic into universal Core components.

---

## 3. Page Shell

The Page Shell is the primary reusable structure for Mayes Digital websites.

It establishes the common interface surrounding each page's content.

### Canonical structure

```text
Page Shell
│
├── Announcement Bar
│
├── Header / Navigation
│
├── Main Content Slot
│
├── Footer
│
├── Mobile Bottom Navigation
│
├── Native Sheets
│
└── Install Banner
```

The Page Shell has one primary content slot:

`Main Content`

Page-specific sections belong inside this slot.

Shared navigation, footer, sheets, and other global interface elements belong within the Page Shell.

### Rules

1. Reuse the existing Page Shell.
2. Do not create separate page shells for individual clients without a justified architectural requirement.
3. Preserve shared navigation and footer components.
4. Keep page-specific sections inside Main Content.
5. Do not duplicate shared sheets on individual pages.
6. Preserve existing component properties.
7. Avoid unnecessary structural modifications.

### New page creation

The Base website documentation establishes a draft `Page Template` page.

New pages should be created by duplicating this template.

The template includes:

- Page Shell
- Main Content slot
- Hidden business data layer

This ensures new pages inherit the established interface and required CMS data bindings.

---

## 4. Business Data Layer

The business data layer is intentionally separate from the Page Shell component.

Webflow's documented implementation limitations prevent the CMS-bound Collection Lists from being placed inside the reusable component in the existing architecture.

### Established structure

```text
Page
│
├── Page Shell
│
└── shell-data
    │
    ├── Business Settings Collection List
    │
    └── Business Hours Collection List
```

The `shell-data` element is hidden from the visual interface.

It provides business information to Core JavaScript.

### Rules

- Preserve the page-level business data layer.
- Do not move CMS-bound Collection Lists into the Page Shell without verifying current Webflow support.
- Use the established CMS field bindings.
- Avoid duplicating business information manually.
- Start new pages from the approved Page Template.
- Verify that required business data is available.

Core Business may report missing data-layer information through browser console warnings.

Do not ignore these warnings during validation.

---

## 5. Header and Navigation

Core owns the shared navigation structure.

The Base website documentation identifies `Navigation / Glass` as the navigation component used within the Page Shell.

### Responsibilities

The header provides:

- Business identity
- Primary navigation
- Primary call to action
- Mobile settings access

### Desktop behavior

Desktop navigation should provide clear links to the website's primary pages.

The primary CTA should remain visually distinguishable.

### Mobile behavior

The mobile header uses a flush top navigation bar.

The settings control opens the Site Settings sheet.

Avoid introducing unnecessary mobile dropdown navigation when the established bottom navigation and settings sheet already provide the required functionality.

### Rules

- Reuse existing navigation components.
- Preserve component properties.
- Use established navigation links.
- Avoid duplicate navigation controls.
- Maintain consistent responsive behavior.
- Preserve the current-page state where applicable.

---

## 6. Mobile Bottom Navigation

Mayes Digital uses an app-like mobile navigation pattern.

The November 19, 2026 architectural decision establishes:

```text
Home | Services | Call | Our Work | Quote
```

### Fixed positions

The following positions are fixed in the standard Base website:

1. Home
2. Services
3. Call

Call occupies the central position.

The fourth and fifth positions may be adapted for the client's business.

Examples include:

- Our Work
- Quote
- Book
- Menu
- Shop
- Collab

### Rules

- Preserve the established navigation structure.
- Use native Webflow links where appropriate.
- Maintain the central Call action.
- Use the established Current state.
- Preserve accessible labels.
- Verify safe-area behavior.
- Avoid unnecessary JavaScript navigation.
- Do not introduce floating navigation into the standard flush navigation architecture.

### Variants

The existing component documentation identifies:

`Navigation / Site Bottom Nav`

With variants:

- Base
- Float

The standard Mayes Digital mobile experience uses the flush Base presentation.

Do not assume that the existence of the Float variant authorizes its use in the standard Base website.

---

## 7. Footer

Core owns the reusable footer.

The Base website documentation identifies:

`Footer / Standard`

### Responsibilities

The footer provides:

- Business identity
- Navigation links
- Contact information where appropriate
- Social links
- Copyright information
- Privacy access
- Cookie settings access

### Rules

- Reuse the established footer.
- Populate business information through existing data bindings.
- Hide unavailable social links.
- Preserve accessibility.
- Avoid duplicate business information.
- Maintain responsive layouts.

Client-specific footer content should be managed through supported component properties or CMS data rather than duplicating the footer structure.

---

## 8. Section Components

Sections are reusable page-building components.

The Base website documentation identifies several established components.

### Hero components

- Section / Hero
- Hero / Image
- Hero / Video
- Hero / Quote Form

### Content sections

- Section / Trust Strip
- Section / Chip Row
- Section / Card Row
- Section / Card Grid
- Section / Service List
- Section / Split
- Section / About
- Section / Before After
- Section / Why Us
- Section / Process
- Section / Reviews
- Section / FAQ

### Conversion sections

- Section / Final CTA
- Section / Final CTA Image
- Section / Contact

### Utility sections

- Section / Page Header
- Section / Legal Text
- Section / Not Found

### Rules

1. Inspect existing sections before creating new ones.
2. Prefer existing section components.
3. Use component properties for content customization.
4. Use slots for supported content composition.
5. Preserve established class architecture.
6. Avoid duplicating section components solely to change copy or imagery.
7. Validate responsive behavior.

A new section component is appropriate when an existing component cannot reasonably support the required structure or behavior.

---

## 9. Component Properties

Component properties allow reusable structures to support different content.

Use properties for values such as:

- Headings
- Eyebrows
- Descriptions
- Button labels
- Button links
- Images
- Alternative text
- Visibility controls
- Supported component variations

### Rules

- Prefer properties over duplicated components.
- Use clear property names.
- Preserve existing property contracts.
- Avoid unnecessary property proliferation.
- Provide sensible defaults.
- Keep client-specific content separate from structural behavior.

### Visibility properties

Use established visibility switches when optional content must be shown or hidden.

For example, the Base website documentation identifies service price visibility controls.

`Card / Service` and `Card / Service Item` support:

- Price
- Show Price

`Section / Service List` supports:

- Show Prices
- Individual service price properties

Reuse these properties rather than creating separate priced and unpriced service components.

---

## 10. Component Slots

Slots support reusable components with flexible internal content.

### Established usage

The Page Shell uses:

`Main Content`

Other documented components use slots for repeated or configurable content.

Examples include:

- Cards
- Items
- Steps
- Questions

### Rules

- Use slots when the component requires flexible child composition.
- Use properties for simple configurable values.
- Avoid creating slots when properties provide a simpler solution.
- Preserve existing slot relationships.
- Do not assume every component requires a slot.

The goal is controlled flexibility without unnecessary complexity.

---

## 11. Buttons

Core owns the reusable button system.

The Base website documentation identifies:

`Button / Standard Flat`

This component supports configurable properties such as:

- Text
- Link
- Variant
- Icon
- Opens Sheet
- Fills From Business
- Business Field
- Consent Action
- Install Action

### Rules

- Reuse existing button components.
- Preserve established variants.
- Use semantic labels.
- Maintain accessible interaction states.
- Keep primary and secondary actions visually distinguishable.
- Avoid creating client-specific button components unnecessarily.
- Preserve supported business-data behavior.

### Button behavior

A button may:

- Navigate to a page.
- Initiate a phone call.
- Open a sheet.
- Trigger a supported action.
- Submit a form when implemented as an appropriate native form control.

Do not assume every action requires custom JavaScript.

---

## 12. Cards

Core provides reusable card components.

The Base website documentation identifies:

- Card / Service
- Card / Standard
- Card / Background
- Card / Pricing
- Card / Service Item
- Card / Feature
- Card / Step
- Card / Trust Item
- Card / Review

### Rules

- Reuse existing card components.
- Preserve consistent spacing.
- Maintain clear content hierarchy.
- Use established surface treatments.
- Keep interactive behavior predictable.
- Avoid unnecessary card variants.
- Support responsive layouts.

### Card Row

The documented `Section / Card Row` uses a native swipe-and-snap presentation.

Avoid introducing JavaScript sliders when the existing native implementation satisfies the requirement.

### Card Grid

Use `Section / Card Grid` when cards should wrap into a responsive grid rather than use horizontal scrolling.

Choose the pattern based on content requirements and user experience.

---

## 13. Native Sheets

Core uses native Webflow Modals styled as bottom sheets.

The November 13, 2026 decision replaced the previous custom sheet engine with native Webflow Modals.

### Established structure

```text
sheet
│
└── sheet_panel
    │
    ├── sheet_grabber
    │
    ├── sheet_head
    │   ├── sheet_title
    │   └── sheet_close
    │
    ├── sheet_body
    │
    └── button-group is-sheet-footer
```

### Responsibilities

The sheet provides a consistent interface for temporary actions and information.

Examples include:

- Site Settings
- Services
- Quote
- Cookie settings

### Rules

- Prefer native Webflow Modals.
- Reuse existing sheet components.
- Preserve the established sheet structure.
- Keep sheets flush on mobile.
- Respect device safe areas.
- Maintain accessible close behavior.
- Preserve scroll behavior.
- Avoid reintroducing the retired custom sheet engine.

### Sheet naming

Use the documented component naming convention:

`Sheet / Name`

The opening mechanism uses the established `data-sheet-open` attribute.

Example:

```html
data-sheet-open="quote"
```

The corresponding sheet uses the matching identifier.

Do not create competing sheet-opening mechanisms.

---

## 14. Forms

Prefer native Webflow forms.

The Base website documentation identifies native forms for:

- Contact
- Hero Quote
- Quote requests

### Rules

- Use native Webflow forms when appropriate.
- Preserve existing submission behavior.
- Use clear field labels.
- Request only necessary information.
- Provide accessible validation.
- Communicate submission outcomes.
- Avoid unnecessary custom form engines.

### Quiz-style quote experience

The November 19 decision establishes a quiz-style quote experience.

The intended flow is:

1. Present a small number of tap-based questions.
2. Collect required contact information.
3. Submit the information through one native form.

The documented working reference exists in Mayes Digital 2.0.

Verify its implementation status in Core before treating it as an available reusable component.

---

## 15. CMS Integration

Components should use established CMS relationships.

Primary Base website collections include:

- Business Settings
- Business Hours
- Reviews
- Projects

### Rules

- Reuse existing collections.
- Preserve field contracts.
- Avoid unnecessary duplicate fields.
- Maintain CMS-driven business information.
- Do not hardcode content already available through CMS.
- Verify Collection List limitations.
- Preserve existing data bindings.

### Reviews

Use authentic reviews.

Do not fabricate testimonials or ratings.

The Base website documentation specifies real Google reviews reproduced accurately with appropriate permission.

When reviews are unavailable, use an approved alternative section such as FAQ rather than inventing social proof.

---

## 16. Icons

Core owns reusable icon components.

The Base website documentation identifies:

- Icon
- Social Icons

### Rules

- Reuse established icon components.
- Maintain consistent sizing.
- Preserve accessible labels where necessary.
- Avoid unnecessary external icon dependencies.
- Ensure icons support rather than replace understandable text.

Decorative icons should not create redundant screen-reader announcements.

Interactive icons must have accessible names.

---

## 17. Motion and Interactions

The current Base website documentation identifies native Webflow Interactions for:

- Fade
- Rise
- Scale
- Stagger
- Hero

### Rules

- Prefer native Webflow Interactions.
- Reuse established motion patterns.
- Avoid unnecessary animation.
- Respect reduced-motion preferences.
- Preserve interaction consistency.
- Do not introduce GSAP or custom animation scripts without justification.

Motion should reinforce hierarchy, state, or spatial relationships.

---

## 18. Component Creation Procedure

Before creating a component, Claude must:

1. Identify the required functionality.
2. Inspect the existing component library.
3. Determine whether a suitable component already exists.
4. Evaluate whether properties can support the variation.
5. Evaluate whether slots are necessary.
6. Check existing class architecture.
7. Identify CMS dependencies.
8. Determine responsive requirements.
9. Confirm the component belongs in Core or the client project.
10. Explain why a new component is necessary.

### Creation rule

Create a new component only when reuse, properties, slots, or approved variants cannot reasonably satisfy the requirement.

---

## 19. Component Modification Procedure

When modifying an existing component:

1. Inspect the component structure.
2. Identify its current usages.
3. Review existing properties.
4. Review connected CMS data.
5. Identify responsive dependencies.
6. Determine the smallest necessary change.
7. Implement the modification.
8. Test affected instances.
9. Verify accessibility.
10. Report any remaining risks.

Do not assume a change to one component instance affects only one page.

Shared components may be used throughout multiple websites or pages.

---

## 20. Component Quality Audit

### Architecture

- [ ] Existing components were inspected.
- [ ] Reusable structures were reused.
- [ ] Core remains product-neutral.
- [ ] Client-specific content remains appropriately scoped.
- [ ] No unnecessary duplicate components were introduced.

### Properties and slots

- [ ] Existing properties were preserved.
- [ ] Properties are used appropriately.
- [ ] Slots are used only where necessary.
- [ ] Visibility controls work correctly.
- [ ] Default values are appropriate.

### Responsive behavior

- [ ] Desktop layout is verified.
- [ ] Tablet layout is verified.
- [ ] Mobile layout is verified.
- [ ] Safe areas are respected.
- [ ] No unintended overflow occurs.

### Accessibility

- [ ] Interactive elements have accessible names.
- [ ] Keyboard interactions work.
- [ ] Focus states are visible.
- [ ] Images have appropriate alternative text.
- [ ] Forms have clear labels.
- [ ] Modal interactions are accessible.

### CMS and functionality

- [ ] CMS bindings remain intact.
- [ ] Business information is accurate.
- [ ] Forms submit correctly.
- [ ] Navigation works.
- [ ] Sheet interactions work.
- [ ] No browser console errors were introduced.

---

## 21. Audit Reporting

For each issue, report:

**Component:** Name of the affected component.

**Location:** Page or component instance.

**Issue:** Confirmed problem.

**Applicable standard:** Relevant Mayes Core requirement.

**Recommended correction:** Smallest appropriate change.

**Impact:** Expected effect on usability, maintainability, or functionality.

**Verification:** How the correction was tested.

Use these statuses:

- Pass
- Fail
- Not Tested
- Not Applicable

Never claim successful validation without performing the relevant inspection or test.

---

## 22. Change Control

Do not independently:

- Delete shared components.
- Rename established component properties.
- Remove existing slots.
- Change shared navigation architecture.
- Replace native sheets with custom engines.
- Move CMS-bound data into unsupported structures.
- Introduce product-specific logic into Core.
- Modify unrelated components.
- Publish changes without authorization.

When an architectural change is necessary, explain the existing implementation, proposed modification, expected benefits, compatibility implications, and validation requirements before proceeding.

---

## Operating Standard

**Build once. Reuse consistently. Customize through properties and slots. Preserve established behavior. Validate every shared change.**