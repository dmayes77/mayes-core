# Mayes Digital Core Design System 2.0
## Responsive Design Standards

### Purpose

Establish consistent, mobile-first responsive design standards across Mayes Digital websites.

Responsive design must preserve usability, visual consistency, accessibility, and component behavior across screen sizes.

The objective is not simply to make desktop layouts fit smaller screens. Each experience must remain intuitive and functional on the device being used.

**Core principle: Design for the available space, preserve established components, and prioritize usability over visual complexity.**

---

## 1. Source of Truth

Primary repository: `dmayes77/mayes-core`

Consult:

- `docs/ARCHITECTURE.md`
- `docs/DECISIONS.md`
- `docs/NATIVE_FIRST.md`
- `docs/spec/Core_Design_System_2.0_Implementation_Addendum_2026-09-20.md`
- `base/README.md`

The current Webflow Core Design System 2.0 master establishes implemented responsive behavior.

Use the latest approved architectural decisions when documentation conflicts.

Do not assume planned responsive functionality has been implemented.

---

## 2. Responsive Design Philosophy

Mayes Digital websites must provide a consistent experience across desktop, tablet, and mobile devices.

### Requirements

1. Prioritize mobile usability.
2. Preserve established Core components.
3. Use existing responsive variables.
4. Prefer fluid layouts over fixed dimensions.
5. Maintain clear visual hierarchy.
6. Preserve readable typography.
7. Keep primary actions accessible.
8. Avoid unnecessary horizontal scrolling.
9. Respect device safe areas.
10. Validate actual responsive behavior.

### Mobile-first thinking

Consider the mobile customer journey before introducing desktop complexity.

Mobile users should be able to:

- Understand the business immediately.
- Identify available services.
- Navigate without confusion.
- Contact the business.
- Request a quote or booking.
- Complete forms without unnecessary friction.

Do not hide essential functionality merely to simplify the mobile layout.

---

## 3. Webflow Breakpoints

Use Webflow's established responsive breakpoints.

| Breakpoint | Primary responsibility |
|---|---|
| Desktop | Standard desktop presentation |
| Tablet | Intermediate layout adjustments |
| Mobile Landscape | Compact layouts and responsive stacking |
| Mobile Portrait | Small-screen optimization |

Webflow's standard breakpoint ranges are approximately:

- Desktop: 992px and above
- Tablet: 768px to 991px
- Mobile Landscape: 480px to 767px
- Mobile Portrait: 479px and below

These ranges describe standard Webflow behavior. Additional breakpoints may exist in a specific project.

### Rules

- Inspect the project's actual breakpoint configuration.
- Do not create unnecessary breakpoint overrides.
- Reuse existing responsive classes and variables.
- Preserve Webflow's style inheritance behavior.
- Validate changes at relevant breakpoints.
- Test intermediate widths, not only breakpoint endpoints.

Do not assume that a layout working at 402px will also work at 479px.

---

## 4. Canonical Responsive Section Architecture

Use the established section structure:

```text
section-small | section-medium | section-large
    │
    └── padding-global
        │
        └── container-*
            │
            └── section-content
                + is-row | is-column
                + responsive direction utility
                + gap-*
                │
                └── content
```

### Section spacing

Section classes control vertical spacing.

`padding-global` controls horizontal page gutters.

Container classes control maximum width.

Do not introduce competing spacing utilities.

### Responsive spacing

Use existing Webflow variables and responsive modes.

Spacing should adapt to the available screen size without creating inconsistent visual relationships.

Avoid arbitrary spacing overrides when an existing responsive variable satisfies the requirement.

---

## 5. Responsive Layout Direction

Core provides established layout utilities.

### Row layout

```text
section-content
    + is-row
    + gap-*
```

Use for horizontal arrangements.

### Column layout

```text
section-content
    + is-column
    + gap-*
```

Use for vertically stacked content.

### Responsive stacking

```text
section-content
    + is-row
    + mobile-column
    + gap-*
```

The documented `mobile-column` utility changes the layout to a column at Mobile Landscape and below.

### Rules

