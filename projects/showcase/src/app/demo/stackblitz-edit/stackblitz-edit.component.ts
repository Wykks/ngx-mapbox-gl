import { HttpClient } from '@angular/common/http';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  NgZone,
  OnDestroy,
  ViewChild
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
    <div *ngIf="loading" class="loader"><mat-spinner></mat-spinner><div>
  `,
  styles: [`
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
      transform: translate(-50%,-50%);
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StackblitzEditComponent implements AfterViewInit, OnDestroy {
  @ViewChild('container') stackblitzContainer: ElementRef;

  loading: boolean;

  private sub: Subscription;
  private base$: Observable<string>;

  private afterViewInit = new AsyncSubject<void>();
  private vm: VM;

  constructor(
    private http: HttpClient,
    private zone: NgZone,
    private store: Store<State>,
    private DemoFileLoaderService: DemoFileLoaderService,
    private ChangeDetectorRef: ChangeDetectorRef
  ) {
    this.base$ = this.http.get('assets/stackblitz-base.txt', {
      responseType: 'text'
    }).pipe(shareReplay(1));

    this.sub = combineLatest(
      this.store.pipe(select(fromShowcase.getCurrentRouterState)),
      this.store.pipe(select(fromShowcase.isDemoEditing))
    ).pipe(
      filter(([, isDemoEditing]) => isDemoEditing),
      tap(() => {
        this.loading = true;
        this.ChangeDetectorRef.markForCheck();
      }),
      switchMap(([state]) =>
        forkJoin(
          this.base$,
          this.DemoFileLoaderService.getDemoFiles(state.params.demoUrl)
        )
      ),
      switchMap(([base, demoFiles]) =>
        from(this.openExample(base, demoFiles))
      ),
      tap(() => {
        this.loading = false;
        this.ChangeDetectorRef.markForCheck();
      }),
    ).subscribe({
      error: () => {
        this.loading = false;
        this.ChangeDetectorRef.markForCheck();
      }
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  ngAfterViewInit() {
    this.afterViewInit.complete();
  }

  private async openExample(base: string, demoFiles: Dictionary<string>) {
    await this.afterViewInit.toPromise();
    if (this.vm) {
      await this.vm.applyFsDiff({
        create: demoFiles,
        destroy: []
      });
      return;
    }
    const project = {
      files: {
        'main.ts': base,
        'index.html': '<showcase-demo></showcase-demo>',
        '.angular-cli.json': `
{
"apps": [{
  "styles": ["styles.css"]
}]
}`,
        'styles.css': `
@import "~@angular/material/prebuilt-themes/indigo-pink.css";
@import "~mapbox-gl/dist/mapbox-gl.css";
html, body {
display: flex;
flex: 1;
min-height: 100vh;
margin: 0;
}
`,
        ...demoFiles
      },
      title: '',
      description: '',
      template: 'angular-cli',
      dependencies: {
        tslib: '*',
        'mapbox-gl': '*',
        'ngx-mapbox-gl': '*',
        '@angular/cdk': '*',
        '@angular/material': '*',
        '@angular/animations': '*',
        '@angular/forms': '*',
        'url': '*',
        'querystring': '*',
        'rxjs-compat': '*',
        '@types/mapbox-gl': '*',
        '@types/supercluster': '*'
      }
    };
    await this.zone.runOutsideAngular(async () => {
      this.vm = await StackBlitzSDK.embedProject(this.stackblitzContainer.nativeElement, project, {
        hideExplorer: true,
        hideNavigation: true,
        forceEmbedLayout: true,
        openFile: 'demo.ts'
      });
    });
  }
}
