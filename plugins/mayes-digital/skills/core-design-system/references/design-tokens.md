# Mayes Digital Core Design System 2.0
## Design Tokens Reference

### Purpose

Define how Claude must inspect, reuse, implement, and validate design variables within Mayes Digital's Core Design System 2.0.

Design tokens establish visual consistency across websites while allowing each client to maintain its own brand identity.

**Primary rule: Reuse existing variables before creating new ones.**

## 1. Source of Truth

The authoritative source is the `dmayes77/mayes-core` GitHub repository.

Consult:

- `docs/ARCHITECTURE.md`
- `docs/DECISIONS.md`
- The current Webflow Core Design System 2.0 master

Repository documentation defines architectural intent. The current Webflow implementation establishes which variables actually exist.

When documentation and implementation differ, identify the discrepancy before making changes.

Never invent variable names or assume a documented variable exists in Webflow.

## 2. Variable Collections

Core Design System 2.0 uses five variable collections.

| Collection | Responsibility |
|---|---|
| Core | Typography, spacing, sizing, and layout |
| Theme | Semantic colors and brand identity |
| Surface | Surface-related presentation values |
| Motion | Animation timing and motion properties |
| Primitives | Foundational values referenced by other variables |

Maintain these collections unless an approved architectural change requires otherwise.

Do not create additional collections simply to organize client-specific styling.

## 3. Core Collection

The Core collection establishes shared dimensions and layout standards.

Use it for established typography, spacing, and sizing values.

### Typography

Follow the typography scale already defined in Webflow.

Requirements:

- Use existing font-size variables.
- Preserve established heading hierarchy.
- Maintain consistent line heights.
- Reuse typography classes.
- Avoid unnecessary font-size overrides.
- Verify readability across breakpoints.

Do not introduce arbitrary typography values when existing variables satisfy the requirement.

Type and readability rules:

- Use Core's existing text styles. Do not add new font sizes or weights, or override them on single elements, without approval.
- Core's styles use weights 400, 500, 600 and 700. That is expected; do not report it as a defect or change a Core style to reduce the count.
- On each screen, use only as many of the approved styles as the hierarchy needs, so it stays clear what to read first.
- Use one font family, or two at most (one for headings, one for body).
- Load only the font weights and families the site actually uses.
- Keep paragraph text no wider than about 600px (roughly 65 to 75 characters per line). A block that also holds headings may be wider: Core's hero-copy is 40rem (640px) and stays as it is.
- Set body text line height at 1.4 to 1.6 times the font size; headings can be tighter.
- Space paragraphs about 20 to 30px apart.

### Spacing

Follow the established Tailwind-inspired spacing scale.

Requirements:

- Use existing spacing variables.
- Prefer layout gaps for spacing between flex and grid children.
- Use established section classes for vertical spacing.
- Use `padding-global` for horizontal page gutters.
- On phones, `padding-global` keeps 16 to 24px side gutters so content never touches the screen edge.
- Avoid duplicating spacing responsibilities.
- Verify spacing across responsive breakpoints.

Do not introduce a new spacing primitive merely because an existing value differs slightly from a proposed design.

## 4. Theme Collection

The Theme collection provides semantic color values.

Established brand color names include:

- Primary
- Secondary
- Accent

Neutral colors describe their intended presentation roles:

- Page
- Subtle
- Muted
- Dark

Text colors placed over fills follow the established `on-<fill>` naming convention.

### Rules

Use semantic variables rather than raw color values wherever appropriate.

Avoid creating duplicate colors with different names.

Do not reintroduce deprecated naming conventions such as the former Brand and Accent groups.

Preserve the distinction between brand colors and neutral interface colors.

Client branding should be implemented through the existing theme architecture.

### Accessibility

Color decisions must account for:

- Text contrast
- Interactive element visibility
- Focus indicators
- Disabled states
- Error and success feedback
- Light and dark surfaces

Do not assume that a color is accessible simply because it comes from the design system.

Validate the actual foreground and background combination.

## 5. Surface Collection

The Surface collection supports consistent presentation of interface surfaces.

Before modifying surface styling:

