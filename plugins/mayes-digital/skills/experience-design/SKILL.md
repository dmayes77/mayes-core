---
name: experience-design
description: Designs, evaluates, and improves user experiences for Mayes Digital Webflow websites using established UX laws, cognitive psychology, accessibility standards, mobile-first design, customer journey analysis, and ethical conversion principles. Use when planning pages, designing interfaces, evaluating layouts, improving navigation, reducing friction, optimizing customer journeys, or conducting UX audits.
---

# Mayes Digital Experience Design

## 1. Purpose

Create intuitive, accessible, trustworthy, and conversion-focused digital experiences that help local businesses establish credibility and turn organic visitors into customers.

Every design decision must serve an identifiable user need or business objective.

Experience Design establishes why an interface should work a particular way.

Core Design System establishes how that interface should be constructed.

**Core principle: Make the right action obvious, understandable, and easy to complete.**

---

## 2. When to Use This Skill

Activate this skill when:

- Planning a new website.
- Designing a page or section.
- Developing customer journeys.
- Establishing information architecture.
- Evaluating visual hierarchy.
- Designing navigation.
- Improving mobile experiences.
- Designing forms and quote requests.
- Reducing interaction friction.
- Improving conversion opportunities.
- Evaluating existing websites.
- Conducting UX audits.
- Reviewing Relume sitemaps and wireframes.
- Evaluating proposed interface changes.
- Resolving usability problems.

Use this skill alongside Core Design System and Webflow Development when implementing design decisions.

---

## 3. Mayes Digital Design Philosophy

Mayes Digital builds websites that help businesses establish owned credibility rather than depend on rented visibility.

The website must communicate the business's value, demonstrate credibility, answer customer questions, and provide clear paths to action.

### Experience priorities

Evaluate design decisions according to the following priorities:

1. Accessibility.
2. Usability.
3. Clarity.
4. Trust.
5. Conversion.
6. Consistency.
7. Visual appeal.

Visual appeal remains important but must not compromise accessibility, functionality, or comprehension.

### Design requirements

Every experience should be:

- Understandable.
- Predictable.
- Accessible.
- Responsive.
- Visually consistent.
- Efficient.
- Trustworthy.
- Appropriate for the intended audience.

Avoid unnecessary complexity, decorative excess, and interactions that interfere with the user's objective.

---

## 4. Source of Truth

For Mayes Digital implementation standards, consult:

Primary repository: `dmayes77/mayes-core`

Relevant documentation:

- `docs/ARCHITECTURE.md`
- `docs/DECISIONS.md`
- `docs/NATIVE_FIRST.md`
- `base/README.md`

For experience design principles, consult:

- `references/ux-principles.md`
- `references/webflow-examples.md`
- `references/audit-checklist.md`

For structural implementation, consult the Core Design System skill.

Do not introduce a competing design system through experience design recommendations.

When an experience design recommendation conflicts with existing architecture, identify the conflict and propose the smallest appropriate resolution.

---

## 5. UX Principles Framework

Mayes Digital uses a framework of 25 UX principles and standards.

These principles are decision-making tools rather than rigid rules that must be applied simultaneously.

### Perception and visual organization

1. Aesthetic-Usability Effect
2. Law of Proximity
3. Law of Similarity
4. Law of Common Region
5. Law of Uniform Connectedness
6. Law of Prägnanz
7. Von Restorff Effect

### Cognitive efficiency and decision-making

8. Hick's Law
9. Jakob's Law
10. Cognitive Load
11. Recognition Rather Than Recall
12. Tesler's Law
13. Occam's Razor
14. Progressive Disclosure

### Interaction and task completion

15. Fitts's Law
16. Goal-Gradient Effect
17. Zeigarnik Effect
18. Parkinson's Law
19. Paradox of the Active User
20. Default Effect
21. Doherty Threshold

### Prioritization and experience perception

22. Pareto Principle
23. Serial Position Effect
24. Peak-End Rule

