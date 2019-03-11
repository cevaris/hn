import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { defer, Observable } from 'rxjs';

export class CacheEntry {
  key: any;
  value: any;
  createdAt: number; // epoch milliseconds
}

@Injectable()
export class CacheService {
  constructor(
    private storage: Storage,
  ) { }

  get(key: any): Observable<any> {
    return defer(() =>
      this.ready(() =>
        this.storage.get(key)
          .then((entry) => {
            if (entry) {
              console.log('cache hit', key, entry);
              return entry.value;
            } else {
              console.log('cache miss', key);
              return entry;
            }
          })
      )
    );
  }

  set(key: any, value: any): Promise<any> {
    return this.ready(() => {
      const now = new Date().getTime();

      const entry = new CacheEntry();
      entry.key = key;
      entry.value = value;
      entry.createdAt = now;

      this.storage.set(key, entry)
    });
  }

  private ready(func: any): Promise<any> {
    return this.storage.ready().then(() => func());
  }

}