import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { RouterModule, Routes } from '@angular/router';
import { NgxMdModule } from 'ngx-md';
import 'prismjs/components/prism-typescript';
import 'prismjs/prism';
import { LayoutModule } from '../shared/layout/layout.module';
import { DocComponent } from './doc.component';

const DOC_ROUTES: Routes = [
  {
    path: '',
    component: DocComponent,
  },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(DOC_ROUTES),
    FormsModule,

    NgxMdModule.forRoot(),

    MatFormFieldModule,
    MatSelectModule,

    LayoutModule,
  ],
  declarations: [DocComponent],
})
export class DocModule {}
