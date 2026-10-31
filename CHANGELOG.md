# Changelog

## v1.2.0 — 2026-10-31

Brings `mayes-core` up to date with the newest generic code that had been living in ShopFlow and DetailFlow, renamed for Core. Additive: the files live sites load today (`dist/core-sheet.js`, `dist/core-sheet.css`) are byte-identical to v1.1.0.

**New modules**

| File | What it does | Came from |
|---|---|---|
| `core-bottom-nav.js` / `.css` v1.1.0 | Bottom nav tabs: link, `sheet:NAME`, `click:SELECTOR`; active tab; badge counts in the accessible name; optional GSAP tap feedback | `shopflow-code` core-bottom-nav v1.0.0 (badges) + DetailFlow bottom-nav (GSAP feedback) |
| `core-consent.js` / `.css` / `-head.html` v1.1.0 | Cookie notice + Site Settings switches, Google Consent Mode v2, consent-gated scripts. Storage key configurable with `<html data-consent-key>` (default `core-consent-v1`) | `shopflow-code` core-consent v1.0.0 |
| `core-business.js` / `.css` v1.0.0 | Fills phone, email, address, links, logos anywhere from the one Business Settings item (`data-business="field"`); groups Business Hours into rows; "Open today" line. Reads older `data-store-*` markup too | `shopflow-code` store-fill v1.0.0 + the hours grouping inside nav-experience v2.3.0 |
| `core-announcement.js` / `.css` v1.0.0 | Keeps a fixed header stacked under an announcement bar (`--core-announcement-offset`) | `shopflow-code` announcement v1.0.0 |
| `core-page-stability.css` v1.1.0 | No layout shift when a sheet locks scrolling | `shopflow-code` page-stability v1.1.0 |

**Changed**

- `core-motion.js` v0.4.0: adds the `data-motion` vocabulary from the Implementation Addendum (fade, rise/reveal, scale, stagger, hero; `data-motion-delay`, `data-motion-duration`), ported from DetailFlow's motion hooks. `data-animate`, `data-scroll-state` and parallax are unchanged. (Live sites load motion from `v0.1.0`, so this does not affect them.)
- `build.sh`: builds every module as its own file plus two bundles, `dist/core.js` and `dist/core.css`.

**Added**

- `check.sh`: syntax check, dist in sync with sources, no product names in Core, version header on every file.
- `test/`: browser tests (`python3 test/run.py`) — 48 checks at phone and desktop widths, with and without GSAP, and with reduced motion.

**Sheet engine:** unchanged. `core-sheet.js` is ShopFlow's sheet v1.3 engine plus a later fix for custom sheet heads; its header still says v1.1.0 and will be renumbered when the live sites move to `core.js`.

## v1.1.0 — 2026-10-04

Core Sheet v1.1 and Core Motion v0.3. The commit (`0407d10`) ShopFlow and DetailFlow are pinned to.

## v0.1.0

Core Motion (early). The `stable` branch points here.
