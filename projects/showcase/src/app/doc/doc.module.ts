import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NgxMdModule } from 'ngx-md';
import { SharedModule } from '../shared.module';
import { DocComponent } from './doc.component';
import 'prismjs/prism';
import 'prismjs/components/prism-typescript';

const DOC_ROUTES: Routes = [
  {
    path: '',
    component: DocComponent,
  },
];

@NgModule({
  imports: [CommonModule, SharedModule, NgxMdModule.forRoot(), RouterModule.forChild(DOC_ROUTES)],
  declarations: [DocComponent],
})
export class DocModule {}
