import { Component } from '@angular/core';
import { HnDatastore } from '../datastore/hn.datastore.page';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(
    private datastore: HnDatastore
  ) {
    this.datastore.getUpdates()
      .subscribe(res => console.log('updates', res));
  }
}
