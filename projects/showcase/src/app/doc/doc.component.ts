import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

export const VERSIONS = ['master'];

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
    <markdown [src]="docUrl"></markdown>
  `,
  styles: [
    `
      :host {
        display: flex;
        flex: 1;
        overflow: auto;
        justify-content: center;
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
  currentVersion = 'master';
  docUrl: string;

  ngOnInit() {
    this.updateDocUrl();
  }

  updateDocUrl() {
    this.docUrl = `https://raw.githubusercontent.com/maplibre/ngx-maplibre-gl/${this.currentVersion}/docs/API.md`;
  }
}
