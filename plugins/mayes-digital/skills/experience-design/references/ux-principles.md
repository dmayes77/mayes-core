# Mayes Digital Experience Design
## UX Principles Reference

### Purpose

Establish a practical framework for applying user experience principles to Mayes Digital websites.

These principles support informed design decisions involving visual organization, cognitive efficiency, interaction design, customer journeys, accessibility, and ethical conversion.

They are not independent rules that must all be applied to every interface.

**Core principle: Understand the user's objective, identify the friction, and apply the principles that meaningfully improve the experience.**

---

## 1. Framework Organization

The Mayes Digital UX framework contains 25 principles and standards organized into five categories.

| Category | Primary Objective |
|---|---|
| Perception and Visual Organization | Make information understandable |
| Cognitive Efficiency and Decision-Making | Make decisions easier |
| Interaction and Task Completion | Make actions easier |
| Prioritization and Experience Perception | Focus on meaningful outcomes |
| Accessibility | Make experiences usable by more people |

The framework includes psychological effects, design heuristics, prioritization principles, and accessibility standards.

Not every principle represents a scientifically universal law.

Use each principle as a design consideration rather than a guarantee of user behavior.

---

# Category One: Perception and Visual Organization

## 2. Aesthetic-Usability Effect

### Definition

Users often perceive visually appealing interfaces as easier to use, even when their underlying functionality is comparable to less attractive interfaces.

### Design objective

Establish confidence and positive initial perceptions through professional visual presentation.

### Application

- Maintain consistent typography.
- Use intentional spacing.
- Establish clear alignment.
- Use appropriate imagery.
- Maintain consistent colors.
- Avoid visual clutter.
- Preserve professional presentation.

### Webflow example

A local landscaping website uses consistent service cards, authentic project photography, established Core typography, and balanced section spacing.

The result should communicate professionalism without introducing unnecessary decorative complexity.

### Core implementation

Use existing Theme variables, typography classes, surface utilities, image containers, and reusable section components.

### Limitations

Visual appeal does not correct broken functionality.

An attractive website may still have inaccessible controls, confusing navigation, or poor performance.

Never use aesthetics to justify usability failures.

### Related principles

- Law of Prägnanz
- Law of Similarity
- Cognitive Load
- WCAG

---

## 3. Law of Proximity

### Definition

Elements positioned close together tend to be perceived as related.

### Design objective

Communicate relationships through intentional spacing.

### Application

- Group headings with supporting descriptions.
- Keep labels close to their associated fields.
- Position buttons near relevant content.
- Separate unrelated content.
- Use larger gaps between distinct groups.

### Webflow example

A service card contains an image, service name, description, price, and CTA.

Internal spacing communicates that these elements belong together.

A larger gap separates the card from neighboring cards.

### Core implementation

Use established layout containers and `gap-*` utilities.

Avoid arbitrary margins that create inconsistent relationships.

### Limitations

Proximity alone may not communicate complex relationships.

Additional headings, boundaries, or labels may be necessary.

### Related principles

- Law of Common Region
- Law of Similarity
- Law of Uniform Connectedness

---

## 4. Law of Similarity

### Definition

Elements with similar visual characteristics tend to be perceived as belonging to the same group or serving similar functions.

### Design objective

Make repeated patterns recognizable and predictable.

### Application

- Use consistent button styling.
- Maintain consistent card structures.
- Apply consistent icon treatments.
- Preserve typography hierarchy.
- Use consistent interaction states.

### Webflow example

All primary quote buttons use the same approved button variant.

Visitors learn to recognize that visual treatment as the primary action.

### Core implementation

Reuse Core components, variants, Theme variables, and typography utilities.

### Limitations

Elements with different functions should not appear identical when the distinction is important.

Do not rely exclusively on color to communicate differences.

### Related principles

- Jakob's Law
- Recognition Rather Than Recall
- Von Restorff Effect
- WCAG

---

## 5. Law of Common Region

### Definition

Elements located within a shared visual boundary tend to be perceived as a related group.

### Design objective

Create understandable content groups.

### Application

- Group related form fields.
- Organize service information into cards.
- Separate pricing information.
- Group business settings.
- Distinguish related content from surrounding sections.

### Webflow example

A service card uses a shared surface to group its image, description, pricing information, and action.

### Core implementation

