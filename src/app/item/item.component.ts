import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { HnDatastore, Item } from '../datastore/hn.datastore';

@Component({
  selector: 'item',
  templateUrl: 'item.component.html',
  styleUrls: ['item.component.scss']
})
export class ItemComponent implements OnInit {

  @Input() itemId: number;
  item$: Observable<Item>;

  constructor(private datastore: HnDatastore) {
  }

  ngOnInit() {
    console.log('loading itemid', this.itemId)
    this.item$ = this.datastore.getItem(this.itemId);
  }

}
