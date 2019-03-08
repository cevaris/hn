import { Component, OnInit } from '@angular/core';
import { Observable, from } from 'rxjs';
import { map, mergeMap, flatMap } from 'rxjs/operators';
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

  public items: Item[];
  topStories: Observable<number[]>;

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

    this.items = [];
    this.topStories = this.datastore.getTopStories();
    this.topStories
      .pipe(
        flatMap(itemIds => {
          return itemIds.slice(0, 30);
        }),
        mergeMap(itemId => {
          return <Observable<Item>>this.datastore.getItem(itemId);
        })
      )
      .subscribe(items => {
        this.items.push(items);
        // reorder because mergeMap executes in parellel
        this.items.sort((a, b) => {
            if(a.id < b.id) return -1;
            if(a.id > b.id) return 1;
        });
      });
  }
  // add back when alpha.4 is out
  // navigate(item) {
  //   this.router.navigate(['/list', JSON.stringify(item)]);
  // }
}
