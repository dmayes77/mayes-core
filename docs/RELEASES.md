# Releases

## Rule

Webflow sites load files from this repo through jsDelivr **by release tag only**:

    https://cdn.jsdelivr.net/gh/dmayes77/mayes-core@v2.0.0/dist/core.js

Never `@main`, never `@stable`, never a bare commit. A push to `main` must never change a live site.

## Tags

| Tag | Contents | Used by |
|---|---|---|
| `v0.1.0` | Core Motion (early) | the `stable` branch points here; ShopFlow and DetailFlow load `core-motion.js@stable` |
| `v1.1.0` | Core Sheet v1.1 + Core Motion v0.3 (main as of 2026-10-04) | to be pinned by ShopFlow and DetailFlow before Core 2.0 work merges |
| `v2.0.0` | planned: merged sheet engine, bottom nav, consent, business fill, hours, motion, page stability | the $500 Base site, then every new site |

## Cutting a release

1. Change sources in `javascript/` or `css/`.
2. Run `./build.sh` and commit `dist/` with the source.
3. Bump the version comment at the top of every changed file.
4. Tag: `git tag -a vX.Y.Z -m "<what changed>"` and push the tag.
5. Update the site's custom code to the new tag, test on staging, then publish.

Semver: a patch fixes behavior without changing markup or attributes; a minor adds attributes or files; a major changes or removes an attribute, class or file path a site depends on.

## Live sites (pinned 2026-10-31)

ShopFlow (`shopflow-mayesdigital`) and DetailFlow (`detailflow-mayesdigital`) site custom code was changed on 2026-10-31 (saved in Webflow; takes effect on each site's next publish):

| Was | Now |
|---|---|
| `mayes-core@main/dist/core-sheet.css` | `mayes-core@0407d104f26c5d3de24415e7bc00fde9ce26ccc6/dist/core-sheet.css` |
| `mayes-core@main/dist/core-sheet.js` | `mayes-core@0407d104f26c5d3de24415e7bc00fde9ce26ccc6/dist/core-sheet.js` |
| `mayes-core@stable/dist/core-motion.js` | `mayes-core@v0.1.0/dist/core-motion.js` |

Commit `0407d10` is exactly what `v1.1.0` will point to. When the `v1.1.0` tag exists, swap the long commit hash for `@v1.1.0`; nothing else changes.
