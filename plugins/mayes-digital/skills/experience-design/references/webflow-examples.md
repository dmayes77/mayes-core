# Mayes Digital Experience Design
## Webflow Application Examples

### Purpose

Translate established UX principles into practical design and implementation patterns for Mayes Digital Webflow websites.

This reference connects experience design decisions to reusable Core components, native Webflow functionality, responsive architecture, and customer conversion journeys.

**Core principle: Every design pattern must serve a customer objective, support a business objective, and fit the established Core architecture.**

---

## 1. Reference Dependencies

Consult the following resources when applying these examples:

- `ux-principles.md`
- `audit-checklist.md`
- Core Design System skill
- Webflow Development skill
- Organic Visibility skill
- Quality Assurance skill

Primary implementation repository:

`dmayes77/mayes-core`

Relevant repository documentation:

- `docs/ARCHITECTURE.md`
- `docs/DECISIONS.md`
- `docs/NATIVE_FIRST.md`
- `base/README.md`

These examples describe recommended experience patterns.

Verify component availability, properties, classes, and implementation status against the current Webflow project before making changes.

Do not interpret illustrative examples as mandatory page templates.

---

## 2. Experience-to-Implementation Framework

Every proposed design should establish five relationships.

| Consideration | Question |
|---|---|
| Customer objective | What is the visitor trying to accomplish? |
| Business objective | What legitimate business outcome should the experience support? |
| UX principle | Why should the proposed experience work? |
| Core implementation | Which existing resources support the experience? |
| Validation | How will the experience be evaluated? |

Do not begin by selecting components without understanding the customer objective.

Components are implementation resources, not substitutes for design reasoning.

---

## 3. Relume Sitemap Planning

### Scenario

A local service business needs a professional website that establishes credibility and generates organic inquiries.

### Customer objective

Understand available services, evaluate the business, and determine how to make contact.

### Recommended sitemap

```text
Home
Services
    Individual Service Pages
Our Work
    Individual Project Pages
About
Contact
Privacy Policy
```

Add pages only when justified by customer needs, business requirements, or organic search intent.

### Applicable UX principles

- Hick's Law
- Jakob's Law
- Recognition Rather Than Recall
- Cognitive Load
- Pareto Principle

### Relume workflow

1. Generate an initial sitemap.
2. Review the business's actual services.
3. Remove unnecessary pages.
4. Identify missing customer information.
5. Establish logical navigation relationships.
6. Identify primary conversion destinations.
7. Coordinate with Organic Visibility requirements.
8. Approve the sitemap before detailed composition.

### Implementation boundary

Relume provides the planning foundation.

Core Design System governs the final Webflow implementation.

Do not introduce a competing design system through Relume-generated components.

### Validation

- Navigation labels are understandable.
- Important services are discoverable.
- Page relationships are logical.
- Each page has a defined purpose.
- Primary customer journeys remain accessible.

---

## 4. Relume Wireframe Planning

### Scenario

A generated wireframe contains numerous sections, repeated CTAs, and generic marketing content.

### Customer objective

Understand the business without unnecessary information or interaction.

### Recommended approach

Evaluate every section according to its purpose.

| Section purpose | Customer question |
|---|---|
| Relevance | Does this business provide what I need? |
| Services | What can this business do for me? |
| Value | Why should I consider this business? |
| Evidence | Can I trust this business? |
| Process | What happens if I move forward? |
| FAQ | What concerns remain unanswered? |
| Conversion | How do I take the next step? |

Remove sections that duplicate existing information without providing additional value.

### Applicable UX principles

- Pareto Principle
- Cognitive Load
- Occam's Razor
- Serial Position Effect
- Law of Prägnanz

### Core implementation

Map approved wireframe sections to existing Core components.

Use existing component properties and slots to support content variations.

Create new sections only when the existing component library cannot reasonably satisfy the requirement.

### Validation

- Every section has an identifiable purpose.
- Content follows a logical progression.
- Important customer questions are addressed.
- Conversion opportunities are clear.
- Existing Core components can support the composition.

---

## 5. Local-Service Homepage

### Scenario

A local service business needs a homepage that communicates relevance, establishes credibility, and encourages inquiries.

### Customer objective

Determine whether the business provides the required service and appears trustworthy.

### Recommended composition

```text
Page Shell
    Main Content
        Hero
        Trust Strip
        Services
        Why Us
        Our Work
        Process
        Reviews or FAQ
        Final CTA
```

This is a suggested composition.

Adjust the sequence according to customer needs, available content, and business requirements.

### Component mapping

