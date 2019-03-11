import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { HnDatastore, Item } from '../datastore/hn.datastore';


const getLocale = () => {
  if (navigator.languages != undefined)
    return navigator.languages[0];
  else
    return navigator.language;
}

@Component({
  selector: 'item-page',
  templateUrl: 'item-detail.page.html',
  styleUrls: ['item-detail.page.scss']
})
export class ItemDetailPage implements OnInit {

  item$: Observable<Item>;
  createdAt$: Observable<string>;

  title: string;

  constructor(
    private datastore: HnDatastore,
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

}