Use existing card components, surface utilities, radius utilities, and layout spacing.

### Limitations

Not every content group requires a visible container.

Excessive cards, borders, and nested surfaces can create visual clutter.

Use proximity when a separate boundary is unnecessary.

### Related principles

- Law of Proximity
- Cognitive Load
- Occam's Razor

---

## 6. Law of Uniform Connectedness

### Definition

Elements that are visually connected tend to be perceived as more strongly related than elements without an explicit connection.

### Design objective

Communicate sequences, dependencies, and relationships.

### Application

- Connect related process steps.
- Associate form labels with controls.
- Connect progress indicators.
- Communicate relationships between interface states.

### Webflow example

A three-step service process uses numbered steps and a subtle connecting line to communicate progression.

### Core implementation

Reuse existing process components and approved decorative treatments.

### Limitations

Decorative connections should not imply relationships that do not exist.

Connections must not replace accessible labels or meaningful document structure.

### Related principles

- Goal-Gradient Effect
- Law of Proximity
- Law of Common Region

---

## 7. Law of Prägnanz

### Definition

People tend to interpret complex visual information in relatively simple, organized forms.

This principle is also associated with simplicity and good form in Gestalt psychology.

### Design objective

Make interfaces easier to visually interpret.

### Application

- Simplify visual composition.
- Establish recognizable patterns.
- Reduce unnecessary decoration.
- Maintain clear alignment.
- Use understandable icons.
- Establish consistent content hierarchy.

### Webflow example

A homepage hero uses one clear heading, supporting copy, relevant imagery, and a dominant CTA rather than multiple competing visual elements.

### Core implementation

Use established Hero components, typography, layout utilities, and button variants.

### Limitations

Visual simplicity must not remove information users need.

Complex business requirements may require appropriately detailed interfaces.

### Related principles

- Occam's Razor
- Cognitive Load
- Aesthetic-Usability Effect

---

## 8. Von Restorff Effect

### Definition

An item that meaningfully differs from surrounding items is more likely to attract attention and be remembered.

Also known as the Isolation Effect.

### Design objective

Direct attention toward important information or actions.

### Application

- Distinguish primary CTAs.
- Highlight important notices.
- Establish a focal point.
- Differentiate selected states.
- Emphasize meaningful exceptions.

### Webflow example

A service page uses a primary button for Request a Quote and a less prominent secondary button for View Our Work.

### Core implementation

Use established button variants, semantic colors, and typography hierarchy.

### Limitations

When everything is emphasized, nothing meaningfully stands out.

Do not use attention-grabbing treatments for every action.

Do not rely exclusively on color.

### Related principles

- Law of Similarity
- Hick's Law
- Serial Position Effect
- WCAG

---

# Category Two: Cognitive Efficiency and Decision-Making

## 9. Hick's Law

### Definition

Under certain decision-making conditions, the time required to make a choice increases as the number and complexity of alternatives increase.

### Design objective

Reduce unnecessary decision-making effort.

### Application

- Simplify primary navigation.
- Group related services.
- Reduce competing CTAs.
- Organize complex choices.
- Present meaningful categories.

### Webflow example

Instead of displaying twelve equally prominent service links in the primary navigation, group them under Services and provide a clearly organized service page.

### Core implementation

Use established navigation components, service cards, and service-list sections.

### Limitations

Fewer choices are not automatically better.

Removing meaningful options may make the experience less useful.

Experienced users may benefit from direct access to additional choices.

### Related principles

- Cognitive Load
- Progressive Disclosure
- Recognition Rather Than Recall
- Pareto Principle

---

## 10. Jakob's Law

### Definition

Users develop expectations from their experiences with other websites and digital interfaces.

Familiar patterns can reduce the effort required to understand a new interface.

### Design objective

Make interactions predictable.

### Application

- Use familiar navigation labels.
- Preserve recognizable form controls.
- Maintain expected link behavior.
- Use recognizable interaction patterns.
- Provide understandable feedback.

### Webflow example

A service website uses Home, Services, Call, Our Work, and Quote rather than unconventional labels that customers must interpret.

### Core implementation

Reuse approved navigation, button, form, and modal components.

### Limitations

Common patterns are not necessarily accessible or appropriate.

Innovation is acceptable when it provides a meaningful improvement and remains understandable.

### Related principles

