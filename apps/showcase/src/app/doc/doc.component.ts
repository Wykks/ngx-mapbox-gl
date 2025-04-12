import {
  ChangeDetectionStrategy,
  Component,
  computed,
  signal,
  inject,
} from '@angular/core';
import {
  MarkdownComponent,
  MARKED_OPTIONS,
  MarkedRenderer,
  provideMarkdown,
  type MarkedOptions,
} from 'ngx-markdown';
import { LayoutToolbarMenuComponent } from '../shared/layout/layout-toolbar-menu.component';
import { MatFormField } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import type { Tokens } from 'marked';
import { httpResource } from '@angular/common/http';

export function markedOptionsFactory(): MarkedOptions {
  const renderer = new MarkedRenderer();

  renderer.heading = ({ text, depth }: Tokens.Heading) => {
    if (depth !== 1) {
      return `<h${depth}>${text}</h${depth}>`;
    }
    const escapedText = text
      .toLowerCase()
      .match(/^(.*?[^<]+).*$/)?.[1]
      .trim()
      .replace(/[^\w]+/g, '-');
    return `<h${depth} id="${escapedText}"><a href="doc#${escapedText}" class="anchor"><span class="material-icons">link</span></a>${text}</h${depth}>`;
  };

  return {
    renderer: renderer,
    gfm: true,
    breaks: false,
    pedantic: false,
  };
}

@Component({
  template: `
    <showcase-layout-toolbar-menu position="right">
      <mat-form-field subscriptSizing="dynamic">
        <mat-select
          [(ngModel)]="currentVersion"
        >
          @for (version of versions(); track version) {
            <mat-option [value]="version">
            {{ version }}
          </mat-option>
          }
        </mat-select>
      </mat-form-field>
    </showcase-layout-toolbar-menu>
    <markdown [src]="docUrl()" (load)="scrollToId()" />
  `,
  styles: [
    `
      :host {
        display: flex;
        flex: 1;
        overflow: auto;
        justify-content: center;
      }

      :host ::ng-deep .anchor {
        visibility: hidden;
        display: inline-flex;
        text-decoration: none;
        vertical-align: middle;
        margin-left: -26px;
        padding-right: 2px;
      }

      :host ::ng-deep h1:hover .anchor {
        visibility: visible;
      }

      markdown {
        margin: 8px;
        width: 60%;
      }
    `,
  ],
  providers: [
    provideMarkdown({
      markedOptions: {
        provide: MARKED_OPTIONS,
        useFactory: markedOptionsFactory,
      },
    }),
  ],
  imports: [
    MarkdownComponent,
    LayoutToolbarMenuComponent,
    MatFormField,
    MatSelectModule,
    FormsModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DocComponent {
  private tagsResource = httpResource<{ name: string }[]>(
    'https://api.github.com/repos/Wykks/ngx-mapbox-gl/tags'
  );

  versions = computed(() => {
    const value = this.tagsResource.value();
    if (this.tagsResource.isLoading() || this.tagsResource.error() || !value) {
      return ['main'];
    }

    const filteredTags = value
      .map((tag) => tag.name)
      .filter((tagName) => {
        if (!tagName.startsWith('v')) return false;

        const versionMatch = tagName.match(/^v(\d+)\./);
        if (!versionMatch) return false;

        const majorVersion = parseInt(versionMatch[1], 10);
        return !isNaN(majorVersion) && majorVersion >= 5;
      });

    return ['main', ...filteredTags];
  });

  currentVersion = signal('main');

  docUrl = computed(
    () =>
      `https://raw.githubusercontent.com/Wykks/ngx-mapbox-gl/${this.currentVersion()}/docs/API.md`
  );

  scrollToId() {
    const id = location.hash.substring(1);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView();
    }
  }
}
