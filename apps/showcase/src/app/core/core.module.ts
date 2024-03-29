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

    RouterModule.forRoot(APP_ROUTES),
    NgxMapboxGLModule.withConfig({
      accessToken:
        'pk.eyJ1IjoiZXhhbXBsZXMiLCJhIjoiY2p0MG01MXRqMW45cjQzb2R6b2ptc3J4MSJ9.zA2W0IkI0c6KaAhJfk9bWg',
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
