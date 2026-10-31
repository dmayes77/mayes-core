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
├── dist/                 built files Webflow loads from jsDelivr
└── build.sh
```

## Layers

| Layer | Where | Owns |
|---|---|---|
| Core | this repo + the Core Design System 2.0 Webflow site | tokens, Page Shell, navigation, mobile app layer (bottom nav, sheets, Site Settings), sections, cards, icons, motion, consent, business record |
| Product | `base/` now; `products/` later | a sellable configuration of Core: the $500 Base site, ShopFlow (commerce), DetailFlow (detailing) |
| Client | a Webflow site duplicated from a product | brand, copy, imagery, CMS content |

Core contains no product names, no commerce logic and no client content.

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
