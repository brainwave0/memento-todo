#!/usr/bin/bash -e
trash-put test.js || true
mkdir -p out
tsc --allowJs --module none --outfile out/test.js --lib es2017,dom src/test.ts
babel --out-dir . out/*
trash-put out
echo "beginning tests"
node --trace-uncaught test.js
