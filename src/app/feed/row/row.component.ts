import { Component, Input, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HnService, Item } from 'src/app/datastore/hn.service';
import { printTime } from 'src/app/utils/time.service';

@Component({
  selector: 'row',
  templateUrl: 'row.component.html',
  styleUrls: ['row.component.scss']
})
export class RowComponent implements OnInit {

  @Input() itemId: number;
  item$: Observable<Item>;
  createdAt$: Observable<string>;

  constructor(private datastore: HnService, private navController: NavController) {
  }

  ngOnInit() {
    this.item$ = this.datastore.getItem(this.itemId);
    this.createdAt$ = this.item$.pipe(map(item => printTime(item.time)));
  }

  navigate() {
    this.item$.subscribe(item => this.navController.navigateForward(['/items', this.itemId]))
  }

}