1. Inspect the existing variables.
2. Identify the component's intended surface treatment.
3. Reuse established surface values.
4. Preserve consistency across related components.
5. Verify the result across responsive layouts.

Surface utilities must not take ownership of unrelated layout behavior.

For example:

- Surface utilities control surface appearance.
- Radius utilities control corner rounding.
- Shadow utilities control elevation effects.
- Layout utilities control positioning and arrangement.

Keep these responsibilities separate.

## 6. Motion Collection

Motion variables support consistent animation behavior.

Motion should communicate:

- Hierarchy
- State changes
- Interaction feedback
- Spatial relationships

Use the established motion vocabulary:

- Fade
- Rise
- Scale
- Stagger
- Hero

Prefer Webflow Interactions for supported animation behavior.

Avoid introducing animation libraries when native Webflow functionality is sufficient.

Respect reduced-motion preferences.

Do not introduce unnecessary animation solely for decoration.

## 7. Primitives Collection

Primitives provide foundational values used by higher-level variables.

The collection is intentionally ordered last in Webflow.

### Rules

- Prefer semantic variables over direct primitive usage.
- Do not create duplicate primitives.
- Preserve relationships between primitives and semantic tokens.
- Use calculated values when the existing architecture specifies them.
- Avoid hardcoding values that should inherit from established variables.

Off-scale sizing should follow the documented calculated-value approach rather than automatically creating new primitives.

## 8. Responsive Variables

Responsive styling must use the existing Webflow breakpoint and variable architecture.

Before introducing a responsive override:

1. Inspect the desktop implementation.
2. Identify the actual responsive requirement.
3. Check whether existing classes already address it.
4. Reuse established responsive variables.
5. Apply the smallest necessary change.
6. Validate affected breakpoints.

Do not create breakpoint-specific overrides without a demonstrated need.

## 9. Component Integration

Components should consume design variables rather than independently define visual standards.

For example, a button should inherit its established typography, spacing, colors, and interaction states from the design system.

Do not create separate button token systems for individual clients when the existing Core component supports the requirement.

Client-specific variations should use established theme values, component properties, or approved variants.

## 10. Token Creation Procedure

Before creating a variable, Claude must:

1. Identify the required design property.
2. Search existing collections.
3. Determine whether a suitable variable already exists.
4. Check whether a semantic alias is appropriate.
5. Verify naming conventions.
6. Confirm the variable belongs in the correct collection.
7. Evaluate whether the addition duplicates existing functionality.
8. Explain the reason for the proposed variable.

When an existing variable can satisfy the requirement, reuse it.

Do not create new variables for convenience alone.

## 11. Token Audit

Evaluate the following:

- [ ] Correct variable collection is used.
- [ ] Existing variables are reused.
- [ ] No duplicate semantic values were introduced.
- [ ] Typography follows established scales.
- [ ] Only Core's existing text styles are used, with no one-off sizes or weights.
- [ ] No screen uses more than two font families.
- [ ] Only the font weights and families the site actually uses are loaded.
- [ ] Paragraph text stays within about 600px wide.
- [ ] Body text line height is 1.4 to 1.6 times the font size.
- [ ] Phone side gutters are 16 to 24px.
- [ ] Spacing follows established scales.
- [ ] Color naming follows current conventions.
- [ ] Surface responsibilities remain separate.
- [ ] Motion follows established standards.
- [ ] Responsive behavior is verified.
- [ ] Accessibility is evaluated.
- [ ] No deprecated naming conventions were reintroduced.

Report each finding as:

**Pass:** Verified against the implementation.

**Fail:** A confirmed violation exists.

**Not Tested:** The requirement could not be verified.

**Not Applicable:** The requirement does not apply.

## 12. Change Management

Do not rename, delete, or restructure existing variable collections without explicit authorization.

Before proposing a significant change, explain:

- The existing implementation.
- The identified limitation.
- The proposed modification.
- The affected components.
- Potential migration requirements.
- Validation requirements.

Never treat a proposed architectural improvement as authorization to modify production.

## Operating Standard

**Use the existing system first. Extend only when necessary. Validate every change.**