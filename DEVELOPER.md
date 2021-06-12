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

```
yarn release
```

Now check the version, and manually edit `CHANGELOG.md` if necessary.

If eveything is OK, push the commit (with the tag)

```
git push --follow-tags
```

This will create a tag in gihub and automatically publish to npm using Github actions

And finally, update the showcase app on github page (using https://github.com/angular-schule/angular-cli-ghpages)

```
npm run build:showcase && npm run publish:showcase
```

(This could be updated to the more recent `ng deploy`)
