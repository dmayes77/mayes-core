# Mayes Digital Core Design System 2.0
## Class Architecture Reference

### Purpose

Define and enforce the class architecture used throughout Mayes Digital Webflow websites.

The objective is to maintain a reusable, scalable, predictable system in which every class has a clearly defined responsibility.

This reference governs section structures, layout utilities, modifiers, image containers, component classes, and class reuse.

**Core principle: Every class should have a defined responsibility. Avoid duplicating responsibilities across classes.**

---

## 1. Source of Truth

Primary repository: `dmayes77/mayes-core`

Authoritative documentation:

- `docs/ARCHITECTURE.md`
- `docs/DECISIONS.md`
- `docs/spec/Core_Design_System_2.0_Implementation_Addendum_2026-09-20.md`
- `base/README.md`

The September 20 Implementation Addendum establishes the canonical section and image architecture.

Later approved decisions take precedence where they supersede earlier conventions.

Before modifying existing Webflow classes, inspect the current implementation.

Never assume a documented class exists in the active Webflow project without verification.

---

## 2. Architectural Principles

Follow these requirements:

1. Reuse existing classes before creating new ones.
2. Give each class a specific responsibility.
3. Separate structure from presentation.
4. Prefer reusable utilities for shared behavior.
5. Use modifiers for supported variations.
6. Avoid unnecessary client-specific structural classes.
7. Preserve responsive behavior.
8. Avoid creating multiple classes that accomplish the same purpose.
9. Keep Core independent of product-specific business logic.
10. Prefer native Webflow styling over custom CSS.

A class should not simultaneously own unrelated responsibilities when those responsibilities already belong to established utilities.

---

## 3. Canonical Section Architecture

Use the following structure for standard page sections:

```text
section-small | section-medium | section-large
    + optional surface-*
    + optional radius-*
    + optional shadow-*
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

### Class responsibilities

| Class | Responsibility |
|---|---|
| `section-small` | Section boundary and vertical spacing |
| `section-medium` | Section boundary and vertical spacing |
| `section-large` | Section boundary and vertical spacing |
| `padding-global` | Horizontal page gutters |
| `container-*` | Maximum width and centering |
| `section-content` | Layout context |
| `is-row` | Horizontal arrangement |
| `is-column` | Vertical arrangement |
| `gap-*` | Spacing between layout children |
| `surface-*` | Surface or background treatment |
| `radius-*` | Border radius |
| `shadow-*` | Shadow treatment |
| `mobile-column` | Changes row layout to column at Mobile Landscape and below |

The section architecture must remain consistent across reusable Core sections.

### Important distinction

The section class owns vertical spacing.

`padding-global` owns horizontal spacing.

Do not place global horizontal page padding on `main-content`.

---

## 4. Prohibited Duplicate Section Classes

Do not introduce the following class families:

```text
section-padding-*
section-space-*
padding-section-*
padding-section-top-*
padding-section-bottom-*
```

These duplicate responsibilities already established by the canonical section architecture.

If an existing project contains legacy classes using these patterns:

1. Identify where they are used.
2. Determine whether an approved Core replacement exists.
3. Verify the replacement produces equivalent behavior.
4. Evaluate responsive implications.
5. Migrate only when structurally safe.
6. Remove obsolete classes only after confirming they are unused.

Never delete legacy classes blindly.

---

## 5. Layout Architecture

Layout utilities should control arrangement rather than visual presentation.

### Row layouts

Use the established row modifier when content should be arranged horizontally.

Example:

```text
section-content
    + is-row
    + gap-12
```

### Column layouts

Use the established column modifier when content should be stacked vertically.

Example:

```text
section-content
    + is-column
    + gap-*
```

### Responsive layouts

Use established responsive utilities when layout direction must change.

Example:

```text
section-content
    + is-row
    + mobile-column
    + gap-12