### Accessibility

25. Web Content Accessibility Guidelines (WCAG)

WCAG is an accessibility standard rather than a psychological law.

Other items in this framework include psychological effects, design heuristics, and prioritization principles.

Detailed definitions, applications, limitations, and examples are provided in `references/ux-principles.md`.

---

## 6. Applying UX Principles

Do not apply UX principles mechanically.

Begin with the user's objective and identify which principles are relevant to the problem.

### Required reasoning process

For each significant design decision:

1. Identify the user's objective.
2. Identify the business objective.
3. Identify existing friction or uncertainty.
4. Select the relevant UX principles.
5. Evaluate possible solutions.
6. Choose the simplest effective solution.
7. Map the solution to existing Core components.
8. Establish validation criteria.

### Example

Problem:

A service page presents twelve equally prominent actions.

Relevant principles:

- Hick's Law.
- Cognitive Load.
- Von Restorff Effect.
- Visual hierarchy.

Recommended approach:

- Establish one primary action.
- Reduce competing visual emphasis.
- Group related secondary actions.
- Preserve access to necessary information.

Expected outcome:

Users can identify the appropriate next action with less decision-making effort.

Do not claim a measurable conversion improvement without supporting evidence.

---

## 7. Resolving Conflicting UX Principles

UX principles may suggest different approaches.

For example:

- Hick's Law may support reducing visible choices.
- Recognition Rather Than Recall may support keeping choices visible.
- Progressive Disclosure may support revealing information only when needed.

Resolve these conflicts according to:

1. Accessibility requirements.
2. The user's immediate objective.
3. The importance of the information.
4. The consequences of hiding information.
5. The complexity of the task.
6. Existing user expectations.
7. Available usability evidence.
8. Implementation and maintenance considerations.

Do not hide essential information solely to reduce visual complexity.

Do not add unnecessary information solely to improve discoverability.

Use the principles together to balance clarity, efficiency, and completeness.

---

## 8. Customer Journey Design

Design around the customer's journey rather than isolated website sections.

A typical local-service customer journey includes:

### Discovery

The visitor arrives through organic search, a business listing, a referral, or a direct visit.

The experience should immediately communicate:

- What the business does.
- Who the business serves.
- Where the business operates.
- Why the business is relevant.

### Evaluation

The visitor determines whether the business meets their needs.

Provide appropriate access to:

- Services.
- Service descriptions.
- Pricing when appropriate.
- Service areas.
- Business qualifications.
- Examples of completed work.
- Frequently asked questions.

### Confidence

The visitor evaluates whether the business is trustworthy.

Support confidence through:

- Authentic reviews.
- Real project examples.
- Clear business information.
- Professional presentation.
- Transparent service expectations.
- Relevant qualifications.
- Consistent communication.

### Action

The visitor decides to contact, book, purchase, or request a quote.

Provide:

- Clear calls to action.
- Accessible contact methods.
- Appropriate forms.
- Predictable interactions.
- Minimal unnecessary friction.

### Confirmation

The visitor receives feedback after completing an action.

Communicate:

- Whether the action succeeded.
- What happens next.
- Expected response times when verified.
- Any necessary follow-up instructions.

Do not assume every visitor follows the same linear journey.

Support visitors who arrive directly on service, project, contact, or other interior pages.

---

## 9. Information Architecture

Information architecture determines how website content is organized, labeled, and discovered.

### Requirements

- Organize content around customer needs.
- Use familiar navigation labels.
- Establish logical page relationships.
- Avoid unnecessary navigation depth.
- Make important information easy to locate.
- Preserve consistent navigation patterns.
- Support direct access to important pages.

### Typical local-business website pages

- Home
- Services
- Individual service pages
- Our Work or Projects
- About
- Contact
- Privacy Policy

Additional pages should have a justified customer or business purpose.

Do not create pages solely to increase website size.

Coordinate page structure with the Organic Visibility skill.

