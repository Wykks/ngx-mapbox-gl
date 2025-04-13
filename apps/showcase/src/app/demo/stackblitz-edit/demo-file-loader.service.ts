import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { forkJoin, Observable, of } from 'rxjs';
import { map, shareReplay, switchMap } from 'rxjs/operators';

const FILES_PATH = '';

@Injectable({ providedIn: 'root' })
export class DemoFileLoaderService {
  private readonly httpClient = inject(HttpClient);

  private fileCache = new Map<string, Observable<Record<string, string>>>();

  getDemoFiles(exampleName: string) {
    let req$ = this.fileCache.get(exampleName);
    if (req$) {
      return req$;
    }
    req$ = this.httpClient
      .get(`${FILES_PATH}${exampleName}.component.ts`, {
        responseType: 'text',
      })
      .pipe(
        switchMap((fileContent) =>
          this.loadAdditionnalFilesIfNecessary(fileContent),
        ),
        shareReplay(1),
      );
    this.fileCache.set(exampleName, req$);
    return req$;
  }

  private loadAdditionnalFilesIfNecessary(fileContent: string) {
    const r = /'\.\/([\w-.]+\.\w+)'/g;
    let match;
    const files = [];
    const result = {
      'src/demo.ts': fileContent,
    };
    while ((match = r.exec(fileContent))) {
      let file = match[1];
      if (!/^.+\.(css|json)$/.test(file)) {
        file += '.ts';
      }
      files.push(this.loadFile(file));
    }
    if (files.length) {
      return forkJoin(files).pipe(
        map((files) => {
          return {
            ...Object.assign({}, ...files),
            ...result,
          };
        }),
      );
    }
    return of(result);
  }

  private loadFile(fileName: string) {
    let req$ = this.fileCache.get(fileName);
    if (req$) {
      return req$;
    }
    req$ = this.httpClient
      .get(`${FILES_PATH}${fileName}`, {
        responseType: 'text',
      })
      .pipe(
        map((fileContent) => ({
          [`src/${fileName}`]: fileContent,
        })),
        shareReplay(1),
      );
    this.fileCache.set(fileName, req$);
    return req$;
  }
}
