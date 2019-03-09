import { Component, OnInit } from '@angular/core';
import { Observable, from, Subscription, of } from 'rxjs';
import { map, mergeMap, flatMap, switchMap } from 'rxjs/operators';
import { HnDatastore, Item } from '../datastore/hn.datastore';

@Component({
  selector: 'app-list',
  templateUrl: 'list.page.html',
  styleUrls: ['list.page.scss']
})
export class ListPage implements OnInit {
  private selectedItem: any;
  private icons = [
    'flask',
    'wifi',
    'beer',
    'football',
    'basketball',
    'paper-plane',
    'american-football',
    'boat',
    'bluetooth',
    'build'
  ];

  feed: Observable<number[]>;
  items: Observable<number[]>;

  constructor(private datastore: HnDatastore) { }

  ngOnInit() {
    this.datastore.getItem(19333402)
      .subscribe(res => {
        console.log('getItem', res);
      });

    this.datastore.getUser('cevaris')
      .subscribe(res => {
        console.log('getUser', res);
      });

    this.feed = this.datastore.getTopStories();

    this.items = this.feed
      .pipe(
        map(itemIds => {
          console.log('slicing page');
          return itemIds.slice(0, 30);
        })
        // mergeMap(itemId => {
        //   return <Observable<Item>>this.datastore.getItem(itemId);
        // }),
        // flatMap(itemIds => {
        //   return itemIds.map(this.datastore.getItem;
        // })
      )
      // .subscribe(numbers => {
      //   console.log('setting numbers');
      //   this.items = numbers;
      // })
    // .subscribe(item => {
    //   this.items.push(item);
    //   // reorder because mergeMap executes in parellel
    //   this.items.sort((a, b) => {
    //     if (a.id < b.id) return -1;
    //     if (a.id > b.id) return 1;
    //   });
    // });
  }
  // add back when alpha.4 is out
  // navigate(item) {
  //   this.router.navigate(['/list', JSON.stringify(item)]);
  // }
}