---

## 10. Relume Planning Workflow

Mayes Digital uses Relume to accelerate website planning and development.

Relume provides a starting point for information architecture, wireframes, and content composition.

It does not replace experience design judgment or the Mayes Digital Core Design System.

### Sitemap evaluation

Before approving a Relume sitemap:

- Confirm the intended audience.
- Confirm the business's services.
- Identify primary customer objectives.
- Identify conversion opportunities.
- Remove unnecessary pages.
- Identify missing essential pages.
- Evaluate navigation clarity.
- Coordinate organic visibility requirements.

### Wireframe evaluation

Before approving a wireframe:

- Evaluate content hierarchy.
- Evaluate section order.
- Evaluate customer journey progression.
- Identify unnecessary sections.
- Identify missing trust elements.
- Evaluate calls to action.
- Evaluate mobile implications.
- Map sections to existing Core components.

### Implementation boundary

Relume-generated layouts must be adapted to Mayes Digital's existing architecture.

Do not import competing class systems, variables, or components without evaluating their compatibility with Core.

Relume accelerates planning. Core governs implementation.

---

## 11. Page Composition

Each page must have a clearly identifiable purpose.

A page should not be assembled from sections solely because those sections are available.

### Section selection

Every section should serve at least one meaningful function:

- Establish relevance.
- Explain a service.
- Communicate value.
- Demonstrate credibility.
- Address uncertainty.
- Explain a process.
- Support decision-making.
- Encourage an appropriate action.

### Typical homepage composition

A local-service homepage may include:

1. Hero.
2. Trust strip.
3. Services.
4. Why choose us.
5. Our work.
6. Process.
7. Reviews or another appropriate confidence-building section.
8. Frequently asked questions.
9. Final call to action.

This is a suggested composition, not a mandatory template.

Adjust section selection and order according to business requirements and customer needs.

Avoid duplicating information without a clear purpose.

---

## 12. Visual Hierarchy

Visual hierarchy determines what users notice first and how they interpret information.

### Hierarchy tools

Use established Core resources for:

- Typography.
- Color.
- Contrast.
- Spacing.
- Alignment.
- Size.
- Surface treatments.
- Positioning.
- Imagery.

### Requirements

- Establish a clear focal point.
- Make the primary heading recognizable.
- Distinguish supporting information.
- Group related content.
- Separate unrelated content.
- Make primary actions visually identifiable.
- Avoid excessive competing emphasis.

### Primary actions

A section should generally have one dominant action.

Secondary actions may remain available when they support legitimate alternative user needs.

Do not create multiple visually dominant buttons without a clear reason.

Use the existing Core button variants to communicate action hierarchy.

---

## 13. Hero Experience

The hero establishes the visitor's initial understanding of the business.

### A successful hero should communicate

- What the business offers.
- Who or where it serves, when relevant.
- Why the visitor should continue.
- What action the visitor can take.

### Requirements

- Use a clear primary heading.
- Use meaningful supporting copy.
- Provide an identifiable primary CTA.
- Use relevant imagery when appropriate.
- Maintain readable contrast.
- Preserve mobile usability.
- Avoid unnecessary decorative complexity.

### Avoid

- Vague marketing language.
- Multiple competing primary actions.
- Excessively long introductory copy.
- Unnecessary animations.
- Images that do not support the business.
- Unsupported claims.
- Hero layouts that obscure essential information.

Do not force all information into the initial viewport at the expense of readability.

---

## 14. Navigation Experience

Navigation must help users understand where they are, where they can go, and what actions are available.

### Requirements

- Use recognizable labels.
- Maintain consistent navigation.
- Preserve clear active states.
- Avoid unnecessary choices.
- Provide access to important pages.
- Maintain accessible interaction targets.

### Standard Base mobile navigation

Follow the current approved Base architecture:

Home | Services | Call | Our Work | Quote

Home, Services, and Call occupy the established positions.

The remaining positions may be adapted to the business.

