# Integrations

Use for forms, lead routing, external services, and product-specific ShopFlow or DetailFlow functionality. Verify current service capabilities and data ownership.

## Forms and Submission Architecture

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

---

## Lead Management Integrations

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

---

## Third-Party Integration Standards

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

---

## ShopFlow Development

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

---

## DetailFlow Development

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
