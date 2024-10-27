import { Project } from '@stackblitz/sdk/typings/interfaces';

export const createStackblitzProject = (
  projectbase: string[],
  demoFiles: Record<string, string>
  // eslint-disable-next-line arrow-body-style
): Project => {
  return {
    files: {
      'src/main.ts': projectbase[0],
      'angular.json': projectbase[1],
      'src/index.html': '<showcase-demo></showcase-demo>',
      'src/styles.css': `
html, body {
  display: flex;
  flex: 1;
  min-height: 100vh;
  margin: 0;
}
`,
      'src/polyfills.ts': `
import 'zone.js';
(window as any).global = window;
`,
      ...demoFiles,
    },
    title: '',
    description: '',
    template: 'angular-cli',
    dependencies: {
      tslib: '*',
      'mapbox-gl': '*',
      'ngx-mapbox-gl': '*',
      '@angular/cdk': '*',
      '@angular/material': '*',
      '@angular/animations': '*',
      '@angular/forms': '*',
      url: '*',
      querystring: '*',
      events: '*',
      '@types/supercluster': '*',
      '@types/geojson': '*',
    },
  };
};
