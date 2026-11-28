# Mayes Digital Experience Design
## UX Audit Checklist

### Purpose

Establish a repeatable process for evaluating the quality, usability, accessibility, clarity, credibility, and conversion effectiveness of Mayes Digital websites.

This checklist applies to existing websites, proposed designs, Relume wireframes, individual pages, reusable components, and complete customer journeys.

The objective is to identify meaningful improvements rather than generate unnecessary design changes.

**Core principle: Evaluate the experience from the customer's perspective, prioritize actual user impact, and support recommendations with evidence.**

---

## 1. Reference Dependencies

Consult:

- `ux-principles.md`
- `webflow-examples.md`
- Core Design System skill
- Webflow Development skill
- Organic Visibility skill
- Quality Assurance skill

Primary implementation repository:

`dmayes77/mayes-core`

Relevant documentation:

- `docs/ARCHITECTURE.md`
- `docs/DECISIONS.md`
- `docs/NATIVE_FIRST.md`
- `base/README.md`

Experience Design governs usability and design reasoning.

Core Design System governs structural and visual implementation.

Quality Assurance governs comprehensive technical verification.

Do not introduce competing standards through the audit process.

---

## 2. Audit Types

Select the audit type according to the requested outcome.

### Full Website Audit

Evaluate the complete website experience, including:

- Information architecture.
- Navigation.
- Page composition.
- Visual hierarchy.
- Customer journeys.
- Conversion paths.
- Responsive behavior.
- Accessibility.
- Trust and credibility.

### Page Audit

Evaluate an individual page according to its intended purpose and relationship to the broader customer journey.

### Component Audit

Evaluate a specific component, including its appearance, behavior, accessibility, consistency, and usability.

### Customer Journey Audit

Evaluate the complete sequence of interactions required to accomplish a customer objective.

### Wireframe Audit

Evaluate proposed information architecture, section composition, content hierarchy, and conversion opportunities before implementation.

### Competitive Experience Audit

Evaluate publicly observable experiences from comparable businesses.

Identify useful patterns without copying proprietary designs or introducing competing design systems.

Distinguish observable findings from assumptions about competitor performance.

---

## 3. Audit Preparation

Before conducting an audit:

- [ ] Identify the website or project.
- [ ] Identify the intended audience.
- [ ] Identify the business type.
- [ ] Identify the primary business objectives.
- [ ] Identify primary customer objectives.
- [ ] Identify expected conversion actions.
- [ ] Identify applicable product architecture.
- [ ] Establish the audit scope.
- [ ] Identify available evidence.
- [ ] Identify testing limitations.

### Evidence sources

Where available, evaluate:

- Published website.
- Webflow Designer.
- Current Core documentation.
- Relume sitemap.
- Relume wireframes.
- Desktop screenshots.
- Mobile screenshots.
- Website analytics.
- Customer feedback.
- Usability observations.
- Accessibility test results.
- Functional test results.

Do not assume access to evidence that has not been provided or retrieved.

---

## 4. Customer Journey Audit

Identify the primary customer journeys before evaluating individual interface elements.

### Discovery

- [ ] The business offering is immediately understandable.
- [ ] The intended audience can recognize relevance.
- [ ] Service areas are discoverable when applicable.
- [ ] Visitors arriving directly on interior pages can understand their context.
- [ ] Important information is available without unnecessary navigation.

### Evaluation

- [ ] Services or products are clearly organized.
- [ ] Descriptions are understandable.
- [ ] Important service conditions are discoverable.
- [ ] Pricing information is accurate when displayed.
- [ ] Customers can distinguish available options.
- [ ] Relevant questions are addressed.

### Confidence

- [ ] Business information is accurate.
- [ ] Trust signals are authentic.
- [ ] Project examples are legitimate.
- [ ] Service expectations are understandable.
- [ ] Relevant qualifications are discoverable.
- [ ] The website presents a professional and consistent experience.

### Action

- [ ] Primary actions are identifiable.
- [ ] CTA labels communicate expected outcomes.
- [ ] Contact methods are accessible.
- [ ] Forms request appropriate information.
- [ ] Unnecessary interaction steps are avoided.
- [ ] Users can complete essential actions on mobile.

### Confirmation

- [ ] Successful actions receive accurate confirmation.
- [ ] Customers understand what happens next.
- [ ] Errors provide meaningful recovery options.
- [ ] Response-time expectations are verified.
- [ ] Customers are not pressured into unnecessary additional actions.

### Applicable principles

- Cognitive Load.
- Jakob's Law.
- Recognition Rather Than Recall.
- Progressive Disclosure.
- Fitts's Law.
- Peak-End Rule.

---

## 5. Information Architecture Audit

Evaluate how information is organized and discovered.

