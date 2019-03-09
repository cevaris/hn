import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Storage } from '@ionic/storage';
import { defer, Observable, of } from 'rxjs';
import { flatMap, tap, map } from 'rxjs/operators';


export interface Updates {
  items: number[];
  profiles: string[];
}

export interface Item {
  id: number;
  deleted: boolean;
  type: string;
  by: string; // author username
  time: number; // epoch timestamp
  text: string; // html 
  dead: true; // unsure what dead means
  parent: number; // itemId of parent comment or root story
  kids: number[]; // comments, ranked display order
  url: string; // story url
  title: string;
  descendants: number; // total comments
  parts: number[]; // list of pollopt itemIds of a poll
  score: number; // score o poll
  poll: number; // itemId of parent poll
}

export interface User {
  id: number;
  delay: number; // no clue what this is
  created: number; // epoch timestamp
  karma: number;
  submitted: number[]; // list of itemId comments/stories submitted
}

export const HnBaseURL = 'https://hacker-news.firebaseio.com';
const TopStoriesURL = `${HnBaseURL}/v0/topstories.json`;

@Injectable()
export class HnDatastore {
  constructor(
    private client: AngularFireDatabase,
    private storage: Storage,
    private http: HttpClient
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

  getTopStories(): Observable<number[]> {
    return this.http.get<number[]>(TopStoriesURL);
  }

  getNewStories(): Observable<number[][]> {
    return this.client.list<number[]>('/v0/newstories')
      .valueChanges();
  }

  getMaxitemId(): Observable<number[][]> {
    return this.client.list<number[]>('/v0/maxitem')
      .valueChanges();
  }

  getUser(id: string): Observable<User> {
    return this.client.object<User>(`/v0/user/${id}`)
      .valueChanges();
  }


  // TODO: Create cache wrapper to save 
  // -- cachedAt, value (json), and title (for searching)
  // TODO: Create class for User/Item, with cache helper key
  // TODO: Move storage to another underlying client, just expose get/set/forEach
  // -- https://blog.fullstacktraining.com/caching-http-requests-with-angular/
  // TODO: Dabble in caching observable, and tap'ing title -> id into persistance
  getItem(id: number): Observable<Item> {
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
      flatMap(result => {
        if (result) {
          return of(result);
        } else {
          console.log('not found from cache, hydrating', id);
          return this.client.object<Item>(`/v0/item/${id}`)
            .valueChanges()
            .pipe(
              tap(hydratedValue => this.storage.set(`user:${id}`, hydratedValue))
            );
        }
      })
    )
  }

}