- Recognition Rather Than Recall
- Law of Similarity
- Paradox of the Active User

---

## 11. Cognitive Load

### Definition

Cognitive load describes the mental effort required to process information and complete a task.

Working memory has limited capacity.

### Design objective

Reduce unnecessary mental effort without removing essential information.

### Application

- Organize content into meaningful groups.
- Use understandable language.
- Reduce competing visual elements.
- Simplify instructions.
- Provide contextual guidance.
- Break complex tasks into manageable stages.

### Webflow example

A quote request presents clear service options before requesting contact information rather than displaying a dense form containing every possible question.

### Core implementation

Use reusable cards, native forms, supported sheets, typography hierarchy, and consistent spacing.

### Limitations

Some tasks inherently require thought and effort.

Do not remove information necessary for an informed decision.

### Related principles

- Hick's Law
- Progressive Disclosure
- Tesler's Law
- Law of Prägnanz

---

## 12. Recognition Rather Than Recall

### Definition

Interfaces are generally easier to use when relevant information and options are visible or readily retrievable rather than requiring users to remember them.

### Design objective

Reduce dependence on memory.

### Application

- Display recognizable navigation labels.
- Show available service options.
- Preserve selected values.
- Provide contextual instructions.
- Display meaningful icons with labels.
- Maintain visible progress information.

### Webflow example

A mobile navigation bar displays both icons and text labels instead of requiring visitors to interpret unfamiliar icons.

### Core implementation

Use established navigation components, labeled buttons, native form controls, and supported selection states.

### Limitations

Displaying every possible option can increase visual complexity.

Balance recognition with progressive disclosure and meaningful grouping.

### Related principles

- Jakob's Law
- Hick's Law
- Cognitive Load
- Progressive Disclosure

---

## 13. Tesler's Law

### Definition

Also known as the Law of Conservation of Complexity.

Every system contains some inherent complexity that must be handled by the system, its designers, or its users.

### Design objective

Move unnecessary complexity away from the customer when the system can manage it responsibly.

### Application

- Reuse known customer information when appropriate.
- Provide understandable service selections.
- Automate calculations where reliable.
- Centralize business information.
- Reduce repetitive data entry.
- Handle technical complexity behind the interface.

### Webflow example

Business hours, telephone numbers, and location information are managed through centralized CMS data rather than maintained separately across multiple pages.

### Core implementation

Use existing CMS architecture, business data bindings, and approved integrations.

### Limitations

Automation must remain accurate and transparent.

Do not conceal important decisions or make consequential choices without appropriate user involvement.

### Related principles

- Cognitive Load
- Occam's Razor
- Default Effect
- Progressive Disclosure

---

## 14. Occam's Razor

### Definition

Among explanations or solutions that adequately satisfy a requirement, prefer the one that introduces fewer unnecessary assumptions or complications.

### Design objective

Choose the simplest effective solution.

### Application

- Reuse existing components.
- Avoid unnecessary interactions.
- Simplify page composition.
- Reduce redundant functionality.
- Prefer native implementation where appropriate.

### Webflow example

Use the existing native swipe-and-snap card row rather than introducing a custom JavaScript carousel when both satisfy the same requirement.

### Core implementation

Follow the Mayes Digital native-first architecture.

### Limitations

The simplest implementation is not necessarily the best user experience.

A more complex solution may be justified by accessibility, functionality, or meaningful customer needs.

### Related principles

- Tesler's Law
- Law of Prägnanz
- Pareto Principle

---

## 15. Progressive Disclosure

### Definition

Present information and functionality in stages, revealing additional detail when it becomes relevant.

### Design objective

Reduce initial complexity while preserving access to necessary information.

### Application

- Expandable FAQs.
- Contextual settings.
- Multi-step quote forms.
- Optional service enhancements.
- Detailed service information.
- Secondary navigation.

### Webflow example

A quote experience begins with service selection, presents relevant follow-up questions, and requests contact information before submission.

### Core implementation

Use native Webflow Modals, approved sheets, native forms, and established interaction patterns.

### Limitations

Do not hide:

- Important pricing conditions.
- Essential service information.
- Required disclosures.
- Consent requirements.
- Critical navigation.

Progressive disclosure must improve understanding rather than conceal information.

### Related principles

