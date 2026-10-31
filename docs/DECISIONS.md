# Decisions

| Date | Decision | Notes |
|---|---|---|
| 2026-09-20 | Motion vocabulary is `data-motion` (fade, rise, stagger, hero) | Implementation Addendum §5; `data-animate` to be kept as an alias |
| 2026-09-20 | Canonical section, image and hero-image architecture | Implementation Addendum §1–3 |
| 2026-10-22 | Core must be universal: no product names or domain logic | From the DetailFlow decisions log |
| 2026-10-30 | Every Mayes Digital site uses the native-app mobile look | |
| 2026-10-30 | Focus on the $500 website before launching ShopFlow or DetailFlow | |
| 2026-10-31 | `mayes-core` becomes the main repo for the whole system | Chosen over a new repo; keeps jsDelivr URLs |
| 2026-10-31 | ShopFlow and DetailFlow stay in their own repos until re-based on Core v2 | `products/` holds them later |
| 2026-10-31 | Webflow loads this repo by release tag only | See `RELEASES.md` |

## Open

- [ ] Token names: keep ShopFlow's `Primary/*` ramp or restore the master's `Brand/*` (recommended: `Primary/*`).
- [ ] GSAP required, or optional with a CSS fallback (recommended: optional).
- [ ] Consent storage key: keep `core-consent-v1` (recommended).
- [ ] ShopFlow: one repo instead of `shopflow` + `shopflow-code` subtree split (recommended).
- [ ] $500 site middle bottom-nav tab: Call or Book.
