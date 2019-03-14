import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IonInfiniteScroll } from '@ionic/angular';
import { startCase, toLower } from 'lodash';
import { switchMap, tap } from 'rxjs/operators';
import { HnService } from '../datastore/hn.service';
import { Subscription } from 'rxjs';

const urlToStoryType: Map<string, string> = new Map(
  [
    ['top', 'topstories'],
    ['new', 'newstories'],
    ['best', 'beststories'],
    ['ask', 'askstories'],
    ['show', 'showstories'],
    ['job', 'jobstories']
  ]
);

const PageSize: number = 50;

@Component({
  selector: 'feed-page',
  templateUrl: 'feed.page.html',
  styleUrls: ['feed.page.scss']
})
export class FeedPage implements OnInit {

  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;

  title: string;
  items: number[] = [];

  private allItems: number[] = [];  // list containing all fetched itemIds
  private subscription: Subscription;
  private lastPage: number;
  private currPage: number = 1;

  constructor(private datastore: HnService, private activatedRoute: ActivatedRoute) {
  }

  ionViewWillLeave() {
    this.subscription.unsubscribe();
  }

  ngOnInit() {
    this.subscription = this.activatedRoute
      .paramMap
      .pipe(
        switchMap(paramMap => {
          console.log('got here');
          if (paramMap && paramMap.get('type') && urlToStoryType.has(paramMap.get('type'))) {
            // titlecase
            this.title = startCase(toLower(paramMap.get('type')));
            // fetch stories by type
            return this.datastore.getFeedStories(urlToStoryType.get(paramMap.get('type')))
          }
        }),
        tap(itemIds => this.lastPage = Math.floor(itemIds.length / PageSize) + 1),
        tap(itemIds => this.allItems = itemIds),
        tap(() => this.loadData(false))
      )
      .subscribe();
  }

  loadData(event) {
    console.log('loading page ', this.currPage, ' of ', this.lastPage);

    const nextIds = this.allItems.slice((this.currPage - 1) * PageSize, (this.currPage - 1) * PageSize + PageSize);
    nextIds.forEach((id) => this.items.push(id));
    this.currPage++;
    if (event) { event.target.complete() }

    if (event && this.currPage >= this.lastPage) {
      event.target.disabled = true;
    }
  }

}
