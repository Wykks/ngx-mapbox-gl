# Dev guide for ngx-maplibre-gl

## Install project dependencies (package.json)

```
npm install
```

## Run ngx-maplibre-gl showcase

```
npm run start
```

Then, you can make your changes to the lib and experiment with the showcase app directly.

## Commit format

https://github.com/angular/angular/blob/master/CONTRIBUTING.md#commit

## Release a new version

IMPORTANT: ngx-maplibre-gl follow https://semver.org/.
`standard-version` should auto increment the version correctly (as long as the commit message are correctly formatted). Make sure everything is correct before publishing a new version.

Check if tests are OK (`npm run test` and `npm run e2e` or take a look at ci if your changes are pushed).

Change the version in both package.json files - the version should match the supported angular version

Manually edit `CHANGELOG.md` if necessary.

If everything is OK, push the changes

Create a Github release with the same version name, for example `v1.2.3` - this will triger the Github actions to update the npm package and the gh-pages
