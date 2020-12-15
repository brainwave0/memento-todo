#!/usr/bin/bash -e
if [[ -z "$1" ]]; then
    echo "You need a commit message."
    exit 1
fi
# ./test.sh
./compile.sh
git add .
git commit -m "$1"
git push
