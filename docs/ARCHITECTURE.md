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
Footer  4. (GSAP)                         only if a project's own script uses it; Core doesn't
        5. core.js                        every site
        6. <project>.js                   only if the project has one
```

| Layer | File | Lives in | Example |
|---|---|---|---|
| Base | `dist/core.css`, `dist/core.js` | this repo | sheet helper (open by name, swipe to close), consent, business record and JSON-LD, install banner logic |
| Product | `products/<name>/dist/<name>.css` / `.js` | this repo, `products/` | ShopFlow cart and product page; DetailFlow booking |
| Client | none by default | Webflow inline custom code, kept tiny | a one-off tweak for one client |

Rules:

- Everything a site loads comes from this repo through jsDelivr, pinned to a release tag (or a commit until the tag exists). One repo, one version number, so base and product code are always released together.
- `defer` keeps the order: project scripts run after `core.js` and can use `CoreSheet`, `CoreBusiness`, `CoreConsent` directly.
- Project code never copies or re-implements a Core module. If a project needs a generic feature, it goes into Core first.
- The $500 Base site loads only the base (steps 1, 2, 5, and 4 if it uses motion).
- Private repos (`shopflow`, `detailflow`) can't be served by jsDelivr, so product code moves into `products/` here when each product is re-based on Core.

## Tokens (Webflow variable collections)

| Collection | Holds |
|---|---|
| **Core** | Spacing, layout and type. 4 modes: Base (desktop), Tablet, Mobile Landscape, Mobile Portrait |
| **Theme** | Every semantic color: Background, Text, Border, Action, Feedback, glass and overlay |
| **Surface** | Border widths and radii |
| **Motion** | Durations, distances, scale and stagger. The sheet slide reads `Duration/standard` and `Duration/fast` |
| **Primitives** | Raw palette, size steps, font weights, line heights, letter spacing, base sizes. Listed last: styles never pick from it directly |

Webflow's default **Base collection** is left empty; Webflow doesn't allow deleting it.

Colors live only in Theme, so a Theme mode can re-skin a site. A client changes **Primitives only**; everything else references Primitives.

**Theme naming:** *primary*, *secondary* and *accent* only ever mean brand colors. Neutral shades use page / subtle / muted / dark (Background), default / subtle / muted (Text) and default / subtle / strong (Border). Text that sits on a filled color is `on-<fill>` (on-dark, on-brand, on-accent).

### Sizing follows Tailwind

So a site built on Core feels familiar, and so values carry over to Next.js + Tailwind work:

- **Size steps:** `Sizes/N` = N × 0.25rem (base `0.25rem`, base font size `1rem`). Off-scale values are `calc()` from the base, never new primitives.
- **Containers:** small 48rem, medium 64rem, large 72rem, xlarge 80rem (Tailwind `7xl`), xxlarge 96rem.
- **Headings are fluid** (`clamp()`, from a 360px to a 1280px viewport):

  | Token | Phone → desktop | Line height |
  |---|---|---|
  | H1 | 2.25rem → 3.75rem | 1.1 |
  | H2 | 1.875rem → 3rem | 1.2 |
  | H3 | 1.25rem → 1.5rem (semibold) | 1.4 |
  | H4 (card titles) | 1.125rem → 1.25rem | 1.4 |

  Body text, buttons and labels are fixed sizes. Card text is Body Small (14px).
- **Letter spacing:** tighter −0.05em, tight −0.025em, default 0, wide 0.025em, wider 0.05em, widest 0.1em. Headings use tight, eyebrows widest, buttons and navigation default.
- **Section spacing** (desktop / tablet / phones): small 4 / 4 / 3rem, medium 6 / 5 / 4rem, large 8 / 6 / 5rem.
- **Page padding:** 2rem desktop, 1.5rem tablet and mobile landscape, 1rem mobile portrait.
- **Components:** navbar 4rem tall; buttons 14px text (16px on `is-large`); feature cards padded 1.5rem; form inputs at least 2.5rem tall, 14px on desktop and 16px on phones so the browser doesn't zoom in on focus.

## Mobile app layer (991px and below)

Desktop is a normal website. Phones and tablets get an app-style layer from Core:

- **Brand bar:** logo plus one useful action.
- **Bottom nav:** 3–5 tabs; each tab is a link (a sheet tab adds `data-sheet-open="NAME"`); the active tab uses Webflow's Current state.
- **Sheets:** each sheet is a native Webflow Modal (`<dialog>`) in its own component, designed as a bottom sheet: full width and flush to the bottom on phones, 36rem wide and centered at the bottom above. Webflow and the browser handle opening and closing links, focus, Escape and the inert page; `core-base.css` adds the slide, backdrop and scroll lock; `core-sheet.js` adds open-by-name, tap-outside for Safari and swipe down to close.
- **Site Settings:** the More sheet, with contact, hours and privacy/cookie controls.

Markup contract: `data-bottom-nav`, `data-sheet` (on the Modal), `data-sheet-open`, `data-sheet-grabber`, `data-sheet-head`, `data-sheet-close`, `data-install-banner` (and its parts), `data-consent-*`.

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
