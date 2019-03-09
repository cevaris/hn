import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable, from, Subscription, of, BehaviorSubject, zip } from 'rxjs';
import { map, mergeMap, flatMap, switchMap, tap } from 'rxjs/operators';
import { HnDatastore, Item } from '../datastore/hn.datastore';
import { IonInfiniteScroll } from '@ionic/angular';

@Component({
  selector: 'app-list',
  templateUrl: 'list.page.html',
  styleUrls: ['list.page.scss']
})
export class ListPage implements OnInit {

  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;

  feed: Observable<number[]>;
  items: Observable<number[]>;

  pages: Observable<number>;
  currPage: BehaviorSubject<number>;

  constructor(private datastore: HnDatastore) { }

  ngOnInit() {
    this.datastore.getItem(19333402)
      .subscribe(res => {
        console.log('getItem', res);
      });

    this.datastore.getUser('cevaris')
      .subscribe(res => {
        console.log('getUser', res);
      });

    this.feed = this.datastore.getTopStories();
    this.pages = this.feed.pipe(
      map(arr => Math.floor(arr.length / 30) + 1)
    );
    // kick off first page load
    this.currPage = new BehaviorSubject(0);
    this.currPage
    .pipe(
      switchMap(page => {
        console.log('currPage', page);
        return this.feed.pipe(
          map(itemIds => {
            const nextIds = itemIds.slice((page - 1) * 30, (page - 1) * 30 + 30);
            console.log('nextIds', nextIds);
            return nextIds;
          })
        )
      })
    );
    this.currPage.next(1);
    // this.items = this.feed
    //   .pipe(
    //     map(itemIds => {
    //       console.log('slicing page');
    //       return itemIds.slice(0, 30);
    //     })
    //   )
  }

  loadData(event) {
    console.log('loadData fired', event);
    setTimeout(() => {
      this.currPage
        .next(this.currPage.value + 1);

      console.log('Done');
      event.target.complete();

      zip(this.pages, this.currPage)
        .subscribe(([pages, currPage]) => {
          if (currPage >= pages) {
            event.target.disabled = true;
          }
        });
    }, 500);
  }

  // add back when alpha.4 is out
  // navigate(item) {
  //   this.router.navigate(['/list', JSON.stringify(item)]);
  // }
}
