import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { HnService, Item } from '../datastore/hn.service';
import { getElementTop } from '../utils/html.service';
import { printTime } from '../utils/time.service';

@Component({
  selector: 'item-page',
  templateUrl: 'item.page.html',
  styleUrls: ['item.page.scss']
})
export class ItemPage implements OnInit {
  item$: Observable<Item>;
  createdAt$: Observable<string>;

  title: string;
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
        tap(item => this.title = item.title)
      );

    this.createdAt$ = this.item$.pipe(map(item => printTime(item.time)));
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
