import { Component, OnInit, ViewChild } from '@angular/core';
import { IonInfiniteScroll } from '@ionic/angular';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { HnDatastore } from '../datastore/hn.datastore';

@Component({
  selector: 'feed-page',
  templateUrl: 'feed.page.html'
})
export class FeedPage implements OnInit {

  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;

  feed: Observable<number[]>
  lastPage: number;
  currPage: number = 1;

  items: number[] = [];

  constructor(private datastore: HnDatastore) {
  }

  ngOnInit() {
    this.feed = this.datastore.getTopStories()
      .pipe(
        tap(itemIds => this.lastPage = Math.floor(itemIds.length / 30) + 1)
      );

      this.loadData(false);
  }

  loadData(event) {
    console.log('loadData fired');
    console.log('loading page ', this.currPage, ' of ', this.lastPage);

    this.feed
      .pipe(
        map(feed => feed.slice((this.currPage - 1) * 30, (this.currPage - 1) * 30 + 30)),
      ).subscribe(nextItems => {
        nextItems.forEach((i) => this.items.push(i));
        this.currPage++;
        if (event) { event.target.complete() }
      });

    if (event && this.currPage >= this.lastPage) {
      event.target.disabled = true;
    }
  }

}