Use the existing Site Settings experience for secondary business information and supported settings.

Do not impose Base navigation on ShopFlow, DetailFlow, or other products when their approved customer journeys require different navigation.

### Navigation evaluation

Apply:

- Jakob's Law.
- Hick's Law.
- Fitts's Law.
- Recognition Rather Than Recall.
- Serial Position Effect.

Navigation should remain predictable across pages.

---

## 15. Mobile Experience

Mobile is a primary customer experience, not a reduced version of desktop.

### Requirements

- Prioritize essential information.
- Preserve access to primary actions.
- Use comfortable touch targets.
- Avoid hover-dependent interactions.
- Maintain readable typography.
- Minimize unnecessary interaction steps.
- Respect device safe areas.
- Preserve logical content order.

### App-like experience

Where appropriate, use established Core patterns for:

- Persistent navigation.
- Native sheets.
- Clear interaction feedback.
- Predictable transitions.
- Contextual actions.

An app-like experience must improve usability.

Do not imitate native applications merely for visual novelty.

Follow the Core Design System responsive standards.

---

## 16. Conversion Experience

Conversion design should help interested users complete appropriate actions.

### Primary conversion examples

- Calling the business.
- Requesting a quote.
- Booking an appointment.
- Submitting an inquiry.
- Purchasing a product.

### Requirements

- Make the next action understandable.
- Use action-specific labels.
- Reduce unnecessary steps.
- Communicate relevant expectations.
- Address common concerns.
- Maintain consistent CTA behavior.
- Provide clear confirmation.

### CTA labels

Prefer specific labels such as:

- Request a Quote
- Schedule a Detail
- View Services
- Call Us
- Book an Appointment

Avoid vague labels when a more descriptive label improves understanding.

Do not use misleading urgency, artificial scarcity, or unsupported promises.

Conversion design must respect user autonomy.

---

## 17. Forms and Progressive Disclosure

Forms should collect the information necessary to complete a legitimate business process.

### Requirements

- Request only necessary information.
- Use clear field labels.
- Maintain logical field order.
- Provide understandable validation.
- Use appropriate input types.
- Preserve user-entered information when practical.
- Communicate submission outcomes.

### Simple forms

Use a single-step form when the information requirements are limited and understandable.

### Multi-step forms

Use progressive disclosure when:

- The process requires multiple decisions.
- Questions can be grouped logically.
- Later questions depend on earlier answers.
- The staged experience reduces perceived complexity.

### Quote experiences

The documented Mayes Digital quiz-style quote approach uses a small number of tap-based questions followed by required contact information.

The implementation should preserve the approved native form architecture.

Verify whether the required component is available before implementation.

### Applicable principles

- Progressive Disclosure.
- Hick's Law.
- Cognitive Load.
- Goal-Gradient Effect.
- Fitts's Law.
- Recognition Rather Than Recall.
- Tesler's Law.

Do not introduce unnecessary steps simply to make a form feel interactive.

---

## 18. Trust and Credibility

Trust must be established through accurate information and authentic evidence.

### Appropriate trust signals

- Verified business information.
- Authentic customer reviews.
- Real project photographs.
- Relevant qualifications.
- Accurate service descriptions.
- Transparent pricing where appropriate.
- Clear business policies.
- Professional presentation.
- Understandable contact information.

### Requirements

- Never fabricate reviews.
- Never invent qualifications.
- Never misrepresent project imagery.
- Never display unsupported ratings.
- Never create misleading guarantees.
- Never use artificial scarcity.

When authentic reviews are unavailable, use other legitimate confidence-building content.

An FAQ, process explanation, or portfolio may provide appropriate alternatives.

Coordinate factual business information with the Organic Visibility skill.

---

## 19. Interaction Design

Interactions should communicate functionality, state, and outcomes.

### Requirements

