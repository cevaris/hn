import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { defer, Observable } from 'rxjs';

const CACHE_TTL = 60 * 1000;

export class CacheEntry {
  key: any;
  value: any;
  createdAt: number; // epoch milliseconds
}

const isFresh = (entry: CacheEntry): boolean => {
  if (entry && entry.createdAt) {
    return (new Date().getTime() - entry.createdAt) < CACHE_TTL
  } else {
    return false;
  }
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
            if (isFresh(entry)) {
              console.log('cache hit', key, entry);
              return entry.value;
            } else if (entry) {
              console.log('cache stale', key);
              // undefined would trigger rehydration
              return undefined;
            } else {
              console.log('cache miss', key);
              return undefined;
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