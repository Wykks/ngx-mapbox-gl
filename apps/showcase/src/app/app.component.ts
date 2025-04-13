import { Component, inject } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'showcase-root',
  template: `<router-outlet />`,
  imports: [RouterOutlet],
})
export class AppComponent {
  private readonly iconRegistry = inject(MatIconRegistry);
  private readonly sanitizer = inject(DomSanitizer);

  constructor() {
    this.iconRegistry.addSvgIcon(
      'ngx-mapbox-gl',
      this.sanitizer.bypassSecurityTrustResourceUrl('ngx-mapbox-gl.svg'),
    );
    this.iconRegistry.addSvgIcon(
      'ngx-mapbox-gl-red',
      this.sanitizer.bypassSecurityTrustResourceUrl('ngx-mapbox-gl-red.svg'),
    );
    this.iconRegistry.addSvgIcon(
      'github',
      this.sanitizer.bypassSecurityTrustResourceUrl('github.svg'),
    );
  }
}
