# Architecture

One Webflow master and one tagged code repo feed every site. A product adds only its own features; a client changes only brand and content.

```
mayes-core (this repo, tagged releases)
        │  loaded by release tag
        ▼
Core Design System 2.0 master (Webflow)
  tokens · components · CMS (Business Settings, Business Hours)
        │  duplicated
        ├──────────────► $500 Base site ──► one site per client
        ├──────────────► ShopFlow   (later: commerce)
        └──────────────► DetailFlow (later: detailing)
```

## Webflow

| Site | Short name | Role |
|---|---|---|
| Core Design System 2.0 | `core-design-system-2-0` | The master. Everything reusable lands here first. |
| $500 Base | to be created | Duplicate of the master: Home, Services, Contact |
| ShopFlow | `shopflow-mayesdigital` | Commerce product; re-based on Core v2 later |
| DetailFlow | `detailflow-mayesdigital` | Detailing product; re-based on Core v2 later |
| Southern Reflexions | `southern-reflexions-mayesdigital` | Client build on Core 2.0 (Apex demo) |
| ServicePro, ProofBook, Mayes Digital, Core 1.0 | — | Older, separate token systems; not on Core 2.0 |

## How a site loads code

One base serves every project. A project adds its own script only when it needs behavior Core doesn't have.

```
Head    1. consent head snippet          (dist/core-consent-head.html, pasted inline, above any Google tag)
        2. core.css                       every site
        3. <project>.css                  only if the project has one
Footer  4. GSAP                           only if the site uses motion (Webflow Settings › GSAP)
        5. core.js                        every site
        6. <project>.js                   only if the project has one
```

| Layer | File | Lives in | Example |
|---|---|---|---|
| Base | `dist/core.css`, `dist/core.js` | this repo | sheet, bottom nav, consent, business record, motion |
| Product | `products/<name>/dist/<name>.css` / `.js` | this repo, `products/` | ShopFlow cart and product page; DetailFlow booking |
| Client | none by default | Webflow inline custom code, kept tiny | a one-off tweak for one client |

Rules:

- Everything a site loads comes from this repo through jsDelivr, pinned to a release tag (or a commit until the tag exists). One repo, one version number, so base and product code are always released together.
- `defer` keeps the order: project scripts run after `core.js` and can use `CoreSheet`, `CoreBusiness`, `CoreConsent` directly.
- Project code never copies or re-implements a Core module. If a project needs a generic feature, it goes into Core first.
- The $500 Base site loads only the base (steps 1, 2, 5, and 4 if it uses motion).
- Private repos (`shopflow`, `detailflow`) can't be served by jsDelivr, so product code moves into `products/` here when each product is re-based on Core.

## Tokens (Webflow variable collections)

Primitives (brand colors, fonts, base sizes) · Core 2.0 (responsive type and spacing, 4 modes: Base, Tablet, Mobile Landscape, Mobile Portrait) · Theme (semantic colors) · Surface · Motion.

A client changes **Primitives only**. Everything else references Primitives.

## Mobile app layer (991px and below)

Desktop is a normal website. Phones and tablets get an app-style layer from Core:

- **Brand bar:** logo plus one useful action.
- **Bottom nav:** 3–5 tabs; each tab is a link, `sheet:NAME` or `click:SELECTOR`.
- **Sheets:** one shared engine; bottom sheet on phones, drawer or dialog above; heights compact / medium / tall / full.
- **Site Settings:** the More sheet, with contact, hours and privacy/cookie controls.

Markup contract: `data-bottom-nav`, `data-bottom-nav-tab`, `data-tab-action`, `data-bottom-nav-link`, `data-sheet`, `data-sheet-open`, `data-sheet-mode`, `data-sheet-height`, `data-settings-section`, `data-consent-*`.

## Business record (CMS)

| Collection | Items | Fields |
|---|---|---|
| Business Settings | 1 | name, short name, tagline, logos, phone, email, address, directions URL, service area, social links, default SEO title/description, share image, booking URL, GoHighLevel location ID |
| Business Hours | 7 | day, order, open, close, closed |

Rendered once, hidden, in the Page Shell. Core scripts fill `data-business="field"` targets anywhere on the page from it.

## Page structure (from the spec)

```
section-small | section-medium | section-large  (+ surface-*, radius-*, shadow-*)
└── padding-global
    └── container-*
        └── section-content + is-row | is-column + gap-*
```

Full rules: `spec/Core_Design_System_2.0_UPDATED.pdf` and `spec/Core_Design_System_2.0_Implementation_Addendum_2026-09-20.md`.
