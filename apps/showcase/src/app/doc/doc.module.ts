import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgModule, SecurityContext } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatLegacyFormFieldModule as MatFormFieldModule } from '@angular/material/legacy-form-field';
import { MatLegacySelectModule as MatSelectModule } from '@angular/material/legacy-select';
import { RouterModule, Routes } from '@angular/router';
import { MarkdownModule } from 'ngx-markdown';
import 'prismjs/components/prism-typescript.min.js';
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
    HttpClientModule,
    MarkdownModule.forRoot({
      loader: HttpClient,
      sanitize: SecurityContext.NONE,
    }),
    MatFormFieldModule,
    MatSelectModule,

    LayoutModule,
  ],
  declarations: [DocComponent],
})
export class DocModule {}
