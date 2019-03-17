import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable, of } from 'rxjs';
import { flatMap, tap } from 'rxjs/operators';
import { CacheService } from './cache.service.';

export interface IStorageOptions {
  readCache: boolean;
}

export class StorageOptions implements IStorageOptions {
  constructor(
    public readCache: boolean = true
  ) { }
}

export const StorageOptionsDefault = new StorageOptions()

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
  score: number; // karma? 
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
const NewStoriesURL = `${HnBaseURL}/v0/newstories.json`;
const BestStoriesURL = `${HnBaseURL}/v0/beststories.json`;
const AskStoriesURL = `${HnBaseURL}/v0/askstories.json`;
const ShowStoriesURL = `${HnBaseURL}/v0/showstories.json`;
const JobStoriesURL = `${HnBaseURL}/v0/jobstories.json`;

const buildItemURL = (id: number) => `${HnBaseURL}/v0/item/${id}.json`;
const buildUserURL = (id: string) => `${HnBaseURL}/v0/user/${id}.json`;
const buildUrl = (type: string) => `${HnBaseURL}/v0/${type}.json`;

@Injectable()
export class HnService {
  constructor(
    private client: AngularFireDatabase,
    private http: HttpClient,
    private cache: CacheService
  ) { }

  getUpdates(): Observable<Updates> {
    return this.client.object<Updates>('/v0/updates')
      .valueChanges();
  }

  getFeedStories(storyType: string): Observable<number[]> {
    return this.http.get<number[]>(buildUrl(storyType));
  }

  getMaxitemId(): Observable<number> {
    return this.client.object<number>('/v0/maxitem')
      .valueChanges();
  }

  getUser(id: string): Observable<User> {
    return this.http.get<User>(buildUserURL(id));
  }

  // TODO: Create class for User/Item, with cache helper key
  getItem(id: number, opts: IStorageOptions = StorageOptionsDefault): Observable<Item> {
    const key = `item:${id}`;

    // bypass cache lookup if readCache is disabled
    let cacheResult = of(undefined);
    if (opts.readCache) {
      cacheResult = this.cache.get(key);
    } else {
      console.log('bypassing cache for', id);
    }

    return cacheResult.pipe(
      flatMap(result => {
        if (result) {
          return of(result);
        } else {
          // console.log('not found from cache, hydrating', key);
          return this.http.get(buildItemURL(id))
            .pipe(
              tap(value => this.cache.set(key, value))
            );
        }
      })
    )
  }

}