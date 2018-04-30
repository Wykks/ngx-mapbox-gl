import { NgModule } from '@angular/core';
import { SharedModule } from '../shared.module';
import { HomeIndexComponent } from './home-index.component';
import { Routes } from '@angular/router';

export const HOME_ROUTES: Routes = [
  {
    path: '',
    component: HomeIndexComponent
  }
];

@NgModule({
  imports: [
    SharedModule
  ],
  exports: [],
  declarations: [HomeIndexComponent],
  providers: [],
})
export class HomeModule {

}