| Experience section | Core component candidate |
|---|---|
| Hero | Section / Hero |
| Trust indicators | Section / Trust Strip |
| Services | Section / Card Grid or Section / Service List |
| Business differentiation | Section / Why Us |
| Completed work | Section / Card Row or Section / Card Grid |
| Process | Section / Process |
| Reviews | Section / Reviews |
| Questions | Section / FAQ |
| Final action | Section / Final CTA |

Verify current component names and availability.

### Applicable UX principles

- Serial Position Effect
- Aesthetic-Usability Effect
- Law of Similarity
- Law of Common Region
- Cognitive Load
- Progressive Disclosure
- Von Restorff Effect

### Validation

- The business offering is immediately understandable.
- Services are easy to identify.
- Trust claims are supported.
- Primary actions are accessible.
- Mobile content follows a logical sequence.
- No unnecessary sections interfere with the customer journey.

---

## 6. Hero Section

### Scenario

A homepage hero contains vague copy, competing buttons, and unrelated imagery.

### Customer objective

Quickly understand what the business does and whether it is relevant.

### Recommended composition

```text
Hero
    Business relevance
    Primary heading
    Supporting description
    Primary CTA
    Optional secondary CTA
    Relevant imagery
```

### Example copy

Primary heading:

Professional Auto Detailing in Chattanooga

Supporting description:

Restore and maintain your vehicle with professional interior and exterior detailing services.

Primary CTA:

Request a Quote

Secondary CTA:

View Services

This copy is illustrative and must be adapted to verified business information.

### Applicable UX principles

- Law of Prägnanz
- Von Restorff Effect
- Serial Position Effect
- Cognitive Load
- Aesthetic-Usability Effect

### Core implementation

Evaluate existing Hero components, approved typography, button variants, image containers, and surface treatments.

### Avoid

- Generic headings that do not explain the business.
- Multiple equally prominent CTAs.
- Unverified claims.
- Excessive introductory copy.
- Motion that delays essential content.
- Images that interfere with readability.

### Validation

- The offering is understandable without additional navigation.
- The primary CTA is identifiable.
- Text contrast is appropriate.
- Mobile content remains readable.
- Important imagery is not awkwardly cropped.

---

## 7. Trust Strip

### Scenario

A business needs to establish confidence early in the customer journey.

### Customer objective

Determine whether the business appears credible.

### Recommended content

Use verified information such as:

- Years in business.
- Relevant qualifications.
- Verified review ratings.
- Insurance or licensing information.
- Service guarantees with accurate conditions.
- Established service areas.

### Applicable UX principles

- Law of Proximity
- Law of Similarity
- Law of Common Region
- Aesthetic-Usability Effect

### Core implementation

Evaluate:

- Section / Trust Strip
- Card / Trust Item
- Existing icon components
- Approved typography and spacing

### Avoid

- Invented statistics.
- Unsupported ratings.
- Generic certification badges.
- Unverified guarantees.
- Excessive trust indicators.

### Validation

Every trust statement must be supported by accurate business information.

If evidence is unavailable, omit the claim rather than inventing supporting content.

---

## 8. Service Card Grid

### Scenario

A business offers several distinct services.

### Customer objective

Compare available services and identify the appropriate option.

### Recommended card structure

```text
Service Card
    Image
    Service Name
    Concise Description
    Optional Price
    Action
```

### Applicable UX principles

- Law of Similarity
- Law of Common Region
- Law of Proximity
- Recognition Rather Than Recall
- Cognitive Load

### Core implementation

Evaluate:

- Section / Card Grid
- Card / Service
- Card / Service Item
- Existing image containers
- Existing price visibility properties

### Pricing behavior

Use the existing Price and Show Price properties where available.

Display accurate pricing when the business has established an appropriate pricing model.

Do not hide material pricing conditions merely to encourage inquiries.

### Responsive behavior

- Maintain consistent card structure.
- Adjust column count according to available space.
- Preserve readable descriptions.
- Keep actions associated with their cards.
- Avoid unintended horizontal overflow.

### Validation

- Services are distinguishable.
- Card presentation remains consistent.
- Pricing is accurate when displayed.
- Actions communicate their destinations.
- Mobile cards remain readable and accessible.

---

## 9. Swipeable Card Row

### Scenario

A business wants to present projects, reviews, or related content within limited mobile space.

### Customer objective

Browse related content without losing awareness of available items.

### Recommended approach

Use the existing native swipe-and-snap card row when horizontal browsing is appropriate.

### Applicable UX principles

