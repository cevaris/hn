import { Component, OnInit } from '@angular/core';
import { HnDatastore } from '../datastore/hn.datastore.page';

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
  
  public items: Array<{ title: string; note: string; icon: string }> = [];
  
  constructor(private datastore: HnDatastore) {

    this.datastore.getUpdates()
      .subscribe(res => {
        console.log('update', res.items, res.profiles)
        this.items = [];
        res.items.forEach(itemId => {
          this.items.push({
            title: `Item: ${itemId}`,
            note: '',
            icon: this.icons[itemId % this.icons.length]
          })
        });
      });
  }

  ngOnInit() {
  }
  // add back when alpha.4 is out
  // navigate(item) {
  //   this.router.navigate(['/list', JSON.stringify(item)]);
  // }
}