```

`mobile-column` changes a row layout to a column layout at Mobile Landscape and below.

Do not assume the same behavior applies at tablet breakpoints.

Inspect existing utilities before introducing new responsive modifiers.

### Layout rules

- Prefer Flexbox and Grid for layout.
- Use existing gap utilities.
- Avoid unnecessary positioning.
- Keep layout responsibilities separate from visual treatments.
- Do not create duplicate layout utilities.
- Validate wrapping, stacking, and alignment.

---

## 6. B4 Class Architecture

Mayes Digital's broader B4 methodology distinguishes four responsibilities:

| Layer | Responsibility |
|---|---|
| Base | Foundational element or component structure |
| Surface | Visual surface treatment |
| Modifier | Variations in behavior, state, or presentation |
| Decoration | Nonessential visual enhancements |

Use these categories to reason about class responsibilities.

Do not assume B4 requires literal class prefixes named `base-`, `modifier-`, or `decoration-`.

The canonical class names documented in Mayes Core take precedence.

### Base

Base classes establish reusable structural behavior.

Examples include:

```text
section-content
padding-global
container-large
image
```

### Surface

Surface classes control visual treatments.

Example:

```text
surface-*
```

Do not use a surface class to establish unrelated layout behavior.

### Modifier

Modifiers adjust an established component or layout.

Examples include:

```text
is-row
is-column
is-portrait
is-avatar
```

Modifiers must have a defined scope.

Do not apply a modifier to unrelated components simply because it produces a desirable appearance.

### Decoration

Decorative treatments should remain independent of essential layout and content structure.

Use existing utilities where available.

Do not create decorative complexity without a clear design purpose.

**Implementation note:** B4 is a conceptual classification here. Exact class naming must be verified against the current Core implementation.

---

## 7. Image Architecture

Core uses a fluid, container-first image system.

The governing principle is:

**The layout controls size. The container controls aspect ratio. The image controls cropping.**

### Standard image containers

```text
image-16x9
image-3x2
image-4x3
image-1x1
```

Each container owns:

- Fluid sizing
- Aspect ratio
- Overflow clipping

The actual image uses the global class:

```text
image
```

### Standard image structure

```text
image-3x2
    └── image
```

### Actual image behavior

```css
width: 100%;
height: 100%;
object-fit: cover;
display: block;
```

Do not assign the actual image responsibility for the container's aspect ratio.

### Image sizing

The parent layout determines the available width.

Do not create Small, Medium, or Large variants of canonical image-ratio containers.

Avoid introducing:

```text
image-3x2-small
image-3x2-medium
image-3x2-large
```

Use the parent grid, flex layout, or container width to control image dimensions.

---

## 8. Image Modifiers

### Portrait modifier

`is-portrait` is valid on reversible rectangular image containers.

Supported combinations:

| Container | Result |
|---|---|
| `image-16x9 + is-portrait` | 9:16 |
| `image-3x2 + is-portrait` | 2:3 |
| `image-4x3 + is-portrait` | 3:4 |

Do not use `is-portrait` on `image-1x1`.

### Avatar modifier

`is-avatar` applies the circular avatar treatment.

Valid combination:

```text
image-1x1
    + is-avatar
```

Do not use `is-avatar` as a generic circular-image utility.

### Radius utilities

Radius remains independent of image type.

Example:

```text
image-3x2
    + radius-rounded
```

Do not introduce image-specific radius classes when an existing global radius utility is sufficient.

---

## 9. Hero Image Architecture

Full-bleed hero imagery uses the established container pattern.

```text
Hero Section
    │
    └── image-hero
        │
        └── image
```

The hero section establishes the positioning context.

The `image-hero` container owns:

```css
position: absolute;
top: 0;
right: 0;
bottom: 0;
left: 0;
overflow: hidden;
z-index: 0;
```

The actual image retains the global `image` behavior.

### Rules

- Use the established hero container pattern.
- Preserve the hero section's positioning context.
- Keep imagery separate from content structure.
- Verify content remains readable over the image.
- Validate cropping at responsive breakpoints.
- Migrate legacy hero classes only when structurally safe.

---

## 10. Component Class Ownership

Core owns reusable structural components.

Examples include:

- Page Shell
- Header
- Footer
- Buttons
- Cards
- Icons
- Image containers
- Section architecture
- Layout utilities
- Surfaces
- Radius utilities
- Shadow utilities

Client projects own:

- Brand application
- Copy
- Imagery
- Services
- Projects
- Reviews
- Client-specific compositions
- Client-specific integrations

### Rules

Do not create client-named versions of reusable Core structural components without a justified requirement.

Prefer component properties, slots, and instance content for client variations.

A client-specific composition class is acceptable when it represents a genuinely unique layout and does not duplicate an existing Core responsibility.

---

## 11. Component-Specific Classes

Not every class must be a global utility.

Component-specific classes are appropriate when they describe a distinct part of a component.

For example, the existing Page Shell architecture uses classes such as:

```text
shell-header
shell-footer
shell-mobile-nav
shell-sheets
```

The existing sheet architecture uses:

```text
sheet
sheet_panel
sheet_grabber
sheet_head
sheet_title
sheet_close
sheet_body
```

These are established component structures.

Do not replace them with generic utilities simply to reduce the number of classes.

### Component-specific naming

Follow existing component conventions.

Do not introduce a second naming system within the same component.

Preserve documented state modifiers and component relationships.

---

## 12. State Classes

Core uses state modifiers for supported visual and interaction states.

Examples include:

```text
is-visible
is-hidden
is-on
is-disabled
is-business-filled
```

State modifiers should communicate an identifiable state.

### Rules

- Use existing state modifiers.
- Keep state styling in Webflow where supported.
- Allow JavaScript to toggle established state classes when necessary.
- Avoid duplicating state behavior with inline styling.
- Do not create new state classes when an existing modifier serves the same purpose.

Webflow's limitations around parent-state styling must be respected.

Where required, apply state modifiers to the appropriate component parts rather than relying on unsupported descendant styling behavior.

---

## 13. Motion Classes and Attributes

Core's documented motion vocabulary includes:

```text
fade
rise
scale
stagger
hero
```

The current Base website documentation describes Webflow Interactions triggered through:

```text
data-motion="fade"
data-motion="rise"
data-motion="scale"
data-motion="stagger"
data-motion="hero"
```

Prefer native Webflow Interactions.

Do not introduce custom animation classes or scripts when established motion patterns satisfy the requirement.

Respect reduced-motion preferences.

---

## 14. Validated Structural Example

The September 20 Implementation Addendum documents a split trust section.

```text
section-medium
    │
    └── padding-global
        │
        └── container-xlarge
            │
            └── section-content
                + is-row
                + mobile-column
                + gap-12
                │
                ├── image-3x2
                │   └── image
                │
                └── client-specific content