- Hick's Law
- Cognitive Load
- Goal-Gradient Effect
- Recognition Rather Than Recall

---

# Category Three: Interaction and Task Completion

## 16. Fitts's Law

### Definition

The time required to reach a target is influenced by the target's size and distance.

### Design objective

Make important interactive controls easier to reach and activate.

### Application

- Provide comfortable touch targets.
- Position important actions conveniently.
- Maintain spacing between controls.
- Avoid unnecessarily small interactive elements.
- Keep primary actions accessible.

### Webflow example

The standard Base mobile navigation provides a centrally positioned Call action within persistent bottom navigation.

### Core implementation

Use existing navigation components, button sizes, spacing variables, and safe-area behavior.

### Limitations

Larger targets do not automatically justify more visual emphasis.

Target placement must account for accessibility, device size, handedness, and interaction context.

### Accessibility guidance

Use approximately 44 × 44 CSS pixels as a practical touch-target design goal.

WCAG 2.2 Level AA establishes a separate 24 × 24 CSS pixel minimum target-size criterion with defined exceptions.

### Related principles

- Jakob's Law
- Von Restorff Effect
- WCAG

---

## 17. Goal-Gradient Effect

### Definition

Motivation to complete a goal may increase as a person perceives themselves approaching completion.

### Design objective

Help users understand their progress toward a meaningful outcome.

### Application

- Display accurate progress indicators.
- Communicate remaining steps.
- Group complex tasks into manageable stages.
- Provide clear completion feedback.

### Webflow example

A four-step quote experience displays the current step and total number of steps.

### Core implementation

Use approved form structures, existing typography, supported state classes, and native interactions where practical.

### Limitations

Do not fabricate progress.

Do not add unnecessary steps solely to create a sense of achievement.

Do not use misleading progress indicators to pressure users.

### Related principles

- Zeigarnik Effect
- Progressive Disclosure
- Peak-End Rule

---

## 18. Zeigarnik Effect

### Definition

Under certain conditions, interrupted or incomplete tasks may remain more cognitively salient than completed tasks.

The effect is context-dependent and should not be treated as a universal behavioral guarantee.

### Design objective

Help users understand unfinished tasks and resume them when appropriate.

### Application

- Clearly communicate incomplete form steps.
- Preserve progress when appropriate.
- Identify missing required information.
- Provide understandable completion states.

### Webflow example

A multi-step quote form identifies which required information remains incomplete without discarding previously entered answers.

### Core implementation

Use supported form states and approved persistence mechanisms when available.

### Limitations

Do not intentionally create incomplete tasks to manipulate users.

Do not generate unnecessary notifications or pressure users to finish an optional process.

### Related principles

- Goal-Gradient Effect
- Progressive Disclosure
- Peak-End Rule

---

## 19. Parkinson's Law

### Definition

Work tends to expand to fill the time available for its completion.

Originally a management observation, it can serve as a heuristic for simplifying task design.

### Design objective

Avoid unnecessary task duration and procedural complexity.

### Application

- Remove redundant form fields.
- Reduce unnecessary steps.
- Provide concise instructions.
- Make routine actions efficient.
- Avoid unnecessary waiting.

### Webflow example

A customer requesting a basic quote provides the necessary service and contact information without completing a lengthy account-registration process.

### Core implementation

Use native forms and existing conversion components.

### Limitations

Do not impose arbitrary time limits.

Do not rush users through important decisions.

Users may require additional time because of accessibility needs or task complexity.

### Related principles

- Occam's Razor
- Cognitive Load
- Tesler's Law

---

## 20. Paradox of the Active User

### Definition

Users often prefer to begin using an interface immediately rather than spend time learning its complete functionality beforehand.

### Design objective

Make interfaces understandable through use.

### Application

- Provide clear starting actions.
- Use familiar interaction patterns.
- Offer contextual guidance.
- Avoid unnecessary introductory instructions.
- Make common tasks self-explanatory.

### Webflow example

A visitor can immediately select a service or request a quote without reading instructions explaining how the website works.

### Core implementation

Use established navigation, labeled buttons, recognizable cards, and native form controls.

### Limitations

Complex or consequential tasks may require instructions, disclosures, or confirmation.

Do not remove essential guidance simply because users prefer immediate action.

### Related principles

- Jakob's Law
- Recognition Rather Than Recall
- Progressive Disclosure

