import { NgModule } from '@angular/core';
import { MatIconModule, MatIconRegistry } from '@angular/material/icon';
import { BrowserModule, DomSanitizer } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { NgxMapboxGLModule } from 'ngx-mapbox-gl';
import { LayoutModule } from '../shared/layout/layout.module';
import { APP_ROUTES } from './routes';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,

    MatIconModule,

    RouterModule.forRoot(APP_ROUTES, { relativeLinkResolution: 'legacy' }),
    NgxMapboxGLModule.withConfig({
      accessToken:
        'pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4M29iazA2Z2gycXA4N2pmbDZmangifQ.-g_vE53SD2WrJ6tFX7QHmA',
    }),

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
