import { Component, Input, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { HnDatastore, Item } from 'src/app/datastore/hn.datastore';

@Component({
  selector: 'row',
  templateUrl: 'row.component.html'
})
export class RowComponent implements OnInit {

  @Input() itemId: number;
  item$: Observable<Item>;

  constructor(private datastore: HnDatastore, private navController: NavController) {
  }

  ngOnInit() {
    console.log('loading itemid', this.itemId);
    this.item$ = this.datastore.getItem(this.itemId);
  }

  navigate() {
    this.item$.subscribe(item => this.navController.navigateForward(['/items', this.itemId]))
  }

}
