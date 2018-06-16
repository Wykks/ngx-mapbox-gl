import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatPaginatorModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatSidenavModule,
  MatSlideToggleModule,
  MatToolbarModule
} from '@angular/material';
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
  NgxMapboxGLModule
];

@NgModule({
  imports: Modules,
  exports: Modules
})
export class SharedModule { }
