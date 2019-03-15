import { Component, OnInit, Renderer2 } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { HnService, Item, StorageOptions } from '../datastore/hn.service';
import { getElementTop } from '../utils/html.service';
import { printTime } from '../utils/time.service';


const NoReadStorageOptions = new StorageOptions();
NoReadStorageOptions.readCache = false;

@Component({
  selector: 'item-page',
  templateUrl: 'item.page.html',
  styleUrls: ['item.page.scss']
})
export class ItemPage implements OnInit {
  item$: Observable<Item>;
  createdAt$: Observable<string>;

  itemId: number;
  currCommentTop: number;

  constructor(
    private datastore: HnService,
    private activatedRoute: ActivatedRoute,
    private renderer: Renderer2
  ) { }

  ngOnInit() {
    this.currCommentTop = 0;

    this.item$ = this.activatedRoute.paramMap
      .pipe(
        switchMap(paramMap => this.datastore.getItem(Number(paramMap.get('id')))),
        tap(item => this.itemId = item.id)
      );

    this.createdAt$ = this.item$.pipe(map(item => printTime(item.time)));
  }


  toggleCollapse(commentIndex) {
    console.log('collapsing comment', commentIndex);
    const collapsedDiv = document.getElementById('collapsed-comment-' + commentIndex);
    const uncollapsedDiv = document.getElementById('uncollapsed-comment-' + commentIndex);

    this.toggleClass(collapsedDiv, 'collapsed');
    this.toggleClass(uncollapsedDiv, 'collapsed');
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

  toggleClass(element: HTMLElement, clazz: string) {
    const hasClass = element.classList.contains(clazz);
  
    if(hasClass) {
      this.renderer.removeClass(element, clazz);
    } else {
      this.renderer.addClass(element, clazz);
    }
  }
}