- [ ] Every page has an identifiable purpose.
- [ ] Navigation labels are understandable.
- [ ] Page relationships are logical.
- [ ] Important content is discoverable.
- [ ] Navigation depth is appropriate.
- [ ] Related services are grouped logically.
- [ ] Duplicate pages are justified or avoided.
- [ ] Important customer journeys remain accessible.
- [ ] Interior pages provide sufficient context.
- [ ] Content organization supports relevant search intent.

### Common findings

- Unclear navigation labels.
- Excessive navigation depth.
- Duplicate service pages.
- Missing essential information.
- Unnecessary pages.
- Poorly organized service categories.

### Applicable principles

- Hick's Law.
- Jakob's Law.
- Recognition Rather Than Recall.
- Cognitive Load.
- Pareto Principle.

Coordinate search-related findings with the Organic Visibility skill.

---

## 6. Relume Sitemap and Wireframe Audit

When reviewing Relume-generated designs:

### Sitemap

- [ ] Pages reflect actual business offerings.
- [ ] Every page serves a customer or business objective.
- [ ] Important pages are not missing.
- [ ] Unnecessary pages are removed.
- [ ] Navigation relationships are understandable.
- [ ] Conversion destinations are identifiable.
- [ ] Organic search intent is considered.

### Wireframes

- [ ] Each section has a defined purpose.
- [ ] Content follows a meaningful sequence.
- [ ] Important customer questions are addressed.
- [ ] Trust-building opportunities are included.
- [ ] CTA hierarchy is appropriate.
- [ ] Mobile implications are considered.
- [ ] Existing Core components can support the design.

### Core compatibility

- [ ] Relume sections are mapped to existing Core components.
- [ ] Competing class systems are avoided.
- [ ] Existing variables are preserved.
- [ ] Unnecessary component duplication is avoided.

Relume accelerates planning. Core governs implementation.

Do not approve a generated wireframe solely because it appears visually complete.

---

## 7. Page Composition Audit

Evaluate the purpose and placement of every major section.

- [ ] The page has a clear primary objective.
- [ ] The opening section establishes relevance.
- [ ] Supporting sections provide meaningful information.
- [ ] Content addresses actual customer needs.
- [ ] Section order supports understanding.
- [ ] Trust evidence appears where appropriate.
- [ ] Unnecessary repetition is avoided.
- [ ] Primary actions are available at appropriate points.
- [ ] The page concludes with a useful next step.
- [ ] Section composition remains appropriate on mobile.

### Section evaluation questions

For every section, determine:

1. What customer question does this section answer?
2. What business objective does it support?
3. Does another section already provide this information?
4. Is the information positioned appropriately?
5. Can an existing Core component support it?

Remove or consolidate sections only when doing so preserves essential information.

### Applicable principles

- Serial Position Effect.
- Pareto Principle.
- Cognitive Load.
- Occam's Razor.
- Peak-End Rule.

---

## 8. Hero Section Audit

Evaluate the visitor's initial understanding of the page.

- [ ] The primary heading communicates the offering.
- [ ] Supporting copy provides meaningful context.
- [ ] Business relevance is understandable.
- [ ] The primary CTA is identifiable.
- [ ] Secondary actions do not compete unnecessarily.
- [ ] Imagery supports the business offering.
- [ ] Text contrast is appropriate.
- [ ] Mobile cropping is acceptable.
- [ ] Important information is not delayed by animation.
- [ ] Claims are accurate and supportable.

### Common findings

- Vague headings.
- Excessive introductory copy.
- Competing primary actions.
- Unrelated imagery.
- Poor text contrast.
- Unsupported claims.
- Excessive hero height that delays important information.

### Applicable principles

- Von Restorff Effect.
- Law of Prägnanz.
- Serial Position Effect.
- Aesthetic-Usability Effect.
- Cognitive Load.

---

## 9. Visual Hierarchy Audit

Evaluate whether the interface directs attention appropriately.

- [ ] The primary heading is recognizable.
- [ ] Supporting headings have appropriate emphasis.
- [ ] Body text is visually distinguishable.
- [ ] Primary actions stand out.
- [ ] Secondary actions remain accessible.
- [ ] Related content is grouped.
- [ ] Unrelated content is separated.
- [ ] Important information is not visually overwhelmed.
- [ ] Decorative elements do not compete with essential content.
- [ ] Visual hierarchy remains effective across breakpoints.

### Applicable principles

- Von Restorff Effect.
- Law of Similarity.
- Law of Proximity.
- Law of Common Region.
- Law of Prägnanz.

Do not classify a personal aesthetic preference as a confirmed hierarchy failure without explaining its user impact.

---

## 10. Visual Consistency Audit

Evaluate consistency across pages and components.

### Typography

- [ ] Heading styles are consistent.
- [ ] Body typography is consistent.
- [ ] Font sizes and weights come from Core's existing text styles.
- [ ] Line heights remain readable.
- [ ] Text treatments communicate consistent meanings.

### Color

- [ ] Semantic Theme variables are used appropriately.
- [ ] Brand colors are applied consistently.
- [ ] Interactive states remain distinguishable.
- [ ] Similar actions use consistent visual treatments.
- [ ] Contrast requirements are evaluated.

