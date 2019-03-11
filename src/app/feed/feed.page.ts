import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IonInfiniteScroll } from '@ionic/angular';
import { startCase, toLower } from 'lodash';
import { Observable } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { HnService } from '../datastore/hn.service';

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

@Component({
  selector: 'feed-page',
  templateUrl: 'feed.page.html'
})
export class FeedPage implements OnInit {

  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;

  title: string;
  items: number[] = [];

  feed$: Observable<number[]>
  lastPage: number;
  currPage: number = 1;

  constructor(private datastore: HnService, private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.feed$ = this.activatedRoute
      .paramMap
      .pipe(
        switchMap(paramMap => {
          if (paramMap && paramMap.get('type') && urlToStoryType.has(paramMap.get('type'))) {
            // titlecase
            this.title = startCase(toLower(paramMap.get('type')));
            // fetch stories by type
            return this.datastore.getFeedStories(urlToStoryType.get(paramMap.get('type')))
          }
        }),
        tap(itemIds => this.lastPage = Math.floor(itemIds.length / 30) + 1)
      )

    this.loadData(false);
  }

  loadData(event) {
    console.log('loading page ', this.currPage, ' of ', this.lastPage);

    this.feed$
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
