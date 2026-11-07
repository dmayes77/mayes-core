# Releases

## Rule

Webflow sites load files from this repo through jsDelivr **by release tag only**:

    https://cdn.jsdelivr.net/gh/dmayes77/mayes-core@v2.0.0/dist/core.js

Never `@main`, never `@stable`, never a bare commit. A push to `main` must never change a live site.

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
| `v1.5.0` | Native first: sheets designed in Webflow (Sheet / Host), Webflow Interactions for motion (`core-motion` meta), designed consent switches, hours rows and install banner | superseded by v1.5.1 |
| `v1.5.1` | Social icon links get `is-business-filled` when their URL is set (show them with a Webflow combo) | latest; the $500 Base site and every new site |

## Cutting a release

1. Change sources in `javascript/` or `css/`.
2. Run `./build.sh` and commit `dist/` with the source.
3. Bump the version comment at the top of every changed file.
4. Tag: `git tag -a vX.Y.Z -m "<what changed>"` and push the tag.
5. Update the site's custom code to the new tag, test on staging, then publish.

Semver: a patch fixes behavior without changing markup or attributes; a minor adds attributes or files; a major changes or removes an attribute, class or file path a site depends on.

## Live sites

ShopFlow (`shopflow-mayesdigital`) and DetailFlow (`detailflow-mayesdigital`) custom code, updated 2026-11-03 (saved in Webflow; takes effect on each site's next publish):

| File | Loaded from |
|---|---|
| `core-sheet.css`, `core-sheet.js` | `mayes-core@v1.1.0` |
| `core-motion.js` | `mayes-core@v0.1.0` |

Neither site loads `@main` or `@stable` any more.
