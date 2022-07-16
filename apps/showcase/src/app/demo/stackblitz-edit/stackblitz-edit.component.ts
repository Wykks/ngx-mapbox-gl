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
import { ActivatedRoute } from '@angular/router';
import StackBlitzSDK from '@stackblitz/sdk';
import { VM } from '@stackblitz/sdk/typings/VM';
import { forkJoin, from, Subscription } from 'rxjs';
import { finalize, shareReplay, switchMap, tap } from 'rxjs/operators';
import { createStackblitzProject } from './create-stackblitz-project';
import { DemoFileLoaderService } from './demo-file-loader.service';

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
  @ViewChild('container') stackblitzContainer: ElementRef;

  loading = true;

  private sub: Subscription;
  private vm: VM;
  private projectbase$ = forkJoin([
    this.http.get('assets/stackblitz/main.notts', {
      responseType: 'text',
    }),
    this.http.get('assets/stackblitz/angular.json', {
      responseType: 'text',
    }),
  ]).pipe(shareReplay(1));

  constructor(
    private zone: NgZone,
    private activatedRoute: ActivatedRoute,
    private demoFileLoaderService: DemoFileLoaderService,
    private http: HttpClient,
    private ChangeDetectorRef: ChangeDetectorRef
  ) {}

  ngOnDestroy() {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }

  ngAfterViewInit() {
    this.sub = this.activatedRoute.params
      .pipe(
        tap(() => {
          this.loading = true;
          this.ChangeDetectorRef.markForCheck();
        }),
        switchMap((params) =>
          forkJoin([
            this.projectbase$,
            this.demoFileLoaderService.getDemoFiles(params.demoUrl),
          ])
        ),
        switchMap(([projectbase, demoFiles]) =>
          from(this.openExample(projectbase, demoFiles)).pipe(
            finalize(() => {
              this.loading = false;
              this.ChangeDetectorRef.markForCheck();
            })
          )
        )
      )
      .subscribe();
  }

  private async openExample(
    projectbase: string[],
    demoFiles: Record<string, string>
  ) {
    if (this.vm) {
      await this.vm.applyFsDiff({
        create: demoFiles,
        destroy: [],
      });
      return;
    }
    const project = createStackblitzProject(projectbase, demoFiles);
    await this.zone.runOutsideAngular(async () => {
      this.vm = await StackBlitzSDK.embedProject(
        this.stackblitzContainer.nativeElement,
        project,
        {
          hideExplorer: true,
          hideNavigation: true,
          forceEmbedLayout: true,
          openFile: 'src/demo.ts',
        }
      );
    });
  }
}
