# Dev guide for ngx-mapbox-gl

## Install project dependencies (package.json)
```
yarn
```

## Run ngx-mapbox-gl showcase
```
yarn start
```

Then, you can make your changes to the lib and experiment with the showcase app directly.

## Commit format

https://github.com/angular/angular/blob/master/CONTRIBUTING.md#commit

## Release a new version

IMPORTANT: ngx-mapbox-gl follow https://semver.org/.
`standard-version` should auto increment the version correctly (as long as the commit message are correctly formatted). Make sure everything is correct before publishing a new version.

Check if tests are OK (`yarn test` and `yarn e2e` or take a look at ci if your changes are pushed).

```
yarn release
```

Now check the version, and manually edit `CHANGELOG.md` if necessary.

If eveything is OK, push the commit (with the tag)

```
git push --follow-tags
```

Publish on npm

```
npm publish dist/ngx-mapbox-gl
```

And finally, update the showcase app on github page (using https://github.com/angular-schule/angular-cli-ghpages)

```
yarn build:showcase && ngh -d dist/showcase/
```

(This could be updated to the more recent `ng deploy`)
