import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { NgxMapboxGLModule } from 'ngx-mapbox-gl';
import { HomeIndexComponent } from './home-index.component';

@NgModule({
  declarations: [HomeIndexComponent],
  imports: [NgxMapboxGLModule, MatIconModule],
  exports: [HomeIndexComponent],
})
export class HomeModule {}