- Recognition Rather Than Recall
- Law of Similarity
- Fitts's Law
- Occam's Razor

### Core implementation

Evaluate:

- Section / Card Row
- Existing card components
- Native overflow behavior
- Native scroll snapping

### Requirements

- Provide understandable visual cues when more content is available.
- Preserve accessible navigation.
- Avoid automatically advancing content.
- Maintain readable card widths.
- Support touch and keyboard interaction where applicable.

### When not to use

Do not use horizontal card rows for essential information that users must discover to complete a task.

A responsive grid may provide better discoverability for primary services.

### Validation

- Additional content is discoverable.
- Scrolling works naturally.
- Cards are not unintentionally clipped.
- Keyboard users can access interactive content.
- No unnecessary JavaScript dependency is introduced.

---

## 10. Individual Service Page

### Scenario

A visitor arrives directly from organic search on a specific service page.

### Customer objective

Understand the service, evaluate its suitability, and determine the next step.

### Recommended composition

```text
Service Hero
Service Overview
Scope of Service
Benefits or Outcomes
Relevant Project Evidence
Service Process
Service-Specific FAQ
Final CTA
```

Add pricing when appropriate and supported by the business.

### Applicable UX principles

- Serial Position Effect
- Cognitive Load
- Progressive Disclosure
- Law of Proximity
- Recognition Rather Than Recall
- Peak-End Rule

### Core implementation

Evaluate:

- Section / Hero
- Section / Split
- Section / Service List
- Section / Before After
- Section / Process
- Section / FAQ
- Section / Final CTA

### Organic visibility coordination

The service page should address relevant customer search intent.

Use accurate service descriptions and natural language.

Do not create duplicate pages solely to target keyword variations.

### Validation

- The service is understandable without visiting the homepage.
- Scope and expectations are clear.
- Relevant evidence is available.
- The next action is identifiable.
- The page supports mobile visitors arriving directly from search.

---

## 11. Split Content Section

### Scenario

A business needs to explain a service, differentiator, or process using imagery and supporting content.

### Recommended structure

```text
section-medium
    padding-global
        container-xlarge
            section-content
                is-row
                mobile-column
                gap-12
                    image-3x2
                        image
                    Content
                        Heading
                        Description
                        Optional Action
```

This follows the documented Core split-section pattern.

Verify the actual class availability before implementation.

### Applicable UX principles

- Law of Proximity
- Law of Prägnanz
- Aesthetic-Usability Effect
- Cognitive Load

### Responsive behavior

The `mobile-column` utility changes the row arrangement to a column at Mobile Landscape and below.

Do not assume the same stacking behavior at Tablet.

### Validation

- Imagery supports the accompanying content.
- Text remains readable.
- Spacing communicates relationships.
- Mobile stacking preserves meaningful reading order.
- No competing structural classes are introduced.

---

## 12. Project Portfolio

### Scenario

A service business needs to demonstrate completed work.

### Customer objective

Evaluate the quality and relevance of previous projects.

### Recommended composition

```text
Our Work
    Introduction
    Project Collection
        Project Card
        Project Card
        Project Card
    Relevant CTA
```

### Project card content

- Authentic project image.
- Project title.
- Relevant service category.
- Concise description.
- Optional project detail link.

### Applicable UX principles

- Aesthetic-Usability Effect
- Law of Similarity
- Law of Common Region
- Recognition Rather Than Recall

### Core implementation

Evaluate existing Projects CMS collections, card components, image containers, and collection-list capabilities.

### Requirements

- Use authentic project imagery.
- Preserve consistent card presentation.
- Provide meaningful alternative text.
- Avoid misrepresenting stock imagery as completed work.
- Avoid unnecessary filtering when the project collection is small.

### Validation

- Projects are easy to browse.
- Images accurately represent the business.
- Project links work.
- CMS bindings are correct.
- The portfolio remains usable across devices.

---

## 13. Before-and-After Experience

### Scenario

A business offers services with visually demonstrable outcomes.

Examples include:

- Auto detailing.
- Landscaping.
- Pressure washing.
- Property restoration.

### Customer objective

Understand the visible improvement associated with the service.

### Recommended approach

Present authentic before-and-after imagery with clear labels.

### Applicable UX principles

- Law of Similarity
- Law of Proximity
- Law of Uniform Connectedness
- Recognition Rather Than Recall

### Core implementation

Evaluate Section / Before After and existing image components.

Use native Webflow functionality when it satisfies the requirement.

### Requirements

