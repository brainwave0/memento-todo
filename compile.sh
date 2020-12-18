#!/usr/bin/bash -e
trash-put *.js || true
mkdir -p out
for i in src/actions/*.ts; do
    tsc --allowJs --module none --outfile out/$(basename -s .ts $i ).js --lib es2017,dom $i
done
babel --out-dir . --minified --no-comments out/*
tsc --allowJs --module none --lib es2017,dom --outFile out/memento-database.ts.js src/memento-database.ts
babel --minified --no-comments --out-file out/memento-database.js out/memento-database.ts.js
trash-put out
