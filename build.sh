#!/bin/sh
set -e

cd "$(dirname "$0")"

JS="javascript"
CSS="css"
OUT="dist"

mkdir -p "$OUT"

echo "Building Mayes Core..."

cp "$JS/motion/core-motion.js" "$OUT/core-motion.js"
cp "$JS/components/core-sheet.js" "$OUT/core-sheet.js"
cp "$CSS/core-sheet.css" "$OUT/core-sheet.css"

echo "Build complete:"
ls -lh "$OUT"
