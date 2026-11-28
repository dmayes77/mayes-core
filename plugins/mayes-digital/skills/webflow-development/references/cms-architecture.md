# Cms Architecture

Use for collection design, business data, and dynamic content. Confirm current Webflow collection contracts before changing them.

## CMS Architecture

Webflow CMS provides structured content management for applicable websites.

### CMS responsibilities

Use CMS for information that benefits from:

- Centralized management.
- Repeated presentation.
- Dynamic page generation.
- Structured relationships.
- Consistent business information.
- Client-managed content.

### Typical collection candidates

Depending on the project:

- Business Settings.
- Business Hours.
- Services.
- Projects.
- Reviews.
- Frequently Asked Questions.
- Service Areas.
- Team Members.

These are collection candidates, not mandatory collections for every project.

Inspect the existing CMS before creating new collections.

### Collection design

Define:

- Collection purpose.
- Field responsibilities.
- Required fields.
- Optional fields.
- Reference relationships.
- Slug behavior.
- Publishing requirements.
- Display conditions.

Avoid creating fields that duplicate existing authoritative information.

### Content integrity

Never invent business information, customer reviews, qualifications, project evidence, or pricing.

### Empty states

Every CMS collection list on a page (for example Our Work, job pages, or reviews) uses Webflow's native Empty State, styled with Core classes.

- Never leave Webflow's default "No items found."
- Say what will appear there and give a next step, such as Call or Request a Quote.
- Keep the Core version generic; each template sets its own copy.

---

---

## Business Data Architecture

Preserve the established centralized business information architecture.

The documented Base implementation uses page-level `shell-data` to expose business information to shared infrastructure.

### Documented collection-list configuration

- Business Settings: one item.
- Business Hours: up to seven items.

Verify current implementation requirements before changing these limits.

### Responsibilities

The business data layer may support:

- Business identity.
- Telephone numbers.
- Business hours.
- Location.
- Directions.
- Social links.
- Shared business information.
- Applicable structured data.

### Requirements

- Preserve required data attributes.
- Preserve CMS relationships.
- Avoid duplicate hardcoded business information.
- Investigate missing-data warnings.
- Verify business information across shared components.

### Component boundary

The documented architecture places required CMS-bound business data at the page level rather than inside reusable components.

Evaluate current Webflow capabilities before proposing a different architecture.

Do not independently restructure the business data layer.

---

---

## Dynamic CMS Content

Use CMS bindings to present structured content consistently.

### Requirements

- Bind content to the correct fields.
- Preserve meaningful relationships.
- Handle missing optional content.
- Avoid displaying empty labels.
- Preserve appropriate conditional visibility.
- Validate collection filters.
- Validate collection limits.
- Validate collection sorting.
- Validate dynamic page links.

### Dynamic pages

Each dynamic page should provide:

- Accurate page-specific content.
- Meaningful heading structure.
- Appropriate metadata.
- Correct internal links.
- Relevant conversion actions.
- Consistent responsive behavior.

Coordinate metadata and discoverability requirements with Organic Visibility.

### Validation

Test populated, partially populated, and empty content states where applicable.

Do not assume that a component works correctly simply because one CMS item renders successfully.

---
