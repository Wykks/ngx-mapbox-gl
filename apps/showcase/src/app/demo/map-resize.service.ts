import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

// TODO: Use InjectionToken instead

@Injectable({
  providedIn: 'root',
})
export class MapResizeService {
  resize$ = new Subject();
}
