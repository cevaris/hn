import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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

  constructor(private datastore: HnService, private router: Router) {
  }

  ngOnInit() {
    this.item$ = this.datastore.getItem(this.itemId);
    this.createdAt$ = this.item$.pipe(map(item => printTime(item.time)));
  }

  navigate() {
    this.item$.forEach(item => this.router.navigate(['/items', this.itemId]));
  }

}
