import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { HnService, Item } from '../datastore/hn.service';


const getLocale = () => {
  if (navigator.languages != undefined)
    return navigator.languages[0];
  else
    return navigator.language;
}

function getElementTop(el: any) {
  const rect = el.getBoundingClientRect();
  return rect.top + window.scrollY;
}

@Component({
  selector: 'item-page',
  templateUrl: 'item.page.html',
  styleUrls: ['item.page.scss']
})
export class ItemPage implements OnInit {
  item$: Observable<Item>;
  createdAt$: Observable<string>;

  title: string;

  currScrollTop: number;
  currCommentTop: number;
  currCommentCount: number;

  constructor(
    private datastore: HnService,
    private activatedRoute: ActivatedRoute
  ) {
  }

  ngOnInit() {
    this.currCommentCount = 0;
    this.currScrollTop = 0;

    this.currCommentTop = 0;

    this.item$ = this.activatedRoute.paramMap
      .pipe(
        switchMap(paramMap => this.datastore.getItem(Number(paramMap.get('id')))),
        tap(item => this.title = item.title)
      );

    this.createdAt$ = this.item$.pipe(map(item => {
      const date = new Date(item.time * 1000);
      return date.toLocaleString(getLocale(), { timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone })
    }));
  }

  scrollToNextRootComment() {
    let count: number = 0;
    let currEl: HTMLElement = undefined;

    while (currEl = document.getElementById('comment-' + count)) {
      let currElTop: number = getElementTop(currEl);

      if (this.currCommentTop == currElTop) {
        console.log('equal to', currEl.id, 'at', currElTop, this.currCommentTop);
        currEl = document.getElementById('comment-' + (count + 1));
        currEl.scrollIntoView();
        this.currCommentTop = getElementTop(currEl);
        console.log('equal to', currEl.id, 'at', currElTop, this.currCommentTop);
        break;
      }

      if (currElTop > 0) {
        console.log('scrolledTo to', currEl.id, 'at', currElTop, this.currCommentTop);
        currEl.scrollIntoView();
        this.currCommentTop = getElementTop(currEl);
        console.log('scrolledTo to', currEl.id, 'at', currElTop, this.currCommentTop);
        break;
      } else {
        console.log('counting', count);
        count++;
      }
    }
  }

  onScroll(event: CustomEvent) {
    if (event && event.detail && event.detail.scrollTop) {
      this.currScrollTop = event.detail.scrollTop;
    }
  }
}
