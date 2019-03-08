import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Observable } from 'rxjs';

export interface Updates {
  items: number[];
  profiles: string[];
}

@Injectable()
export class HnDatastore {

  constructor(
    private client: AngularFireDatabase
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

  getItem(id: string): Observable<any> {
    return this.client.list<any>(`/v0/item/${id}`)
      .valueChanges();
  }

}