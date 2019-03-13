import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, BehaviorSubject } from 'rxjs';
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

// const getTop = () => {
//   const one = document.documentElement.scrollTop;
//   const two = document.body.scrollTop;
//   const three = window.pageYOffset;
//   console.log(one, two, three);
//   one || two || three;
// }

const getTop = function () {
  let sy: number, d = document,
    r = d.documentElement,
    b = d.body,
    se = document.scrollingElement.scrollTop,
    w = window.scrollY,
    wo = window.pageYOffset;
  console.log(sy, r.scrollTop, b.scrollTop, se, w, wo);
  sy = r.scrollTop || b.scrollTop || se || w || wo || 0;
  return sy;
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

  lastTop: number;

  constructor(
    private datastore: HnService,
    private activatedRoute: ActivatedRoute
  ) {
  }

  ngOnInit() {
    this.item$ = this.activatedRoute.paramMap
      .pipe(
        switchMap(paramMap =>
          this.datastore.getItem(Number(paramMap.get('id')))
        ),
        tap(item => this.title = item.title)
      );

    this.createdAt$ = this.item$.pipe(map(item => {
      const date = new Date(item.time * 1000);
      return date.toLocaleString(getLocale(), { timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone })
    }));
  }

  scrollToNextRootComment() {
    //https://forum.ionicframework.com/t/scroll-to-specific-element/52086/3

    let count = 0;
    let currEl: HTMLElement = undefined;

    while (currEl = document.getElementById('comment-' + count)) {
      const currTop = getTop();
      const currElTop = getElementTop(currEl);
      if (currTop < currElTop) {
        currEl.scrollIntoView();
        console.log('scrolling', count, currTop, currElTop);
        break;
      } else {
        count++;
      }
    }
  }

}