- Interactive elements must be recognizable.
- Actions must produce appropriate feedback.
- State changes must be understandable.
- Loading states must communicate progress when needed.
- Error states must explain recovery options.
- Successful actions must receive confirmation.

### Motion

Use established Core motion patterns when motion improves comprehension.

Motion may communicate:

- State changes.
- Spatial relationships.
- Interaction feedback.
- Content hierarchy.

Avoid motion that:

- Delays essential information.
- Interferes with interaction.
- Distracts from primary actions.
- Creates unnecessary cognitive load.
- Ignores reduced-motion preferences.

Prefer native Webflow interactions.

---

## 20. Accessibility

Accessibility is a foundational experience requirement.

Use WCAG 2.2 Level AA as the proposed evaluation baseline unless an applicable project requirement establishes a different standard.

### Requirements

- Maintain sufficient color contrast.
- Preserve meaningful heading hierarchy.
- Provide accessible names for controls.
- Support keyboard navigation.
- Maintain visible focus indicators.
- Provide appropriate alternative text.
- Use understandable form labels.
- Support text resizing and reflow.
- Respect reduced-motion preferences.
- Avoid communicating information through color alone.

Accessibility requirements take precedence over aesthetic preferences.

Use the Quality Assurance skill for detailed conformance testing.

Do not claim full accessibility conformance without sufficient verification.

---

## 21. Ethical Experience Design

Mayes Digital must not use deceptive design patterns.

### Prohibited practices

- Hidden fees.
- Misleading button labels.
- Forced consent.
- Artificial urgency.
- Fabricated scarcity.
- Preselected optional marketing consent.
- Obstructed cancellation.
- Misleading testimonials.
- Hidden important information.
- Manipulative confirmation messages.
- Interfaces designed to cause unintended actions.

### Defaults

Use defaults that support the user's legitimate interests.

The Default Effect must not be used to obtain consent or commitments the user did not knowingly provide.

### Conversion principle

A successful conversion is an informed customer action, not an action obtained through confusion or manipulation.

---

## 22. Performance as User Experience

Website performance directly influences usability and customer confidence.

### Requirements

- Prioritize essential content.
- Avoid unnecessary dependencies.
- Use appropriately sized imagery.
- Minimize disruptive layout shifts.
- Provide appropriate interaction feedback.
- Avoid unnecessary loading delays.
- Prefer native Webflow functionality.

### Doherty Threshold

Use responsive feedback to maintain interaction continuity.

Do not interpret the commonly cited 400-millisecond threshold as a universal requirement for every network request or website operation.

When an operation requires more time, communicate its state appropriately.

Coordinate performance measurement with the Quality Assurance skill.

---

## 23. Experience Design Workflow

For new designs and significant improvements, follow this sequence:

### Discover

Identify:

- Business objectives.
- Target customers.
- Customer needs.
- Primary conversion actions.
- Existing content.
- Project constraints.

### Analyze

Evaluate:

- Customer journeys.
- Information architecture.
- Existing usability problems.
- Content hierarchy.
- Interaction requirements.
- Applicable UX principles.

### Design

Develop:

- Page composition.
- Navigation structure.
- Visual hierarchy.
- Interaction patterns.
- Responsive behavior.
- Conversion paths.

### Map to Core

Identify existing:

- Components.
- Classes.
- Variables.
- Properties.
- Slots.
- Native interactions.

### Validate

Evaluate:

- Usability.
- Accessibility.
- Responsive behavior.
- Functional behavior.
- Conversion clarity.
- Architectural consistency.

### Document

Report:

- Design decisions.
- Applicable UX principles.
- Expected benefits.
- Validation evidence.
- Remaining risks.

Apply the workflow proportionally to the scope of the request.

---

## 24. Experience Audit Procedure

When evaluating an existing website:

1. Identify the website's intended audience.
2. Identify its primary business objectives.
3. Identify the primary customer journeys.
4. Inspect relevant pages.
5. Evaluate desktop and mobile experiences.
6. Identify usability friction.
7. Identify accessibility concerns.
8. Identify applicable UX principles.
9. Evaluate existing Core implementation.
10. Prioritize recommended improvements.

