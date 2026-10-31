# Core Design System 2.0
## Implementation Addendum - 2026-09-20

This addendum records implementation decisions validated during the Southern Reflexions build so they can be migrated into the dedicated Core Design System 2.0 project. It supplements the existing Core Design System 2.0 production framework.

## 1. Canonical Section Architecture

Use this hierarchy for standard page sections:

```text
section-small | section-medium | section-large
+ optional surface-*
+ optional radius-*
+ optional shadow-*
└── padding-global
    └── container-*
        └── section-content
            + is-row | is-column
            + responsive direction utility when required
            + gap-*
            └── content
```

Responsibilities:

- `section-small`, `section-medium`, `section-large`: full-width section boundary and vertical spacing.
- `padding-global`: horizontal page gutters only.
- `container-*`: maximum content width and centering.
- `section-content`: layout context.
- `is-row`, `is-column`: layout direction.
- `gap-*`: internal spacing.
- `surface-*`: surface/background treatment only.
- `radius-*`: border radius only.
- `shadow-*`: box shadow only.
- `mobile-column`: changes a row layout to column at Mobile Landscape and below.

Do not create new `section-padding-*`, `section-space-*`, `padding-section-*`, `padding-section-top-*`, or `padding-section-bottom-*` classes.

Do not place global horizontal page padding on `main-content`.

## 2. Image Architecture

Core images use a fluid, container-first system.

**Core principle:** Image containers are fluid. The layout controls size. The image container controls aspect ratio. The image controls crop.

### Actual image

`image`

```css
width: 100%;
height: 100%;
object-fit: cover;
display: block;
```

The actual image does not own its aspect ratio or layout width.

### Fluid ratio containers

Core defines four common website ratios:

```text
image-16x9
image-3x2
image-4x3
image-1x1
```

Each ratio container owns only fluid sizing, ratio, and clipping:

```css
width: 100%;
aspect-ratio: <ratio>;
overflow: hidden;
```

There are no Small, Medium, or Large variants in the canonical ratio system. Parent layout, grid, flex behavior, container width, or composition controls the available width.

This prevents image containers from leaving unused horizontal space when a layout becomes wider or stacks at responsive breakpoints.

### Image-only modifiers

`is-portrait` is valid only on reversible rectangular image containers:

- `image-16x9 + is-portrait` becomes 9:16
- `image-3x2 + is-portrait` becomes 2:3
- `image-4x3 + is-portrait` becomes 3:4

`is-avatar` is valid only on `image-1x1` and applies the circular avatar treatment.

Radius remains a separate global utility for ordinary images:

```text
image-3x2 + radius-rounded
```

Do not use `is-avatar` as a generic circular-image utility.

## 3. Hero Image Pattern

A full-bleed hero uses a container plus the same global `image` child:

```text
hero section (positioning context)
└── image-hero
    └── image
```

`image-hero` is a container, not an image class.

Its structural behavior is:

```css
position: absolute;
top: 0;
right: 0;
bottom: 0;
left: 0;
overflow: hidden;
z-index: 0;
```

The hero section must establish the appropriate positioning context, normally `position: relative`.

The child `image` continues to own:

```css
width: 100%;
height: 100%;
object-fit: cover;
display: block;
```

Legacy client-specific hero image classes should be migrated to this container -> image pattern when structurally safe.

## 4. Component Ownership

Reusable structural components belong to Core and should not be client-named.

Preferred shell:

```text
Page Shell
├── Header / Default
├── Main Content slot
└── Footer / Default
```

Add variants only when repeated production needs justify them, for example:

```text
Header / Overlay
Header / Light
Footer / Compact
```

Client-specific logos, phone numbers, navigation labels, links, and similar content should use props or instance content where feasible instead of creating client-specific structural components.

Core owns:

- Page Shell
- Header
- Footer
- section/container architecture
- buttons
- cards
- icons
- image system
- surfaces
- radius
- shadows
- spacing/layout utilities
- restrained motion infrastructure

Client builds own:

- brand application
- copy
- imagery
- services
- projects
- reviews
- client-specific compositions
- CMS content
- client-specific integrations

## 5. Motion System Direction

Core may use GSAP, but motion must remain restrained.

Principle:

> Motion should reinforce hierarchy, state, or spatial relationships. If an animation exists only to make the page look animated, do not use it.

Recommended Core vocabulary:

```text
motion-fade
motion-rise
motion-stagger
motion-hero
```

Configuration may use data attributes instead of creating excessive classes:

```text
data-motion="rise"
data-motion-delay="0.1"
```

General guidance:

- typically 200-600ms
- small movement distances
- smooth easing
- usually play once
- use stagger only where it clarifies a group
- use text animation very sparingly
- use ScrollTrigger/FLIP only when the interaction benefits from them
- respect `prefers-reduced-motion` and reduce or disable nonessential motion

Native Webflow first. GSAP when justified. Custom JavaScript last.

## 6. Validated Example: Split Trust Section

A structurally correct split section can use:

```text
section-medium
└── padding-global
    └── container-xlarge
        └── section-content + is-row + mobile-column + gap-12
            ├── image-3x2
            │   └── image
            └── client-specific content composition
```

A client-specific content wrapper is acceptable when it represents a unique composition and does not duplicate a Core structural responsibility.

## 7. Cleanup and Migration Rules

When a Core replacement is established:

- remove obsolete client-specific classes only after verifying they are unused
- do not maintain duplicate structural classes with equivalent responsibilities
- do not delete legacy classes blindly
- migrate client-specific reusable structures into Core naming
- keep client-specific composition classes when the behavior is genuinely unique
- verify responsive behavior after every structural migration

## 8. Pending Core 2.0 Normalization

Before the dedicated Core 2.0 project is considered complete:

1. Remove legacy `image-*-small`, `image-*-medium`, and `image-*-large` classes only after verifying they are no longer used.
2. Build the canonical `image-hero -> image` pattern in Core.
3. Migrate reusable Header/Footer/Page Shell components to non-client names.
4. Add reduced-motion behavior to the motion system.
5. Audit and remove legacy/duplicate image and section classes only after usage verification.
6. Document responsive behavior for utilities such as `mobile-column` and any future tablet stacking utility.

This addendum records implementation decisions. It does not replace the existing Core Design System 2.0 framework.
