import { HttpClient } from '@angular/common/http';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  NgZone,
  OnDestroy,
  ViewChild,
} from '@angular/core';
import { select, Store } from '@ngrx/store';
import StackBlitzSDK from '@stackblitz/sdk';
import { VM } from '@stackblitz/sdk/typings/VM';
import { Dictionary } from 'lodash';
import { AsyncSubject, forkJoin, from, Observable, Subscription, combineLatest } from 'rxjs';
import { filter, shareReplay, switchMap, tap } from 'rxjs/operators';
import { State } from '../../app.module';
import * as fromShowcase from '../../app.selectors';
import { DemoFileLoaderService } from '../demo-file-loader.service';

@Component({
  template: `
    <div #container></div>
    <div *ngIf="loading" class="loader">
      <mat-spinner></mat-spinner>
      <div></div>
    </div>
  `,
  styles: [
    `
      :host {
        display: flex;
        flex: 1;
        position: relative;
      }
      :host ::ng-deep iframe {
        height: 100%;
        width: 100%;
        border: 0;
      }
      .loader {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StackblitzEditComponent implements AfterViewInit, OnDestroy {
  @ViewChild('container', { static: true }) stackblitzContainer: ElementRef;

  loading: boolean;

  private sub: Subscription;
  private projectbase$: Observable<string[]>;

  private afterViewInit = new AsyncSubject<void>();
  private vm: VM;

  constructor(
    private http: HttpClient,
    private zone: NgZone,
    private store: Store<State>,
    private DemoFileLoaderService: DemoFileLoaderService,
    private ChangeDetectorRef: ChangeDetectorRef
  ) {
    this.projectbase$ = forkJoin([
      this.http.get('assets/stackblitz/main.notts', {
        responseType: 'text',
      }),
      this.http.get('assets/stackblitz/angular.json', {
        responseType: 'text',
      }),
    ]).pipe(shareReplay(1));

    this.sub = combineLatest([
      this.store.pipe(select(fromShowcase.getCurrentRouterState)),
      this.store.pipe(select(fromShowcase.isDemoEditing)),
    ])
      .pipe(
        filter(([, isDemoEditing]) => isDemoEditing),
        tap(() => {
          this.loading = true;
          this.ChangeDetectorRef.markForCheck();
        }),
        switchMap(([state]) =>
          forkJoin([this.projectbase$, this.DemoFileLoaderService.getDemoFiles(state.params.demoUrl)])
        ),
        switchMap(([projectbase, demoFiles]) => from(this.openExample(projectbase, demoFiles))),
        tap(() => {
          this.loading = false;
          this.ChangeDetectorRef.markForCheck();
        })
      )
      .subscribe({
        error: () => {
          this.loading = false;
          this.ChangeDetectorRef.markForCheck();
        },
      });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  ngAfterViewInit() {
    this.afterViewInit.complete();
  }

  private async openExample(projectbase: string[], demoFiles: Dictionary<string>) {
    await this.afterViewInit.toPromise();
    if (this.vm) {
      await this.vm.applyFsDiff({
        create: demoFiles,
        destroy: [],
      });
      return;
    }
    const project = {
      files: {
        'src/main.ts': projectbase[0],
        'angular.json': projectbase[1],
        'src/index.html': '<showcase-demo></showcase-demo>',
        'src/styles.css': `
html, body {
  display: flex;
  flex: 1;
  min-height: 100vh;
  margin: 0;
}
`,
        'src/polyfills.ts': `
import 'core-js/es6/reflect';
import 'core-js/es7/reflect';
import 'zone.js/dist/zone';
`,
        ...demoFiles,
      },
      title: '',
      description: '',
      template: 'angular-cli',
      dependencies: {
        tslib: '*',
        'mapbox-gl': '0.52.0', // There an issue with 0.53.0
        'ngx-mapbox-gl': '*',
        '@angular/cdk': '*',
        '@angular/material': '*',
        '@angular/animations': '*',
        '@angular/forms': '*',
        url: '*',
        querystring: '*',
        events: '*',
        '@types/mapbox-gl': '*',
        '@types/supercluster': '*',
        '@types/geojson': '*',
      },
    };
    await this.zone.runOutsideAngular(async () => {
      this.vm = await StackBlitzSDK.embedProject(this.stackblitzContainer.nativeElement, project, {
        hideExplorer: true,
        hideNavigation: true,
        forceEmbedLayout: true,
        openFile: 'src/demo.ts',
      });
    });
  }
}
