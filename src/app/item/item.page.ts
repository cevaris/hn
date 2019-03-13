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

    this.createdAt$ = this.item$.pipe(map(item => {
      const date = new Date(item.time * 1000);
      return date.toLocaleString(getLocale(), { timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone })
    }));
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
