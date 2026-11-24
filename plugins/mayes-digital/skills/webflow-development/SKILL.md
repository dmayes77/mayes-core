---
name: webflow-development
description: Implements and maintains Mayes Digital Webflow websites using native-first development, Core Design System 2.0, reusable components, CMS architecture, Relume workflows, custom code, GitHub repositories, versioned releases, and approved third-party integrations. Use when building websites, modifying Webflow projects, configuring CMS collections, implementing functionality, troubleshooting technical issues, managing dependencies, or preparing deployments.
---

# Mayes Digital Webflow Development

## 1. Purpose

Establish consistent technical development standards for Mayes Digital Webflow websites and reusable digital products.

Development must prioritize maintainability, scalability, performance, accessibility, native Webflow functionality, and architectural consistency.

The objective is to build reliable production websites without introducing unnecessary technical complexity.

**Core principle: Native first. Reusable by design. Custom only when justified.**

---

## 2. When to Use This Skill

Activate this skill when:

- Creating Webflow websites.
- Implementing approved designs.
- Modifying existing pages.
- Creating or modifying components.
- Configuring CMS collections.
- Establishing dynamic content relationships.
- Implementing forms.
- Configuring third-party integrations.
- Developing custom JavaScript or CSS.
- Troubleshooting technical issues.
- Managing Core dependencies.
- Reviewing GitHub repositories.
- Preparing versioned releases.
- Migrating legacy implementations.
- Preparing websites for deployment.

Use the Core Design System skill for structural and visual standards.

Use Experience Design for customer-facing design decisions.

Use Quality Assurance for comprehensive implementation verification.

---

## 3. Source of Truth

Primary shared repository:

`dmayes77/mayes-core`

Consult the latest applicable versions of:

- `README.md`
- `docs/ARCHITECTURE.md`
- `docs/DECISIONS.md`
- `docs/NATIVE_FIRST.md`
- `docs/RELEASES.md`
- `base/README.md`
- `check.sh`

Review applicable product repositories when working on product-specific functionality.

### Source hierarchy

Evaluate implementation requirements using:

1. Explicitly authorized project requirements.
2. Current approved architectural decisions.
3. Current repository documentation.
4. Actual Webflow project configuration.
5. Existing implementation patterns.
6. Official Webflow documentation.
7. Proposed improvements.

When sources conflict, identify the discrepancy.

Do not silently replace an approved architectural decision with an existing legacy implementation.

Do not assume documentation establishes that functionality has been deployed.

---

## 4. Mayes Digital Technical Philosophy

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

## 5. Native-First Development

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

## 6. Architectural Ownership

Maintain clear boundaries between shared infrastructure, product-specific functionality, and client-specific implementation.

### Universal Core

Core owns reusable, product-neutral infrastructure.

Examples include:

- Shared design variables.
- Shared class architecture.
- Page Shell infrastructure.
- Reusable components.
- Responsive utilities.
- Shared interaction infrastructure.
- Common business data functionality.
- Shared accessibility behavior.
- Approved universal custom code.

Core must not contain unnecessary product-specific or client-specific logic.

### Base

Base provides the standard local-business website experience built upon Core.

Examples include:

- Local-business navigation.
- Service presentation.
- Business information.
- Quote and contact experiences.
- Local-business page compositions.

### Product layer

Product-specific implementations extend Core according to their operational requirements.

Examples include:

- ShopFlow.
- DetailFlow.
- Other approved Mayes Digital products.

Product-specific integrations and business logic belong in the appropriate product layer.

### Client layer

Client implementations own:

- Business identity.
- Branding.
- Content.
- Photography.
- Services.
- Products.
- Projects.
- Reviews.
- Business information.
- Client-specific integrations.
- Client-specific page composition.

Do not move client-specific requirements into universal Core without a justified architectural decision.

---

## 7. Webflow Master Architecture

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

## 8. Development Discovery

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

## 9. Relume Development Workflow

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

## 10. Page Creation

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

## 11. Page Shell Architecture

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

## 12. Webflow Component Development

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

## 13. Class and Variable Implementation

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

## 14. CMS Architecture

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

---

## 15. Business Data Architecture

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

## 16. Dynamic CMS Content

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

## 17. Native Navigation

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

