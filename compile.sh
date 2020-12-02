#!/usr/bin/bash -e
mkdir -p out
for i in src/actions/*.ts; do
    tsc --allowJs --module none --outfile out/$(basename -s .ts $i ).js --lib es2016 $i
done
babel --out-dir . --minified --no-comments out/*
tsc --allowJs --module none --lib es2016 --outFile out/memento-database.ts.js src/memento-database.ts
babel --minified --no-comments --out-file out/memento-database.js out/memento-database.ts.js
for i in ./*.js; do
    ./remove-contents.py out/memento-database.js $i
done
trash-put out
