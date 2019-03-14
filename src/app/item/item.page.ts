import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IonInfiniteScroll } from '@ionic/angular';
import { Observable, Subscription } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { HnService, Item, StorageOptions } from '../datastore/hn.service';
import { getElementTop } from '../utils/html.service';
import { printTime } from '../utils/time.service';

const PageSize: number = 10;

const NoReadStorageOptions = new StorageOptions();
NoReadStorageOptions.readCache = false;

@Component({
  selector: 'item-page',
  templateUrl: 'item.page.html',
  styleUrls: ['item.page.scss']
})
export class ItemPage implements OnInit {

  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;
  childrenIds: number[] = [];
  private allChildrenIds: number[] = [];  // list containing all to be fetched
  private subscription: Subscription;
  private lastPage: number;
  private currPage: number = 1;

  item$: Observable<Item>;
  createdAt$: Observable<string>;

  itemId: number;
  currCommentTop: number;

  constructor(
    private datastore: HnService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.currCommentTop = 0;

    this.item$ = this.activatedRoute.paramMap
      .pipe(
        switchMap(paramMap => this.datastore.getItem(Number(paramMap.get('id')))),
        tap(item => this.itemId = item.id),
        tap(item => this.allChildrenIds = item.kids),
        tap(itemIds => this.lastPage = Math.floor(this.allChildrenIds.length / PageSize) + 1),
        tap(() => this.loadData(false))
      );
    this.createdAt$ = this.item$.pipe(map(item => printTime(item.time)));

    this.subscription = this.item$.subscribe();
  }

  ionViewWillLeave() {
    this.subscription.unsubscribe();
  }

  loadData(event) {
    console.log('loading page ', this.currPage, ' of ', this.lastPage);

    const nextIds = this.allChildrenIds.slice((this.currPage - 1) * PageSize, (this.currPage - 1) * PageSize + PageSize);
    nextIds.forEach((id) => this.childrenIds.push(id));
    this.currPage++;
    if (event) { event.target.complete() }

    if (event && this.currPage >= this.lastPage) {
      event.target.disabled = true;
    }
  }

  refreshItem() {
    console.log('refreshing item', this.itemId);
    this.datastore.getItem(this.itemId, NoReadStorageOptions);
  }

  scrollToNextRootComment() {
    let count: number = 0;
    let currEl: HTMLElement = undefined;

    while (currEl = document.getElementById('comment-' + count)) {
      const currElTop: number = getElementTop(currEl);

      // scroll to next comment
      if (this.currCommentTop == currElTop) {
        if (currEl = document.getElementById('comment-' + (count + 1))) {
          currEl.scrollIntoView();
          this.currCommentTop = getElementTop(currEl);
          break;
        }
      }

      // scroll to next comment if in the middle of previous comment 
      if (currElTop > 0) {
        currEl.scrollIntoView();
        this.currCommentTop = getElementTop(currEl);
        break;
      } else {
        count++;
      }
    }
  }
}