- Use established responsive modifiers.
- Do not assume `mobile-column` changes layout at Tablet.
- Preserve logical reading order.
- Avoid unnecessary absolute positioning.
- Ensure content remains readable when stacked.
- Verify alignment and spacing after layout changes.

### Example: Split section

Desktop:

```text
Image | Content
```

Mobile:

```text
Image
Content
```

The visual order may change only when it preserves a logical and accessible reading sequence.

---

## 6. Responsive Typography

Typography must remain readable across devices.

### Requirements

- Use established typography variables.
- Preserve heading hierarchy.
- Maintain appropriate line heights.
- Avoid excessively long text lines.
- Prevent headings from overflowing containers.
- Maintain sufficient contrast.
- Avoid unnecessary breakpoint-specific font overrides.

### Fluid typography

Use the existing Core typography system.

Do not introduce independent `clamp()` formulas when an appropriate Core variable already exists.

### Text wrapping

Evaluate headings at multiple widths.

Avoid forced line breaks that create awkward layouts on smaller screens.

Use manual line breaks only when they serve a deliberate design purpose and remain appropriate across breakpoints.

### Readability

Body text should remain comfortable to read without zooming.

Do not shrink text excessively to preserve a desktop composition.

---

## 7. Responsive Images

Core uses fluid image containers.

Supported ratios:

```text
image-16x9
image-3x2
image-4x3
image-1x1
```

### Responsibilities

The parent layout controls available width.

The image container controls aspect ratio.

The image controls cropping.

### Standard structure

```text
image-3x2
    └── image
```

### Image behavior

The global image class uses:

```css
width: 100%;
height: 100%;
object-fit: cover;
display: block;
```

### Responsive requirements

- Images must scale with their containers.
- Avoid unnecessary fixed widths.
- Preserve appropriate aspect ratios.
- Verify important subjects remain visible.
- Avoid distorted imagery.
- Use appropriate image sizes for performance.
- Provide meaningful alternative text where required.

### Hero images

Hero imagery requires special attention.

Verify:

- Text readability.
- Image cropping.
- Subject positioning.
- Overlay contrast.
- CTA visibility.
- Mobile composition.

Do not assume a desktop hero image will automatically provide an effective mobile composition.

---

## 8. Mobile Header

The standard Mayes Digital mobile experience uses a flush top navigation bar.

### Requirements

- Preserve established header structure.
- Keep business identity visible.
- Maintain accessible settings controls.
- Avoid unnecessary navigation duplication.
- Respect device safe areas.
- Maintain consistent touch targets.

The Site Settings control opens the established native sheet.

Do not introduce a separate mobile menu system when the existing navigation architecture satisfies the requirement.

---

## 9. Mobile Bottom Navigation

The November 19, 2026 architectural decision establishes:

```text
Home | Services | Call | Our Work | Quote
```

### Fixed positions

1. Home
2. Services
3. Call

The Call action occupies the central position.

The fourth and fifth positions may vary by business.

### Requirements

- Use the established Core navigation component.
- Preserve the central Call action.
- Maintain clear active states.
- Use recognizable icons.
- Include accessible labels.
- Respect safe areas.
- Avoid horizontal overflow.
- Keep navigation visually consistent.

### Flush navigation

The standard Base presentation is flush with the viewport.

Do not introduce floating navigation unless the project explicitly uses an approved variant.

### Content clearance

Ensure page content is not obscured by the bottom navigation.

Account for navigation height and device safe-area insets.

Do not add arbitrary padding when an established Core variable or utility already handles this requirement.

---

## 10. Device Safe Areas

Modern mobile devices may have:

- Display cutouts
- Rounded screen corners
- Gesture navigation areas
- Home indicators

Use the existing Core safe-area implementation.

Where appropriate, native CSS safe-area values may be used:

```css
env(safe-area-inset-top)
env(safe-area-inset-bottom)
```

Do not introduce duplicate safe-area calculations when Core already handles them.

### Verification

Confirm that:

- Header content is visible.
- Bottom navigation is not obstructed.
- Sheet controls remain accessible.
- Primary actions are reachable.
- Page content is not hidden behind fixed elements.

---

## 11. Touch Interaction Standards