## 18. Native Modals and Sheets

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

## 19. Forms and Submission Architecture

Use native Webflow forms where they satisfy the business requirement.

### Form requirements

- Use meaningful field names.
- Use appropriate input types.
- Preserve accessible labels.
- Identify required fields.
- Validate submitted values.
- Provide appropriate success states.
- Provide appropriate error states.
- Collect only necessary information.

### Submission architecture

Identify:

- Submission destination.
- Required data fields.
- Integration requirements.
- Validation requirements.
- Consent requirements.
- Success behavior.
- Failure behavior.

### Multi-step forms

Use progressive disclosure when justified by customer needs.

The documented Mayes Digital quiz-style quote pattern collects relevant answers and submits them through one native form.

Verify the current availability of the reusable quote implementation.

### Testing

Use authorized test submissions.

Avoid creating unintended production leads, sending unnecessary customer notifications, or triggering unrelated automations.

---

## 20. Lead Management Integrations

Integrate websites with approved lead-management platforms when required.

GoHighLevel may provide lead-management functionality for applicable Mayes Digital projects.

Do not assume every website requires the same integration.

### Integration responsibilities

Depending on the project:

- Contact creation.
- Inquiry capture.
- Lead routing.
- Appointment scheduling.
- Customer communication.
- Workflow automation.
- Opportunity management.

### Integration planning

Before implementation:

- Confirm the business process.
- Identify the authoritative data source.
- Identify required fields.
- Define field mappings.
- Identify authentication requirements.
- Define consent handling.
- Define failure behavior.
- Define duplicate-record handling.
- Identify testing requirements.

### Communication consent

Do not assume a website inquiry constitutes consent to unrelated marketing communications.

Preserve applicable consent records and opt-out behavior.

Verify applicable legal and platform requirements.

### Validation

Confirm that submitted information reaches the intended destination with correct field values.

A successful website submission does not automatically establish successful CRM delivery.

---

## 21. Third-Party Integration Standards

Use external services only when they provide justified functionality.

### Evaluation criteria

- Business requirements.
- Native Webflow alternatives.
- API availability.
- Authentication requirements.
- Reliability.
- Data ownership.
- Security.
- Privacy.
- Performance impact.
- Maintenance requirements.
- Cost.
- Offboarding implications.

### Requirements

- Use documented integration methods.
- Verify current API capabilities.
- Avoid unnecessary dependencies.
- Protect credentials.
- Handle failures appropriately.
- Avoid duplicate integrations.
- Document configuration requirements.

### Integration limitations

Do not invent API endpoints, supported features, authentication methods, or integration capabilities.

If documentation or access is unavailable, identify the unresolved requirement.

---

## 22. ShopFlow Development

ShopFlow is a product-specific ecommerce experience built using Webflow and approved Shopify integration infrastructure.

Preserve the separation between universal Core functionality and ShopFlow-specific functionality.

### Responsibilities

Depending on approved product capabilities:

- Product presentation.
- Collection browsing.
- Product details.
- Product variants.
- Cart interactions.
- Checkout transitions.
- Ecommerce navigation.
- Relevant customer information.

### Integration requirements

Verify the current approved Shopify and Storesynk implementation.

Determine the authoritative source for:

- Product information.
- Pricing.
- Inventory.
- Product variants.
- Cart state.
- Checkout.
- Order information.

### Requirements

- Do not duplicate authoritative ecommerce data unnecessarily.
- Do not expose privileged Shopify credentials.
- Preserve accurate pricing and inventory behavior.
- Maintain predictable checkout transitions.
- Keep product-specific scripts outside universal Core.

Do not assume planned ecommerce capabilities have been implemented.

---

## 23. DetailFlow Development

DetailFlow is a product-specific auto-detailing experience intended to connect branded customer interactions with approved operational infrastructure.

### Potential responsibilities

Subject to approved implementation:

- Service discovery.
- Service selection.
- Vehicle information.
- Quote requests.
- Appointment scheduling.
- Customer communication.
- Maintenance eligibility.
- Customer service management.

### Integration architecture

Evaluate the approved GoHighLevel-based operational architecture and current API capabilities.

Do not assume GoHighLevel natively supports every detailing-specific business requirement.

### Requirements