- Compare the same project where possible.
- Use accurate labels.
- Avoid misleading editing.
- Preserve meaningful alternative text.
- Provide accessible alternatives to pointer-dependent comparison controls.

### Validation

- The comparison is understandable.
- Images represent actual outcomes.
- Mobile users can access the comparison.
- Keyboard users can access essential information.
- The experience does not require unnecessary interaction.

---

## 14. Process Section

### Scenario

Potential customers are uncertain about what happens after contacting the business.

### Customer objective

Understand the service process and expected next steps.

### Recommended composition

```text
How It Works
    Step 1: Request a Quote
    Step 2: Confirm Service Details
    Step 3: Schedule the Service
    Step 4: Service Completion
```

The actual steps must reflect the business's real process.

### Applicable UX principles

- Law of Uniform Connectedness
- Cognitive Load
- Recognition Rather Than Recall
- Serial Position Effect

### Core implementation

Evaluate:

- Section / Process
- Card / Step
- Existing typography
- Existing icon components

### Avoid

- Unnecessary process steps.
- Unsupported response-time promises.
- Complicated explanations.
- Decorative connections that imply inaccurate sequences.

### Validation

- Steps reflect actual operations.
- Sequence is understandable.
- Customer responsibilities are clear.
- Mobile reading order remains logical.

---

## 15. Reviews and Testimonials

### Scenario

A business has authentic customer reviews available.

### Customer objective

Evaluate other customers' experiences.

### Recommended composition

```text
Customer Reviews
    Verified Review
    Verified Review
    Verified Review
```

Include relevant source attribution where appropriate.

### Applicable UX principles

- Law of Similarity
- Law of Common Region
- Aesthetic-Usability Effect
- Cognitive Load

### Core implementation

Evaluate:

- Section / Reviews
- Card / Review
- Reviews CMS collection

### Requirements

- Preserve the meaning of authentic reviews.
- Use accurate ratings.
- Follow applicable source permissions.
- Avoid fabricated customer names or photographs.
- Avoid misleading aggregate ratings.

### When reviews are unavailable

Use other legitimate confidence-building content:

- FAQ.
- Service process.
- Authentic project examples.
- Verified qualifications.
- Clear service expectations.

Do not populate review components with fictional testimonials.

---

## 16. Frequently Asked Questions

### Scenario

Customers have recurring questions that may prevent them from taking action.

### Customer objective

Resolve uncertainty without contacting the business unnecessarily.

### Recommended composition

```text
Frequently Asked Questions
    Question
        Answer
    Question
        Answer
    Question
        Answer
```

### Applicable UX principles

- Progressive Disclosure
- Cognitive Load
- Recognition Rather Than Recall
- Hick's Law

### Core implementation

Evaluate Section / FAQ and established native interaction patterns.

### Requirements

- Use actual customer questions.
- Provide concise and accurate answers.
- Use recognizable expandable controls.
- Preserve keyboard accessibility.
- Communicate expanded and collapsed states.
- Keep essential pricing or service conditions visible where appropriate.

### Validation

- Questions are understandable.
- Answers resolve meaningful uncertainty.
- Controls work with keyboard and touch.
- Expanded content remains readable.
- No essential information is concealed.

---

## 17. Desktop Navigation

### Scenario

A local business needs clear desktop navigation.

### Customer objective

Locate relevant information or initiate contact.

### Recommended structure

```text
Business Identity
    Home
    Services
    Our Work
    About
    Contact
    Primary CTA
```

Adapt destinations to the approved sitemap.

### Applicable UX principles

- Jakob's Law
- Hick's Law
- Recognition Rather Than Recall
- Von Restorff Effect
- Law of Similarity

### Core implementation

Reuse the approved Page Shell and desktop navigation component.

### Requirements

- Use recognizable labels.
- Preserve active navigation states.
- Maintain appropriate contrast.
- Distinguish the primary CTA.
- Avoid unnecessary dropdown complexity.
- Preserve keyboard navigation.

### Validation

- Important destinations are discoverable.
- Navigation remains consistent across pages.
- Links lead to expected destinations.
- Navigation remains usable at compact desktop widths.

---

## 18. Mobile Bottom Navigation

### Scenario

A local-service website needs an app-like mobile experience.

### Approved Base pattern

```text
Home | Services | Call | Our Work | Quote
```

Home, Services, and Call occupy the established positions.

The fourth and fifth positions may be adapted to the business.

### Customer objective

Navigate essential content and contact the business without unnecessary effort.

### Applicable UX principles

- Fitts's Law
- Jakob's Law
- Hick's Law
- Recognition Rather Than Recall
- Von Restorff Effect
- Serial Position Effect

