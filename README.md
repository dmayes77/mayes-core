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
│   └── spec/             Core Design System 2.0 framework + Implementation Addendum
├── base/                 the $500 Base site kit (pages, mobile app layer, CMS, client checklist)
├── products/             where ShopFlow and DetailFlow will live once re-based on Core v2
├── javascript/           source: motion, components, privacy, utilities
├── css/                  source styles
├── dist/                 built files Webflow loads from jsDelivr (core.js, core.css + single modules)
├── test/                 browser tests
├── build.sh
├── check.sh
└── CHANGELOG.md
```

## Layers

| Layer | Where | Owns |
|---|---|---|
| Core | this repo + the Core Design System 2.0 Webflow site | tokens, Page Shell, navigation, mobile app layer (bottom nav, sheets, Site Settings), sections, cards, icons, motion, consent, business record |
| Product | `base/` now; `products/` later | a sellable configuration of Core: the $500 Base site, ShopFlow (commerce), DetailFlow (detailing) |
| Client | a Webflow site duplicated from a product | brand, copy, imagery, CMS content |

Core contains no product names, no commerce logic and no client content.

## Using Core on a site

Webflow → Site settings → Custom code. Use a release tag, never `@main`.

Head (consent snippet first, above any Google tag; then the styles):

    <!-- paste dist/core-consent-head.html here -->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/dmayes77/mayes-core@v1.2.0/dist/core.css">

Footer (after GSAP, if the site uses it):

    <script src="https://cdn.jsdelivr.net/gh/dmayes77/mayes-core@v1.2.0/dist/core.js" defer></script>

`core.js` = sheet + bottom nav + consent + business + announcement + motion. Each module also ships alone in `dist/`.

| Module | Public API | Main attributes |
|---|---|---|
| Sheet | `CoreSheet.open/close/show` | `data-sheet`, `data-sheet-open`, `data-sheet-mode`, `data-sheet-height` |
| Bottom nav | — | `data-bottom-nav`, `data-bottom-nav-tab`, `data-tab-action`, `data-bottom-nav-link` |
| Consent | `CoreConsent.get/set/open` | `data-consent-switch`, `data-consent-action`, `data-consent` (gated scripts) |
| Business | `CoreBusiness.get/all/hours/fill` | `data-business-field` (source), `data-business` (target), `data-business-hours`, `data-business-today` |
| Announcement | `CoreAnnouncement.refresh` | `data-announcement`, `data-announcement-follow` |
| Motion | `CoreMotion` | `data-motion`, `data-scroll-state`, `data-animate` (older) |

## Checks and tests

    ./check.sh            # syntax, dist in sync, product-neutral, version headers
    python3 test/run.py   # browser tests (first time: npm install --prefix test gsap)

## Core Motion

Core Motion is the reusable motion and interaction layer.

Webflow → HTML data attributes → Core Motion → GSAP / ScrollTrigger

It owns reveal animations, scroll states, parallax, stagger, text animation and reduced-motion handling. It contains no project selectors or visual styling: for example, `data-scroll-state` makes Core Motion toggle `is-scrolled`, and the project's Webflow classes decide what `is-scrolled` looks like.

## Development

Edit source files in `javascript/` or `css/`, then run:

    ./build.sh

Built files go to `dist/`, which is what Webflow loads.

## Versioning

Webflow sites load tagged releases only — never `@main`. See `docs/RELEASES.md`.

> Transition note (2026-10-31): ShopFlow and DetailFlow still load `@main` and `@stable`. The file paths in `dist/` are kept unchanged on this branch so those sites keep working until they are pinned to `v1.1.0`.
