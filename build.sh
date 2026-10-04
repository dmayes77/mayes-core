#!/bin/sh
set -e

cd "$(dirname "$0")"

SRC="javascript"
OUT="dist"

mkdir -p "$OUT"

echo "Building Mayes Core..."

cp "$SRC/motion/core-motion.js" "$OUT/core-motion.js"

echo "Build complete:"
ls -lh "$OUT"