### Spacing

- [ ] Related elements have appropriate proximity.
- [ ] Section spacing follows established Core architecture.
- [ ] Layout gaps communicate relationships.
- [ ] Horizontal gutters remain consistent.
- [ ] Unnecessary spacing overrides are avoided.

### Components

- [ ] Comparable cards share consistent structures.
- [ ] Buttons use approved variants.
- [ ] Icons follow established treatments.
- [ ] Navigation remains consistent.
- [ ] Sheets follow approved interaction patterns.

### Applicable principles

- Law of Similarity.
- Law of Proximity.
- Aesthetic-Usability Effect.
- Jakob's Law.

Coordinate architectural inconsistencies with the Core Design System skill.

---

## 11. Cognitive Load Audit

Evaluate the mental effort required to understand and use the website.

- [ ] Content is organized into meaningful groups.
- [ ] Language is understandable.
- [ ] Instructions are concise.
- [ ] Navigation choices are manageable.
- [ ] Important actions are distinguishable.
- [ ] Users are not required to remember unnecessary information.
- [ ] Complex tasks are appropriately organized.
- [ ] Decorative elements do not create unnecessary distraction.
- [ ] Technical complexity is handled by the system where appropriate.
- [ ] Essential information remains available.

### Common findings

- Excessive text density.
- Too many competing actions.
- Unnecessary navigation choices.
- Complicated instructions.
- Repetitive form questions.
- Unfamiliar interaction patterns.
- Unnecessary decorative complexity.

### Applicable principles

- Cognitive Load.
- Hick's Law.
- Tesler's Law.
- Occam's Razor.
- Recognition Rather Than Recall.
- Progressive Disclosure.

---

## 12. Navigation Audit

### Desktop navigation

- [ ] Navigation labels are recognizable.
- [ ] Important destinations are discoverable.
- [ ] Primary actions are distinguishable.
- [ ] Active states are understandable.
- [ ] Dropdowns are used only when appropriate.
- [ ] Keyboard navigation works.
- [ ] Navigation remains consistent across pages.
- [ ] Compact desktop widths remain usable.

### Mobile navigation

Every website uses one phone navigation setup, never both: Glass Base with the bottom navigation, or Glass App Menu without it. On phones, Call appears exactly once.

For websites using the standard Base architecture, evaluate:

- [ ] Flush top navigation is preserved.
- [ ] Flush bottom navigation is preserved.
- [ ] Home occupies its established position.
- [ ] Services occupies its established position.
- [ ] Call occupies the central position.
- [ ] Remaining destinations reflect business requirements.
- [ ] Icons have understandable labels.
- [ ] Active states are distinguishable.
- [ ] Touch targets are appropriately sized.
- [ ] Safe areas are respected.
- [ ] Navigation does not obscure page content.

### Product-specific navigation

Evaluate ShopFlow, DetailFlow, and other products against their approved customer journeys.

Do not impose Base navigation on incompatible product experiences.

### Applicable principles

- Jakob's Law.
- Hick's Law.
- Fitts's Law.
- Recognition Rather Than Recall.
- Serial Position Effect.
- Law of Similarity.

---

## 13. Mobile Experience Audit

Evaluate mobile as a primary customer experience.

### Layout

- [ ] Content remains readable.
- [ ] Layouts adapt appropriately.
- [ ] Reading order remains logical.
- [ ] No unintended horizontal overflow exists.
- [ ] Images scale appropriately.
- [ ] Important content is not clipped.

### Interaction

- [ ] Primary actions remain accessible.
- [ ] Touch targets are appropriately sized.
- [ ] Adjacent controls have adequate spacing.
- [ ] Essential functionality does not depend on hover.
- [ ] Scrolling behaves predictably.
- [ ] Fixed elements do not obstruct content.

### Device considerations

- [ ] Display cutouts are accommodated.
- [ ] Bottom gesture areas are accommodated.
- [ ] Safe-area behavior is appropriate.
- [ ] On-screen keyboards do not prevent form completion.
- [ ] Sheets remain usable within the viewport.

### Suggested testing widths

- 320px.
- 375px.
- 402px.
- 440px.
- 480px.
- 767px.
- 768px.
- 991px.
- 992px.
- 1440px.

These are practical testing targets, not additional Webflow breakpoints.

The app layer starts at 767px and below: compare 767px with 768px, and confirm tablets have working header navigation.

Coordinate detailed responsive testing with the Core Design System and Quality Assurance skills.

---

## 14. Service Presentation Audit

Evaluate how customers discover and compare services.

- [ ] Service names are understandable.
- [ ] Service descriptions communicate meaningful differences.
- [ ] Comparable services use consistent presentation.
- [ ] Scope of service is understandable.
- [ ] Relevant limitations are disclosed.
- [ ] Pricing is accurate when displayed.
- [ ] Service imagery is appropriate.
- [ ] Actions are associated with the correct services.
- [ ] Individual service pages provide sufficient context.
- [ ] Customers can identify the appropriate service.

