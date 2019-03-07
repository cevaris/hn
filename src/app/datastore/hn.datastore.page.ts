import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';

@Injectable()
export class HnDatastore {

  constructor(
    private client: AngularFireDatabase
  ) { }

  getUpdates(): Observable<any> {
    return this.client.list<any>('/v0/updates')
      .valueChanges();
  }

  getAskStories(): Observable<number[]> {
    return this.client.list<any>('/v0/askstories')
      .valueChanges();
  }

  getShowStories(): Observable<number[]> {
    return this.client.list<any>('/v0/showstories')
      .valueChanges();
  }

  getJobStories(): Observable<number[]> {
    return this.client.list<any>('/v0/jobstories')
      .valueChanges();
  }

  getTopStories(): Observable<number[]> {
    return this.client.list<any>('/v0/topstories')
      .valueChanges();
  }

  getNewStories(): Observable<number[]> {
    return this.client.list<any>('/v0/newstories')
      .valueChanges();
  }

  getMaxitemId(): Observable<number[]> {
    return this.client.list<any>('/v0/maxitem')
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