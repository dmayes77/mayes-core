#!/bin/sh
# Mayes Core build – writes dist/, the files Webflow loads from jsDelivr by release tag.
# Edit sources in javascript/ and css/, run ./build.sh, commit dist/ with the sources, then tag a release.
set -e
cd "$(dirname "$0")"

JS="javascript"
CSS="css"
OUT="dist"
mkdir -p "$OUT"

echo "Building Mayes Core..."

# v2: old dist files from v1 are removed so a v2 tag never serves a stale v1 module.
rm -f "$OUT"/*.js "$OUT"/*.css "$OUT"/*.html

# Single files (one feature each).
cp "$CSS/core-base.css"                 "$OUT/core-base.css"
cp "$JS/components/core-sheet.js"       "$OUT/core-sheet.js"
cp "$JS/privacy/core-consent.js"        "$OUT/core-consent.js"
cp "$JS/privacy/core-consent-head.html" "$OUT/core-consent-head.html"
cp "$JS/utilities/core-business.js"     "$OUT/core-business.js"
cp "$JS/components/core-install.js"     "$OUT/core-install.js"
cp "$JS/components/core-app-head.html"  "$OUT/core-app-head.html"
# Optional module (not in the bundles): load only on sites that use it.
cp "$JS/components/core-before-after.js" "$OUT/core-before-after.js"
cp "$CSS/core-before-after.css"         "$OUT/core-before-after.css"

# Bundles: everything a Core site needs, in load order. One <link> + one <script defer>.
bundle() { # bundle <output> <files...>
  out="$1"; shift
  {
    echo "/* Mayes Core – $(basename "$out") – built from: $* */"
    for f in "$@"; do echo; cat "$f"; done
  } > "$OUT/$out"
}
bundle core.css "$CSS/core-base.css"
bundle core.js  "$JS/components/core-sheet.js" "$JS/privacy/core-consent.js" "$JS/utilities/core-business.js" \
                "$JS/components/core-install.js"

echo "Build complete:"
ls -l "$OUT"