### Applicable principles

- Law of Similarity.
- Law of Common Region.
- Law of Proximity.
- Recognition Rather Than Recall.
- Cognitive Load.

Do not recommend hiding service details solely to increase inquiry volume.

---

## 15. Pricing Experience Audit

Evaluate whether pricing supports informed customer decisions.

- [ ] Displayed prices are accurate.
- [ ] Starting prices are clearly identified.
- [ ] Price ranges include appropriate context.
- [ ] Custom quote requirements are understandable.
- [ ] Important pricing conditions are discoverable.
- [ ] Unavoidable fees are not concealed.
- [ ] Pricing is associated with the relevant service.
- [ ] Optional enhancements are clearly distinguished.
- [ ] Pricing remains readable on mobile.
- [ ] Existing Core pricing properties are used appropriately.

### Applicable principles

- Cognitive Load.
- Law of Proximity.
- Recognition Rather Than Recall.
- Progressive Disclosure.
- Default Effect.

Pricing recommendations must reflect the actual business model.

Do not invent prices or assume every business should display fixed pricing.

---

## 16. Trust and Credibility Audit

Evaluate whether the website establishes confidence through authentic evidence.

### Business information

- [ ] Business identity is accurate.
- [ ] Contact information is accurate.
- [ ] Service areas are accurate.
- [ ] Business hours are accurate.
- [ ] Qualifications are verified when displayed.

### Reviews

- [ ] Reviews are authentic.
- [ ] Ratings are accurately represented.
- [ ] Customer identities are not fabricated.
- [ ] Source permissions are respected.
- [ ] Aggregate ratings are not misleading.

### Project evidence

- [ ] Project photographs are authentic.
- [ ] Project descriptions are accurate.
- [ ] Before-and-after comparisons are not misleading.
- [ ] Stock imagery is not presented as completed work.

### Claims

- [ ] Guarantees are supported.
- [ ] Experience claims are accurate.
- [ ] Certifications are verified.
- [ ] Response-time promises are realistic and verified.
- [ ] Unsupported statistics are omitted.

### Applicable principles

- Aesthetic-Usability Effect.
- Law of Similarity.
- Law of Common Region.
- Cognitive Load.

When reviews are unavailable, evaluate other legitimate confidence-building content rather than inventing testimonials.

---

## 17. CTA and Conversion Audit

Evaluate the customer's ability to complete an intended action.

- [ ] The primary conversion objective is understood.
- [ ] Primary CTAs are identifiable.
- [ ] CTA labels communicate expected outcomes.
- [ ] Secondary actions support legitimate customer needs.
- [ ] CTA destinations are appropriate.
- [ ] Equivalent actions use consistent styling.
- [ ] Important actions remain accessible on mobile.
- [ ] Unnecessary interaction steps are avoided.
- [ ] Conversion paths do not require unnecessary account creation.
- [ ] Customers understand what happens after taking action.

### Common findings

- Multiple competing primary buttons.
- Vague CTA labels.
- Inconsistent action styling.
- Broken or misleading destinations.
- Excessive conversion steps.
- Missing confirmation states.

### Applicable principles

- Von Restorff Effect.
- Hick's Law.
- Fitts's Law.
- Parkinson's Law.
- Paradox of the Active User.
- Peak-End Rule.

Do not claim that a CTA change will increase conversions by a specific percentage without supporting evidence.

---

## 18. Forms Audit

### Information requirements

- [ ] Every required field has a legitimate purpose.
- [ ] Unnecessary fields are avoided.
- [ ] Optional fields are identified appropriately.
- [ ] Customers are not required to provide irrelevant information.
- [ ] Sensitive information is requested only when justified.

### Form presentation

- [ ] Labels are understandable.
- [ ] Field order is logical.
- [ ] Related fields are grouped.
- [ ] Appropriate input types are used.
- [ ] Required fields are communicated.
- [ ] Instructions are concise.

### Validation and recovery

- [ ] Errors are understandable.
- [ ] Errors are associated with affected fields.
- [ ] Previously entered information is preserved when practical.
- [ ] Customers can correct invalid information.
- [ ] Error communication does not rely exclusively on color.

### Submission

- [ ] Submit controls are identifiable.
- [ ] Loading states are appropriate.
- [ ] Successful submission is accurately confirmed.
- [ ] Failed submissions provide meaningful feedback.
- [ ] Next steps are communicated.

### Consent

- [ ] Consent requirements are understandable.
- [ ] Optional marketing consent is not preselected.
- [ ] Material disclosures are discoverable.
- [ ] Consent is not obtained through misleading design.

### Applicable principles

- Tesler's Law.
- Cognitive Load.
- Parkinson's Law.
- Recognition Rather Than Recall.
- Default Effect.
- Doherty Threshold.
- Peak-End Rule.

