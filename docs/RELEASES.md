# Releases

## Rule

Webflow sites load files from this repo through jsDelivr **by release tag only**:

    https://cdn.jsdelivr.net/gh/dmayes77/mayes-core@v2.0.2/dist/core.js

Never `@main`, never `@stable`, never a bare commit. A push to `main` must never change a live site.

CI (`.github/workflows/ci.yml`) runs `./check.sh` and `test/run.py`, GSAP tests included, on every pull request and every push to `main`. Only tag a commit whose CI run is green.

## Tags

| Tag | Contents | Used by |
|---|---|---|
| `v0.1.0` | Core Motion (early) | ShopFlow and DetailFlow (motion); the `stable` branch also points here |
| `v1.1.0` | Core Sheet v1.1 + Core Motion v0.3 (commit `0407d10`) | ShopFlow and DetailFlow (sheet) |
| `v1.2.0` | adds bottom nav, consent, business, announcement, page stability, `core.js`/`core.css` bundles; Core Motion v0.4 — see `CHANGELOG.md` | — |
| `v1.3.0` | sheet v1.3 (GSAP motion, iPhone-safe scroll lock, Webflow-authored host, per-open mode), optional Before and After | — |
| `v1.4.0` | **do not use**: tagged by mistake on the v1.3.0 commit, same code as `v1.3.0` | — |
| `v1.4.1` | Add to Home Screen banner (`core-install`) in the bundles; `core-app-head.html` snippet | — (banner never shows if the cookie notice is closed without a choice) |
| `v1.4.2` | Fix: banner shows after the cookie notice closes, with or without a choice | — |
| `v1.4.3` | No vertical overscroll bounce or pull-to-refresh on phones and tablets (bottom nav stays still) | — |
| `v1.4.4` | Safe areas: viewport-fit=cover in the app head snippet, new core-safe-area.css | superseded by v1.4.5 |
| `v1.4.5` | Business v1.1.0: social icon links hide when empty; docs for the current mobile layer | superseded by v1.5.0 |
| `v1.5.0` | Native first: sheets designed in Webflow (Sheet / Host), Webflow Interactions for motion (`core-motion` meta), designed consent switches, hours rows and install banner | superseded by v1.6.0 |
| `v1.6.0` | Social icon links get `is-business-filled` when their URL is set (show them with a Webflow combo) | superseded by v1.7.0 |
| `v1.7.0` | Core writes the LocalBusiness / WebSite / WebPage JSON-LD from Business Settings and Business Hours | superseded by v2.0.0 |
| `v2.0.0` | Native CSS: Core ships no look or layout; the sheet engine sets `is-*` combos that Webflow styles; bottom-nav and motion scripts, the built sheet host and install banner, and every module stylesheet removed. **Breaking.** | superseded by v2.0.1 |
| `v2.0.1` | Alt text on every image Core fills (logo with no logo set, install icon); empty `data-sheet-open` is a plain link; stale slot comments fixed | superseded by v2.0.2 |
| `v2.0.2` | Empty `data-consent-action` / `data-install-action` are ignored; Install hides the whole `[data-core-button]` wrapper, so the Button component can carry both | latest; the $500 Base site and every new site. v1 sites stay on v1 tags |

## Cutting a release

1. Change sources in `javascript/` or `css/`.
2. Run `./build.sh` and commit `dist/` with the source.
3. Bump the version comment at the top of every changed file.
4. Tag: `git tag -a vX.Y.Z -m "<what changed>"` and push the tag.
5. Update the site's custom code to the new tag, test on staging, then publish.

## Versioning ([semver.org](https://semver.org))

Every tag is `vMAJOR.MINOR.PATCH`. Bump the part that matches the most significant change in the release.

**Core's public API** is everything a Webflow site depends on:
- the `data-*` attributes Core reads, and their values
- the classes Core adds or reads (`is-open`, `is-visible`, `is-on`, `is-disabled`, `is-business-filled`, …)
- the markup contracts of the components Core adopts (Sheet / Host, Core / Install Banner, the business data layer)
- the `window.Core*` APIs and the `core:*` and `sheet:*` events
- the head snippets and meta switches (`core-motion`)
- the file paths in `dist/`
- the look and behavior Core applies by default

| Bump | When | Examples |
|---|---|---|
| **PATCH** `x.y.Z` | Bug fixes only. No new attributes, classes, files or options, and nothing a site has to change. | the banner not showing after the cookie notice (v1.4.2); the gutter tint |
| **MINOR** `x.Y.0` | Something new that existing sites can ignore: an attribute, class hook, module, file, option or opt-in behavior. Deprecations are announced here too: the old way keeps working and is marked deprecated in the changelog. | `is-business-filled` on icon links (v1.6.0); Sheet / Host adoption (v1.5.0) |
| **MAJOR** `X.0.0` | Anything that makes a site edit Webflow to keep working or looking the same: removing or renaming an attribute, class, API, event or file; changing a default look or behavior sites rely on. | removing the bottom-nav and motion scripts (planned v2.0.0) |

Rules:
- A tag is never moved or reused. A mistake gets a new version (as `v1.4.0` → `v1.4.1` did).
- Each module's version comment follows the same rules for its own changes, and the release takes the largest bump among its modules.
- Every release has a `CHANGELOG.md` entry. Anything a site may need to do after upgrading goes in an **Upgrade note**.
- Before a tag exists, the master may load a merge commit for testing. Client sites only ever load tags.
- Optional: a pre-release tag such as `v2.0.0-rc.1` can replace the commit pin while testing a release on the master.

**Past releases that don't follow these rules** (tags are never changed, so they are only noted here):
- v1.4.1, v1.4.3, v1.4.4 and v1.4.5 each added a feature (Add to Home Screen, no-bounce, safe areas, hiding empty icon links), so each should have been a minor.
- v1.5.0 includes two look changes that could affect existing sites (see its upgrade note in `CHANGELOG.md`).

## Live sites

ShopFlow (`shopflow-mayesdigital`) and DetailFlow (`detailflow-mayesdigital`) custom code, updated 2026-11-03 (saved in Webflow; takes effect on each site's next publish):

| File | Loaded from |
|---|---|
| `core-sheet.css`, `core-sheet.js` | `mayes-core@v1.1.0` |
| `core-motion.js` | `mayes-core@v0.1.0` |

Neither site loads `@main` or `@stable` any more.
