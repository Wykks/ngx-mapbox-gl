import { CommonModule } from '@angular/common';
import {
  HttpClient,
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { NgModule, SecurityContext } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
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
  declarations: [DocComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(DOC_ROUTES),
    FormsModule,
    MarkdownModule.forRoot({
      loader: HttpClient,
      sanitize: SecurityContext.NONE,
    }),
    MatFormFieldModule,
    MatSelectModule,
    LayoutModule,
  ],
  providers: [provideHttpClient(withInterceptorsFromDi())],
})
export class DocModule {}
