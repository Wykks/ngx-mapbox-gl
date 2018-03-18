import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, ElementRef, NgZone, OnDestroy, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import StackBlitzSDK from '@stackblitz/sdk';
import { VM } from '@stackblitz/sdk/typings/VM';
import { AsyncSubject } from 'rxjs/AsyncSubject';
import { Observable } from 'rxjs/Observable';
import { forkJoin } from 'rxjs/observable/forkJoin';
import { shareReplay } from 'rxjs/operators/shareReplay';
import { Subscription } from 'rxjs/Subscription';

@Component({
  template: `<div #container></div>`,
  styles: [`
    :host {
      display: flex;
      flex: 1;
    }
    :host ::ng-deep iframe {
      height: 100%;
      width: 100%;
      border: 0;
    }
  `]
})
export class StackblitzEditComponent implements AfterViewInit, OnDestroy {
  @ViewChild('container') stackblitzContainer: ElementRef;

  private sub: Subscription;
  private base$: Observable<string>;

  private demoFileCache = new Map<string, Observable<string>>();
  private afterViewInit = new AsyncSubject<void>();
  private vm: VM;

  constructor(
    private http: HttpClient,
    private zone: NgZone,
    private activatedRoute: ActivatedRoute
  ) {
    this.base$ = this.http.get('assets/stackblitz-base.txt', {
      responseType: 'text'
    }).pipe(shareReplay(1));
    this.sub = this.activatedRoute.params.subscribe((params) => {
      forkJoin(
        this.base$,
        this.getDemoFile(params.demoUrl)
      ).subscribe(([base, demo]) => this.openExample(base, demo));
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  ngAfterViewInit() {
    this.afterViewInit.complete();
  }

  private getDemoFile(exampleFileName: string) {
    let req$ = this.demoFileCache.get(exampleFileName);
    if (req$) {
      return req$;
    }
    req$ = this.http.get(`app/demo/examples/${exampleFileName}.component.ts`, {
      responseType: 'text'
    }).pipe(shareReplay(1));
    this.demoFileCache.set(exampleFileName, req$);
    return req$;
  }

  private async openExample(base: string, demo: string) {
    await this.afterViewInit.toPromise();
    if (this.vm) {
      this.vm.applyFsDiff({
        create: {
          'demo.ts': demo
        },
        destroy: []
      });
      return;
    }
    const project = {
      files: {
        'main.ts': base,
        'index.html': '<mgl-demo></mgl-demo>',
        'examples.css': `
:host {
display: flex;
flex: 1;
}
mgl-map {
height: 100%;
width: 100%;
}`,
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
        'demo.ts': demo
      },
      title: '',
      description: '',
      template: 'angular-cli',
      dependencies: {
        tslib: '^1.9.0',
        'mapbox-gl': '*',
        'ngx-mapbox-gl': '*',
        '@angular/cdk': '^5.2.4',
        '@angular/material': '^5.2.4'
      }
    };
    this.zone.runOutsideAngular(async () => {
      this.vm = await StackBlitzSDK.embedProject(this.stackblitzContainer.nativeElement, project, {
        hideExplorer: true,
        hideNavigation: true,
        forceEmbedLayout: true,
        openFile: 'demo.ts'
      });
    });
  }
}
