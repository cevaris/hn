import { Component, OnInit, ViewChild } from '@angular/core';
import { IonInfiniteScroll } from '@ionic/angular';
import { Observable } from 'rxjs';
import { filter, map, tap } from 'rxjs/operators';
import { HnDatastore } from '../datastore/hn.datastore';

@Component({
  selector: 'app-list',
  templateUrl: 'list.page.html',
  styleUrls: ['list.page.scss']
})
export class ListPage implements OnInit {

  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;

  // feed: number[];
  feed: Observable<number[]>
  lastPage: number;
  currPage: number = 1;

  // items: Observable<number[]>;
  items: number[] = [];
  // items: Item[] = [];

  constructor(private datastore: HnDatastore) {
  }

  ngOnInit() {
    this.datastore.getItem(19333402)
      .subscribe(res => {
        console.log('getItem', res);
      });

    this.datastore.getUser('cevaris')
      .subscribe(res => {
        console.log('getUser', res);
      });

    // this.datastore.getTopStories()
    //   .subscribe(results => {
    //     this.feed = results;
    //     this.lastPage = Math.floor(this.feed.length / 30) + 1;
    //     console.log('feed', this.feed);
    //     console.log('lastPage', this.lastPage);
    //     this.loadData(false);
    //   });
    this.feed = this.datastore.getTopStories()
      .pipe(
        tap(itemIds => this.lastPage = Math.floor(itemIds.length / 30) + 1)
      );
    // .pipe(
    //   map(itemIdsArr => new Set(itemIdsArr))
    // );
    // .subscribe(results => {
    //   this.feed = results;
    //   this.lastPage = Math.floor(this.feed.length / 30) + 1;
    //   console.log('feed', this.feed);
    //   console.log('lastPage', this.lastPage);
    //   this.loadData(false);
    // });
    this.loadData(false);
  }

  loadData(event) {
    console.log('loadData fired');
    console.log('loading page ', this.currPage, ' of ', this.lastPage);

    // const nextIds = this.feed.slice((this.currPage - 1) * 30, (this.currPage - 1) * 30 + 30);
    // console.log('nextIds', nextIds);

    this.feed
      .pipe(
        map(feed => feed.slice((this.currPage - 1) * 30, (this.currPage - 1) * 30 + 30)),
      ).subscribe(nextItems => {
        nextItems.forEach((i) => this.items.push(i));
        this.currPage++;
        if (event) { event.target.complete() }
      });

    // from(nextIds)
    //   .pipe(
    //     mergeMap(itemId => this.datastore.getItem(itemId))
    //   )
    //   .subscribe(item => this.items.push(item))

    // this.items = forkJoin(nextIds.map(this.datastore.getItem))

    // await from(nextIds)
    //   .pipe(
    //     tap(itemIds => console.log('tap', itemIds)),
    //     mergeMap(itemId => this.datastore.getItem(itemId)),
    //     tap(item => this.items.pipe(map(items => {
    //       console.log(items);
    //       items.push(item);
    //     }))),
    //     tap(() => event.target.complete())
    //   )

    if (event && this.currPage >= this.lastPage) {
      event.target.disabled = true;
    }
  }

  // add back when alpha.4 is out
  // navigate(item) {
  //   this.router.navigate(['/list', JSON.stringify(item)]);
  // }
}