### Core implementation

Reuse the approved mobile bottom navigation component.

Preserve:

- Flush presentation.
- Central Call action.
- Active navigation states.
- Accessible labels.
- Device safe-area behavior.

### Product-specific exceptions

ShopFlow and DetailFlow may require different navigation destinations based on their approved customer journeys.

Do not apply the Base navigation structure indiscriminately.

### Validation

- Navigation remains accessible.
- Call behavior works.
- Active states are understandable.
- Fixed navigation does not obscure content.
- Touch targets are appropriately sized.
- Safe areas are respected.

---

## 19. Site Settings Sheet

### Scenario

Secondary business information and settings compete with primary mobile navigation.

### Customer objective

Access business information and website settings when needed.

### Recommended experience

Use the established Site Settings sheet for appropriate secondary information.

Examples include:

- Business hours.
- Location.
- Directions.
- Privacy information.
- Cookie preferences.
- Add to Home Screen.

### Applicable UX principles

- Progressive Disclosure
- Hick's Law
- Law of Common Region
- Cognitive Load
- Recognition Rather Than Recall

### Core implementation

Use the existing native Webflow Modal-based sheet architecture.

Retrieve business information through established CMS bindings.

### Requirements

- Preserve a recognizable settings control.
- Provide clear sheet titles.
- Keep close controls accessible.
- Preserve scrolling behavior.
- Respect safe areas.
- Avoid duplicating CMS-driven business information.

### Important distinction

Essential contact information must remain discoverable outside the settings sheet when necessary for the customer journey.

### Validation

- Sheet opens and closes correctly.
- Business information is accurate.
- Keyboard and focus behavior are appropriate.
- Content remains readable.
- No unnecessary custom sheet engine is introduced.

---

## 20. Simple Contact Form

### Scenario

A business needs to receive general inquiries.

### Customer objective

Contact the business with minimal unnecessary effort.

### Recommended fields

Collect only information needed to respond appropriately.

Possible fields include:

- Name.
- Email or telephone.
- Message.
- Applicable consent controls.

Do not require every possible contact field by default.

### Applicable UX principles

- Parkinson's Law
- Tesler's Law
- Cognitive Load
- Recognition Rather Than Recall
- Occam's Razor

### Core implementation

Use native Webflow forms and established contact components.

### Requirements

- Provide visible field labels.
- Use appropriate input types.
- Identify required fields.
- Communicate validation errors.
- Preserve entered information when practical.
- Provide accurate submission confirmation.

### Validation

- The form is understandable.
- Unnecessary fields are avoided.
- Validation works.
- Submission reaches the intended destination.
- Success and failure states are distinguishable.

---

## 21. Quiz-Style Quote Experience

### Scenario

A service business needs additional information before preparing a quote.

### Customer objective

Request a quote without completing an unnecessarily complicated form.

### Recommended experience

```text
Step 1
    Select Service

Step 2
    Answer Relevant Service Questions

Step 3
    Provide Required Contact Information

Submission
    Review Applicable Information
    Submit Request

Confirmation
    Explain Next Steps
```

The number of questions and steps must reflect actual business requirements.

### Illustrative auto-detailing example

Service selection:

- Full Detail.
- Maintenance Detail.
- Exterior Polish.
- Interior Detail.

Relevant follow-up questions may include vehicle size or condition when necessary for the quote.

Contact information is collected before submission.

### Applicable UX principles

- Hick's Law
- Progressive Disclosure
- Cognitive Load
- Goal-Gradient Effect
- Fitts's Law
- Tesler's Law
- Recognition Rather Than Recall
- Peak-End Rule

### Core implementation

Evaluate the documented quiz-style quote pattern from Mayes Digital 2.0.

Preserve the approved approach of submitting the collected information through one native Webflow form.

Verify whether the reusable implementation has been migrated into the current Core master.

### Requirements

- Use clear question labels.
- Present understandable choices.
- Preserve previous answers when navigating backward.
- Provide accurate progress indicators when appropriate.
- Request only necessary information.
- Provide appropriate consent disclosures.
- Avoid unnecessary account creation.

### Validation

- All supported paths work.
- Back navigation preserves answers.
- Required information is collected.
- Form data reaches the intended destination.
- Confirmation accurately reflects submission status.
- The complete experience is accessible.

---

## 22. Service Pricing Experience

### Scenario

A business offers services with fixed prices, starting prices, or variable quote-based pricing.

### Customer objective

Understand expected costs and determine whether the service is suitable.

### Recommended presentation

