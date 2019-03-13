import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, BehaviorSubject } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { HnService, Item } from '../datastore/hn.service';
import { IonContent } from '@ionic/angular';


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
  @ViewChild(IonContent) content: IonContent;


  item$: Observable<Item>;
  createdAt$: Observable<string>;

  title: string;

  currScrollTop: number;
  currCommentCount: number;

  constructor(
    private datastore: HnService,
    private activatedRoute: ActivatedRoute
  ) {
  }

  ngOnInit() {
    this.currCommentCount = 0;
    this.currScrollTop = 0;
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
    // let count = this.currCommentCount;
    let count = 0;
    let currEl: HTMLElement = undefined;

    while (currEl = document.getElementById('comment-' + count)) {
      //const currTop = this.currScrollTop;
      const currTop = 0;
      const currElTop = getElementTop(currEl);
      console.log('scrolling', count, currTop, currElTop);

      if (currElTop > currTop) {
        currEl.scrollIntoView(); 
        console.log('scrolling to', currEl.id, 'at', currElTop);
        // this.currCommentCount++;
        break;
      } else {
        console.log('counting', count);
        //this.currCommentCount++;
        count++;
      }
    }
  }

  ionViewDidEnter(){
    this.content.scrollToTop(0);
  }

  onScroll(event: CustomEvent) {
    if (event && event.detail && event.detail.scrollTop) {
      this.currScrollTop = event.detail.scrollTop;
    }
  }
}
