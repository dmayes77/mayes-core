# Native First

Use for Webflow component, page, shell, navigation, modal, motion, responsive, and Relume implementation. Confirm current project behavior before applying documented patterns.

## Mayes Digital Technical Philosophy

Mayes Digital uses Webflow as its primary website development platform.

Relume accelerates planning and composition.

Core Design System 2.0 establishes reusable visual and structural standards.

GitHub provides version control for shared code, documentation, and release management.

Third-party integrations extend functionality when justified by actual business requirements.

### Development priorities

1. Functional correctness.
2. Security and data integrity.
3. Accessibility.
4. Maintainability.
5. Architectural consistency.
6. Performance.
7. Development efficiency.

Development speed must not compromise production reliability.

---

---

## Native-First Development

Native Webflow functionality is the preferred implementation method.

Before introducing custom code, evaluate:

- Webflow Designer.
- Webflow Variables.
- Webflow Components.
- Component properties.
- Component slots.
- Component variants.
- Webflow CMS.
- Webflow Interactions.
- Native Webflow Modals.
- Native forms.
- Native layout functionality.
- Native scrolling behavior.
- Native conditional visibility.

### Implementation hierarchy

Choose implementation methods in the following order:

1. Existing approved component or functionality.
2. Existing component property, slot, or variant.
3. Existing Core class or variable.
4. Native Webflow functionality.
5. New reusable native implementation.
6. Existing approved Core custom code.
7. New custom code.

### Custom code justification

When custom code is necessary, document:

- Required functionality.
- Native alternatives evaluated.
- Native limitations.
- Proposed implementation.
- Architectural ownership.
- Dependencies.
- Maintenance implications.
- Testing requirements.

Do not recreate native functionality merely because custom code offers greater familiarity or control.

---

---

## Webflow Master Architecture

Preserve the established shared Webflow master architecture.

The master provides reusable design resources and implementation patterns for Mayes Digital projects.

### Requirements

- Reuse approved variables.
- Reuse approved classes.
- Reuse approved components.
- Preserve component contracts.
- Maintain consistent responsive behavior.
- Avoid competing design systems.
- Avoid unnecessary master duplication.

### Shared changes

Before modifying a shared master resource:

- Identify affected components.
- Identify dependent pages.
- Identify dependent products.
- Evaluate migration requirements.
- Evaluate regression risk.
- Establish validation requirements.

Do not assume changes to the master automatically propagate to previously duplicated client projects.

Verify the actual synchronization and deployment mechanism.

---

---

## Development Discovery

Before implementing a change:

1. Identify the target Webflow project.
2. Identify the affected page or component.
3. Determine the requested outcome.
4. Inspect the current implementation.
5. Review applicable architectural documentation.
6. Identify existing reusable resources.
7. Identify CMS dependencies.
8. Identify integration dependencies.
9. Identify technical constraints.
10. Confirm the authorized scope.

Do not begin implementation from assumptions about the current project.

### Tool access

Use available Webflow development tools when appropriate.

Inspect actual capabilities before attempting operations.

If a required operation is unavailable through the connected tools, identify the necessary manual Webflow Designer action.

Do not claim that a change was performed when the available tools cannot perform it.

---

---

## Relume Development Workflow

Relume is used to accelerate website planning and development.

### Planning

Use Relume for:

- Sitemap generation.
- Page structure.
- Initial wireframes.
- Section composition.
- Content planning.

### Review

Evaluate generated designs using the Experience Design skill.

Confirm:

- Customer objectives.
- Business objectives.
- Page purposes.
- Content hierarchy.
- Conversion paths.
- Organic visibility requirements.

### Core mapping

Map approved sections to existing Core components.

Evaluate:

- Existing component properties.
- Existing component slots.
- Existing section patterns.
- Existing layout utilities.
- Existing responsive behavior.

### Implementation

Adapt the approved Relume composition to the Mayes Digital Core architecture.

Do not import an independent design system, competing variable collection, or duplicate class framework without an approved migration plan.

Relume accelerates development. It does not replace Core.

---

---

## Page Creation

Use the established Page Template when creating new pages in projects that follow the Base architecture.

### Requirements

- Preserve Page Shell.
- Use the Main Content slot.
- Preserve required shared infrastructure.
- Preserve page-level business data bindings.
- Use approved section components.
- Maintain logical heading structure.
- Configure page metadata.
- Validate responsive behavior.

### Canonical section structure

Use the established structure:

```text
section-small | section-medium | section-large
    padding-global
        container-*
            section-content
                layout modifiers
                gap-*
                    content
```

Consult the Core Design System skill for complete structural requirements.

### Avoid

- Recreating the header and footer on individual pages.
- Adding competing horizontal padding systems.
- Duplicating shared navigation.
- Introducing unnecessary page-specific classes.
- Hardcoding information already available through CMS.

---

---

## Page Shell Architecture

Page Shell provides consistent shared website infrastructure.

Preserve the approved component structure and Main Content slot.

Documented shared infrastructure includes:

- `shell-header`
- `shell-footer`
- `shell-mobile-nav`
- `shell-sheets`
- Install banner.
- Announcement functionality.

Verify current component availability and implementation status.

