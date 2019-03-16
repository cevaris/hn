import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { defer, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

export interface HnSettings {
  theme: string
}

const KEY = "settings"

const DEFAULTS: HnSettings = {
  theme: 'light'
}

@Injectable()
export class HnSettingsService {

  constructor(private storage: Storage) { }

  get(): Observable<HnSettings> {
    return defer(() => this.ready(() => this.storage.get(KEY)))
      .pipe(
        map(settings => Object.assign(DEFAULTS, settings)),
        tap(settings => console.log('getting', settings))
      );
  }

  set(settings: HnSettings): Observable<boolean> {
    console.log('setting', settings);
    return defer(() => this.ready(() => this.storage.set(KEY, settings)))
      .pipe(map(() => true));
  }

  private ready(func: any): Promise<any> {
    return this.storage.ready().then(() => func());
  }
}