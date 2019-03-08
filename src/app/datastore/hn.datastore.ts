import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Storage } from '@ionic/storage';
import { defer, Observable, of } from 'rxjs';
import { mergeMap, tap } from 'rxjs/operators';


export interface Updates {
  items: number[];
  profiles: string[];
}

@Injectable()
export class HnDatastore {
  constructor(
    private client: AngularFireDatabase,
    private storage: Storage
  ) { }

  getUpdates(): Observable<Updates> {
    return this.client.object<Updates>('/v0/updates')
      .valueChanges();
  }

  getAskStories(): Observable<number[][]> {
    return this.client.list<number[]>('/v0/askstories')
      .valueChanges();
  }

  getShowStories(): Observable<number[][]> {
    return this.client.list<number[]>('/v0/showstories')
      .valueChanges();
  }

  getJobStories(): Observable<number[][]> {
    return this.client.list<number[]>('/v0/jobstories')
      .valueChanges();
  }

  getTopStories(): Observable<number[][]> {
    return this.client.list<number[]>('/v0/topstories')
      .valueChanges();
  }

  getNewStories(): Observable<number[][]> {
    return this.client.list<number[]>('/v0/newstories')
      .valueChanges();
  }

  getMaxitemId(): Observable<number[][]> {
    return this.client.list<number[]>('/v0/maxitem')
      .valueChanges();
  }

  getUser(id: string): Observable<any> {
    return this.client.list<any>(`/v0/user/${id}`)
      .valueChanges();
  }


  // TODO: Create cache wrapper to save 
  // -- cachedAt, value (json), and title (for searching)
  // TODO: Create class for User/Item, with cache helper key
  // TODO: Move storage to another underlying client, just expose get/set/forEach
  getItem(id: number): Observable<any> {
    const res = defer(() =>
      this.storage
        .ready()
        .then(() => {
          return this.storage.get(`user:${id}`)
            .then((item) => {
              console.log('found from cache', item);
              return item;
            });
        }));

    return res.pipe(
      mergeMap(result => {
        if (result) {
          return of(result);
        } else {
          return this.client.object<any>(`/v0/item/${id}`)
            .valueChanges().pipe(
              tap(hydratedValue => this.storage.set(`user:${id}`, hydratedValue))
            );
        }
      })
    )
  }

}