---

## 21. Default Effect

### Definition

People may be more likely to retain a preselected or established option than actively change it.

### Design objective

Provide useful, transparent, and responsible starting states.

### Application

- Establish sensible component defaults.
- Provide understandable initial interface states.
- Select appropriate presentation defaults.
- Reduce unnecessary configuration.

### Webflow example

A service card's optional price display defaults to hidden until the business supplies appropriate pricing information.

### Core implementation

Use established component properties, visibility switches, and approved defaults.

### Limitations

Never use defaults to obtain unintended consent or commitments.

Do not preselect optional marketing consent, paid enhancements, or unnecessary purchases.

Users must understand and be able to change meaningful defaults.

### Related principles

- Tesler's Law
- Cognitive Load
- Ethical Experience Design

---

## 22. Doherty Threshold

### Definition

The Doherty Threshold describes the relationship between responsive computer interaction and user productivity.

It is commonly associated with interaction response times of approximately 400 milliseconds or less.

### Design objective

Maintain interaction continuity and provide timely feedback.

### Application

- Provide immediate button feedback.
- Communicate loading states.
- Avoid unnecessary interaction delays.
- Prioritize essential content.
- Use efficient native functionality.

### Webflow example

After submitting a quote form, the interface communicates that submission is in progress and displays confirmation when submission succeeds.

### Core implementation

Use native interaction states, native form feedback, approved motion patterns, and efficient Core modules.

### Limitations

The 400-millisecond figure is not a universal performance requirement for every website operation.

Do not report success before an operation actually completes.

Do not introduce artificial delays solely for animation.

### Related principles

- Cognitive Load
- Peak-End Rule
- Occam's Razor

---

# Category Four: Prioritization and Experience Perception

## 23. Pareto Principle

### Definition

In many systems, a relatively small proportion of contributing factors accounts for a substantial proportion of outcomes.

Often described as the 80/20 principle.

### Design objective

Prioritize improvements that produce meaningful user and business benefits.

### Application

- Identify essential customer journeys.
- Prioritize high-impact usability problems.
- Focus on frequently used functionality.
- Reduce unnecessary feature development.
- Prioritize essential content.

### Webflow example

Correcting broken mobile quote functionality takes priority over refining decorative animations.

### Core implementation

Use the Core implementation checklist and Quality Assurance findings to prioritize work.

### Limitations

The 80/20 ratio is not guaranteed.

Do not invent impact percentages.

Low-frequency tasks may still be essential, particularly accessibility, privacy, and error recovery.

### Related principles

- Occam's Razor
- Hick's Law
- Cognitive Load

---

## 24. Serial Position Effect

### Definition

In certain memory tasks, items presented near the beginning or end of a sequence may be remembered more readily than items presented in the middle.

These tendencies are associated with primacy and recency effects.

### Design objective

Use content order intentionally.

### Application

- Establish important information early.
- End meaningful sequences with clear next actions.
- Prioritize navigation order.
- Organize page sections logically.
- Provide clear final CTAs.

### Webflow example

A homepage begins with a clear explanation of the business and concludes with a relevant call to action.

### Core implementation

Use established Hero, content section, and Final CTA components.

### Limitations

Do not assume users consume website content sequentially.

Visitors may enter through interior pages or navigate directly to specific sections.

Important information must remain discoverable regardless of position.

### Related principles

- Von Restorff Effect
- Peak-End Rule
- Customer Journey Design

---

## 25. Peak-End Rule

### Definition

People's retrospective evaluation of some experiences may be disproportionately influenced by emotionally significant moments and how the experience ends.

### Design objective

Create meaningful, positive experiences at important customer touchpoints.

### Application

- Provide clear submission confirmation.
- Communicate next steps.
- Handle errors respectfully.
- Reduce frustration during important interactions.
- End customer journeys with useful information.

### Webflow example

After a successful quote request, the website confirms receipt and explains what the customer can expect next.

### Core implementation

Use established form success states, confirmation content, and approved interaction patterns.

### Limitations

A positive ending does not compensate for an unnecessarily frustrating process.

Do not manufacture emotional peaks through manipulation.

Do not promise response times or outcomes the business cannot verify.

### Related principles

- Goal-Gradient Effect
- Doherty Threshold
- Zeigarnik Effect

---

# Category Five: Accessibility

