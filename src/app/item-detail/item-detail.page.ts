import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { HnDatastore, Item } from '../datastore/hn.datastore';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'item-page',
  templateUrl: 'item-detail.page.html',
  styleUrls: ['item-detail.page.scss']
})
export class ItemDetailPage implements OnInit {

  @Input() itemId: number;
  item$: Observable<Item>;

  constructor(private datastore: HnDatastore, private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    console.log('loading', this.itemId);
    this.item$ = this.activatedRoute.paramMap.pipe(switchMap(paramMap => this.datastore.getItem(Number(paramMap.get('id')))))
    // this.item$ = this.datastore.getItem(this.itemId);
  }

}
