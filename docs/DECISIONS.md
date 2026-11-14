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
| 2026-11-08 | The sheets live in a fixed `shell-sheets` div inside the Page Shell, not a slot | Every page gets the same sheets with nothing to place per page; edit a sheet once in its component |
| 2026-11-08 | The top nav, footer and bottom nav are built into the Page Shell too; Main Content is its only slot. The Glass nav's actions slot is replaced by a fixed Get a quote button (CTA Text / Show CTA props, `data-sheet-open="quote"`) | Same chrome on every page with nothing to place or forget; the actions slot had been left empty, so desktop showed no CTA |
| 2026-11-08 | The bottom nav's Services tab goes to the Services page; Location and Quote stay sheets | David's call: Services is a full page, Location and Quote are quick actions. Sheet / Services stays in the Page Shell for any button that wants it |
| 2026-11-07 | The phone number is not shown as text where a Call button exists | |
| 2026-11-07 | The business data layer stays on the page, not in a component | Webflow rejects live Collection Lists in API-made components |
| 2026-11-13 | New pages start from the draft **Page Template** page (Page Shell + `shell-data`); Core Business warns in the console when a page has no data layer | Rechecked: Webflow refuses any component holding a CMS-bound Collection List, even in the Designer, so neither the Page Shell nor a drop-in component can carry it |
| 2026-11-07 | Native first: if Webflow can do it natively, Core doesn't do it in JS; JS toggles `is-*` combos and Webflow styles them | See NATIVE_FIRST.md; removals ship as v2.0.0 |
| 2026-11-07 | Structured data comes from Core, built from Business Settings; page-level JSON-LD stays empty | Webflow can't bind page JSON-LD to a CMS item outside a template, and hand-typed schema drifted on the master |
| 2026-11-07 | Core v2.0.0 ships no look or layout CSS: sheet presentations, safe areas, banner position and the bottom nav are Webflow classes; Core sets `is-*` combos | Tested: Webflow's style system accepts `env()`, `dvh`, `var()`, `max()`, `overscroll-behavior`, `scrollbar-*`, `touch-action`, `clip-path`. It can't style `<html>`, `[hidden]`, reduced-motion queries or `-webkit-tap-highlight-color`, so those stay in `core-base.css` |
| 2026-11-07 | Webflow can't style a child from its parent's state, so Core puts the state combo on each part (host, overlay, panel, grabber, head) | No descendant selectors in the style panel |
| 2026-11-13 | Sheets are native Webflow Modals styled as bottom sheets (slide up from the bottom, full width and flush on phones, never a floating dialog); Core release v2.1.0 (Sheet module v3.0.0) drops the sheet engine and Sheet / Host and keeps only open-by-name and swipe down to close | David tested a native Modal sheet on his phone (Android, Motorola Razr) against the Core sheet: works the same. Native first. Webflow modal links can't reach a Modal in another component, so `data-sheet-open` stays |
| 2026-11-07 | Bottom nav tabs are the links themselves (icon and label inside), styled with Webflow's Current state | The API can't author the Current state, so it's set once in the Designer |
| 2026-11-13 | The master's variable collection is named **Core** (was Core 2.0) | Paths become `--_core---…`. Webflow's own default collection (Base collection) is left empty: Webflow doesn't let it be deleted |
| 2026-11-13 | Keep five collections: Core, Theme, Surface, Motion, Primitives (last) | Theme stays separate so a Theme mode can re-skin colors, including Feedback. Primitives can't be hidden from the picker, so it is ordered last |
| 2026-11-13 | Theme names say what they are: *primary*, *secondary*, *accent* mean brand colors only; neutrals are page / subtle / muted / dark; text on a fill is `on-<fill>`. The Brand and Accent groups and the gradient ramps are removed | Replaces names like *inverse* that didn't say which way they went |
| 2026-11-14 | Sizing follows Tailwind's scale | David uses Tailwind in Next.js and wants sites to look and feel familiar. See ARCHITECTURE.md › Tokens |
| 2026-11-14 | Off-scale sizes are `calc()` from the base size, not new primitives | e.g. 0.875rem = `calc(var(--_primitives---base--font-size) * 0.875)` |
| 2026-11-14 | Buttons: 14px text (16px for `is-large`); form inputs 14px on desktop and 16px on phones | 14px matches Amazon and most app UIs; 16px inputs stop phone browsers zooming in on focus |

## Open

- [ ] Test on an iPhone (Safari): sheets, tap outside to close, swipe down, form fields not zooming. Only Android has been tested.
- [x] Token names: brand colors are Theme *primary* / *secondary* / *accent*; the `Brand/*` group is gone (2026-11-13).
- [ ] Consent storage key: keep `core-consent-v1` (recommended).
- [ ] ShopFlow: one repo instead of `shopflow` + `shopflow-code` subtree split (recommended).
