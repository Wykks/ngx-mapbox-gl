# Change Log

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

<a name="1.0.0-beta.3"></a>
# [1.0.0-beta.3](https://github.com/Wykks/ngx-mapbox-gl/compare/v1.0.0-beta.2...v1.0.0-beta.3) (2017-12-18)


### Bug Fixes

* add guard to ngOnDestroy of each components ([311cbb9](https://github.com/Wykks/ngx-mapbox-gl/commit/311cbb9))
* use rxjs lettable operators ([73530cd](https://github.com/Wykks/ngx-mapbox-gl/commit/73530cd))
* **image:** add a loaded event ([32c4557](https://github.com/Wykks/ngx-mapbox-gl/commit/32c4557))
* **map:** implement fitBounds ([0234881](https://github.com/Wykks/ngx-mapbox-gl/commit/0234881))
* **map:** wait for onStable before initializing mapbox-gl ([ebc2fe9](https://github.com/Wykks/ngx-mapbox-gl/commit/ebc2fe9))


### build

* update deps ([9f42a60](https://github.com/Wykks/ngx-mapbox-gl/commit/9f42a60))


### Performance Improvements

* **map, layer:** only listen observed event ([57bd275](https://github.com/Wykks/ngx-mapbox-gl/commit/57bd275))


### BREAKING CHANGES

* rxjs >=5.5.0 is now required
* Now require angular 5 (sorry !)



<a name="1.0.0-beta.2"></a>
# [1.0.0-beta.2](https://github.com/Wykks/ngx-mapbox-gl/compare/v1.0.0-beta.1...v1.0.0-beta.2) (2017-11-20)


### Bug Fixes

* **geojsonSource:** protect onDestroy ([ac8172e](https://github.com/Wykks/ngx-mapbox-gl/commit/ac8172e)), closes [#6](https://github.com/Wykks/ngx-mapbox-gl/issues/6)
* **image:** addImage seems to need to wait for mapLoaded now ([cd51115](https://github.com/Wykks/ngx-mapbox-gl/commit/cd51115))
* **layer:** type is not optional ([b9edaac](https://github.com/Wykks/ngx-mapbox-gl/commit/b9edaac)), closes [#4](https://github.com/Wykks/ngx-mapbox-gl/issues/4)
* **map:** rename zoomChange and pitchChange events ([0142f88](https://github.com/Wykks/ngx-mapbox-gl/commit/0142f88))
* **map:** zoom/bearing/pitch inputs are now an array ([0c19c5f](https://github.com/Wykks/ngx-mapbox-gl/commit/0c19c5f)), closes [#2](https://github.com/Wykks/ngx-mapbox-gl/issues/2)


### Features

* update to mapbox-gl 0.42.0 ([3ae818f](https://github.com/Wykks/ngx-mapbox-gl/commit/3ae818f))


### BREAKING CHANGES

* **map:** zoom/bearing/pitch inputs are now an array.
This allow to force input changes for theses inputs
* **map:** Rename zoomChange and pitchChange events to zoomEvt and pitchEvt, because the "Change" suffix allow incorrecty two-way binding.



<a name="1.0.0-beta.1"></a>
# [1.0.0-beta.1](https://github.com/Wykks/ngx-mapbox-gl/compare/v1.0.0-beta.0...v1.0.0-beta.1) (2017-11-15)


### Bug Fixes

* remove accidentally added [@turf](https://github.com/turf)/random from deps... [skip ci] ([642f60c](https://github.com/Wykks/ngx-mapbox-gl/commit/642f60c))



<a name="1.0.0-beta.0"></a>
# [1.0.0-beta.0](https://github.com/Wykks/ngx-mapbox-gl/compare/v0.1.0-beta.0...v1.0.0-beta.0) (2017-11-14)


### Bug Fixes

* **canvas:** remove contextType ([3ca702c](https://github.com/Wykks/ngx-mapbox-gl/commit/3ca702c))
* **geojsonSource:** adjust cluster input type ([4ae0151](https://github.com/Wykks/ngx-mapbox-gl/commit/4ae0151))
* use AsyncSubject for internal load event ([456013a](https://github.com/Wykks/ngx-mapbox-gl/commit/456013a))
* **geojsonSource:** fill data with empty FeatureCollection ([a8df1cd](https://github.com/Wykks/ngx-mapbox-gl/commit/a8df1cd))
* **map:** customMapboxApiUrl now correctly set API_URL ([ef295a3](https://github.com/Wykks/ngx-mapbox-gl/commit/ef295a3))
* **map:** remove duplicate load event listener ([c92da66](https://github.com/Wykks/ngx-mapbox-gl/commit/c92da66))
* **marker:** set offset as optionnal ([4f60ce1](https://github.com/Wykks/ngx-mapbox-gl/commit/4f60ce1))


### Features

* **layer:** add mouseMove event ([45f99ff](https://github.com/Wykks/ngx-mapbox-gl/commit/45f99ff))
* emit map instance on load output ([17e9fe2](https://github.com/Wykks/ngx-mapbox-gl/commit/17e9fe2))
* **map:** add cursorStyle input ([3848618](https://github.com/Wykks/ngx-mapbox-gl/commit/3848618))
* **popup:** add close output ([7e93c5a](https://github.com/Wykks/ngx-mapbox-gl/commit/7e93c5a))


### BREAKING CHANGES

* MapComponent is no longer exposed in the package
* **canvas:** remove contextType



<a name="0.1.0-beta.0"></a>
# [0.1.0-beta.0](https://github.com/Wykks/ngx-mapbox-gl/compare/v0.1.0-alpha.2...v0.1.0-beta.0) (2017-10-29)


### Features

* feature draggable directive + example ([1166346](https://github.com/Wykks/ngx-mapbox-gl/commit/1166346))



<a name="0.1.0-alpha.2"></a>
# [0.1.0-alpha.2](https://github.com/Wykks/ngx-mapbox-gl/compare/v0.1.0-alpha.1...v0.1.0-alpha.2) (2017-10-19)


### Bug Fixes

* **map:** run output event inside ngZone ([66f2caf](https://github.com/Wykks/ngx-mapbox-gl/commit/66f2caf))
* **sources:** add a guard to ensure that the source is added before onChanges ([64f3f97](https://github.com/Wykks/ngx-mapbox-gl/commit/64f3f97))


### Features

* **layer:** add click/mouseEnter/mouseLeave Output ([2dbabf4](https://github.com/Wykks/ngx-mapbox-gl/commit/2dbabf4))



<a name="0.1.0-alpha.1"></a>
# [0.1.0-alpha.1](https://github.com/Wykks/ngx-mapbox-gl/compare/v0.1.0-alpha.0...v0.1.0-alpha.1) (2017-10-18)


### Bug Fixes

* remove protractor-browser-logs from depenencies ([52afa55](https://github.com/Wykks/ngx-mapbox-gl/commit/52afa55))



<a name="0.1.0-alpha.0"></a>
# 0.1.0-alpha.0 (2017-10-18)

First release !
