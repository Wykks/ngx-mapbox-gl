# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

### [6.0.4](https://github.com/Wykks/ngx-mapbox-gl/compare/v6.0.3...v6.0.4) (2021-02-17)

### [6.0.3](https://github.com/Wykks/ngx-mapbox-gl/compare/v6.0.2...v6.0.3) (2021-02-09)

### Bug Fixes

- Position interface ([#278](https://github.com/Wykks/ngx-mapbox-gl/issues/278)) ([d0658ba](https://github.com/Wykks/ngx-mapbox-gl/commit/d0658bac64b18cc6132697b7ecbecc076e25d06d))

### [6.0.2](https://github.com/Wykks/ngx-mapbox-gl/compare/v6.0.1...v6.0.2) (2021-02-09)

### Bug Fixes

- declare Position interface for geolocate-control ([#276](https://github.com/Wykks/ngx-mapbox-gl/issues/276)) ([5bc2639](https://github.com/Wykks/ngx-mapbox-gl/commit/5bc263949bb975604a177a249bec0f4483fa0395))

### [6.0.1](https://github.com/Wykks/ngx-mapbox-gl/compare/v6.0.0...v6.0.1) (2021-02-03)

### Bug Fixes

- **deps:** add @types/mapbox\_\_mapbox-gl-geocoder ([#274](https://github.com/Wykks/ngx-mapbox-gl/issues/274)) ([e4b058c](https://github.com/Wykks/ngx-mapbox-gl/commit/e4b058c54b36871ce0c57991862d2e5668147793))

## [6.0.0](https://github.com/Wykks/ngx-mapbox-gl/compare/v5.0.0...v6.0.0) (2021-01-29)

### ⚠ BREAKING CHANGES

- Updating mapbox-gl from 1.1.0 to 2.0.1 may break existing code
- Dropped Angular 8 support

### Features

- Update to mapbox-gl 2.0.1
- Add Angular 11 support

## [5.0.0](https://github.com/Wykks/ngx-mapbox-gl/compare/v4.8.1...v5.0.0) (2020-12-13)

### ⚠ BREAKING CHANGES

- **mglDraggable:** Remove marker support for mglDraggable (use draggable input instead)
- Remove undocumented resize API
- Updating mapbox-gl from 1.1.0 to 1.12.0 may cause breaking change

### Features

- update to mapbox-gl 1.13.0 ([a8b7eea](https://github.com/Wykks/ngx-mapbox-gl/commit/a8b7eeaf8620affffd19a9883ca1d350c3d76b79))
- **mglDraggable:** remove marker support ([7e14744](https://github.com/Wykks/ngx-mapbox-gl/commit/7e1474424fcadaf3b101a6922d80674bab222767))
- update to mapbox-gl 1.12.0 ([#253](https://github.com/Wykks/ngx-mapbox-gl/issues/253)) ([eddbda7](https://github.com/Wykks/ngx-mapbox-gl/commit/eddbda75369e5096bca2b6edc4a66a90a909694b))

### Bug Fixes

- **draggable:** fix incorrect use of takeUntil ([f8a7698](https://github.com/Wykks/ngx-mapbox-gl/commit/f8a7698ad585bd8f3974023ec42a3e7dd13618e8))
- Change many outputs to avoid confusion (fix [#107](https://github.com/Wykks/ngx-mapbox-gl/issues/107)) ([7b50fd8](https://github.com/Wykks/ngx-mapbox-gl/commit/7b50fd839289d7f0fe497b10d570061cbe3bc332))

### showcase

- refactor whole app & add doc versionning ([33bb369](https://github.com/Wykks/ngx-mapbox-gl/commit/33bb369e91f6fcf16793b8370bcfd29d91fd885f))

### [4.8.1](https://github.com/Wykks/ngx-mapbox-gl/compare/v4.8.0...v4.8.1) (2020-07-24)

### Bug Fixes

- attempting to delete a custom control to the map if it was not actually added there (happens if there was an exception during markers initialization) [#199](https://github.com/Wykks/ngx-mapbox-gl/issues/199) ([503730b](https://github.com/Wykks/ngx-mapbox-gl/commit/503730b6bcbdbf8d9772f167e595bb2541188101))

## [4.8.0](https://github.com/Wykks/ngx-mapbox-gl/compare/v4.7.1...v4.8.0) (2020-07-20)

### Features

- add Angular 10 support ([3976db7](https://github.com/Wykks/ngx-mapbox-gl/commit/3976db7f3eac724219f619d01ba6c8dca05481a1))

### Bug Fixes

- **showcase:** a typo in 'Add custom localization for controls' example ([cb7b3af](https://github.com/Wykks/ngx-mapbox-gl/commit/cb7b3af704c4143d6537208980d655674c5a8d4f))

## [4.7.1](https://github.com/Wykks/ngx-mapbox-gl/compare/v4.7.0...v4.7.1) (2020-07-20)

### Features

- **Marker:** add pitch/rotation alignment options to the Marker component. ([#226](https://github.com/Wykks/ngx-mapbox-gl/issues/226)) ([1a61e62](https://github.com/Wykks/ngx-mapbox-gl/commit/1a61e62755b13afc839a5878ea4d74e6ad00774c))

### Bug Fixes

- definition of NgxMapboxGLModule so it works with Angular 10 ([9646f98](https://github.com/Wykks/ngx-mapbox-gl/commit/9646f983780df28570dcb3c9f39865c9b478ccb8))
- rjxs subscription leaks resulting in attempts to create sources multiple times ([beddec1](https://github.com/Wykks/ngx-mapbox-gl/commit/beddec1c72175cdddc4e137def01732226911051))

## [4.6.0](https://github.com/Wykks/ngx-mapbox-gl/compare/v4.5.0...v4.6.0) (2020-06-18)

### Features

- **marker:** add pitch/rotation alignment options to the Marker component. ([#226](https://github.com/Wykks/ngx-mapbox-gl/issues/226)) ([1a61e62](https://github.com/Wykks/ngx-mapbox-gl/commit/1a61e62755b13afc839a5878ea4d74e6ad00774c))

## [4.5.0](https://github.com/Wykks/ngx-mapbox-gl/compare/v4.4.2...v4.5.0) (2020-03-02)

### Features

- **GeoJSONSource:** add generateId option [#215](https://github.com/Wykks/ngx-mapbox-gl/issues/215) ([16ec1b4](https://github.com/Wykks/ngx-mapbox-gl/commit/16ec1b4429787df89a45e47a12c3f3c998c97a8e))

### [4.4.2](https://github.com/Wykks/ngx-mapbox-gl/compare/v4.4.1...v4.4.2) (2020-02-11)

### Bug Fixes

- **markers-for-clusters:** handle multiple cluster correctly ([3af48a4](https://github.com/Wykks/ngx-mapbox-gl/commit/3af48a44be0d4e474c09aedbc199c03236e1417a)), closes [#206](https://github.com/Wykks/ngx-mapbox-gl/issues/206)

### [4.4.1](https://github.com/Wykks/ngx-mapbox-gl/compare/v4.4.0...v4.4.1) (2020-02-09)

### Bug Fixes

- **markers-for-cluster:** fix regression ([0356a9c](https://github.com/Wykks/ngx-mapbox-gl/commit/0356a9c2b9276b60abce5cd71423e2e9ce09e244))

## [4.4.0](https://github.com/Wykks/ngx-mapbox-gl/compare/v4.3.0...v4.4.0) (2020-02-09)

### Features

- **markers-for-cluster:** support dynamic cluster data change ([#209](https://github.com/Wykks/ngx-mapbox-gl/issues/209)) ([3e0ccad](https://github.com/Wykks/ngx-mapbox-gl/commit/3e0ccad381d585ef2d95052da748f7340ac36a54)), closes [#206](https://github.com/Wykks/ngx-mapbox-gl/issues/206)

## [4.3.0](https://github.com/Wykks/ngx-mapbox-gl/compare/v4.2.0...v4.3.0) (2019-12-06)

### Features

- add support for map controls localization (requires mapbox-gl >= 1.6.0) ([c669619](https://github.com/Wykks/ngx-mapbox-gl/commit/c6696197c93883855fc4d12e40acc88adaa5d546))

## [4.2.0](https://github.com/Wykks/ngx-mapbox-gl/compare/v4.1.0...v4.2.0) (2019-11-19)

### Features

- **mglGeolocate:** add 'geolocate' event output to component ([#193](https://github.com/Wykks/ngx-mapbox-gl/issues/193)) ([adb9382](https://github.com/Wykks/ngx-mapbox-gl/commit/adb93821483e2708b971bf7da972024afdcebd07))

## [4.1.0](https://github.com/Wykks/ngx-mapbox-gl/compare/v4.0.1...v4.1.0) (2019-10-23)

### Features

- add `clickTolerance` as an Input for MapComponent [#135](https://github.com/Wykks/ngx-mapbox-gl/issues/135) ([#190](https://github.com/Wykks/ngx-mapbox-gl/issues/190)) ([055f90e](https://github.com/Wykks/ngx-mapbox-gl/commit/055f90e976b12816e71a5bf038df34f9f3af588d))
- allow using mapbox-gl >= 1.1.0 ([80cdfab](https://github.com/Wykks/ngx-mapbox-gl/commit/80cdfabd9bec122d548498a7ac6569b7139dfb00))

### Bug Fixes

- make sure showcase works with TypeScript 3.5.3 ([cbaa95c](https://github.com/Wykks/ngx-mapbox-gl/commit/cbaa95caf4740c3958a9aa1361bbad8f246e53ab))

### [4.0.1](https://github.com/Wykks/ngx-mapbox-gl/compare/v4.0.0...v4.0.1) (2019-10-13)

### Bug Fixes

- **popup:** actually remove the popup from the map when a "feature" is used as an anchor ([89f4aa4](https://github.com/Wykks/ngx-mapbox-gl/commit/89f4aa4))

# [4.0.0](https://github.com/Wykks/ngx-mapbox-gl/compare/v3.3.0...v4.0.0) (2019-10-11)

### Bug Fixes

- **controls:** Fix control order when using custom controls alongside built-in controls (fix [#75](https://github.com/Wykks/ngx-mapbox-gl/issues/75)) ([10612f0](https://github.com/Wykks/ngx-mapbox-gl/commit/10612f0))
- **geocoder:** change property name for country option to countries ([781adc4](https://github.com/Wykks/ngx-mapbox-gl/commit/781adc4))

### Features

- update to angular 8 & other deps ([57f6d6e](https://github.com/Wykks/ngx-mapbox-gl/commit/57f6d6e))
- update to mapbox-gl 1.1.0 ([1043b4f](https://github.com/Wykks/ngx-mapbox-gl/commit/1043b4f))
- **marker:** Add ability to specify className (close [#172](https://github.com/Wykks/ngx-mapbox-gl/issues/172)) ([f7602c2](https://github.com/Wykks/ngx-mapbox-gl/commit/f7602c2))
- **popup:** Add support for className ([#111](https://github.com/Wykks/ngx-mapbox-gl/issues/111)) ([#161](https://github.com/Wykks/ngx-mapbox-gl/issues/161)) ([3b30c90](https://github.com/Wykks/ngx-mapbox-gl/commit/3b30c90))
- **popup:** Add support for maxWidth ([#180](https://github.com/Wykks/ngx-mapbox-gl/issues/180)) ([04d910b](https://github.com/Wykks/ngx-mapbox-gl/commit/04d910b))

### Refactor

- **marker:** remove old css hack (now fixed in mapbox-gl) (close [#114](https://github.com/Wykks/ngx-mapbox-gl/issues/114)) ([9864932](https://github.com/Wykks/ngx-mapbox-gl/commit/9864932))

### BREAKING CHANGES

- Update to angular 8. Drop support of Angular 7
  Also drop support of rxjs < 6.5.0
- Since mapbox-gl 1.0, there's a new pricing model.
  If you use mapbox services, please check https://github.com/mapbox/mapbox-gl-js/releases/tag/v1.0.0 for more info
- **marker:** You may be affected by this change, if you use html markers with custom css.

# [3.3.0](https://github.com/Wykks/ngx-mapbox-gl/compare/v3.2.0...v3.3.0) (2019-07-03)

### Bug Fixes

- **image:** Handle coordinate update correctly (close [#139](https://github.com/Wykks/ngx-mapbox-gl/issues/139))

### Features

- **controls:** added input for customAttributions to attribution-control directive ([c93e118](https://github.com/Wykks/ngx-mapbox-gl/commit/c93e118))
- **map:** support antialias option (close [#148](https://github.com/Wykks/ngx-mapbox-gl/issues/148)) ([b03d8f8](https://github.com/Wykks/ngx-mapbox-gl/commit/b03d8f8))
- **map:** support styleimagemissing event ([056b61f](https://github.com/Wykks/ngx-mapbox-gl/commit/056b61f))
- update mapbox-gl to 0.54.0 ([fcc0a58](https://github.com/Wykks/ngx-mapbox-gl/commit/fcc0a58))

# [3.2.0](https://github.com/Wykks/ngx-mapbox-gl/compare/v3.1.0...v3.2.0) (2019-06-08)

### Bug Fixes

- **map:** Add safety check for MapService.mapInstance before attempting to remove (close [#142](https://github.com/Wykks/ngx-mapbox-gl/issues/142)) ([cddeb2af](https://github.com/Wykks/ngx-mapbox-gl/commit/cddeb2af))

### Features

- expose MAPBOX_GEOCODER_API_KEY (close [#152](https://github.com/Wykks/ngx-mapbox-gl/issues/152)) ([67be0b4](https://github.com/Wykks/ngx-mapbox-gl/commit/67be0b4))
- **markers-for-cluster:** new component markers-for-cluster ([a5b97f6](https://github.com/Wykks/ngx-mapbox-gl/commit/a5b97f6))
- **geojson-source**: expose getClusterExpansionZoom getClusterChildren getClusterLeaves functions ([40bf0852](https://github.com/Wykks/ngx-mapbox-gl/commit/40bf0852))

Deprecate mgl-marker-cluster

# [3.1.0](https://github.com/Wykks/ngx-mapbox-gl/compare/v3.0.1...v3.1.0) (2019-04-07)

### Bug Fixes

- **map:** exposing error event data to directive output. ([#127](https://github.com/Wykks/ngx-mapbox-gl/issues/127)) ([a611858](https://github.com/Wykks/ngx-mapbox-gl/commit/a611858))

### Features

- **map:** add bounds input (new as mapbox-gl 0.53.0) ([157b28f](https://github.com/Wykks/ngx-mapbox-gl/commit/157b28f))
- update to mapbox-gl 0.53.1 and fix compilation errors ([#128](https://github.com/Wykks/ngx-mapbox-gl/issues/128)) ([ed6634c](https://github.com/Wykks/ngx-mapbox-gl/commit/ed6634c))
- **marker:** Add popupShown Input binding to marker.component ([#113](https://github.com/Wykks/ngx-mapbox-gl/issues/113)) ([1b0fed8](https://github.com/Wykks/ngx-mapbox-gl/commit/1b0fed8))

<a name="3.0.1"></a>

## [3.0.1](https://github.com/Wykks/ngx-mapbox-gl/compare/v3.0.0...v3.0.1) (2019-01-27)

### Bug Fixes

- correct package.json ([4a42008](https://github.com/Wykks/ngx-mapbox-gl/commit/4a42008))

<a name="3.0.0"></a>

# [3.0.0](https://github.com/Wykks/ngx-mapbox-gl/compare/v2.3.2...v3.0.0) (2019-01-27)

### Bug Fixes

- **layer:** use new interface MapLayerMouseEvent ([1a5f369](https://github.com/Wykks/ngx-mapbox-gl/commit/1a5f369)), closes [#89](https://github.com/Wykks/ngx-mapbox-gl/issues/89)
- **map:** add an additional setStyle() call (IE and Edge only) to prevent map loading issues on IE11 (see https://github.com/mapbox/mapbox-gl-js/issues/4821#issuecomment-358998674) ([#87](https://github.com/Wykks/ngx-mapbox-gl/issues/87)) ([4aa72dc](https://github.com/Wykks/ngx-mapbox-gl/commit/4aa72dc)), closes [/github.com/mapbox/mapbox-gl-js/issues/4821#issuecomment-358998674](https://github.com//github.com/mapbox/mapbox-gl-js/issues/4821/issues/issuecomment-358998674)
- **markerCluster:** update change after data change ([a71a79c](https://github.com/Wykks/ngx-mapbox-gl/commit/a71a79c)), closes [#71](https://github.com/Wykks/ngx-mapbox-gl/issues/71)

### build

- update angular & fix issues with newer ts ([9fc58ca](https://github.com/Wykks/ngx-mapbox-gl/commit/9fc58ca)), closes [#90](https://github.com/Wykks/ngx-mapbox-gl/issues/90)

### Features

- update mapbox-gl to 0.52.0 ([39a0f30](https://github.com/Wykks/ngx-mapbox-gl/commit/39a0f30))

### BREAKING CHANGES

- Now support angular >= 7.2

<a name="2.3.2"></a>

## [2.3.2](https://github.com/Wykks/ngx-mapbox-gl/compare/v2.3.1...v2.3.2) (2018-12-17)

### Bug Fixes

- **layer:** fix layer event not being binded ([b7fbb89](https://github.com/Wykks/ngx-mapbox-gl/commit/b7fbb89)), closes [#84](https://github.com/Wykks/ngx-mapbox-gl/issues/84)
- **map:** fitBounds: handle fitBounds at init ([d10ff55](https://github.com/Wykks/ngx-mapbox-gl/commit/d10ff55)), closes [#74](https://github.com/Wykks/ngx-mapbox-gl/issues/74)
- **map:** fitScreenCoordinates: handle fitScreenCoordinates at init ([1126410](https://github.com/Wykks/ngx-mapbox-gl/commit/1126410))

<a name="2.3.1"></a>

## [2.3.1](https://github.com/Wykks/ngx-mapbox-gl/compare/v2.3.0...v2.3.1) (2018-12-10)

<a name="2.3.0"></a>

# [2.3.0](https://github.com/Wykks/ngx-mapbox-gl/compare/v2.2.0...v2.3.0) (2018-12-09)

### Bug Fixes

- **geocoder:** workaround mapbox-gl-geocoder result issue firing twice ([857ab77](https://github.com/Wykks/ngx-mapbox-gl/commit/857ab77)), closes [#59](https://github.com/Wykks/ngx-mapbox-gl/issues/59)
- **mglImage:** re-add image when style change ([99a5bb7](https://github.com/Wykks/ngx-mapbox-gl/commit/99a5bb7)), closes [#76](https://github.com/Wykks/ngx-mapbox-gl/issues/76)

### Features

- Export control component, for custom control directives ([#79](https://github.com/Wykks/ngx-mapbox-gl/issues/79)) ([458c3f7](https://github.com/Wykks/ngx-mapbox-gl/commit/458c3f7)), closes [#78](https://github.com/Wykks/ngx-mapbox-gl/issues/78)
- update support to mapbox-gl 0.51 ([2dddec8](https://github.com/Wykks/ngx-mapbox-gl/commit/2dddec8))

<a name="2.2.0"></a>

# [2.2.0](https://github.com/Wykks/ngx-mapbox-gl/compare/v2.1.1...v2.2.0) (2018-10-09)

### Bug Fixes

- **control:** add safety check to ngOnDestroy ([5b63325](https://github.com/Wykks/ngx-mapbox-gl/commit/5b63325)), closes [#53](https://github.com/Wykks/ngx-mapbox-gl/issues/53)

### Features

- update support to mapbox-gl 0.49 ([f45d965](https://github.com/Wykks/ngx-mapbox-gl/commit/f45d965))

<a name="2.1.1"></a>

## [2.1.1](https://github.com/Wykks/ngx-mapbox-gl/compare/v2.1.0...v2.1.1) (2018-09-09)

<a name="2.1.0"></a>

# [2.1.0](https://github.com/Wykks/ngx-mapbox-gl/compare/v2.0.0...v2.1.0) (2018-09-09)

### Bug Fixes

- **clustering:** get correct viewport box ([a864d3f](https://github.com/Wykks/ngx-mapbox-gl/commit/a864d3f)), closes [#54](https://github.com/Wykks/ngx-mapbox-gl/issues/54)

### Features

- update support to mapbox-gl 0.48 ([063f67c](https://github.com/Wykks/ngx-mapbox-gl/commit/063f67c))
- **mglNavigation:** add showCompass & showZoom inputs ([b1428b0](https://github.com/Wykks/ngx-mapbox-gl/commit/b1428b0)), closes [#55](https://github.com/Wykks/ngx-mapbox-gl/issues/55)

<a name="2.0.0"></a>

# [2.0.0](https://github.com/Wykks/ngx-mapbox-gl/compare/v2.0.0-beta.0...v2.0.0) (2018-08-04)

### Bug Fixes

- re-add sources and layers after style change ([4c49629](https://github.com/Wykks/ngx-mapbox-gl/commit/4c49629)), closes [#43](https://github.com/Wykks/ngx-mapbox-gl/issues/43)
- **popup:** do not send open/close event when moving an opened popup ([2b6f712](https://github.com/Wykks/ngx-mapbox-gl/commit/2b6f712)), closes [#48](https://github.com/Wykks/ngx-mapbox-gl/issues/48)

### Features

- update mapbox-gl to 0.47.0 ([69739bf](https://github.com/Wykks/ngx-mapbox-gl/commit/69739bf))
- **popup:** add feature input ([df15d48](https://github.com/Wykks/ngx-mapbox-gl/commit/df15d48)), closes [#38](https://github.com/Wykks/ngx-mapbox-gl/issues/38)

### BREAKING CHANGES

- Update mapbox-gl to 0.47.0
- Deprecate mglDraggable on Marker (now supported by mapbox-gl directly)

<a name="2.0.0-beta.0"></a>

# [2.0.0-beta.0](https://github.com/Wykks/ngx-mapbox-gl/compare/v1.2.0...v2.0.0-beta.0) (2018-06-16)

### Features

- full upgrade to angular 6 (& rxjs 6) ([18577cf](https://github.com/Wykks/ngx-mapbox-gl/commit/18577cf))

### BREAKING CHANGES

- Now angular 6 compatible only

NgxMapboxGLModule.forRoot changed to NgxMapboxGLModule.withConfig

<a name="1.2.1-beta.0"></a>

## [1.2.1-beta.0](https://github.com/Wykks/ngx-mapbox-gl/compare/v1.2.0...v1.2.1-beta.0) (2018-06-16)

<a name="1.2.0"></a>

# [1.2.0](https://github.com/Wykks/ngx-mapbox-gl/compare/v1.1.0...v1.2.0) (2018-05-21)

### Bug Fixes

- **markerCluster:** run clustering inside NgZone ([e708040](https://github.com/Wykks/ngx-mapbox-gl/commit/e708040)), closes [#36](https://github.com/Wykks/ngx-mapbox-gl/issues/36)

### Features

- **geocoder:** add searchInput ([dfd1cd2](https://github.com/Wykks/ngx-mapbox-gl/commit/dfd1cd2)), closes [#37](https://github.com/Wykks/ngx-mapbox-gl/issues/37)
- **markerCluster:** expose supercluster by Ouput load event ([a87bd6f](https://github.com/Wykks/ngx-mapbox-gl/commit/a87bd6f))

<a name="1.1.0"></a>

# [1.1.0](https://github.com/Wykks/ngx-mapbox-gl/compare/v1.0.0...v1.1.0) (2018-05-11)

### Features

- update mapbox-gl to 0.45.0 ([339562c](https://github.com/Wykks/ngx-mapbox-gl/commit/339562c))
- **map:** add wheel event (from mapbox-gl v0.45.0) ([8daaebe](https://github.com/Wykks/ngx-mapbox-gl/commit/8daaebe))
- **marker:** add anchor input (new with mapbox-gl v0.45.0) ([e4920ad](https://github.com/Wykks/ngx-mapbox-gl/commit/e4920ad))
- **popup:** add open event (from mapbox-gl v0.45.0) ([c417d82](https://github.com/Wykks/ngx-mapbox-gl/commit/c417d82))
- **scaleControl:** unit is now dynamic (new with mapbox-gl v0.45.0) ([3d72ac0](https://github.com/Wykks/ngx-mapbox-gl/commit/3d72ac0))

<a name="1.0.0"></a>

# [1.0.0](https://github.com/Wykks/ngx-mapbox-gl/compare/v1.0.0-rc.3...v1.0.0) (2018-05-01)

### Bug Fixes

- **marker:** remove line-height as it can incorrectly change the height (thus the position) of a marker ([550f665](https://github.com/Wykks/ngx-mapbox-gl/commit/550f665))

### Code Refactoring

- **map:** rename flyToOptions to movingOptions ([5bd8982](https://github.com/Wykks/ngx-mapbox-gl/commit/5bd8982))

### Features

- **draggable:** support draggable on Marker! ([8aa02a8](https://github.com/Wykks/ngx-mapbox-gl/commit/8aa02a8))
- **map:** add panToOptions ([171957b](https://github.com/Wykks/ngx-mapbox-gl/commit/171957b))

### BREAKING CHANGES

- **map:** Rename flyToOptions to movingOptions

<a name="1.0.0-rc.3"></a>

# [1.0.0-rc.3](https://github.com/Wykks/ngx-mapbox-gl/compare/v1.0.0-rc.2...v1.0.0-rc.3) (2018-04-05)

### Features

- **markerCluster:** expose getChildren, getLeaves, getClusterExpansionZoom methods ([11a0604](https://github.com/Wykks/ngx-mapbox-gl/commit/11a0604))

<a name="1.0.0-rc.2"></a>

# [1.0.0-rc.2](https://github.com/Wykks/ngx-mapbox-gl/compare/v1.0.0-rc.1...v1.0.0-rc.2) (2018-03-18)

### Bug Fixes

- **geojsonSource:** add missing input ([#23](https://github.com/Wykks/ngx-mapbox-gl/issues/23)) ([a38d06e](https://github.com/Wykks/ngx-mapbox-gl/commit/a38d06e))
- update mapbox-gl to 0.44.1 ([814fc3a](https://github.com/Wykks/ngx-mapbox-gl/commit/814fc3a))
- **map:** wait for map created before handling changes ([87a5da9](https://github.com/Wykks/ngx-mapbox-gl/commit/87a5da9))

### Features

- new control mglGeocoder
- **public_api:** Expose MapComponent ([74d3886](https://github.com/Wykks/ngx-mapbox-gl/commit/74d3886))

<a name="1.0.0-rc.1"></a>

# [1.0.0-rc.1](https://github.com/Wykks/ngx-mapbox-gl/compare/v1.0.0-rc.0...v1.0.0-rc.1) (2018-02-11)

### Bug Fixes

- **popup:** now easier to use ([1ca82c1](https://github.com/Wykks/ngx-mapbox-gl/commit/1ca82c1))

### Features

- **draggable:** add drag event emitters

<a name="1.0.0-rc.0"></a>

# [1.0.0-rc.0](https://github.com/Wykks/ngx-mapbox-gl/compare/v1.0.0-beta.5...v1.0.0-rc.0) (2018-01-28)

### Bug Fixes

- **draggable:** works again ([9ae98df](https://github.com/Wykks/ngx-mapbox-gl/commit/9ae98df))
- **markerCluster:** include custom supercluster version ([6ad4526](https://github.com/Wykks/ngx-mapbox-gl/commit/6ad4526))
- custom control ignored a supplied position ([3253776](https://github.com/Wykks/ngx-mapbox-gl/commit/3253776))

### Features

- expose MapService for ngx-mapbox-gl extensions ([908b8fe](https://github.com/Wykks/ngx-mapbox-gl/commit/908b8fe)), closes [#19](https://github.com/Wykks/ngx-mapbox-gl/issues/19)

<a name="1.0.0-beta.5"></a>

# [1.0.0-beta.5](https://github.com/Wykks/ngx-mapbox-gl/compare/v1.0.0-beta.4...v1.0.0-beta.5) (2018-01-16)

<a name="1.0.0-beta.4"></a>

# [1.0.0-beta.4](https://github.com/Wykks/ngx-mapbox-gl/compare/v1.0.0-beta.3...v1.0.0-beta.4) (2018-01-16)

### Bug Fixes

- **map:** add display block :man_facepalming: ([9f40d12](https://github.com/Wykks/ngx-mapbox-gl/commit/9f40d12)), closes [#11](https://github.com/Wykks/ngx-mapbox-gl/issues/11)
- **map:** ensure layer are removed before source ([9779693](https://github.com/Wykks/ngx-mapbox-gl/commit/9779693)), closes [#10](https://github.com/Wykks/ngx-mapbox-gl/issues/10)
- corrected type definitons ([853e4de](https://github.com/Wykks/ngx-mapbox-gl/commit/853e4de))

### build

- deps upgrade ([2879c5d](https://github.com/Wykks/ngx-mapbox-gl/commit/2879c5d))

### Features

- **cluster:** add clusterComponent! ([1cb6daa](https://github.com/Wykks/ngx-mapbox-gl/commit/1cb6daa))

### Performance Improvements

- also buffer popup and images to remove ([2534739](https://github.com/Wykks/ngx-mapbox-gl/commit/2534739))

### BREAKING CHANGES

- Update to mapbox-gl 0.43.0

<a name="1.0.0-beta.3"></a>

# [1.0.0-beta.3](https://github.com/Wykks/ngx-mapbox-gl/compare/v1.0.0-beta.2...v1.0.0-beta.3) (2017-12-18)

### Bug Fixes

- add guard to ngOnDestroy of each components ([311cbb9](https://github.com/Wykks/ngx-mapbox-gl/commit/311cbb9))
- use rxjs lettable operators ([73530cd](https://github.com/Wykks/ngx-mapbox-gl/commit/73530cd))
- **image:** add a loaded event ([32c4557](https://github.com/Wykks/ngx-mapbox-gl/commit/32c4557))
- **map:** implement fitBounds ([0234881](https://github.com/Wykks/ngx-mapbox-gl/commit/0234881))
- **map:** wait for onStable before initializing mapbox-gl ([ebc2fe9](https://github.com/Wykks/ngx-mapbox-gl/commit/ebc2fe9))

### build

- update deps ([9f42a60](https://github.com/Wykks/ngx-mapbox-gl/commit/9f42a60))

### Performance Improvements

- **map, layer:** only listen observed event ([57bd275](https://github.com/Wykks/ngx-mapbox-gl/commit/57bd275))

### BREAKING CHANGES

- rxjs >=5.5.0 is now required
- Now require angular 5 (sorry !)

<a name="1.0.0-beta.2"></a>

# [1.0.0-beta.2](https://github.com/Wykks/ngx-mapbox-gl/compare/v1.0.0-beta.1...v1.0.0-beta.2) (2017-11-20)

### Bug Fixes

- **geojsonSource:** protect onDestroy ([ac8172e](https://github.com/Wykks/ngx-mapbox-gl/commit/ac8172e)), closes [#6](https://github.com/Wykks/ngx-mapbox-gl/issues/6)
- **image:** addImage seems to need to wait for mapLoaded now ([cd51115](https://github.com/Wykks/ngx-mapbox-gl/commit/cd51115))
- **layer:** type is not optional ([b9edaac](https://github.com/Wykks/ngx-mapbox-gl/commit/b9edaac)), closes [#4](https://github.com/Wykks/ngx-mapbox-gl/issues/4)
- **map:** rename zoomChange and pitchChange events ([0142f88](https://github.com/Wykks/ngx-mapbox-gl/commit/0142f88))
- **map:** zoom/bearing/pitch inputs are now an array ([0c19c5f](https://github.com/Wykks/ngx-mapbox-gl/commit/0c19c5f)), closes [#2](https://github.com/Wykks/ngx-mapbox-gl/issues/2)

### Features

- update to mapbox-gl 0.42.0 ([3ae818f](https://github.com/Wykks/ngx-mapbox-gl/commit/3ae818f))

### BREAKING CHANGES

- **map:** zoom/bearing/pitch inputs are now an array.
  This allow to force input changes for theses inputs
- **map:** Rename zoomChange and pitchChange events to zoomEvt and pitchEvt, because the "Change" suffix allow incorrecty two-way binding.

<a name="1.0.0-beta.1"></a>

# [1.0.0-beta.1](https://github.com/Wykks/ngx-mapbox-gl/compare/v1.0.0-beta.0...v1.0.0-beta.1) (2017-11-15)

### Bug Fixes

- remove accidentally added [@turf](https://github.com/turf)/random from deps... [skip ci](<[642f60c](https://github.com/Wykks/ngx-mapbox-gl/commit/642f60c)>)

<a name="1.0.0-beta.0"></a>

# [1.0.0-beta.0](https://github.com/Wykks/ngx-mapbox-gl/compare/v0.1.0-beta.0...v1.0.0-beta.0) (2017-11-14)

### Bug Fixes

- **canvas:** remove contextType ([3ca702c](https://github.com/Wykks/ngx-mapbox-gl/commit/3ca702c))
- **geojsonSource:** adjust cluster input type ([4ae0151](https://github.com/Wykks/ngx-mapbox-gl/commit/4ae0151))
- use AsyncSubject for internal load event ([456013a](https://github.com/Wykks/ngx-mapbox-gl/commit/456013a))
- **geojsonSource:** fill data with empty FeatureCollection ([a8df1cd](https://github.com/Wykks/ngx-mapbox-gl/commit/a8df1cd))
- **map:** customMapboxApiUrl now correctly set API_URL ([ef295a3](https://github.com/Wykks/ngx-mapbox-gl/commit/ef295a3))
- **map:** remove duplicate load event listener ([c92da66](https://github.com/Wykks/ngx-mapbox-gl/commit/c92da66))
- **marker:** set offset as optionnal ([4f60ce1](https://github.com/Wykks/ngx-mapbox-gl/commit/4f60ce1))

### Features

- **layer:** add mouseMove event ([45f99ff](https://github.com/Wykks/ngx-mapbox-gl/commit/45f99ff))
- emit map instance on load output ([17e9fe2](https://github.com/Wykks/ngx-mapbox-gl/commit/17e9fe2))
- **map:** add cursorStyle input ([3848618](https://github.com/Wykks/ngx-mapbox-gl/commit/3848618))
- **popup:** add close output ([7e93c5a](https://github.com/Wykks/ngx-mapbox-gl/commit/7e93c5a))

### BREAKING CHANGES

- MapComponent is no longer exposed in the package
- **canvas:** remove contextType

<a name="0.1.0-beta.0"></a>

# [0.1.0-beta.0](https://github.com/Wykks/ngx-mapbox-gl/compare/v0.1.0-alpha.2...v0.1.0-beta.0) (2017-10-29)

### Features

- feature draggable directive + example ([1166346](https://github.com/Wykks/ngx-mapbox-gl/commit/1166346))

<a name="0.1.0-alpha.2"></a>

# [0.1.0-alpha.2](https://github.com/Wykks/ngx-mapbox-gl/compare/v0.1.0-alpha.1...v0.1.0-alpha.2) (2017-10-19)

### Bug Fixes

- **map:** run output event inside ngZone ([66f2caf](https://github.com/Wykks/ngx-mapbox-gl/commit/66f2caf))
- **sources:** add a guard to ensure that the source is added before onChanges ([64f3f97](https://github.com/Wykks/ngx-mapbox-gl/commit/64f3f97))

### Features

- **layer:** add click/mouseEnter/mouseLeave Output ([2dbabf4](https://github.com/Wykks/ngx-mapbox-gl/commit/2dbabf4))

<a name="0.1.0-alpha.1"></a>

# [0.1.0-alpha.1](https://github.com/Wykks/ngx-mapbox-gl/compare/v0.1.0-alpha.0...v0.1.0-alpha.1) (2017-10-18)

### Bug Fixes

- remove protractor-browser-logs from depenencies ([52afa55](https://github.com/Wykks/ngx-mapbox-gl/commit/52afa55))

<a name="0.1.0-alpha.0"></a>

# 0.1.0-alpha.0 (2017-10-18)

First release !
