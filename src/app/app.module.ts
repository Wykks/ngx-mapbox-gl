import { DemoModule } from './demo/module';
import { RouterModule, Routes } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NgxMapboxGLModule } from './lib/lib.module';
import { LayoutComponent as DemoLayoutComponent } from './demo/layout/layout.component';

const appRoutes: Routes = [
  {
    path: '',
    component: DemoLayoutComponent,
    pathMatch: 'full'
  },
  // { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    NgxMapboxGLModule,
    DemoModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