Mobile interfaces must support comfortable touch interaction.

### Requirements

- Provide sufficiently large interactive targets.
- Maintain spacing between adjacent controls.
- Avoid hover-dependent functionality.
- Provide visible interaction feedback.
- Ensure controls remain usable with one hand where practical.
- Preserve keyboard accessibility.

### Touch target guidance

Use a minimum target size of approximately 44 × 44 CSS pixels as a practical design target.

WCAG 2.2 Level AA includes a 24 × 24 CSS pixel minimum target-size criterion with defined exceptions.

Do not treat the 44px design target as the literal WCAG AA minimum.

### Primary actions

Important actions should be easy to identify and activate.

Examples include:

- Call
- Book
- Request Quote
- Contact
- Submit

Do not reduce touch target sizes solely to fit more controls into a row.

---

## 12. Native Sheets on Mobile

Core uses native Webflow Modals styled as bottom sheets.

### Established structure

```text
sheet
    └── sheet_panel
        ├── sheet_grabber
        ├── sheet_head
        │   ├── sheet_title
        │   └── sheet_close
        ├── sheet_body
        └── button-group is-sheet-footer
```

### Responsive requirements

- Sheets should fit the viewport.
- Content should remain readable.
- Close controls must remain accessible.
- Long content must support appropriate scrolling.
- Footer actions must remain reachable.
- Safe-area spacing must be preserved.
- Background interaction should follow the established modal behavior.

### Validation

Test opening, closing, scrolling, and focus behavior.

Do not assume native modal functionality guarantees that every custom sheet layout is accessible.

---

## 13. Responsive Cards

Cards must adapt to available space.

### Card grids

Use established grid layouts.

On smaller screens, reduce columns when necessary.

Avoid card widths that cause horizontal overflow.

### Card rows

The existing `Section / Card Row` uses a native swipe-and-snap pattern.

Preserve native scrolling when appropriate.

### Requirements

- Maintain readable content.
- Preserve consistent spacing.
- Keep buttons associated with their cards.
- Avoid clipping important information.
- Ensure interactive cards are accessible.
- Verify touch scrolling behavior.

Do not introduce custom JavaScript carousels when native scrolling satisfies the requirement.

---

## 14. Responsive Forms

Forms must remain usable on smaller screens.

### Requirements

- Use clear labels.
- Maintain logical field order.
- Use appropriate input types.
- Avoid unnecessarily narrow inputs.
- Provide readable validation messages.
- Keep submit controls accessible.
- Communicate successful submission.

### Mobile keyboards

Use appropriate input types for:

- Email
- Telephone
- Numbers
- Dates

This allows mobile devices to present suitable keyboard layouts.

### Multi-step forms

Use progressive disclosure when appropriate.

Avoid splitting simple forms into unnecessary steps.

For quiz-style quote experiences, preserve the established native form submission architecture.

---

## 15. Responsive Navigation and Content Hierarchy

Responsive layouts must preserve the user's understanding of the page.

### Requirements

- Maintain a clear primary heading.
- Preserve logical content order.
- Keep important information discoverable.
- Avoid hiding essential content.
- Preserve CTA hierarchy.
- Maintain consistent navigation patterns.

### Progressive disclosure

Use expandable content when it improves usability.

Examples include:

- FAQs
- Detailed service descriptions
- Optional information
- Secondary settings

Do not hide information merely to make the page appear shorter.

---

## 16. Performance Considerations

Responsive design also affects performance.

### Requirements

- Use appropriately sized images.
- Avoid unnecessary scripts.
- Minimize layout shifts.
- Prefer native interactions.
- Avoid excessive animation.
- Use existing Core assets.
- Preserve efficient component structures.

### Core Web Vitals

Evaluate:

- Largest Contentful Paint
- Interaction to Next Paint
- Cumulative Layout Shift

Performance testing belongs primarily to the Quality Assurance skill.

This reference establishes the design responsibilities that influence those metrics.

---

## 17. Accessibility

Responsive design must preserve accessibility.

### Requirements

