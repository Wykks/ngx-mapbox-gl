import { NgModule } from '@angular/core';
import { MatIconModule, MatIconRegistry } from '@angular/material/icon';
import { BrowserModule, DomSanitizer } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { NgxMapLibreGLModule } from 'projects/ngx-maplibre-gl/src/public_api';
import { LayoutModule } from '../shared/layout/layout.module';
import { APP_ROUTES } from './routes';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,

    MatIconModule,

    RouterModule.forRoot(APP_ROUTES, { relativeLinkResolution: 'legacy' }),
    NgxMapLibreGLModule,
    LayoutModule,
  ],
  exports: [],
  providers: [],
})
export class CoreModule {
  constructor(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer) {
    iconRegistry.addSvgIcon(
      'ngx-mapbox-gl',
      sanitizer.bypassSecurityTrustResourceUrl('assets/ngx-mapbox-gl.svg')
    );
    iconRegistry.addSvgIcon(
      'ngx-mapbox-gl-red',
      sanitizer.bypassSecurityTrustResourceUrl('assets/ngx-mapbox-gl-red.svg')
    );
    iconRegistry.addSvgIcon(
      'github',
      sanitizer.bypassSecurityTrustResourceUrl('assets/github.svg')
    );
  }
}