Coordinate actual submission and integration testing with Quality Assurance.

---

## 19. Multi-Step Quote Experience Audit

Evaluate whether progressive disclosure improves the quote experience.

- [ ] Multiple steps are justified by task complexity.
- [ ] Questions follow a logical sequence.
- [ ] Service choices are understandable.
- [ ] Follow-up questions are relevant.
- [ ] Progress indicators are accurate.
- [ ] Previous answers remain available when navigating backward.
- [ ] Required information is collected.
- [ ] Unnecessary steps are avoided.
- [ ] Contact information requirements are appropriate.
- [ ] Consent requirements are communicated.
- [ ] Submission outcomes are understandable.
- [ ] The complete experience remains accessible.

### Applicable principles

- Progressive Disclosure.
- Hick's Law.
- Cognitive Load.
- Goal-Gradient Effect.
- Zeigarnik Effect.
- Fitts's Law.
- Tesler's Law.
- Peak-End Rule.

### Core implementation boundary

Verify the current approved quote architecture.

The documented Mayes Digital approach uses a small number of tap-based questions followed by one native form submission.

Do not assume the reusable implementation has been migrated into the current Core master.

---

## 20. Native Sheet and Modal Audit

Evaluate contextual interactions such as Site Settings, Quote, Services, and Cookie Preferences.

- [ ] The opening control communicates its purpose.
- [ ] The sheet has an understandable title.
- [ ] Content is organized logically.
- [ ] Close controls are discoverable.
- [ ] Essential actions remain accessible.
- [ ] Long content supports appropriate scrolling.
- [ ] Background interaction is appropriately restricted.
- [ ] Keyboard interaction is supported.
- [ ] Focus behavior is appropriate.
- [ ] Safe areas are respected.
- [ ] Closing the sheet does not unexpectedly discard important information.
- [ ] Essential information is not unnecessarily hidden within sheets.

### Applicable principles

- Progressive Disclosure.
- Law of Common Region.
- Cognitive Load.
- Fitts's Law.
- Jakob's Law.
- WCAG.

Preserve the approved native Webflow Modal architecture.

Do not recommend replacing native sheets with a custom engine without a demonstrated requirement.

---

## 21. Interaction Feedback Audit

Evaluate whether the interface communicates actions, states, and outcomes.

- [ ] Interactive elements are recognizable.
- [ ] Buttons provide appropriate interaction feedback.
- [ ] Selected states are understandable.
- [ ] Loading states communicate progress when necessary.
- [ ] Error states provide recovery guidance.
- [ ] Successful actions receive confirmation.
- [ ] State changes are not communicated through color alone.
- [ ] Interactions do not introduce unnecessary delays.
- [ ] Feedback remains understandable across devices.
- [ ] Success is not reported before completion.

### Applicable principles

- Doherty Threshold.
- Law of Similarity.
- Recognition Rather Than Recall.
- Goal-Gradient Effect.
- Peak-End Rule.

Do not interpret the Doherty Threshold as a universal requirement that every operation must complete within 400 milliseconds.

---

## 22. Motion Audit

Evaluate whether motion contributes to the experience.

- [ ] Motion serves an identifiable purpose.
- [ ] Motion supports hierarchy or interaction feedback.
- [ ] Essential content remains available.
- [ ] Animation does not interfere with navigation.
- [ ] Animation does not create unnecessary waiting.
- [ ] Reduced-motion preferences are respected.
- [ ] Existing Core motion patterns are reused.
- [ ] Native Webflow Interactions are prioritized.
- [ ] Unnecessary animation dependencies are avoided.

### Applicable principles

- Doherty Threshold.
- Cognitive Load.
- Aesthetic-Usability Effect.
- Law of Uniform Connectedness.

Motion should improve understanding or interaction rather than exist solely for decoration.

---

## 23. Accessibility Experience Audit

Use WCAG 2.2 Level AA as the proposed evaluation baseline unless an applicable project requirement establishes another standard.

Authoritative reference:

https://www.w3.org/TR/WCAG22/

### Perceivable

- [ ] Meaningful images have appropriate text alternatives.
- [ ] Text contrast meets applicable requirements.
- [ ] Interactive visual information meets applicable contrast requirements.
- [ ] Information is not communicated through color alone.
- [ ] Content remains understandable when text is resized.

### Operable

- [ ] Essential functionality supports keyboard interaction.
- [ ] Focus indicators are visible.
- [ ] Focus is not obscured.
- [ ] Keyboard traps are avoided.
- [ ] Navigation is understandable.
- [ ] Interaction targets meet applicable requirements.
- [ ] Time-dependent interactions provide appropriate accommodations.

### Understandable

- [ ] Content uses understandable language.
- [ ] Navigation behaves predictably.
- [ ] Controls communicate their purpose.
- [ ] Form labels are meaningful.
- [ ] Errors provide understandable guidance.

### Robust

