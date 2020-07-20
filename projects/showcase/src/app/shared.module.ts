import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatRadioModule } from '@angular/material/radio';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NgxMapboxGLModule } from 'ngx-mapbox-gl';

const Modules = [
  CommonModule,
  HttpClientModule,
  MatRadioModule,
  MatButtonToggleModule,
  MatButtonModule,
  MatListModule,
  MatToolbarModule,
  MatCardModule,
  MatSlideToggleModule,
  MatProgressSpinnerModule,
  MatInputModule,
  MatIconModule,
  MatSidenavModule,
  MatPaginatorModule,
  FormsModule,
  NgxMapboxGLModule,
];

@NgModule({
  imports: Modules,
  exports: Modules,
})
export class SharedModule {}
