# Accessibility

Read for semantic, keyboard, contrast, touch target, text reflow, and reduced motion evaluation.

## Accessibility Standard

Use WCAG 2.2 Level AA as the proposed Mayes Digital evaluation baseline unless another applicable requirement is established.

Authoritative reference:

https://www.w3.org/TR/WCAG22/

### Accessibility evaluation

Evaluate the four foundational principles:

- Perceivable.
- Operable.
- Understandable.
- Robust.

### Requirements

Use a combination of:

- Automated accessibility evaluation.
- Manual inspection.
- Keyboard testing.
- Contrast measurement.
- Responsive reflow testing.
- Assistive technology testing where available.

Automated testing alone does not establish WCAG conformance.

Do not claim full accessibility compliance unless the scope and evidence support that conclusion.

---

---

## Semantic Accessibility Testing

Evaluate meaningful document structure.

- [ ] Page titles are descriptive.
- [ ] Page language is defined appropriately.
- [ ] Headings communicate content relationships.
- [ ] Landmarks are appropriate.
- [ ] Lists use appropriate semantics.
- [ ] Links communicate their purpose.
- [ ] Buttons represent actions appropriately.
- [ ] Form controls have accessible names.
- [ ] Meaningful images have appropriate text alternatives.
- [ ] Decorative images are handled appropriately.
- [ ] Dynamic states are communicated appropriately.

Prefer native semantic elements over unnecessary custom ARIA implementations.

ARIA must not be used to conceal incorrect underlying functionality.

---

---

## Keyboard Accessibility Testing

Evaluate essential functionality without a pointer device.

- [ ] Interactive elements are reachable.
- [ ] Tab order is logical.
- [ ] Focus indicators are visible.
- [ ] Focus is not obscured by fixed content.
- [ ] Links activate appropriately.
- [ ] Buttons activate appropriately.
- [ ] Form controls remain usable.
- [ ] Expandable content remains operable.
- [ ] Modals remain operable.
- [ ] Keyboard traps are avoided.
- [ ] Focus restoration behaves appropriately.
- [ ] Relevant navigation bypass mechanisms are available.

### Modal considerations

Evaluate focus entry, focus containment where appropriate, closing behavior, and focus restoration.

Do not assume native modal functionality automatically satisfies every applicable accessibility requirement.

---

---

## Color Contrast Testing

Measure applicable color combinations.

### Selected WCAG thresholds

| Content type | Minimum contrast |
|---|---|
| Normal text | 4.5:1 |
| Large text | 3:1 |
| Applicable non-text visual information | 3:1 |

Apply the definitions and exceptions established by the relevant WCAG success criteria.

### Evaluate

- Body text.
- Headings.
- Button labels.
- Form labels.
- Placeholder text where applicable.
- Navigation.
- Interactive states.
- Meaningful icons.
- Error messages.
- Text over imagery.
- Focus indicators according to applicable criteria.

Do not estimate contrast ratios from appearance alone.

Use appropriate measurement methods.

---

---

## Badges, Tags, and Chips

- [ ] Badge and tag meaning does not rely on color alone; text or an icon carries it too.
- [ ] Badges, tags, and chips wrap or fit without clipping at 320px.

---

## Touch Target Testing

Evaluate interactive target size and spacing.

### Practical design target

Approximately 44 × 44 CSS pixels for important touch controls where practical.

### WCAG 2.2 Level AA

The applicable Target Size Minimum criterion establishes a 24 × 24 CSS pixel requirement with defined exceptions.

### Evaluate

- Navigation items.
- Buttons.
- Icon controls.
- Close controls.
- Form controls.
- Expandable content controls.
- Cart controls where applicable.
- Interactive card elements.

Do not incorrectly report the practical 44-pixel target as a universal Level AA requirement.

---

---

## Text Resizing and Reflow

Evaluate applicable accessibility requirements for resized content.

### Text resizing

- [ ] Text remains usable when resized to 200% under applicable criteria.
- [ ] Important information remains available.
- [ ] Interactive controls remain accessible.
- [ ] Text does not become unintentionally clipped.

### Reflow

Evaluate applicable reflow behavior at a width equivalent to 320 CSS pixels.

- [ ] Content remains readable.
- [ ] Essential functionality remains available.
- [ ] Unnecessary two-dimensional scrolling is avoided.
- [ ] Applicable exceptions are identified.

### Requirements

Distinguish accessibility reflow testing from ordinary responsive breakpoint inspection.

---

---

## Reduced Motion Testing

Evaluate behavior when reduced-motion preferences are enabled.

- [ ] Nonessential animation is appropriately reduced.
- [ ] Essential content remains visible.
- [ ] Interactions remain understandable.
- [ ] Functionality remains available.
- [ ] Motion does not create unnecessary delay.
- [ ] Approved Core reduced-motion behavior is preserved.

Do not disable essential functionality merely to remove animation.

---
