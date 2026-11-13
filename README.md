# Mayes Core

The main repository for Mayes Digital's website system: Core Design System 2.0.

Every Mayes Digital website is built from one Webflow master (Core Design System 2.0) and loads its shared behavior from this repo by release tag. This repo is the single source of truth for that system: the code, the spec, the decisions, and the kit for building a client site.

## What lives here

```
mayes-core/
├── docs/
│   ├── ARCHITECTURE.md   how the system fits together (Webflow master, code, products, clients)
│   ├── RELEASES.md       tagging and pinning rules; how Webflow loads this repo
│   ├── DECISIONS.md      decisions log
│   ├── AUDIT_2026-10-31.md  state of every site and repo when this became the main repo
│   ├── AUDIT_2026-11-08.md  gaps and improvements after Core v2 and the slot-free Page Shell
│   └── spec/             Core Design System 2.0 framework + Implementation Addendum
├── base/                 the $500 Base site kit (pages, mobile app layer, CMS, client checklist)
├── products/             where ShopFlow and DetailFlow will live once re-based on Core v2
├── javascript/           source: components, privacy, utilities
├── css/                  core-base.css (the few rules Webflow can't express) + the optional Before and After styles
├── dist/                 built files Webflow loads from jsDelivr (core.js, core.css + single modules)
├── test/                 browser tests
├── build.sh
├── check.sh
└── CHANGELOG.md
```

## Layers

| Layer | Where | Owns |
|---|---|---|
| Core | this repo + the Core Design System 2.0 Webflow site | tokens, Page Shell, navigation, mobile app layer (flush top bar with ⋯ settings, bottom nav, sheets), sections, cards, icons, motion, consent, business record |
| Product | `base/` now; `products/` later | a sellable configuration of Core: the $500 Base site, ShopFlow (commerce), DetailFlow (detailing) |
| Client | a Webflow site duplicated from a product | brand, copy, imagery, CMS content |

Core contains no product names, no commerce logic and no client content.

## Using Core on a site

Webflow → Site settings → Custom code. Use a release tag, never `@main`.

Head (consent snippet first, above any Google tag; then the app snippet; then the styles):

    <!-- paste dist/core-consent-head.html here -->
    <!-- paste dist/core-app-head.html here (set the short name and theme color) -->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/dmayes77/mayes-core@v3.0.0/dist/core.css">

Footer:

    <script src="https://cdn.jsdelivr.net/gh/dmayes77/mayes-core@v3.0.0/dist/core.js" defer></script>

`core.js` = sheet + consent + business (+ JSON-LD) + announcement + install. Each module also ships alone in `dist/`.

`core.css` is only `core-base.css`: rules Webflow's style panel can't express (the `[hidden]` guard, `<html>` scroll behavior, the sheet slide, `::backdrop` and scroll lock, tap highlight, reduced motion). **Core ships no look and no layout.** Every visual, including the sheets, safe areas and the install banner's position, is a Webflow class, and Core only toggles `is-*` combo classes that Webflow styles. See `docs/NATIVE_FIRST.md`.

Sites built on v1 (DetailFlow, ShopFlow) stay pinned to their v1 tag until they're rebuilt on the master's components.

| Module | Public API | Main attributes |
|---|---|---|
| Sheet | `CoreSheet.open/close/current/get` | Each sheet is a native Webflow Modal with `data-sheet="NAME"`; `data-sheet-open="NAME"` opens it from anywhere, `data-sheet-grabber` / `data-sheet-head` start swipe-down-to-close, `data-sheet-close` closes, `data-sheet-nonmodal="desktop|always"` opens without blocking the page (cookie bar). Events `sheet:open` / `sheet:close` |
| Consent | `CoreConsent.get/set/open` | `data-consent-switch`, `data-consent-action`, `data-consent` (gated scripts) |
| Business | `CoreBusiness.get/all/hours/fill` | `data-business-field` (source), `data-business` (target), `data-business-href`, `data-business-empty="hide"`, `data-business-hours`, `data-business-today` |
| Announcement | `CoreAnnouncement.refresh` | `data-announcement`; sets `--core-announcement-offset` (use it as the header class's `top`) |
| Install (Add to Home Screen) | `CoreInstall.show/hide/state` | the Core / Install Banner component (`data-install-banner`) is required; `data-install-open` trigger; `<html data-install="off">`, `data-install-name`, `data-install-delay`; sets `--core-install-offset` |
| Before and After (optional, separate file) | `CoreBeforeAfter.init` | `data-before-after`, `data-before-after-range` |

## Checks and tests

    ./check.sh            # syntax, dist in sync, product-neutral, version headers
    python3 test/run.py   # browser tests (needs Playwright and Chrome)

## Motion and the bottom nav

Both are native Webflow since v2.0.0, so Core has no script for them:
- **Motion:** the master's site-wide Interactions (Core / Fade, Rise, Scale, Stagger, Hero) target `[data-motion="…"]`.
- **Bottom nav:** each tab is a link. Sheet tabs carry `data-sheet-open="NAME"`, which opens that sheet's Modal, and the active tab is styled with Webflow's **Current** state.

## Development

Edit source files in `javascript/` or `css/`, then run:

    ./build.sh

Built files go to `dist/`, which is what Webflow loads.

## Versioning

Webflow sites load tagged releases only — never `@main`. See `docs/RELEASES.md`.

> v3.0.0 replaced the sheet engine and the Sheet / Host component with native Webflow Modals (see the upgrade note in `CHANGELOG.md`). v2.0.0 removed `core-bottom-nav.*`, `core-motion.js` and every module stylesheet from `dist/`. Sites pinned to a v1 tag keep loading them from that tag.