### Responsibilities

Page Shell handles shared website infrastructure.

Individual pages handle page-specific content.

Do not place unrelated page-specific business logic into Page Shell.

### Validation

Confirm:

- Header behavior.
- Footer behavior.
- Mobile navigation.
- Shared sheet availability.
- Business data availability.
- Responsive content clearance.
- Relevant accessibility behavior.

---

---

## Webflow Component Development

Use reusable components for repeated interface patterns.

### Before creating a component

Determine whether the requirement can be satisfied through:

- An existing component.
- An existing property.
- An existing slot.
- An existing variant.
- An existing layout utility.

### Component requirements

A reusable component should have:

- A defined responsibility.
- Consistent naming.
- Appropriate default values.
- Predictable behavior.
- Appropriate responsive behavior.
- Accessible interaction patterns.
- Minimal unnecessary dependencies.

### Component properties

Use properties for supported content and presentation variations.

Examples include:

- Heading text.
- Supporting descriptions.
- Images.
- Links.
- Visibility controls.
- Optional pricing.
- Supported visual variants.

### Component slots

Use slots when meaningful structural flexibility is required.

Avoid introducing slots when a simpler property satisfies the requirement.

### Shared component changes

Preserve existing property contracts and instance behavior.

Do not remove properties, slots, or variants without evaluating affected instances.

---

---

## Class and Variable Implementation

Follow the Core Design System skill.

### Variable collections

Preserve the documented collections:

- Core.
- Theme.
- Surface.
- Motion.
- Primitives.

Inspect current variable definitions before creating or modifying tokens.

### Class responsibilities

Preserve the B4 architecture:

- Base.
- Surface.
- Modifier.
- Decoration.

Use existing classes according to their intended responsibilities.

### Requirements

- Avoid duplicate variables.
- Avoid competing class systems.
- Avoid unnecessary hardcoded values.
- Preserve semantic naming.
- Preserve responsive behavior.
- Avoid global changes for isolated requirements.

### Custom CSS

Use custom CSS only when native Webflow styling cannot adequately satisfy the requirement or when approved Core infrastructure already provides the behavior.

---

---

## Native Navigation

Use established Webflow navigation and link functionality.

### Base mobile navigation

The documented Base architecture uses:

Home | Services | Call | Our Work | Quote

Home, Services, and Call occupy established positions.

The remaining destinations may vary according to approved business requirements.

### Requirements

- Preserve approved navigation components.
- Use appropriate native links.
- Maintain accurate destinations.
- Preserve active states.
- Support accessible labels.
- Respect device safe areas.
- Avoid unnecessary JavaScript routing.

### Telephone links

Use valid telephone links for calling functionality.

Retrieve the telephone number from the approved business data source where applicable.

Do not duplicate telephone information across unrelated components.

### Product-specific navigation

ShopFlow, DetailFlow, and other products may use different approved navigation patterns.

Do not force Base navigation into incompatible product experiences.

---

---

## Native Modals and Sheets

Use the approved native Webflow Modal-based sheet architecture.

### Documented naming pattern

```text
Sheet / Name
```

Preserve established sheet classes and supported attributes.

Documented attributes include:

```text
data-sheet
data-sheet-open
```

Verify their current responsibilities before modifying them.

### Sheet structure

Use existing sheet components and established structural patterns.

The documented architecture includes:

- Sheet panel.
- Sheet header.
- Sheet title.
- Close control.
- Scrollable sheet body.
- Optional footer actions.

### Requirements

- Preserve native modal behavior.
- Maintain appropriate scrolling.
- Respect device safe areas.
- Preserve accessible close controls.
- Validate keyboard behavior.
- Validate focus management.
- Avoid unnecessary duplicate scroll-lock implementations.

### Custom code boundary

Do not reintroduce the retired custom sheet engine when native Webflow Modals satisfy the requirement.

Where custom enhancements remain necessary, preserve approved Core responsibilities and document the native limitation.

---

---

## Motion Implementation

Use established native Webflow Interactions.

The documented Core motion vocabulary includes:

```text
data-motion="fade"
data-motion="rise"
data-motion="scale"
data-motion="stagger"
data-motion="hero"
```

Verify current attribute contracts.

### Requirements

- Preserve existing motion patterns.
- Use approved motion variables.
- Respect reduced-motion preferences.
- Avoid delaying essential content.
- Avoid unnecessary animation dependencies.
- Preserve interaction responsiveness.

The documented Core v2 architecture does not require GSAP as a universal dependency.

Do not introduce GSAP or another animation library into Core without a justified and approved architectural decision.

---

---

## Responsive Technical Implementation

Follow the Core Design System responsive standards.

### Requirements

- Reuse existing responsive utilities.
- Preserve Webflow breakpoint inheritance.
- Avoid unnecessary breakpoint-specific overrides.
- Preserve device safe-area behavior.
- Maintain accessible fixed navigation.
- Preserve native scrolling behavior.
- Avoid unintended horizontal overflow.
- Ensure forms remain usable with mobile keyboards.

### Testing

Inspect relevant desktop, tablet, and mobile widths.

Test actual browser behavior where available.

Do not report physical-device testing when only browser simulation was performed.

---
