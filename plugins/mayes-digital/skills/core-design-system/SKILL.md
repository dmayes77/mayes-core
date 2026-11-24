---
name: "core-design-system"
description: Apply and enforce Mayes Digital Core Design System 2.0 standards when designing, building, modifying, or auditing Webflow websites. Covers design tokens, B4 class architecture, reusable components, responsive layouts, image systems, and native-first implementation.
---

# Mayes Digital Core Design System

## Purpose

Maintain a consistent, scalable, reusable, and production-ready design system across all Mayes Digital Webflow projects.

Core Design System 2.0 is the foundation for Mayes Digital websites and products.

This skill governs how Claude interprets, applies, and validates the existing design system.

It does not authorize Claude to replace established architecture or introduce competing standards.

## Source of Truth

Primary repository:

GitHub: dmayes77/mayes-core

Before making architectural decisions, consult the relevant repository documentation.

Priority references:

1. docs/ARCHITECTURE.md
2. docs/DECISIONS.md
3. docs/NATIVE_FIRST.md
4. docs/spec/Core_Design_System_2.0_Implementation_Addendum_2026-09-20.md
5. base/README.md

Use the latest applicable decisions when documentation conflicts.

Verify the current Webflow implementation before assuming documented functionality is deployed.

Do not invent undocumented classes, variables, components, or CMS fields.

## When to Use

Activate this skill when:

- Designing Webflow pages or sections.
- Creating or modifying reusable components.
- Working with design variables.
- Establishing responsive layouts.
- Reviewing typography, colors, or spacing.
- Creating image containers.
- Modifying component variants.
- Evaluating class naming conventions.
- Auditing design system consistency.
- Migrating client-specific structures into Core.

## Core Architecture

Mayes Digital follows a shared foundation model.

Core owns universal functionality and reusable structures.

Products and clients own their specific implementations.

Core responsibilities include:

- Page Shell
- Navigation
- Footer
- Buttons
- Cards
- Icons
- Image system
- Section architecture
- Layout utilities
- Design variables
- Surface treatments
- Motion infrastructure

Client responsibilities include:

- Branding
- Copy
- Images
- Services
- Projects
- Reviews
- Client-specific compositions
- Business integrations
- CMS content

Never introduce product-specific business logic into universal Core modules.

## Native-First Development

Always prefer native Webflow functionality.

Use:

1. Webflow Designer for visual styling.
2. Webflow Variables for design tokens.
3. Webflow Components for reusable UI.
4. Webflow CMS for structured content.
5. Webflow Interactions for supported animations.
6. Native Webflow Modals for sheets.
7. Custom JavaScript only when necessary.

Do not recreate native Webflow functionality with custom code without a documented reason.

Do not introduce unnecessary dependencies.

## Design Variables

Core Design System 2.0 uses five variable collections:

- Core
- Theme
- Surface
- Motion
- Primitives

Use existing variables before creating new ones.

Maintain semantic naming.

Avoid hardcoded values when an appropriate variable exists.

Follow the established Tailwind-inspired sizing scale.

Do not introduce duplicate tokens.

Consult:

references/design-tokens.md

## Class Architecture

Follow the established Core class architecture.

Standard section structure:

section-small | section-medium | section-large
  padding-global
    container-*
      section-content
        content

Use layout modifiers where appropriate:

- is-row
- is-column
- gap-*
- mobile-column

Keep class responsibilities separate.

Section classes control vertical spacing.

padding-global controls horizontal page gutters.

Container classes control maximum content width.

Layout classes control arrangement.

Surface classes control background treatments.

Radius classes control corner rounding.

Shadow classes control shadows.

Do not create competing structural classes.

Consult:

references/class-architecture.md

## Component Standards

Reuse existing components before creating new ones.

Prefer component properties and slots for reusable structures.

Avoid client-specific structural components when an existing Core component can support the requirement.

Do not duplicate Page Shell functionality.

Preserve existing component relationships.

Do not modify unrelated components.

Consult:

references/component-standards.md

## Image Architecture

Use fluid image containers.

Supported ratios:

- image-16x9
- image-3x2
- image-4x3
- image-1x1

The parent layout controls available width.

The image container controls aspect ratio.

The image controls cropping.

Use the global image class for actual images.

Use is-portrait only on supported rectangular ratio containers.

Use is-avatar only with image-1x1.

Do not create unnecessary fixed-size image variants.

## Responsive Design

Follow the existing responsive architecture.

Prioritize mobile usability.

Maintain consistent spacing and hierarchy across breakpoints.

Respect safe areas.

Preserve the established app-like mobile navigation.

Do not introduce floating navigation where the current Core standard requires flush navigation.

Verify responsive changes at relevant Webflow breakpoints.

Consult:

references/responsive-design.md

## Motion

Motion must reinforce:

- Visual hierarchy
- Interaction feedback
- State changes
- Spatial relationships

Avoid decorative animation that does not improve the experience.

Prefer native Webflow Interactions.

Respect reduced-motion preferences.

Do not introduce GSAP or custom animation scripts without a justified requirement.

## Implementation Workflow

When asked to create or modify a design:

1. Understand the requested outcome.
2. Inspect the relevant Webflow implementation.
3. Review applicable Core documentation.
4. Identify existing components and variables.
5. Determine whether the requirement can be implemented natively.
6. Reuse established structures.
7. Make only the necessary changes.
8. Validate responsive behavior.
9. Check for architectural inconsistencies.
10. Report changes and unresolved issues.

## Validation

Before considering work complete:

- Confirm existing variables were reused.
- Confirm class responsibilities remain consistent.
- Confirm components are not duplicated.
- Confirm responsive behavior.
- Confirm accessibility considerations.
- Confirm CMS relationships remain intact.
- Confirm Core remains product-neutral.
- Identify any deviations from established standards.

Consult:

references/implementation-checklist.md

## Change Control

Do not:

- Delete existing classes without verifying usage.
- Replace working components unnecessarily.
- Rename established variables without approval.
- Modify unrelated pages.
- Introduce product-specific code into Core.
- Publish production changes without authorization.
- Treat planned functionality as implemented functionality.

When a proposed improvement conflicts with existing architecture:

1. Identify the conflict.
2. Explain the relevant existing standard.
3. Describe the proposed improvement.
4. Explain the tradeoffs.
5. Request approval before making architectural changes.

## Output Requirements

For implementation tasks, provide:

1. Summary of work.
2. Existing components or standards reused.
3. Changes made.
4. Validation performed.
5. Remaining risks or limitations.

Distinguish verified results from assumptions.

Never claim a change was tested unless testing was actually performed.

## Operating Principle

Reuse before creating.

Native before custom.

Consistency before novelty.

Validate before publishing.