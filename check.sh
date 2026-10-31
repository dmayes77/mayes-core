#!/bin/sh
# Mayes Core checks – run before every commit and release. Exits non-zero on the first failure.
set -e
cd "$(dirname "$0")"
fail(){ echo "FAIL: $*"; exit 1; }

echo "1. JavaScript parses"
for f in javascript/*/*.js dist/*.js; do node --check "$f" || fail "syntax error in $f"; done

echo "2. dist/ is up to date with the sources"
./build.sh >/dev/null
git diff --quiet -- dist || { git --no-pager diff --stat -- dist; fail "dist/ was stale: run ./build.sh and commit dist/"; }
[ -z "$(git ls-files --others --exclude-standard dist)" ] || fail "new files in dist/ are not committed"

echo "3. Core stays product-neutral"
if grep -rniE 'shopflow|detailflow|storesynk|\bsf-[a-z]|window\.ShopFlow|window\.DetailFlow' javascript css; then
  fail "product names found in Core sources"
fi

echo "4. Every module declares a version"
for f in javascript/*/*.js css/*.css; do head -3 "$f" | grep -qE 'v[0-9]+\.[0-9]+\.[0-9]+' || fail "no version header in $f"; done

echo "All checks passed."