- Preserve accurate service information.
- Maintain approved service eligibility rules.
- Protect customer and vehicle information.
- Avoid unnecessary duplicate data entry.
- Keep detailing-specific logic outside universal Core.
- Document integration gaps.
- Verify actual booking and customer-management capabilities.

Do not represent planned DetailFlow functionality as currently operational.

---

## 24. Custom JavaScript Standards

Introduce custom JavaScript only when justified.

### Requirements

Custom JavaScript should:

- Have a defined responsibility.
- Use understandable naming.
- Minimize global namespace pollution.
- Avoid unnecessary dependencies.
- Handle missing elements safely.
- Handle errors appropriately.
- Preserve existing functionality.
- Support repeated initialization where applicable.
- Avoid duplicate event listeners.
- Respect accessibility requirements.
- Respect reduced-motion preferences.

### DOM integration

Prefer established data attributes and documented component contracts.

Avoid fragile selectors that depend on incidental visual styling or unnecessary DOM depth.

### Initialization

Preserve the approved Core initialization architecture.

Do not create competing initialization systems without justification.

### Security

Do not insert untrusted content into the DOM through unsafe HTML operations.

Validate external data before using it in sensitive contexts.

### Validation

- Check JavaScript syntax.
- Inspect browser console output.
- Test relevant interaction paths.
- Test missing-data conditions.
- Test responsive behavior.
- Perform applicable regression testing.

---

## 25. Custom CSS Standards

Use native Webflow styling wherever practical.

### Approved custom CSS responsibilities

Consult the current Core documentation.

Previously documented exceptions include functionality involving:

- Root HTML behavior.
- Hidden states.
- Reduced-motion handling.
- Tap-highlight behavior.
- Modal slide behavior.
- Modal backdrop behavior.
- Scroll-lock behavior.

Verify whether these exceptions remain necessary in the current implementation.

### Requirements

- Reuse existing Core variables.
- Preserve class architecture.
- Avoid unnecessary selector specificity.
- Avoid excessive `!important` declarations.
- Avoid duplicating native Webflow styles.
- Preserve responsive behavior.
- Document non-obvious rules.

### Variable references

Use the current exported Webflow variable names.

The documented Core collection uses the `--_core---` naming namespace.

Do not guess generated CSS variable names.

Inspect the actual published or exported implementation.

---

## 26. Motion Implementation

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

## 27. GitHub Repository Management

GitHub provides version control for applicable shared code, product code, documentation, and releases.

### Repository inspection

Before modifying repository code:

- Confirm the correct repository.
- Confirm the target branch.
- Inspect the current file structure.
- Review relevant documentation.
- Review existing implementation.
- Identify build and validation procedures.
- Identify affected dependencies.

### Change requirements

- Keep changes scoped to the requested outcome.
- Preserve established architecture.
- Avoid unrelated refactoring.
- Update relevant documentation.
- Execute applicable validation.
- Use meaningful commit descriptions.
- Preserve existing public interfaces where practical.

### Shared Core changes

Maintain product neutrality.

Do not introduce client-specific or product-specific logic into universal Core modules.

### Authorization

Do not commit, push, merge, tag, or release changes outside the authorized scope.

---

## 28. Versioned Core Releases

Production websites must use approved versioned Core dependencies.

### Requirements

- Identify the currently deployed version.
- Identify the current approved release.
- Use matching release versions for related Core CSS and JavaScript.
- Pin production dependencies to approved tags.
- Avoid loading production dependencies directly from `@main`.
- Evaluate compatibility before upgrading.
- Document migration requirements.

### Illustrative dependency pattern

```text
Repository CDN URL
    + approved release tag
    + approved distribution file
```

Retrieve the actual dependency URLs from current repository documentation.

Do not invent CDN paths or release tags.

### Release upgrades

Before upgrading:

1. Review release documentation.
2. Identify changed functionality.
3. Identify breaking changes.
4. Identify affected projects.
5. Validate compatibility.
6. Establish rollback procedures.
7. Update dependencies consistently.
8. Verify deployed behavior.

Do not hardcode a permanently designated latest version into this skill.

---

## 29. Repository Validation

Consult the current repository validation scripts.

The documented Mayes Core `check.sh` process includes checks involving:

- JavaScript syntax.
- Source and distribution consistency.
- Product neutrality.
- Module version declarations.

Inspect the current script before execution.

### Validation requirements

- Run applicable checks.
- Investigate failures.
- Rebuild distribution files when required.
- Preserve source and distribution consistency.
- Document actual results.

### Reporting

Distinguish between:

- Checks executed successfully.
- Checks executed with failures.
- Checks not executed.
- Checks not applicable.

Do not claim that tests passed when they were not executed.

---

## 30. Security and Credential Management

Protect business information, customer information, and integration credentials.

### Never expose

- Private API keys.
- Administrative access tokens.
- Database credentials.
- Private signing secrets.
- Privileged integration credentials.
- Customer information unrelated to the task.

### Client-side code

Assume JavaScript delivered to the browser can be inspected by visitors.

Do not place privileged credentials in:

- Webflow custom code.
- HTML embeds.
- Client-side JavaScript.
- Public GitHub repositories.
- CMS fields accessible to visitors.

### Server-side operations

Use an approved server-side service or secure integration layer when privileged operations are required.

### Additional requirements

- Apply least-privilege access.
- Validate external input.
- Use HTTPS.
- Avoid logging sensitive information.
- Protect webhook endpoints appropriately.
- Document credential configuration without exposing secret values.

If credentials are accidentally exposed, identify the risk and recommend appropriate rotation and remediation.

---

## 31. Privacy and Consent Implementation

Use approved privacy and consent infrastructure.

### Requirements

- Identify applicable data collection.
- Identify optional tracking functionality.
- Preserve user preference controls.
- Respect recorded consent preferences.
- Avoid unnecessary collection of personal information.
- Protect submitted customer information.
- Preserve applicable opt-out functionality.

### Cookie preferences

Use the established consent architecture where applicable.

Inspect the current implementation before introducing a new consent mechanism.

Do not create competing consent systems.

### Legal boundary

Technical implementation does not independently establish legal compliance.

Identify requirements that need legal or business-owner confirmation.

---

## 32. Performance-Oriented Development

Development decisions must support efficient website behavior.

### Requirements

- Minimize unnecessary scripts.
- Avoid duplicate dependencies.
- Use appropriately sized images.
- Avoid unnecessary render-blocking resources.
- Preserve efficient layout structures.
- Avoid excessive DOM complexity.
- Load third-party integrations only where justified.
- Avoid unnecessary animation libraries.
- Prevent avoidable layout shifts.

### Images

Use appropriate image formats and dimensions.

Preserve Core image container architecture.

Evaluate loading behavior according to the image's role.

Do not indiscriminately lazy-load critical hero imagery.

### Measurement

Coordinate performance testing with Quality Assurance.

Do not invent performance scores or claim optimization results without measurement.

---

## 33. Technical SEO Implementation

Coordinate technical discoverability requirements with Organic Visibility.

Development responsibilities may include:

- Page title configuration.
- Meta descriptions.
- Canonical URLs.
- Sitemap configuration.
- Robots directives.
- Redirects.
- Semantic HTML.
- Structured data.
- Open Graph metadata.
- Dynamic CMS metadata.

### Structured data

Inspect existing Core business structured-data functionality before adding new JSON-LD.

Avoid duplicate or contradictory structured data.

Use verified business information.

### Requirements

- Preserve correct indexing behavior.
- Avoid accidentally blocking production pages.
- Avoid exposing staging content unintentionally.
- Validate redirects.
- Validate canonical destinations.
- Preserve meaningful internal links.

Organic Visibility establishes the search strategy.

Webflow Development implements the technical requirements.

---

## 34. Responsive Technical Implementation

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

## 35. Accessibility Implementation

Accessibility is a technical implementation responsibility as well as an experience design responsibility.

Use WCAG 2.2 Level AA as the proposed evaluation baseline unless another applicable requirement is established.

### Requirements

- Use appropriate semantic elements.
- Provide accessible names.
- Preserve meaningful heading hierarchy.
- Support keyboard interaction.
- Maintain visible focus indicators.
- Provide appropriate alternative text.
- Associate labels with form controls.
- Communicate validation errors.
- Preserve appropriate modal focus behavior.
- Respect reduced-motion preferences.

### Native functionality

Native Webflow components must still be evaluated for accessibility.

