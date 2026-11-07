# Changelog

## v1.6.0 — 2026-11-07

A minor release under semver: it adds a hook and changes nothing existing. It was first prepared as v1.5.1, never tagged, and renamed because a new hook is a feature, not a fix.

- **Business v1.3.0:** icon links (`data-business-href` only, like the footer social icons) get `.is-business-filled` when their Business Settings field has a URL. In Webflow, hide the link class by default and show it with an `is-business-filled` combo, so a social icon appears only once its URL is filled in, and empty icons never flash on load. Don't use the element's Visibility setting for this: Webflow leaves hidden elements out of the published page, so Core can't show them. 1 new browser check.

## v1.5.0 — 2026-11-07

**Upgrade note (outside strict semver):** two v1.5.0 changes can alter how an existing site looks, which semver would call breaking. Both were shipped in a minor because only the master used the affected markup.
- Cookie switches, buttons, rows and sections that carry their own Webflow class no longer get Core's fallback look. Give those classes the look in Webflow, as the master now does with `settings_row`, `settings_section`, `settings_switch` and `button`.
- A sheet host designed in Webflow now gets its safe-area insets on the panel instead of on the body, footer and head padding.

The first native-first release (see `docs/NATIVE_FIRST.md`). Nothing is removed, so v1.4 sites keep working.

- **Sheet v1.4.0, designed in Webflow.** Build the sheet frame as a Webflow component, **Sheet / Host**. It has `data-sheet="drawer" data-sheet-host` with overlay, panel, grabber (put a bar inside it), head with title and close, and body. Its look then comes from its own classes.
  - `core-sheet.css` is split. **Behavior** (every host): showing and hiding, the position and slide for each presentation, the bottom-sheet heights, the scrolling body, the swipe zone and the safe areas. **Look** (only the host Core builds itself, now marked `data-sheet-look="core"`): colors, shadow, spacing, type, the drag bar and the close button.
  - Position and width set on a Webflow panel class for the Designer preview are overridden, so one designed panel works as a bottom sheet, a dialog and a drawer.
  - Corner size is `--sheet-radius`, falling back to the Radius/medium token.
- **Safe areas v1.1.0:** the sheet insets moved onto the panel (in `core-sheet.css`), so a designed sheet keeps its own padding.
- **Motion v0.5.0:** with `<meta name="core-motion" content="webflow">` in the head, Core Motion leaves `data-motion` and `data-animate` to Webflow Interactions, so nothing animates twice. `data-scroll-state` still works. The master's site-wide interactions are Core / Fade, Core / Rise, Core / Scale, Core / Stagger and Core / Hero.
- **Consent v1.2.0:** switches get `.is-on` and `.is-disabled` (essential), so their look can be a Webflow combo class. Any switch, button, row or section with its own Webflow class is marked `data-look="webflow"`, and Core's fallback look in `core-consent.css` steps aside for it. The obsolete `[data-settings-open]` cog rule is gone.
- **Business v1.2.0:** a row designed in Webflow inside `[data-business-hours]` is cloned for every hours line and keeps its classes. Days go in `[data-business-hours-days]` or the row's first child, time in `[data-business-hours-time]` or its last child. Rows Core writes itself are marked `data-core-look`, and only those get Core's grid.
- **Install v1.1.0:** a banner designed in Webflow (`[data-install-banner]`, component Core / Install Banner) is used instead of the built one. Core fills `[data-install-title]`, `[data-install-name]` and `[data-install-icon]`, shows only the matching `[data-install-hint]`, shows the Install button only when the browser offers it, and toggles `is-visible`. Core still keeps it above the bottom nav.
- **Sheet v1.4.1 fix:** on desktop browsers with classic scrollbars, the 15px gutter that page stability reserves can't be covered by any overlay. It showed as a light strip beside an open sheet. While a sheet is open, the root background (which is what shows there) becomes the overlay color blended over the body's background. It only applies when the body has its own background and fills the window.
- 24 new browser checks: a designed sheet host as a bottom sheet, dialog and drawer, with its look and corners from Webflow; Core look only on the built host; safe areas; the native-motion switch; designed consent switches (`is-on`, `is-disabled`, fallback look); designed hours rows; the designed install banner; and the gutter.

## v1.4.5 — 2026-11-07

- **Business v1.1.0:** an icon link with only `data-business-href="field"` and `data-business-empty="hide"` (a social icon) now hides when that field is empty and shows when it has a URL. Before, `hide` only worked together with `data-business`. 3 new browser checks.
- Docs: the Base site README, README and DECISIONS now describe the current mobile layer (flush top bar with the ⋯ Settings button, quick-action bottom nav, one component per sheet in the Sheets slot, sheet naming, the business data layer).

## v1.4.4 — 2026-11-07

Safe areas: content stays clear of the iPhone notch, rounded corners and home bar.

- **App head snippet v1.1.0** adds `<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">`. Without `viewport-fit=cover` iPhones report every safe-area inset as 0, so Core's existing `env(safe-area-inset-*)` rules did nothing. It replaces Webflow's default viewport tag because it comes later in the head. **Update the snippet on every site.**
- **New `core-safe-area.css` v1.0.0** (in `core.css`): sides (the notch in landscape) for page content, the fixed header (`.shell-header`), the bottom nav, sheets and the install banner; the status bar for side drawers and the header; center dialogs stay inside the safe area. Insets are 0 where a device has none, so nothing moves elsewhere.
- Bottom (home bar) spacing was already in the bottom nav, Page Shell, sheets and install banner; it now takes effect.
- 8 new browser checks with emulated notch and home-bar insets (landscape and portrait).

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
