#!/bin/sh

currentVersion="$(sed -En 's/^.*"version": "(.+)".*$/\1/p' package.json)"

# Cross-platform approach - avoid sed -i entirely
sed -E "s/\"version\": \"([0-9\.]*)\"/\"version\": \"${currentVersion}\"/" libs/ngx-mapbox-gl/package.json > libs/ngx-mapbox-gl/package.json.tmp
mv libs/ngx-mapbox-gl/package.json.tmp libs/ngx-mapbox-gl/package.json
