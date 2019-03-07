import { Component } from '@angular/core';
import { HnDatastore, Updates } from '../datastore/hn.datastore.page';
import { config } from 'rxjs';

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
      .subscribe(res => 
        console.log('update', res.items, res.profiles)
      );
  }
}