## 26. Web Content Accessibility Guidelines (WCAG)

### Definition

WCAG is an internationally recognized technical accessibility standard developed through the World Wide Web Consortium.

Unlike the other principles in this framework, WCAG establishes defined accessibility success criteria.

### Design objective

Make websites perceivable, operable, understandable, and robust.

### Proposed evaluation baseline

WCAG 2.2 Level AA.

Apply any additional accessibility requirements established by the project.

### Perceivable

Users must be able to perceive relevant information.

Requirements include:

- Appropriate text alternatives.
- Sufficient color contrast.
- Adaptable content.
- Understandable visual presentation.
- Support for text resizing.

### Operable

Users must be able to operate interface controls.

Requirements include:

- Keyboard accessibility.
- Visible focus indicators.
- Accessible navigation.
- Appropriate interaction targets.
- Avoidance of keyboard traps.
- Appropriate timing controls.

### Understandable

Users must be able to understand content and interface behavior.

Requirements include:

- Readable content.
- Predictable navigation.
- Clear instructions.
- Understandable errors.
- Appropriate form assistance.

### Robust

Content must support appropriate interpretation by browsers and assistive technologies.

Requirements include:

- Semantic structure.
- Accessible names.
- Appropriate roles and states.
- Compatible interaction behavior.

### Selected Level AA considerations

| Requirement | General guidance |
|---|---|
| Normal text contrast | At least 4.5:1, subject to applicable exceptions |
| Large text contrast | At least 3:1, subject to applicable exceptions |
| Non-text contrast | At least 3:1 for applicable visual information |
| Target size | At least 24 × 24 CSS pixels or an applicable exception |
| Text resizing | Support resizing to 200% under applicable criteria |
| Reflow | Support applicable reflow requirements at a width equivalent to 320 CSS pixels |

These examples are not a complete WCAG conformance checklist.

Consult the current normative standard when evaluating specific success criteria.

### Webflow example

A quote sheet supports keyboard navigation, accessible form labels, visible focus, understandable errors, sufficient contrast, and appropriate focus management.

### Core implementation

Use existing accessible component patterns, semantic elements, Theme variables, native form controls, and supported modal behavior.

### Limitations

Native Webflow functionality does not automatically establish accessibility conformance.

Automated testing alone cannot establish complete WCAG conformance.

Coordinate detailed accessibility evaluation with the Quality Assurance skill.

### Authoritative reference

https://www.w3.org/TR/WCAG22/

---

# Integrated Application Framework

## 27. Principle Selection Matrix

Use this matrix to identify relevant principles according to the design problem.

| Design Problem | Relevant Principles |
|---|---|
| Unclear visual hierarchy | Von Restorff, Similarity, Prägnanz |
| Cluttered page | Cognitive Load, Prägnanz, Occam's Razor |
| Confusing content groups | Proximity, Common Region, Similarity |
| Too many navigation options | Hick's Law, Jakob's Law, Recognition |
| Difficult mobile interactions | Fitts's Law, Jakob's Law, WCAG |
| Complicated quote form | Progressive Disclosure, Tesler's Law, Cognitive Load |
| Unclear task progress | Goal-Gradient, Zeigarnik, Uniform Connectedness |
| Slow interaction feedback | Doherty Threshold, Cognitive Load |
| Unfamiliar interface | Jakob's Law, Recognition, Active User |
| Inconsistent components | Similarity, Jakob's Law, Aesthetic-Usability |
| Unclear submission outcome | Peak-End, Doherty Threshold |
| Excessive implementation complexity | Occam's Razor, Tesler's Law |
| Unclear improvement priorities | Pareto Principle |
| Weak page composition | Serial Position, Von Restorff, Cognitive Load |
| Inaccessible functionality | WCAG, Fitts's Law, Recognition |

Select principles based on the actual problem.

Do not cite principles merely to justify a predetermined design preference.

---

## 28. Resolving Principle Conflicts

### Hick's Law versus Recognition Rather Than Recall

Reducing visible choices may simplify decision-making but make important options harder to discover.

Resolution:

Group related options and preserve understandable labels rather than hiding everything.

### Aesthetic-Usability versus WCAG

A visually attractive color combination may fail accessibility requirements.

Resolution:

Adjust the visual treatment to meet applicable accessibility requirements.