- [ ] Semantic structure is appropriate.
- [ ] Interactive controls have accessible names.
- [ ] Relevant roles and states are communicated.
- [ ] Assistive technology compatibility is evaluated where possible.

### Audit limitation

This section supports experience-level accessibility evaluation.

It does not constitute a complete WCAG conformance audit.

Use Quality Assurance for detailed success-criterion evaluation and technical verification.

Do not claim full conformance based solely on automated testing or checklist completion.

---

## 24. Performance Experience Audit

Evaluate performance from the customer's perspective.

- [ ] Essential content becomes available without unnecessary delay.
- [ ] Primary actions become usable promptly.
- [ ] Loading behavior is understandable.
- [ ] Images do not create disruptive layout shifts.
- [ ] Interactions remain responsive.
- [ ] Animations do not delay task completion.
- [ ] Unnecessary scripts are avoided.
- [ ] Mobile performance is considered.
- [ ] Slow operations provide appropriate feedback.

### Technical coordination

Where measurements are available, evaluate relevant findings involving:

- Largest Contentful Paint.
- Interaction to Next Paint.
- Cumulative Layout Shift.

Detailed performance measurement belongs to the Quality Assurance skill.

Do not invent performance measurements or treat visual impressions as measured results.

---

## 25. Ethical Design Audit

Evaluate whether the website respects customer autonomy.

- [ ] Pricing information is not misleading.
- [ ] Important conditions are discoverable.
- [ ] Optional commitments require informed selection.
- [ ] Consent controls are understandable.
- [ ] Optional marketing consent is not preselected.
- [ ] Artificial urgency is avoided.
- [ ] Fabricated scarcity is avoided.
- [ ] Reviews and trust signals are authentic.
- [ ] Progress indicators are accurate.
- [ ] Button labels reflect actual outcomes.
- [ ] Cancellation or preference changes are not unnecessarily obstructed.
- [ ] Customers are not pressured through misleading visual hierarchy.

### Applicable principles

- Default Effect.
- Goal-Gradient Effect.
- Zeigarnik Effect.
- Von Restorff Effect.
- Progressive Disclosure.

A UX principle must never be used to justify deceptive behavior.

---

## 26. Core Design System Alignment Audit

Evaluate whether the experience is implemented through established Core resources.

- [ ] Existing variables are reused.
- [ ] Existing classes are reused.
- [ ] Existing components are reused.
- [ ] Existing properties and slots are evaluated.
- [ ] Canonical section architecture is preserved.
- [ ] Responsive utilities are used appropriately.
- [ ] Native Webflow functionality is prioritized.
- [ ] Client-specific content remains appropriately scoped.
- [ ] Product-specific behavior remains outside universal Core infrastructure.
- [ ] Competing design systems are avoided.

Coordinate confirmed architectural findings with the Core Design System skill.

Do not recommend rebuilding a component when an existing property or variant can satisfy the requirement.

---

## 27. UX Principle Coverage Matrix

Use this matrix to identify relevant principles during an audit.

| Audit area | Relevant principles |
|---|---|
| Visual hierarchy | Von Restorff, Similarity, Prägnanz |
| Content grouping | Proximity, Common Region, Uniform Connectedness |
| Visual consistency | Similarity, Aesthetic-Usability |
| Navigation | Jakob, Hick, Recognition, Fitts |
| Information complexity | Cognitive Load, Tesler, Occam |
| Progressive experiences | Progressive Disclosure, Goal-Gradient, Zeigarnik |
| Form efficiency | Parkinson, Tesler, Cognitive Load |
| Interaction discoverability | Active User, Jakob, Recognition |
| Interaction feedback | Doherty, Peak-End |
| Defaults and consent | Default Effect |
| Page composition | Serial Position, Prägnanz |
| Improvement prioritization | Pareto Principle |
| Accessibility | WCAG, Fitts, Recognition |

This matrix supports principle selection.

It does not require every principle to be applied to every audit area.

---

## 28. Audit Evidence Classification

Classify each finding according to its supporting evidence.

### Confirmed Defect

A problem demonstrated through direct inspection or testing.

Example:

The mobile quote button is obscured by fixed navigation.

### Confirmed Standards Violation

A verified departure from an applicable accessibility or architectural requirement.

Example:

Measured text contrast fails an applicable WCAG success criterion.

### Observed Usability Concern

An observable experience issue with a plausible user impact.

Example:

Three visually dominant CTAs compete within a service hero.

The effect on actual customer behavior may require further validation.

### Improvement Hypothesis

A proposed change that may improve the experience but has not been validated.

Example:

Reducing the number of required quote fields may improve completion rates.

### Design Preference

A subjective visual preference without an established usability or standards violation.

Example:

Preferring one decorative image treatment over another.

### Unverified Finding

A potential issue that cannot be confirmed with available access or evidence.

Do not present unverified findings as confirmed defects.

---

## 29. Audit Status Definitions

Use the following statuses.