- Maintain readable text.
- Preserve sufficient contrast.
- Support keyboard navigation.
- Provide visible focus indicators.
- Avoid inaccessible hover-only controls.
- Maintain logical reading order.
- Support zoom and text resizing.
- Respect reduced-motion preferences.

### Zoom and reflow

Test layouts at increased zoom levels.

Ensure content remains usable without requiring unnecessary horizontal scrolling.

Do not use fixed dimensions that prevent content from expanding when text is enlarged.

---

## 18. Responsive Implementation Workflow

When creating or modifying a responsive component:

1. Identify the component's purpose.
2. Inspect its current desktop and mobile behavior.
3. Review applicable Core standards.
4. Identify existing responsive variables and utilities.
5. Determine the smallest necessary changes.
6. Implement using native Webflow functionality.
7. Verify relevant breakpoints.
8. Test intermediate viewport widths.
9. Check accessibility.
10. Document unresolved issues.

### Change control

Do not modify shared responsive utilities without identifying affected components.

A change to a shared utility may affect multiple pages.

---

## 19. Responsive Testing Matrix

Use the following viewport widths as practical testing examples.

| Width | Purpose |
|---|---|
| 320px | Narrow mobile |
| 375px | Common mobile width |
| 402px | Mobile reference |
| 440px | Larger mobile reference |
| 768px | Tablet boundary |
| 991px | Upper tablet boundary |
| 1024px | Compact desktop |
| 1440px | Desktop reference |
| 1920px | Large desktop |

These are testing targets, not additional Webflow breakpoints.

The exact viewport configuration must be verified against the current project.

### Testing requirements

At each relevant width, evaluate:

- Layout integrity
- Typography
- Navigation
- Images
- Buttons
- Forms
- Sheets
- Overflow
- Spacing
- Accessibility

Where possible, supplement browser simulation with physical-device testing.

---

## 20. Responsive Design Audit

### Layout

- [ ] Canonical section architecture is preserved.
- [ ] Existing responsive utilities are reused.
- [ ] No unintended horizontal overflow exists.
- [ ] Content stacks logically.
- [ ] Spacing remains consistent.

### Typography

- [ ] Headings remain readable.
- [ ] Body text is legible.
- [ ] No text is clipped.
- [ ] Line lengths remain appropriate.
- [ ] Text resizing does not break layouts.

### Navigation

- [ ] Header works correctly.
- [ ] Bottom navigation works correctly.
- [ ] Active states are visible.
- [ ] Safe areas are respected.
- [ ] Navigation does not obscure content.

### Images

- [ ] Images scale correctly.
- [ ] Aspect ratios are preserved.
- [ ] Cropping is appropriate.
- [ ] Hero content remains readable.
- [ ] No image distortion occurs.

### Interactions

- [ ] Touch targets are usable.
- [ ] Forms work correctly.
- [ ] Sheets open and close.
- [ ] Scrolling behaves correctly.
- [ ] Keyboard interaction remains functional.

### Performance

- [ ] Images are appropriately sized.
- [ ] Unnecessary scripts are avoided.
- [ ] Layout shifts are minimized.
- [ ] Motion does not interfere with usability.

---

## 21. Reporting Requirements

For every responsive issue, report:

**Location:** Page, component, or element.

**Viewport:** Width or device where the issue occurs.

**Problem:** Confirmed responsive failure.

**Applicable standard:** Relevant Core requirement.

**Recommended correction:** Smallest appropriate change.

**Impact:** Expected improvement.

**Verification:** How the correction was tested.

Use these statuses:

- Pass
- Fail
- Not Tested
- Not Applicable

Do not claim physical-device testing when only browser simulation was performed.

---

## 22. Change Control

Do not independently:

- Replace established responsive utilities.
- Introduce competing breakpoint systems.
- Modify shared navigation architecture.
- Remove essential mobile functionality.
- Introduce unnecessary fixed dimensions.
- Replace native sheets with custom implementations.
- Publish changes without authorization.

When a proposed responsive improvement conflicts with an established Core standard, explain the conflict and request approval before changing the architecture.

---

## Operating Standard

**Design for the user, adapt to the viewport, preserve Core architecture, and verify responsive behavior.**