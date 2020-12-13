import { PortalModule } from '@angular/cdk/portal';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import { LayoutToolbarMenuComponent } from './layout-toolbar-menu.component';
import { LayoutComponent } from './layout.component';

const PUBLIC_DECLARATIONS = [LayoutComponent, LayoutToolbarMenuComponent];

@NgModule({
  declarations: PUBLIC_DECLARATIONS,
  imports: [
    CommonModule,
    RouterModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    PortalModule,
  ],
  exports: PUBLIC_DECLARATIONS,
  providers: [],
})
export class LayoutModule {}
