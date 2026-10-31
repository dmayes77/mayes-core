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

# Single files (one feature each). Paths are stable: sites already load some of these.
cp "$JS/components/core-sheet.js"       "$OUT/core-sheet.js"
cp "$CSS/core-sheet.css"                "$OUT/core-sheet.css"
cp "$JS/motion/core-motion.js"          "$OUT/core-motion.js"
cp "$JS/components/core-bottom-nav.js"  "$OUT/core-bottom-nav.js"
cp "$CSS/core-bottom-nav.css"           "$OUT/core-bottom-nav.css"
cp "$JS/privacy/core-consent.js"        "$OUT/core-consent.js"
cp "$CSS/core-consent.css"              "$OUT/core-consent.css"
cp "$JS/privacy/core-consent-head.html" "$OUT/core-consent-head.html"
cp "$JS/utilities/core-business.js"     "$OUT/core-business.js"
cp "$CSS/core-business.css"             "$OUT/core-business.css"
cp "$JS/utilities/core-announcement.js" "$OUT/core-announcement.js"
cp "$CSS/core-announcement.css"         "$OUT/core-announcement.css"
cp "$CSS/core-page-stability.css"       "$OUT/core-page-stability.css"

# Bundles: everything a Core site needs, in load order. One <link> + one <script defer>.
bundle() { # bundle <output> <files...>
  out="$1"; shift
  {
    echo "/* Mayes Core – $(basename "$out") – built from: $* */"
    for f in "$@"; do echo; cat "$f"; done
  } > "$OUT/$out"
}
bundle core.css "$CSS/core-page-stability.css" "$CSS/core-sheet.css" "$CSS/core-bottom-nav.css" \
                "$CSS/core-consent.css" "$CSS/core-business.css" "$CSS/core-announcement.css"
bundle core.js  "$JS/components/core-sheet.js" "$JS/components/core-bottom-nav.js" "$JS/privacy/core-consent.js" \
                "$JS/utilities/core-business.js" "$JS/utilities/core-announcement.js" "$JS/motion/core-motion.js"

echo "Build complete:"
ls -l "$OUT"
