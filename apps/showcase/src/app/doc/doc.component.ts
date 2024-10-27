import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MarkdownService } from 'ngx-markdown';

export const VERSIONS = ['main'];

@Component({
  template: `
    <showcase-layout-toolbar-menu position="right">
      <mat-form-field>
        <mat-select
          [(ngModel)]="currentVersion"
          (ngModelChange)="updateDocUrl()"
        >
          <mat-option *ngFor="let version of VERSIONS" [value]="version">
            {{ version }}
          </mat-option>
        </mat-select>
      </mat-form-field>
    </showcase-layout-toolbar-menu>
    <markdown [src]="docUrl" (load)="scrollToId()"></markdown>
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
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DocComponent implements OnInit {
  VERSIONS = VERSIONS;
  currentVersion = 'main';
  docUrl: string;

  constructor(private markdownService: MarkdownService) {}

  ngOnInit() {
    // @ts-ignore
    this.markdownService.renderer.heading = (text: string, level: number) => {
      if (level !== 1) {
        return `<h${level}>${text}</h${level}>`;
      }
      const escapedText = text
        .toLowerCase()
        .match(/^(.*?[^<]+).*$/)?.[1]
        .trim()
        .replace(/[^\w]+/g, '-');
      return `<h${level} id="${escapedText}"><a href="doc#${escapedText}" class="anchor"><span class="material-icons">link</span></a>${text}</h${level}>`;
    };
    this.updateDocUrl();
  }

  updateDocUrl() {
    this.docUrl = `https://raw.githubusercontent.com/Wykks/ngx-mapbox-gl/${this.currentVersion}/docs/API.md`;
  }

  scrollToId() {
    const id = location.hash.substring(1);
    document.getElementById(id)?.scrollIntoView();
  }
}
