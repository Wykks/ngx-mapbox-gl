import type { Project } from '@stackblitz/sdk';
// eslint-disable-next-line @nx/enforce-module-boundaries
import projectJson from '../../../../../../package.json';

const deps = projectJson.dependencies;
const devDeps = projectJson.devDependencies;

export const createStackblitzProject = (
  projectbase: string[],
  demoFiles: Record<string, string>,
): Project => {
  return {
    files: {
      'src/main.ts': `
import { bootstrapApplication } from '@angular/platform-browser';
import { provideZonelessChangeDetection } from '@angular/core';
import { provideMapboxGL } from 'ngx-mapbox-gl';
import * as demo from './demo';

const demoArray = Object.values(demo);
bootstrapApplication(demoArray[demoArray.length - 1], {
  providers: [
    provideZonelessChangeDetection(),
    provideMapboxGL({
      accessToken:
        'pk.eyJ1Ijoid3lra3NzIiwiYSI6ImNqMjR6aTdmdzAwNHMzMnBvbjBucjlqNm8ifQ.6GjGpofWBVaIuSnhdXQb5w',
    }),
  ],
});
      `,
      'angular.json': projectbase[0],
      'src/index.html': '<showcase-demo></showcase-demo>',
      'src/styles.css': `
html, body {
  display: flex;
  flex: 1;
  min-height: 100vh;
  margin: 0;
}
`,
      ...demoFiles,
    },
    title: '',
    description: '',
    template: 'angular-cli',
    dependencies: {
      tslib: devDeps['tslib'],
      'mapbox-gl': deps['mapbox-gl'],
      'ngx-mapbox-gl': projectJson.version,
      '@angular/cdk': deps['@angular/cdk'],
      '@angular/material': deps['@angular/material'],
      '@angular/animations': deps['@angular/animations'],
      '@angular/forms': deps['@angular/forms'],
      '@angular/common': deps['@angular/common'],
      '@angular/compiler': deps['@angular/compiler'],
      '@angular/core': deps['@angular/core'],
      '@angular/platform-browser': deps['@angular/platform-browser'],
      '@angular-devkit/build-angular': devDeps['@angular-devkit/build-angular'],
      '@angular/cli': devDeps['@angular/cli'],
      '@angular/compiler-cli': devDeps['@angular/compiler-cli'],
      '@types/geojson': devDeps['@types/geojson'],
      typescript: devDeps['typescript'],
    },
  };
};