Choose the pricing format that accurately reflects the business.

| Pricing model | Presentation |
|---|---|
| Fixed price | Display the verified price |
| Starting price | Clearly identify the starting amount |
| Price range | Display an accurate range and relevant conditions |
| Custom quote | Explain the factors affecting pricing |

### Applicable UX principles

- Cognitive Load
- Recognition Rather Than Recall
- Law of Proximity
- Progressive Disclosure
- Ethical Experience Design

### Core implementation

Use existing service card price properties and visibility controls.

### Requirements

- Avoid misleading starting prices.
- Disclose important conditions.
- Keep pricing associated with the relevant service.
- Do not hide unavoidable fees.
- Do not invent pricing information.

### Validation

- Pricing accurately reflects the business.
- Customers can understand the pricing model.
- Important conditions are discoverable.
- Mobile presentation remains readable.

---

## 23. Primary and Secondary CTAs

### Scenario

A page contains multiple actions with equal visual emphasis.

### Customer objective

Identify the most appropriate next action.

### Recommended hierarchy

| Priority | Example |
|---|---|
| Primary | Request a Quote |
| Secondary | View Our Work |
| Supporting | Learn More |

The appropriate hierarchy depends on the page's purpose.

### Applicable UX principles

- Von Restorff Effect
- Law of Similarity
- Hick's Law
- Fitts's Law

### Core implementation

Use established button components and approved variants.

### Requirements

- Use specific action labels.
- Preserve consistent styling for equivalent actions.
- Distinguish primary and secondary actions.
- Avoid excessive visual emphasis.
- Maintain accessible contrast and interaction states.

### Validation

- The primary action is identifiable.
- Secondary actions remain accessible.
- Labels communicate expected outcomes.
- Button behavior matches its label.

---

## 24. Form Confirmation Experience

### Scenario

A customer successfully submits an inquiry.

### Customer objective

Know whether the submission succeeded and what happens next.

### Recommended confirmation

```text
Thank you for your request.

Your information has been received.

[Accurate explanation of the next step.]
```

Provide response-time expectations only when verified by the business.

### Applicable UX principles

- Peak-End Rule
- Doherty Threshold
- Cognitive Load
- Goal-Gradient Effect

### Core implementation

Use native Webflow form success states or approved confirmation components.

### Requirements

- Confirm success only after successful submission.
- Explain relevant next steps.
- Avoid unnecessary additional actions.
- Provide appropriate contact alternatives when needed.

### Validation

- Confirmation appears only after success.
- The message is understandable.
- Next steps are accurate.
- Submission errors do not display misleading success messages.

---

## 25. Error Recovery

### Scenario

A customer encounters a form validation error or failed submission.

### Customer objective

Understand the problem and recover without unnecessary effort.

### Recommended experience

Explain:

1. What happened.
2. Which information requires attention.
3. How to correct the issue.
4. Whether previously entered information remains available.

### Applicable UX principles

- Cognitive Load
- Recognition Rather Than Recall
- Tesler's Law
- Peak-End Rule
- WCAG

### Core implementation

Use native form validation, established error states, and approved custom enhancements only where necessary.

### Requirements

- Avoid vague error messages.
- Do not blame the customer.
- Preserve entered information when practical.
- Associate errors with relevant fields.
- Provide accessible error feedback.
- Offer a legitimate alternative contact method when appropriate.

### Validation

- Errors are understandable.
- Users can correct invalid information.
- Keyboard users can locate affected fields.
- Error states are distinguishable without relying exclusively on color.

---

## 26. Cookie Preferences and Consent

### Scenario

A website requires privacy controls or optional consent.

### Customer objective

Understand available choices and exercise meaningful control.

### Applicable UX principles

- Default Effect
- Progressive Disclosure
- Recognition Rather Than Recall
- Cognitive Load
- Ethical Experience Design

### Core implementation

Use the approved consent infrastructure and cookie settings experience.

Verify the current implementation and applicable legal requirements.

### Requirements

- Use understandable language.
- Distinguish required and optional functionality.
- Avoid preselected optional consent where affirmative consent is required.
- Preserve access to preference controls.
- Respect recorded preferences.
- Avoid misleading visual hierarchy.

### Validation

- Preferences can be changed.
- Controls accurately reflect current settings.
- Applicable consent choices are respected.
- Optional tracking behavior matches the selected preferences.

Do not claim legal compliance solely because a consent interface exists.

---

## 27. Motion and Interaction Feedback

### Scenario

A website uses animation to enhance presentation and interaction.

### Customer objective

