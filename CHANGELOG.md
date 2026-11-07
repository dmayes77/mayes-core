# Changelog

## v1.4.3 — 2026-11-07

**Page stability v1.2.0:** on phones and tablets (991px and below, where the bottom nav shows) the page no longer bounces past its top and bottom or triggers pull-to-refresh, so the pinned bottom nav stays still while scrolling. Sheets and carousels keep their own scrolling. Desktop is unchanged. 2 new browser checks.

## v1.4.2 — 2026-11-07

**Fix:** `core-install.js` v1.0.1. The Add to Home Screen banner waited for a saved cookie choice, so visitors who closed or ignored the cookie notice never saw it. It now waits only while the cookie notice (or any sheet) is open, and shows once it closes, with or without a choice. 3 new browser checks.

Android wording: newer Chrome calls the menu item "Install and create shortcut", so the banner now says "Tap ⋮ then Install or Add to Home screen".

## v1.4.1 — 2026-11-06

First release with Add to Home Screen. (The `v1.4.0` tag was created before this change was merged and points at the v1.3.0 code; do not use it.)

Add to Home Screen. Webflow cannot host a service worker, so a full installable web app is out of reach; this gets the parts that matter: the site opens full screen from the home screen, and visitors are shown how to put it there.

**New module:** `core-install.js` / `.css` v1.0.0, in the `core.js` / `core.css` bundles.
- A small banner above the bottom nav, on phones and tablets, from the visitor's 2nd page view. Never on desktop, never when the site is already open from the home screen, never while a sheet is open; waits for the cookie notice to be answered. Closing it hides it for 30 days.
- The message fits the browser: iPhone/iPad ("Tap Share, then Add to Home Screen"), Android (the ⋮ menu), Android with the browser's install prompt (an Install button), and Instagram, TikTok, Facebook and other in-app browsers ("open in your browser first").
- Uses the Business Settings name and the Webflow webclip icon. No markup needed.
- `[data-install-open]` on any element (e.g. a row in the More sheet) shows it on demand; such triggers hide themselves on desktop and when already on the home screen (`html.is-standalone`).
- `CoreInstall.show/hide/state`; `core:install` event.

**New head snippet:** `core-app-head.html` v1.0.0 — full-screen launch, status bar, short name and theme color.

**Tests:** 25 new browser checks (iPhone, Android prompt, in-app browser, consent order, standalone, desktop).

## v1.3.0 — 2026-11-03

Finishes the code-side promotion: the sheet engine now carries everything that was still living in DetailFlow's inline custom code, and Before and After becomes an optional Core module.

**Sheet v1.3.0**
- **GSAP motion:** sheets slide and fade with GSAP when it is loaded; CSS transitions otherwise; nothing moves for visitors who prefer reduced motion. A swiped sheet closes from where the finger let go; a short swipe springs back.
- **iPhone-safe scroll lock:** the page is pinned while a sheet is open and returns to the same scroll position on close (overflow alone let the page scroll behind the sheet on iOS).
- **Webflow-authored host:** if the page has a designed host (`[data-sheet-host]` with `[data-sheet-panel]`, e.g. the Overlay / Sheet Native component), the engine adopts it instead of building its own, keeps its Webflow classes, and makes a link-style Close behave as a button.
- **Per-open presentation:** `CoreSheet.open(name, {mode})`, `data-sheet-open-mode` on a trigger, and `data-tab-sheet-mode` on a bottom-nav tab force a presentation for that open (e.g. More as a bottom sheet). An explicit `mode` / `height` / `width` / `title` option now wins over the block's own attribute.
- **Reopen while closing:** opening a sheet during a close animation now finishes the close cleanly and opens the new one.

**Bottom nav v1.2.0:** `data-tab-sheet-mode`.

**New optional module:** `core-before-after.js` / `.css` v1.0.0 — before/after photo comparison (drag, tap, keyboard), placeholders for missing photos, `CoreBeforeAfter.init(container)` for sliders added later. Not in `core.js`; load it only where it is used. Colors come from Core tokens.

**Tests:** 84 browser checks (was 48), adding scroll lock, GSAP open/close, reopen during close, mode overrides, the authored host, and Before and After.

Replaces on DetailFlow (when it moves to v1.3.0): the inline "DetailFlow Sheet motion" script and its `df-gsap-motion` style rule, and the Webflow-hosted `before_and_after_slider-1.0.1.js`.

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