Accessibility takes precedence.

### Progressive Disclosure versus Transparency

Hiding information may simplify an interface but prevent informed decisions.

Resolution:

Keep essential information visible and disclose optional details when relevant.

### Von Restorff versus Similarity

Consistent styling supports recognition, while differentiation supports emphasis.

Resolution:

Maintain consistent component structure and distinguish meaningful primary actions through approved variants.

### Occam's Razor versus Tesler's Law

A simple implementation may transfer unnecessary complexity to the customer.

Resolution:

Choose the simplest implementation that adequately supports the customer's needs.

### Goal-Gradient versus Parkinson's Law

A multi-step process may communicate progress but unnecessarily extend a simple task.

Resolution:

Use multiple steps only when they meaningfully improve comprehension or task completion.

### Default Effect versus User Autonomy

Defaults may reduce effort but also influence consequential decisions.

Resolution:

Use transparent defaults and require informed selection for optional commitments and consent.

---

## 29. Integrated Example: Local-Service Homepage

### Customer objective

Determine whether a local business provides the required service and can be trusted.

### Recommended composition

Hero:

- Communicate the service and business relevance.
- Establish a clear primary CTA.

Applicable principles:

- Von Restorff Effect.
- Law of Prägnanz.
- Serial Position Effect.

Services:

- Group available services into recognizable cards.
- Provide understandable descriptions.

Applicable principles:

- Law of Similarity.
- Law of Common Region.
- Recognition Rather Than Recall.

Trust and completed work:

- Provide authentic evidence.
- Maintain professional visual presentation.

Applicable principles:

- Aesthetic-Usability Effect.
- Law of Proximity.

Process:

- Explain what customers should expect.
- Communicate the sequence clearly.

Applicable principles:

- Law of Uniform Connectedness.
- Cognitive Load.

FAQ:

- Address common customer concerns.
- Reveal additional detail when requested.

Applicable principles:

- Progressive Disclosure.
- Hick's Law.

Final CTA:

- Provide an understandable next action.

Applicable principles:

- Serial Position Effect.
- Fitts's Law.

Across the entire page:

- Apply relevant accessibility requirements.
- Maintain consistent Core architecture.
- Validate mobile and desktop experiences.

Do not require this exact section sequence for every business.

---

## 30. Integrated Example: Quote Experience

### Customer objective

Request an accurate quote with minimal unnecessary effort.

### Recommended experience

1. Select the required service.
2. Answer relevant service-specific questions.
3. Provide necessary contact information.
4. Review applicable information and consent requirements.
5. Submit the request.
6. Receive accurate confirmation and next steps.

### Applicable principles

Hick's Law:

Present manageable service choices.

Recognition Rather Than Recall:

Display recognizable options and preserve selections.

Progressive Disclosure:

Reveal relevant questions at appropriate stages.

Tesler's Law:

Handle avoidable technical complexity within the system.

Fitts's Law:

Provide comfortable selection targets.

Goal-Gradient Effect:

Communicate accurate progress when multiple steps are justified.

Default Effect:

Use responsible initial states without preselecting optional commitments.

Doherty Threshold:

Provide timely interaction feedback.

Peak-End Rule:

Provide clear and useful confirmation.

WCAG:

Maintain accessibility throughout the experience.

### Implementation boundary

Use approved Core components and native Webflow functionality.

Verify the current availability of the quiz-style quote component before implementation.

---

## 31. Integrated Example: Mobile Navigation

### Customer objective

Navigate the website or contact the business without unnecessary effort.

### Standard Base pattern

Home | Services | Call | Our Work | Quote

### Applicable principles

Jakob's Law:

Use familiar navigation labels.

Recognition Rather Than Recall:

Display recognizable icons with labels.

Hick's Law:

Limit primary navigation to meaningful destinations.

Fitts's Law:

Provide accessible, conveniently positioned interaction targets.

Law of Similarity:

Maintain consistent navigation item styling.

Von Restorff Effect:

Distinguish the primary Call action appropriately.

Serial Position Effect:

Evaluate the ordering of navigation destinations.

WCAG:

Maintain accessible names, focus behavior, contrast, and target sizes.

### Implementation boundary

Reuse the approved Base mobile navigation component.

Do not impose this exact navigation structure on product-specific experiences with different customer journeys.

---

## 32. Integrated Example: Service Cards