Understand changes without distraction or unnecessary delay.

### Applicable UX principles

- Doherty Threshold
- Cognitive Load
- Aesthetic-Usability Effect
- Law of Uniform Connectedness

### Core implementation

Use the established motion vocabulary:

```text
data-motion="fade"
data-motion="rise"
data-motion="scale"
data-motion="stagger"
data-motion="hero"
```

Prefer native Webflow Interactions.

### Appropriate uses

- Communicating state changes.
- Reinforcing spatial relationships.
- Providing interaction feedback.
- Supporting content hierarchy.

### Avoid

- Delaying essential content.
- Excessive scroll-triggered animation.
- Unnecessary animation dependencies.
- Motion that interferes with navigation.
- Ignoring reduced-motion preferences.

### Validation

- Motion supports the experience.
- Essential content remains available.
- Reduced-motion behavior is respected.
- Interaction remains responsive.
- No unnecessary custom animation system is introduced.

---

## 28. Footer Experience

### Scenario

A visitor reaches the end of a page or needs secondary business information.

### Customer objective

Locate contact information, navigation, policies, or additional resources.

### Recommended content

- Business identity.
- Relevant navigation.
- Accurate contact information.
- Available social links.
- Privacy access.
- Cookie preferences.
- Copyright information.

### Applicable UX principles

- Serial Position Effect
- Jakob's Law
- Recognition Rather Than Recall
- Law of Common Region

### Core implementation

Reuse Footer / Standard and existing business data bindings.

### Requirements

- Keep information accurate.
- Avoid unnecessary navigation duplication.
- Hide unavailable social links.
- Maintain readable mobile layouts.
- Preserve accessible links.

### Validation

- Contact information is correct.
- Links function.
- Secondary information is discoverable.
- Footer content remains readable across devices.

---

## 29. Product-Specific Experience Patterns

Mayes Digital products may require experiences that differ from standard local-service websites.

Preserve Core architecture while respecting approved product requirements.

### ShopFlow

Primary customer journey:

```text
Discover Products
    Browse Collections
        Evaluate Product
            Add to Cart
                Checkout
                    Confirmation
```

Experience priorities:

- Product discoverability.
- Accurate product information.
- Predictable shopping behavior.
- Transparent pricing.
- Accessible cart interactions.
- Clear checkout expectations.

Applicable principles:

- Jakob's Law.
- Recognition Rather Than Recall.
- Hick's Law.
- Progressive Disclosure.
- Fitts's Law.
- Peak-End Rule.

Do not impose local-service quote navigation on ecommerce experiences.

### DetailFlow

Primary customer journey:

```text
Discover Services
    Evaluate Service
        Select Vehicle or Service Requirements
            Book or Request Quote
                Confirmation
                    Manage Future Service
```

Experience priorities:

- Understandable service scope.
- Accurate pricing information.
- Convenient booking.
- Clear maintenance eligibility.
- Consistent branded customer experience.
- Appropriate customer and vehicle information.

Applicable principles:

- Cognitive Load.
- Tesler's Law.
- Progressive Disclosure.
- Recognition Rather Than Recall.
- Goal-Gradient Effect.
- Fitts's Law.

Verify current product capabilities before recommending implementation.

Do not assume planned integrations or customer-account functionality are available.

---

## 30. UX-to-Core Component Mapping

Use the following mapping as a starting point.

| Experience requirement | Core component candidate |
|---|---|
| Establish business relevance | Section / Hero |
| Communicate verified credibility | Section / Trust Strip |
| Present available services | Section / Service List |
| Compare service offerings | Card / Service |
| Present multiple cards | Section / Card Grid |
| Browse related content | Section / Card Row |
| Explain business differentiation | Section / Why Us |
| Combine imagery and explanation | Section / Split |
| Explain service progression | Section / Process |
| Present authentic reviews | Section / Reviews |
| Address customer concerns | Section / FAQ |
| Provide contextual actions | Button / Standard Flat |
| Request customer information | Native Webflow Form |
| Present secondary settings | Native Sheet |
| Encourage a final action | Section / Final CTA |
| Provide consistent page infrastructure | Page Shell |

Component names are candidates based on the previously documented architecture.

Inspect the current component library before implementation.

---

## 31. Common Experience Problems

