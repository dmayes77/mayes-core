---
name: webflow-development
description: Build and maintain Mayes Digital Webflow sites and components using the approved Core architecture, native Webflow features, CMS, integrations, and versioned code. Use for implementation, technical troubleshooting, migration, and deployment work; use the other Mayes Digital skills for design decisions, search strategy, and independent QA.
---

# Mayes Digital Webflow Development

Build reliable Webflow sites by inspecting the actual project, reusing approved Core resources, and choosing native functionality before custom code. Treat documented plans as plans until verified in the project or repository.

## Start with the current state

Identify the target site, environment, page or component, requested behavior, and authorized scope. Inspect the current implementation, CMS bindings, integrations, and shared dependencies that the change could affect. Confirm that the connected tools support the required operation; record any Designer action that must be completed manually.

The shared code source is `dmayes77/mayes-core`. For applicable work, inspect its current `README.md`, `docs/ARCHITECTURE.md`, `docs/DECISIONS.md`, `docs/NATIVE_FIRST.md`, `docs/RELEASES.md`, `base/README.md`, and `check.sh`, plus the product repository when relevant. Do not assume those documents prove deployment.

Resolve conflicts using this order: explicitly authorized project requirements, approved architectural decisions, current repository documentation, actual Webflow configuration, existing implementation patterns, official Webflow documentation, then proposed improvements. Surface material conflicts rather than silently following legacy behavior.

## Make the implementation choice

Use the first suitable option: an approved component; its property, slot, or variant; an existing Core class or variable; native Webflow functionality; a new reusable native implementation; approved Core custom code; then new custom code. For custom code, record the native limitation, code owner, dependencies, maintenance cost, and validation needed.

Keep shared, product-neutral resources in Core; the standard local-business experience in Base; product behavior in its product layer; and client branding, content, and client-specific configuration in the client site. Inspect affected instances and consumers before changing shared contracts. A duplicated site does not automatically receive later master changes.

Preserve Page Shell and its Main Content slot where the project uses the Base architecture. Use the Core Design System skill for variable, class, component, and responsive contracts. Use Experience Design for customer journeys and interaction decisions. Organic Visibility sets search requirements; this skill implements their Webflow configuration. Quality Assurance owns independent readiness verification.

## Open only the relevant reference

- [Native-first development](references/native-first.md): pages, components, Relume mapping, Page Shell, navigation, native modals, motion, and responsive implementation.
- [CMS architecture](references/cms-architecture.md): collections, page-level business data, dynamic bindings, and content states.
- [Custom code](references/custom-code.md): JavaScript, CSS, security, privacy, technical SEO implementation, performance, accessibility implementation, troubleshooting, and migration.
- [Integrations](references/integrations.md): forms, lead management, third parties, ShopFlow, and DetailFlow.
- [Deployment](references/deployment.md): GitHub changes, Core releases, checks, environments, publishing, rollback, and reporting.

Read a reference when its topic is in scope; do not load all five for an ordinary change. Where a task spans topics, use the relevant references together and keep each decision with its owning skill.

## Complete the change

Check the affected behavior and relevant regressions against the actual environment. For repository changes, run the applicable current checks and report their results. Pin production Core CSS and JavaScript to the same approved release rather than a development branch. Protect privileged credentials from client-side code. Do not invent business data, integration capabilities, test results, or deployment status.

Report what changed, what was verified, what remains unverified, and the deployment state. Publish, release, or restore production only with authorization that covers that action.
