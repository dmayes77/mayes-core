# Performance

Read for measured performance, Core Web Vitals, testing tools, and resource inspection.

## Performance Quality Assurance

Evaluate performance using appropriate measurements.

### Core Web Vitals

| Metric | Good | Needs improvement | Poor |
|---|---|---|---|
| LCP | 2.5s or less | Above 2.5s through 4s | Above 4s |
| INP | 200ms or less | Above 200ms through 500ms | Above 500ms |
| CLS | 0.1 or less | Above 0.1 through 0.25 | Above 0.25 |

Verify current official metric definitions and thresholds before formal reporting.

### Field data

Evaluate applicable real-user data at the 75th percentile.

### Laboratory data

Use controlled measurements to identify potential performance problems.

Distinguish laboratory measurements from real-user field measurements.

Do not substitute Total Blocking Time for a measured INP result.

---

---

## Performance Testing Tools

Use available appropriate tools.

Potential tools include:

- Google PageSpeed Insights.
- Lighthouse.
- Chrome DevTools.
- Chrome UX Report.
- Browser network inspection.
- WebPageTest.
- Search Console Core Web Vitals reporting.

### Requirements

Record:

- Tested URL.
- Test date.
- Test environment.
- Device configuration.
- Network conditions where available.
- Available field data.
- Available laboratory data.

### Limitations

Synthetic performance scores can vary between runs.

A single Lighthouse result does not establish consistent real-world performance.

Do not fabricate scores when testing tools are unavailable.

---

---

## Performance Inspection Checklist

### Resources

- [ ] Unnecessary scripts are avoided.
- [ ] Duplicate dependencies are avoided.
- [ ] Resource loading is appropriate.
- [ ] Third-party dependencies are justified.
- [ ] Render-blocking resources are evaluated.
- [ ] Only the font weights and families the site actually uses are loaded.

### Images

- [ ] Image dimensions are appropriate.
- [ ] File sizes are appropriate.
- [ ] Critical imagery loads appropriately.
- [ ] Noncritical imagery uses appropriate loading behavior.
- [ ] Image containers prevent avoidable layout shifts.

### Layout

- [ ] Layout remains stable.
- [ ] Fixed interface elements do not create unexpected shifts.
- [ ] Dynamic content behaves predictably.
- [ ] Unnecessary DOM complexity is avoided.

### Interaction

- [ ] Important controls respond appropriately.
- [ ] Loading feedback is available where necessary.
- [ ] Animations do not unnecessarily delay interaction.
- [ ] Long-running operations are evaluated.

### Slow connection

- [ ] Each template is tested with network throttling (for example, Slow 4G in browser developer tools).
- [ ] Call, navigation, and page text work before images finish loading.
- [ ] The layout does not jump as images arrive.

Prioritize meaningful customer experience over arbitrary perfect performance scores.

---