Do not assume native implementation establishes complete accessibility conformance.

Coordinate detailed verification with Quality Assurance.

---

## 36. Troubleshooting Workflow

When investigating a technical problem:

1. Define the reported symptom.
2. Identify the affected project and environment.
3. Reproduce the issue when possible.
4. Inspect relevant implementation.
5. Inspect browser console output.
6. Inspect network behavior where applicable.
7. Identify affected dependencies.
8. Compare expected and actual behavior.
9. Establish the likely root cause.
10. Implement the smallest justified correction.
11. Retest the original issue.
12. Perform relevant regression testing.

### Troubleshooting requirements

- Distinguish symptoms from root causes.
- Avoid speculative changes.
- Avoid modifying multiple unrelated systems simultaneously.
- Preserve existing working functionality.
- Document unresolved conditions.

Do not report a root cause as confirmed without sufficient evidence.

---

## 37. Legacy Migration

When migrating legacy functionality to the current Core architecture:

### Preparation

- Identify legacy components.
- Identify legacy classes.
- Identify legacy variables.
- Identify legacy scripts.
- Identify current dependencies.
- Identify affected pages and products.

### Migration

- Map legacy functionality to approved Core resources.
- Prefer native replacements.
- Preserve necessary behavior.
- Avoid duplicate initialization.
- Preserve CMS relationships.
- Preserve existing customer-facing functionality.

### Removal

Before removing legacy resources:

- Verify current usage.
- Verify dependent components.
- Verify replacement functionality.
- Establish rollback options.
- Perform regression testing.

Do not delete a legacy resource solely because its naming differs from the current standard.

---

## 38. Development Change Control

Classify changes according to their scope.

| Change type | Scope |
|---|---|
| Content | Text, images, or CMS values |
| Presentation | Styling or visual properties |
| Component | Reusable structure or behavior |
| Functional | Interactions, forms, or business functionality |
| Integration | External services or data relationships |
| Architectural | Shared Core contracts or infrastructure |
| Release | Versioned dependencies or deployment |

### Approval requirements

Seek appropriate authorization before:

- Changing shared architectural contracts.
- Introducing new external dependencies.
- Removing existing functionality.
- Changing integration destinations.
- Performing destructive CMS operations.
- Publishing production changes.
- Creating or promoting releases.

Minor changes within an explicitly authorized task do not require unnecessary repeated confirmation.

---

## 39. Staging and Production

Distinguish development, staging, and production environments.

### Development

Used for implementation and initial inspection.

### Staging

Used for applicable functional, responsive, accessibility, and integration testing before production deployment.

### Production

The customer-facing environment.

### Requirements

- Identify the target environment.
- Avoid unintended production changes.
- Protect staging from unintended indexing.
- Avoid sending test data into production workflows unnecessarily.
- Validate environment-specific configuration.
- Confirm deployment authorization.

Do not assume that behavior verified in one environment is identical in another.

---

## 40. Deployment and Publishing

Publishing is a separate action from implementation.

### Before publishing

Confirm:

- Requested changes are complete.
- Applicable Core standards are preserved.
- Required dependencies are correctly versioned.
- Relevant functionality has been tested.
- Responsive behavior has been evaluated.
- Accessibility implications have been evaluated.
- Integration configuration is appropriate.
- Critical unresolved issues are disclosed.
- Publishing authorization exists.

### After publishing

Where access permits:

- Verify the published website.
- Verify affected pages.
- Verify relevant interactions.
- Verify dependency loading.
- Verify form and integration behavior where authorized.
- Investigate unexpected errors.

Do not claim production deployment or successful publishing without confirmation.

---

## 41. Rollback and Recovery

Consider rollback requirements before significant changes.

### Potential rollback resources

- Webflow backups.
- Previous approved Core releases.
- GitHub version history.
- Documented configuration.
- Previous integration settings.
- Existing component definitions.

Verify availability before relying on any recovery mechanism.

### Rollback requirements

- Identify the affected change.
- Identify the last known working state.
- Evaluate dependencies.
- Preserve unrelated valid changes.
- Obtain appropriate authorization.
- Verify restored functionality.

Do not perform destructive restoration without understanding its impact.

---

## 42. Development Validation Checklist

