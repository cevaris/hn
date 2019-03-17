import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IonInfiniteScroll, NavController } from '@ionic/angular';
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
  items: number[];

  private allItems: number[];  // list containing all fetched itemIds
  private subscription: Subscription;
  private lastPage: number;
  private currPage: number;

  constructor(private datastore: HnService, private activatedRoute: ActivatedRoute, private navController: NavController) {
  }

  doRefresh(event) {
    console.log('refresh', event);
    this.subscription.unsubscribe();
    this.subscription = this.createSubscription()
      .pipe(tap(() => event.target.complete()))
      .subscribe();
  }

  ionViewWillLeave() {
    this.subscription.unsubscribe();
  }

  ngOnInit() {
    this.navController.navigateRoot('/feed/top');
    this.subscription = this.createSubscription()
      .subscribe();
  }

  createSubscription() {
    this.currPage = 1;
    this.allItems = [];
    this.items = [];

    return this.activatedRoute
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
