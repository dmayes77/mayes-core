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
| 2026-10-31 | One base (`core.css` + `core.js`) serves every project; each project loads its own script after it only when needed | See ARCHITECTURE.md › How a site loads code |
| 2026-11-06 | Add to Home Screen is part of Core: head snippet + banner, no service worker | Webflow cannot serve a service worker from the site root; a hosted wrapper (e.g. Progressier) stays an option per client |
| 2026-11-07 | Top bar and bottom nav are flush, never floating; the page does not bounce on phones | Page stability v1.2.0 |
| 2026-11-07 | The ⋯ button in the top bar opens Settings (privacy, cookies, Add to Home Screen); the bottom nav is for quick actions only | Replaces the More tab |
| 2026-11-07 | $500 site bottom nav: Home · Services · Call · Location · Quote; creator sites use Collab instead of Quote | Closes the Call-or-Book question |
| 2026-11-07 | Each sheet is its own component (`Sheet / Name`) placed in the Page Shell's Sheets slot; root class `name is-hidden` | Replaces Sheet / Content in the Overlay slot |
| 2026-11-07 | The phone number is not shown as text where a Call button exists | |
| 2026-11-07 | The business data layer stays on the page, not in a component | Webflow rejects live Collection Lists in API-made components |

## Open

- [ ] Token names: keep ShopFlow's `Primary/*` ramp or restore the master's `Brand/*` (recommended: `Primary/*`).
- [ ] GSAP required, or optional with a CSS fallback (recommended: optional).
- [ ] Consent storage key: keep `core-consent-v1` (recommended).
- [ ] ShopFlow: one repo instead of `shopflow` + `shopflow-code` subtree split (recommended).