| Observed problem | Recommended approach |
|---|---|
| Too many primary buttons | Establish clear CTA hierarchy |
| Unclear service offering | Improve hero messaging |
| Inconsistent cards | Reuse established card components |
| Long quote forms | Remove unnecessary fields and evaluate progressive disclosure |
| Missing trust evidence | Use verified business information and authentic projects |
| Difficult mobile navigation | Evaluate approved bottom navigation patterns |
| Hidden essential information | Improve discoverability |
| Slow interaction feedback | Provide appropriate state feedback |
| Excessive decorative animation | Reduce unnecessary motion |
| Duplicate business information | Reuse CMS-driven data |
| Inaccessible color combinations | Adjust semantic Theme values |
| Competing design systems | Restore approved Core architecture |
| Unclear submission results | Provide accurate confirmation |
| Excessive page sections | Evaluate each section's purpose |

Treat recommendations as hypotheses until the underlying issue is verified.

---

## 32. Design Pattern Selection Procedure

Before selecting an experience pattern:

1. Identify the customer objective.
2. Identify the business objective.
3. Inspect the current experience.
4. Identify confirmed friction or a justified opportunity.
5. Select relevant UX principles.
6. Evaluate alternative patterns.
7. Identify existing Core components.
8. Evaluate native Webflow capabilities.
9. Review responsive implications.
10. Review accessibility implications.
11. Establish validation criteria.
12. Implement within the authorized scope.

Do not create new functionality solely because a design pattern appears in this reference.

---

## 33. Implementation Recommendation Format

When recommending a Webflow design improvement, use the following structure.

### Observation

Describe the existing experience.

### Customer objective

Identify what the visitor is attempting to accomplish.

### UX issue

Explain the confirmed problem or improvement opportunity.

### Applicable principles

Identify only the relevant UX principles.

### Recommended experience

Describe the proposed layout, content, or interaction.

### Core mapping

Identify existing components, classes, variables, properties, or slots.

### Native implementation

Explain how native Webflow functionality can support the experience.

### Responsive behavior

Describe the expected desktop and mobile behavior.

### Validation

Identify the tests needed to evaluate the result.

### Limitations

Disclose assumptions, missing information, unavailable components, and unresolved risks.

---

## 34. Worked Recommendation Example

### Observation

A mobile service page contains three equally prominent actions:

- Call Now.
- Request a Quote.
- View Gallery.

### Customer objective

Understand the service and select an appropriate next action.

### UX issue

The actions compete for attention and may make the next step less obvious.

### Applicable principles

- Von Restorff Effect.
- Hick's Law.
- Law of Similarity.
- Cognitive Load.

### Recommended experience

Use Request a Quote as the dominant page-level action when quote requests are the primary business objective.

Present View Gallery as a secondary action.

Preserve Call within the established mobile navigation.

### Core mapping

- Button / Standard Flat.
- Existing primary and secondary button variants.
- Approved mobile bottom navigation.
- Existing layout and spacing utilities.

### Native implementation

Reuse existing components and modify their supported properties.

No new custom JavaScript is necessary for the proposed visual hierarchy.

### Responsive behavior

Ensure actions remain readable, appropriately sized, and accessible across mobile widths.

### Validation

- Inspect visual hierarchy.
- Verify button destinations.
- Evaluate mobile touch targets.
- Test keyboard navigation.
- Evaluate customer task completion when practical.

### Limitations

The primary business objective must be confirmed before changing CTA priority.

The expected usability benefit is a hypothesis until validated.

---

## 35. Cross-Skill Responsibilities

### Experience Design

Defines the customer objective, design rationale, interaction pattern, and expected experience.

### Core Design System

Defines the approved variables, classes, components, and responsive structure.

### Webflow Development

Determines the appropriate implementation method, native capabilities, CMS relationships, and integration requirements.

### Organic Visibility

Ensures the experience supports relevant search intent, discoverability, and accurate business information.

### Quality Assurance

Verifies functionality, accessibility, responsive behavior, performance, and release readiness.

Use these skills together without duplicating their complete responsibilities.

---

## 36. Prohibited Practices

Do not:

- Treat example layouts as mandatory templates.
- Introduce competing design systems.
- Create unnecessary components.
- Replace native Webflow functionality without justification.
- Fabricate reviews or project evidence.
- Hide material pricing conditions.
- Use deceptive conversion patterns.
- Apply Base navigation to incompatible product experiences.
- Treat planned components as implemented.
- Invent measurable conversion improvements.
- Claim accessibility conformance without sufficient evidence.
- Publish changes without authorization.

---

## Operating Standard

**Relume accelerates planning.**

**UX principles guide decisions.**

**Core establishes consistency.**

**Webflow provides implementation.**

**Organic visibility supports discovery.**

**Quality assurance validates the experience.**

**The customer remains the center of every decision.**