Before reporting implementation completion, evaluate applicable requirements.

### Architecture

- [ ] Correct project identified.
- [ ] Current implementation inspected.
- [ ] Approved Core architecture preserved.
- [ ] Existing resources reused.
- [ ] Product and client boundaries preserved.

### Native implementation

- [ ] Native alternatives evaluated.
- [ ] Existing components reused where appropriate.
- [ ] Custom code justified.
- [ ] Unnecessary dependencies avoided.

### CMS

- [ ] Existing collections evaluated.
- [ ] Field contracts preserved.
- [ ] Dynamic bindings verified.
- [ ] Missing content handled appropriately.

### Functionality

- [ ] Relevant interactions tested.
- [ ] Navigation destinations verified.
- [ ] Forms evaluated.
- [ ] Integration behavior evaluated.
- [ ] Error states evaluated.

### Code

- [ ] Syntax checks completed where applicable.
- [ ] Existing functionality preserved.
- [ ] Source and distribution consistency evaluated.
- [ ] Browser errors investigated.

### Security

- [ ] Privileged credentials protected.
- [ ] Sensitive information handled appropriately.
- [ ] Consent requirements evaluated.
- [ ] Integration permissions appropriate.

### Release

- [ ] Approved dependencies identified.
- [ ] Production versions pinned.
- [ ] Regression risks evaluated.
- [ ] Deployment status accurately reported.

---

## 43. Development Reporting

At the completion of an implementation task, provide a report proportional to the work performed.

### Requested outcome

Describe the authorized objective.

### Implementation

Identify:

- Pages modified.
- Components modified.
- CMS resources modified.
- Code files modified.
- Integrations modified.
- Dependencies modified.

### Existing resources reused

Identify applicable Core components, classes, variables, native functionality, and shared modules.

### Technical decisions

Explain significant implementation choices.

When custom code was introduced, explain why native functionality was insufficient.

### Validation

Report:

- Tests performed.
- Tests passed.
- Tests failed.
- Tests not performed.
- Remaining verification requirements.

### Deviations

Identify departures from approved architecture.

Explain their justification and authorization status.

### Remaining risks

Disclose:

- Missing access.
- Unavailable tool capabilities.
- Unverified integrations.
- Incomplete testing.
- Potential regressions.
- Pending manual Designer actions.

### Deployment status

Use an accurate status:

- Proposed.
- Implemented but unverified.
- Implemented and verified.
- Ready for authorized publishing.
- Published and verified.

---

## 44. Cross-Skill Coordination

### Experience Design

Defines:

- Customer objectives.
- User journeys.
- Interaction requirements.
- Visual hierarchy.
- Conversion experience.

### Core Design System

Defines:

- Variables.
- Classes.
- Components.
- Responsive architecture.
- Shared visual standards.

### Webflow Development

Defines:

- Native implementation.
- CMS configuration.
- Custom code.
- Integrations.
- Repository changes.
- Release implementation.
- Deployment procedures.

### Organic Visibility

Defines:

- Search intent.
- Local discoverability.
- Content strategy.
- Metadata requirements.
- Organic search opportunities.

### Quality Assurance

Verifies:

- Functional behavior.
- Accessibility.
- Performance.
- Responsive behavior.
- Integration reliability.
- Regression risk.
- Release readiness.

Use these skills together according to the task.

Do not duplicate their complete responsibilities.

---

## 45. Prohibited Development Practices

Do not:

- Introduce competing design systems.
- Duplicate existing components unnecessarily.
- Replace native functionality without justification.
- Hardcode authoritative CMS information unnecessarily.
- Introduce product-specific logic into universal Core.
- Expose privileged credentials.
- Invent integration capabilities.
- Introduce unnecessary dependencies.
- Load unversioned development-branch code in production.
- Remove shared resources without dependency inspection.
- Modify unrelated project resources.
- Fabricate test results.
- Conceal implementation limitations.
- Treat planned functionality as implemented.
- Publish without authorization.

---

## Operating Standard

**Inspect before changing.**

**Reuse before creating.**

**Native before custom.**

**Core before product extensions.**

**Structured data before duplicated content.**

**Secure integrations before convenience.**

**Versioned releases before production deployment.**

**Evidence before assumptions.**

**Verification before completion.**