Consult `references/audit-checklist.md` for detailed audit criteria.

### Audit boundaries

Distinguish between:

- Confirmed usability defects.
- Accessibility violations.
- Architectural inconsistencies.
- Design preferences.
- Improvement hypotheses.

Do not present personal aesthetic preferences as confirmed usability problems.

---

## 25. Recommendation Prioritization

Use the following proposed severity classifications.

### Critical

Essential functionality is unavailable, or the experience creates substantial accessibility, privacy, or user safety concerns.

### High

A significant issue prevents or substantially impairs an important customer journey.

### Medium

An issue creates unnecessary friction, confusion, or inconsistency.

### Low

A refinement could improve visual polish or secondary usability without substantially affecting task completion.

Prioritize actual user impact over the number of identified issues.

Use the Pareto Principle to focus attention on improvements likely to provide the greatest meaningful benefit.

Do not invent numerical impact estimates.

---

## 26. Design Decision Reporting

For significant recommendations, use the following structure.

### Observation

Describe the existing experience or proposed design.

### User objective

Identify what the customer is attempting to accomplish.

### Problem

Explain the confirmed issue or improvement opportunity.

### Applicable principles

Identify the relevant UX principles.

### Recommendation

Describe the proposed solution.

### Core implementation

Identify existing components, classes, variables, or native functionality that support the solution.

### Expected benefit

Explain how the recommendation may improve usability, clarity, accessibility, trust, or conversion.

### Validation

Describe how the recommendation should be evaluated.

### Limitations

Identify missing information, untested assumptions, and potential tradeoffs.

Do not claim that an expected benefit has been achieved until appropriate evidence exists.

---

## 27. Cross-Skill Coordination

### Core Design System

Use for:

- Design variables.
- Class architecture.
- Components.
- Responsive implementation.
- Structural consistency.

### Webflow Development

Use for:

- Native implementation.
- CMS architecture.
- Custom code.
- Integrations.
- Technical functionality.

### Organic Visibility

Use for:

- Search intent.
- Local discoverability.
- Content organization.
- Technical SEO.
- Business information consistency.

### Quality Assurance

Use for:

- Functional testing.
- Accessibility testing.
- Performance measurement.
- Responsive validation.
- Regression testing.
- Release readiness.

Experience Design provides the reasoning that guides these complementary disciplines.

---

## 28. Reference Loading

Load reference files according to the task.

### `references/ux-principles.md`

Use when:

- Selecting applicable UX principles.
- Explaining design decisions.
- Resolving competing design considerations.
- Evaluating cognitive load.
- Reviewing interaction patterns.

### `references/webflow-examples.md`

Use when:

- Translating UX principles into Webflow layouts.
- Selecting Core components.
- Designing navigation.
- Designing forms.
- Evaluating page composition.
- Planning responsive experiences.

### `references/audit-checklist.md`

Use when:

- Conducting UX audits.
- Evaluating existing websites.
- Reviewing proposed designs.
- Prioritizing usability improvements.
- Documenting validation findings.

Load only the references necessary for the current task.

---

## 29. Prohibited Practices

Do not:

- Apply UX principles mechanically.
- Prioritize aesthetics over accessibility.
- Introduce unnecessary interaction complexity.
- Hide essential information without justification.
- Create competing design systems.
- Duplicate existing Core components unnecessarily.
- Use deceptive conversion patterns.
- Fabricate customer evidence.
- Invent conversion improvement percentages.
- Treat personal preferences as usability evidence.
- Claim testing that was not performed.
- Publish changes without authorization.

---

## Operating Standard

**Design around the customer.**

**Make information understandable.**

**Make decisions easier.**

**Make actions accessible.**

**Build credibility through authentic evidence.**

**Use existing Core architecture.**

**Validate outcomes rather than assuming success.**