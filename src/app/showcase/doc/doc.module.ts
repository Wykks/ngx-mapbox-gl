import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MarkdownModule } from 'ngx-md';
import { SharedModule } from '../shared.module';
import { DocComponent } from './doc.component';

const DOC_ROUTES: Routes = [
  {
    path: '',
    component: DocComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    MarkdownModule,
    RouterModule.forChild(DOC_ROUTES)
  ],
  declarations: [DocComponent]
})
export class DocModule { }
