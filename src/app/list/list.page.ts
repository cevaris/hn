import { Component, OnInit, ViewChild } from '@angular/core';
import { IonInfiniteScroll } from '@ionic/angular';
import { Observable } from 'rxjs';
import { HnDatastore } from '../datastore/hn.datastore';

@Component({
  selector: 'app-list',
  templateUrl: 'list.page.html',
  styleUrls: ['list.page.scss']
})
export class ListPage implements OnInit {

  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;

  feed: number[];
  lastPage: number;
  currPage: number = 1;

  items: Observable<number[]>;

  constructor(private datastore: HnDatastore) { 
  }

  ngOnInit() {
    this.datastore.getItem(19333402)
      .subscribe(res => {
        console.log('getItem', res);
      });

    this.datastore.getUser('cevaris')
      .subscribe(res => {
        console.log('getUser', res);
      });

    this.datastore.getTopStories()
      .subscribe(results => {
        this.feed = results;
        this.lastPage = Math.floor(this.feed.length / 30) + 1;
        console.log('feed', this.feed);
        console.log('lastPage', this.lastPage);
        this.infiniteScroll.disabled = false;
      });
  }

  loadData(event) {
    console.log('loadData fired', event);
    setTimeout(() => {
      const nextIds = this.feed.slice((this.currPage - 1) * 30, (this.currPage - 1) * 30 + 30);
      console.log('done', 'nextIds', nextIds);

      if (event) {
        event.target.complete();
      }

      if (event && this.currPage >= this.lastPage) {
        event.target.disabled = true;
      }
    }, 500);
  }

  // add back when alpha.4 is out
  // navigate(item) {
  //   this.router.navigate(['/list', JSON.stringify(item)]);
  // }
}