| Status | Definition |
|---|---|
| Pass | The applicable requirement was verified |
| Fail | A confirmed defect or violation exists |
| Concern | An observable issue or justified improvement opportunity exists |
| Not Tested | Available evidence is insufficient |
| Not Applicable | The requirement does not apply |

A Concern does not automatically constitute a standards violation.

Do not mark an item Pass solely because the relevant component is native to Webflow.

---

## 30. Finding Severity

Prioritize findings according to actual customer impact.

### Critical

An essential customer journey is unavailable, or the issue creates substantial accessibility, privacy, or production risk.

Examples:

- Customers cannot submit an essential form.
- Primary navigation is unusable.
- Sensitive information is exposed.
- Essential functionality is inaccessible to keyboard users without an alternative.

### High

A significant issue substantially impairs an important customer journey.

Examples:

- Mobile navigation obscures primary actions.
- Important service information is difficult to discover.
- A quote process cannot be completed reliably.
- A misleading interface creates substantial customer confusion.

### Medium

An issue introduces unnecessary friction, inconsistency, or avoidable complexity.

Examples:

- Competing CTAs.
- Unnecessarily complicated forms.
- Inconsistent service card presentation.
- Poorly organized secondary navigation.

### Low

A refinement may improve visual polish or secondary usability without substantially affecting task completion.

Examples:

- Minor spacing inconsistencies.
- Nonessential decorative improvements.
- Minor wording refinements.

Severity must reflect demonstrated or reasonably supported impact.

Do not inflate severity to make an audit appear more substantial.

---

## 31. Recommendation Prioritization

Evaluate each proposed improvement according to:

- Customer impact.
- Business relevance.
- Accessibility implications.
- Evidence confidence.
- Frequency of affected interactions.
- Implementation complexity.
- Shared component implications.
- Regression risk.

### Priority categories

| Priority | Meaning |
|---|---|
| P0 | Resolve immediately or before release |
| P1 | Address in the next implementation cycle |
| P2 | Schedule as a meaningful improvement |
| P3 | Consider when resources permit |

Priority is not identical to severity.

A confirmed high-severity issue may require coordination before implementation, while a simple medium-severity correction may be addressed immediately.

Accessibility, privacy, and essential functionality must not be deprioritized solely because implementation is difficult.

### Pareto application

Focus on improvements likely to produce the greatest meaningful customer benefit.

Do not invent numerical impact estimates.

---

## 32. Individual Finding Report

Use the following format for significant findings.

### Finding ID

Assign a unique identifier.

Example:

UX-001

### Location

Identify the affected page, section, component, or customer journey.

### Observation

Describe what was directly observed.

### Evidence

Identify the screenshot, inspection, test, measurement, or other supporting information.

### Customer objective

Explain what the visitor is attempting to accomplish.

### Finding classification

Select the applicable evidence classification.

### Severity

Critical, High, Medium, or Low.

### Priority

P0, P1, P2, or P3.

### Applicable principles

Identify only the relevant UX principles or standards.

### User impact

Explain how the issue affects understanding, accessibility, confidence, or task completion.

### Recommendation

Describe the smallest appropriate improvement.

### Core implementation

Identify applicable existing components, variables, classes, properties, slots, or native functionality.

### Validation

Describe how the proposed correction should be evaluated.

### Limitations

Identify missing evidence, assumptions, or unresolved implementation risks.

---

## 33. Worked Audit Finding

### Finding ID

UX-001

### Location

Mobile service page hero.

### Observation

Three equally prominent buttons are displayed:

- Call Now.
- Request a Quote.
- View Gallery.

### Evidence

Direct visual inspection of the mobile layout.

### Customer objective

Understand the service and identify an appropriate next action.

### Finding classification

Observed Usability Concern.

### Severity

Medium.

### Priority

P2.

### Applicable principles

- Von Restorff Effect.
- Hick's Law.
- Law of Similarity.
- Cognitive Load.

### User impact

Competing visual emphasis may make the intended next action less obvious.

### Recommendation

If quote requests are the confirmed primary business objective, make Request a Quote the dominant page-level action.

Present View Gallery as a secondary action.

Preserve Call within the approved mobile navigation.

### Core implementation

Reuse Button / Standard Flat and its supported variants.

Preserve the existing mobile bottom navigation component.

### Validation

- Inspect the revised visual hierarchy.
- Verify button destinations.
- Evaluate mobile touch targets.
- Test keyboard interaction.
- Evaluate customer task completion where practical.

### Limitations

The primary business objective must be confirmed.

The expected improvement has not been measured.

This is an illustrative finding, not a confirmed defect on an existing Mayes Digital website.

---

## 34. Audit Summary Report

At the completion of a substantial audit, provide a structured summary.

### Executive summary

Describe:

- Website or project evaluated.
- Audit scope.
- Primary customer journeys.
- Overall observations.
- Most consequential findings.
- Recommended next steps.

### Audit coverage

