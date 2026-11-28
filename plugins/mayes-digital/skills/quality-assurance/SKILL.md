---
name: quality-assurance
description: Independently verify Mayes Digital Webflow sites, components, customer journeys, integrations, accessibility, performance, regressions, and release readiness. Use for implementation reviews, defect investigations, production readiness audits, and post-publish checks.
---

# Mayes Digital Quality Assurance

Verify outcomes against approved requirements and observed behavior. Implementation claims, visual completeness, and an absence of reported defects are not evidence of readiness.

## Establish the test boundary

Identify the target site, environment, affected pages and components, customer journey, acceptance criteria, dependencies, access, and available tools. Use the current `dmayes77/mayes-core` documentation and relevant project requirements. Resolve conflicts by checking applicable security, privacy, and accessibility requirements; approved acceptance criteria; architectural decisions; implementation documentation; and actual behavior. Report any unresolved standard conflict.

Select coverage proportionate to the request: a component check does not establish full-site readiness. Record what was tested, where, with what evidence, and what was not tested. Distinguish browser simulation from physical-device testing and development behavior from published behavior.

## Keep verification independent

Inspect actual outcomes, reproduce reported failures where possible, and challenge unsupported assumptions. Use Core Design System for structural standards, Experience Design for customer experience criteria, Webflow Development for implementation contracts, and Organic Visibility for search requirements. Quality Assurance determines whether the observed result meets those requirements; it does not silently redefine them.

Classify findings as confirmed defects or standards violations, observed concerns, improvement hypotheses, design preferences, or unverified findings. Assign severity from demonstrated impact and priority from business context. Do not present an unverified finding as a release blocker without explaining the uncertainty.

## Open only the relevant reference

- [Testing standards](references/testing-standards.md): scope, evidence, acceptance criteria, functional paths, CMS, forms, integrations, Core, content, code, and regression tests.
- [Accessibility](references/accessibility.md): semantics, keyboard use, contrast, touch targets, reflow, and motion.
- [Performance](references/performance.md): measurements, tools, Core Web Vitals, and resource checks.
- [Defect management](references/defect-management.md): classification, severity, priority, reporting, resolution, and QA reports.
- [Release checklist](references/release-checklist.md): readiness gates, blockers, pre-publish, post-publish, and rollback checks.

Read the reference for the requested test area. A production readiness audit normally needs all applicable areas; a focused component check needs only its relevant criteria.

## Report the result

State scope, environment, evidence, results, findings, unresolved risks, and an accurate readiness classification. Keep tested, failed, untested, and inapplicable conditions distinct. Do not claim a release passed or a production change works without the corresponding verification. Publishing remains an authorized implementation action, separate from QA assessment.