### Customer objective

Understand available services and identify the appropriate next action.

### Recommended structure

- Relevant image.
- Service name.
- Concise description.
- Pricing when appropriate.
- Clear action.

### Applicable principles

Law of Proximity:

Keep related information together.

Law of Common Region:

Group service information within a shared card structure.

Law of Similarity:

Maintain consistent presentation across comparable services.

Recognition Rather Than Recall:

Make available services identifiable.

Cognitive Load:

Keep descriptions understandable.

Von Restorff Effect:

Distinguish the relevant action.

WCAG:

Maintain readable contrast and accessible interactions.

### Implementation boundary

Reuse existing Core service card components and supported price visibility properties.

Do not create a competing card architecture.

---

## 33. Design Decision Procedure

For every significant UX recommendation:

1. Identify the intended audience.
2. Identify the user's objective.
3. Identify the business objective.
4. Inspect the current experience.
5. Identify confirmed friction or a plausible improvement opportunity.
6. Select relevant principles.
7. Evaluate alternative solutions.
8. Identify potential principle conflicts.
9. Choose an appropriate solution.
10. Map the solution to existing Core architecture.
11. Establish validation criteria.
12. Report assumptions and remaining risks.

### Decision rule

The number of principles supporting a recommendation does not establish its quality.

A recommendation is justified by its relevance to the actual problem, supporting evidence, accessibility, and expected user benefit.

---

## 34. Evidence and Validation

Distinguish between:

### Established principle

A recognized psychological effect, heuristic, or technical standard.

### Design hypothesis

An expectation that applying a principle may improve a specific experience.

### Confirmed issue

A problem established through inspection, testing, or credible evidence.

### Validated outcome

An improvement demonstrated through appropriate measurement or testing.

Do not confuse these categories.

For example:

Reducing competing CTAs may improve decision clarity.

It does not establish that conversions will increase by a specific percentage.

### Validation methods

Use appropriate methods such as:

- Responsive inspection.
- Keyboard testing.
- Accessibility evaluation.
- Customer journey testing.
- Usability observation.
- Analytics review.
- Task completion measurement.
- Controlled comparison when practical.

Select validation methods according to the design objective.

---

## 35. Ethical Application

UX principles must improve the experience without manipulating customers.

Prohibited applications include:

- Artificial urgency.
- Fabricated scarcity.
- Misleading progress indicators.
- Hidden fees.
- Preselected optional consent.
- Misleading visual hierarchy.
- Obstructed cancellation.
- Fabricated trust signals.
- Unnecessary pressure.
- Concealed material information.

A principle must never be used to justify deceptive behavior.

---

## 36. Reference Foundations

Use these resources when deeper research or verification is required.

### Accessibility

W3C Web Content Accessibility Guidelines:

https://www.w3.org/TR/WCAG22/

### Usability heuristics

Nielsen Norman Group:

https://www.nngroup.com/articles/ten-usability-heuristics/

### UX principles

Laws of UX:

https://lawsofux.com/

### Foundational research and concepts

Relevant foundations include:

- Gestalt psychology and visual perception.
- Hick and Hyman's choice reaction-time research.
- Fitts's research on motor performance.
- Cognitive load theory.
- Research on memory and serial position.
- Research on retrospective experience evaluation.
- Human-computer interaction research.

Use primary research or authoritative standards when precise scientific or technical claims require verification.

Do not treat popular summaries as proof that every principle applies universally.

---

## 37. Cross-Skill Coordination

### Experience Design

Determines which principles apply and why.

### Core Design System

Provides the approved variables, classes, components, and responsive architecture.

### Webflow Development

Determines the appropriate native or custom implementation.

### Organic Visibility

Ensures content organization supports relevant search intent and discoverability.

### Quality Assurance

Verifies accessibility, usability, performance, functionality, and implementation outcomes.

---

## Operating Standard

**Use proximity to communicate relationships.**

**Use similarity to establish consistency.**

**Use hierarchy to direct attention.**

**Use simplicity to reduce unnecessary effort.**

**Use familiar patterns to improve understanding.**

**Use progressive disclosure to manage complexity.**

**Use accessible interactions to support more users.**

**Use authentic evidence to establish trust.**

**Use ethical design to preserve customer autonomy.**

**Use validation to establish whether the design works.**