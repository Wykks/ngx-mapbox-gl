#!/bin/sh

currentVersion="$(sed -En 's/^.*"version": "(.+)".*$/\1/p' package.json)"
sed -E "s/\"version\": \"([0-9\.]*)\"/\"version\": \"${currentVersion}\"/" -i libs/ngx-mapbox-gl/package.json