| Area | Status | Evidence |
|---|---|---|
| Customer journey | Status | Inspection or test |
| Information architecture | Status | Inspection or test |
| Page composition | Status | Inspection or test |
| Visual hierarchy | Status | Inspection or test |
| Navigation | Status | Inspection or test |
| Mobile experience | Status | Inspection or test |
| Trust and credibility | Status | Inspection or test |
| Conversion experience | Status | Inspection or test |
| Forms | Status | Inspection or test |
| Accessibility | Status | Inspection or test |
| Performance experience | Status | Inspection or test |
| Ethical design | Status | Inspection or test |
| Core alignment | Status | Inspection or test |

### Findings summary

Report the number of verified findings by severity.

Distinguish confirmed defects from concerns and improvement hypotheses.

### Prioritized recommendations

Present recommendations in order of meaningful customer impact.

### Implementation opportunities

Identify:

- Existing Core components that can be reused.
- Existing properties or variants that can address findings.
- Native Webflow functionality that can support corrections.
- Changes requiring architectural approval.

### Limitations

Disclose:

- Unavailable pages.
- Missing access.
- Untested interactions.
- Missing analytics.
- Unverified business claims.
- Missing physical-device testing.
- Other evidence limitations.

Do not assign an arbitrary overall UX score.

---

## 35. Remediation Workflow

After an audit:

1. Confirm the findings.
2. Prioritize according to customer impact.
3. Identify existing Core resources.
4. Determine the smallest appropriate corrections.
5. Identify shared component implications.
6. Establish implementation scope.
7. Implement authorized corrections.
8. Validate affected experiences.
9. Perform relevant regression testing.
10. Document remaining issues.

Do not automatically implement every audit recommendation.

An audit identifies opportunities and problems. Implementation requires appropriate authorization.

---

## 36. Post-Implementation Validation

After correcting an experience issue:

- [ ] The original issue is reassessed.
- [ ] The intended customer objective remains supported.
- [ ] Relevant functionality is tested.
- [ ] Responsive behavior is verified.
- [ ] Accessibility implications are evaluated.
- [ ] Existing Core architecture is preserved.
- [ ] Related components remain functional.
- [ ] No new unnecessary friction is introduced.
- [ ] Remaining limitations are documented.

### Outcome classification

Use one of the following:

- Resolved and verified.
- Implemented but awaiting verification.
- Partially resolved.
- Unresolved.
- Deferred with justification.

Do not report a finding as resolved merely because a change was made.

---

## 37. Cross-Skill Escalation

Route findings to the appropriate skill.

| Finding type | Responsible skill |
|---|---|
| Confusing navigation | Experience Design |
| Competing CTA hierarchy | Experience Design |
| Excessive cognitive load | Experience Design |
| Duplicate variables | Core Design System |
| Incorrect class architecture | Core Design System |
| Shared component inconsistency | Core Design System |
| Broken CMS bindings | Webflow Development |
| Integration failure | Webflow Development |
| Unnecessary custom code | Webflow Development |
| Poor search discoverability | Organic Visibility |
| Incorrect business metadata | Organic Visibility |
| Broken form submission | Quality Assurance and Webflow Development |
| Accessibility verification | Quality Assurance |
| Performance measurement | Quality Assurance |
| Regression testing | Quality Assurance |

Multiple skills may contribute to resolving a finding.

Do not duplicate their complete responsibilities.

---

## 38. Audit Completion Criteria

An experience audit is complete when:

- [ ] The requested scope has been evaluated.
- [ ] Primary customer objectives are understood.
- [ ] Relevant customer journeys have been inspected.
- [ ] Applicable UX principles have been considered.
- [ ] Findings are supported by available evidence.
- [ ] Confirmed defects are distinguished from hypotheses.
- [ ] Findings are appropriately prioritized.
- [ ] Recommendations align with Core architecture.
- [ ] Testing limitations are disclosed.
- [ ] Appropriate next steps are identified.

A completed audit does not establish that every website requirement has passed.

It establishes that the defined audit scope has been evaluated and documented.

---

## 39. Prohibited Audit Practices

Do not:

- Invent usability findings.
- Fabricate test results.
- Invent analytics or conversion statistics.
- Assign arbitrary UX scores.
- Treat personal preferences as confirmed defects.
- Apply every UX principle mechanically.
- Recommend unnecessary redesigns.
- Introduce competing design systems.
- Ignore established product architecture.
- Claim accessibility conformance without sufficient evidence.
- Conceal testing limitations.
- Implement unauthorized changes.
- Publish changes without authorization.

---

## Operating Standard

**Audit the experience, not merely the appearance.**

**Evaluate the customer journey, not merely individual sections.**

**Identify meaningful problems, not unnecessary design changes.**

**Prioritize user impact, not personal preference.**

**Recommend existing Core resources before creating new ones.**

**Distinguish evidence from assumptions.**

**Verify improvements before declaring them successful.**