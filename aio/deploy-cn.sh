#!/usr/bin/env bash

set -x
set -e

commitSha=$(git rev-parse --short HEAD)
commitMessage=$(git log --oneline -n 1)

cd $(dirname $0)

yarn build

yarn preview >/tmp/preview.log &

pid=$!

sleep 3

npx ts-node --project=./tools/translator/tsconfig.json ./tools/translator/bin/prerender.ts

kill -9 ${pid}

cd ./prebuilt

git pull

cp -r ../dist/* .

cp index.html 404.html

git add .
git commit -am "${commitMessage}"

git push

cd -