```

This example demonstrates:

- Canonical section spacing
- Global horizontal padding
- Controlled content width
- Reusable layout utilities
- Responsive stacking
- Fluid image containers
- Client-specific content composition

Use this pattern as a reference when designing comparable sections.

Do not force unrelated components into this exact structure when their requirements differ.

---

## 15. Class Creation Procedure

Before creating a class:

1. Identify the required behavior.
2. Inspect existing classes.
3. Determine whether an existing utility satisfies the requirement.
4. Check the relevant Core documentation.
5. Identify whether the class is structural, presentational, or state-related.
6. Determine whether the behavior belongs to Core or a client.
7. Check responsive requirements.
8. Verify naming consistency.
9. Explain why a new class is necessary.
10. Validate the implementation.

If an existing class satisfies the requirement, reuse it.

---

## 16. Class Migration Procedure

When replacing legacy classes:

1. Identify every known usage.
2. Document the current behavior.
3. Identify the approved replacement.
4. Compare desktop and mobile behavior.
5. Check component dependencies.
6. Verify CMS relationships.
7. Apply the replacement.
8. Test affected pages.
9. Confirm the old class is unused.
10. Remove obsolete classes only when safe.

Never perform broad class deletion based solely on naming similarities.

---

## 17. Class Architecture Audit

Evaluate each applicable requirement.

### Structure

- [ ] Canonical section architecture is followed.
- [ ] Section classes own vertical spacing.
- [ ] `padding-global` owns horizontal gutters.
- [ ] Containers control maximum width.
- [ ] Layout utilities have defined responsibilities.

### Reusability

- [ ] Existing classes are reused.
- [ ] Duplicate utilities are avoided.
- [ ] Core components remain product-neutral.
- [ ] Client-specific compositions remain appropriately scoped.

### Images

- [ ] Standard image containers are used.
- [ ] Images use the global `image` class.
- [ ] Aspect ratio belongs to the container.
- [ ] Image modifiers are applied correctly.
- [ ] Hero images follow the approved container pattern.

### Responsive behavior

- [ ] Layouts respond correctly at relevant breakpoints.
- [ ] Responsive modifiers are used appropriately.
- [ ] No unintended horizontal overflow exists.
- [ ] Content remains readable and accessible.

### Maintainability

- [ ] Naming follows existing conventions.
- [ ] No prohibited duplicate section classes were introduced.
- [ ] Legacy classes were not deleted without verification.
- [ ] Component-specific classes remain consistent.
- [ ] State modifiers are used appropriately.

---

## 18. Audit Reporting

For every confirmed issue, report:

**Location:** Page, component, or element.

**Existing class:** The class or class combination involved.

**Problem:** The specific architectural violation.

**Applicable standard:** The documented Core requirement.

**Recommended correction:** The smallest appropriate change.

**Impact:** Expected effect on maintainability, responsiveness, or usability.

**Verification:** How the correction was tested.

Use these statuses:

- **Pass:** Verified compliant.
- **Fail:** Confirmed violation.
- **Not Tested:** Insufficient access or testing.
- **Not Applicable:** Requirement does not apply.

Do not report assumed compliance as verified compliance.

---

## 19. Change Control

Do not independently:

- Rename canonical classes.
- Delete shared utilities.
- Replace established section architecture.
- Introduce competing naming systems.
- Move client-specific behavior into Core.
- Modify unrelated components.
- Publish architectural changes.

When a change conflicts with an established standard, explain the conflict and request approval before proceeding.

---

## Operating Standard

**One responsibility per class. Reuse established structures. Preserve responsive behavior. Extend Core only when necessary.**