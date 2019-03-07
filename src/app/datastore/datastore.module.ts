import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { HnDatastore } from './hn.datastore.page';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
    CommonModule,
    AngularFireModule.initializeApp({ databaseURL: 'https://hacker-news.firebaseio.com' }),
    AngularFireDatabaseModule
  ],
  providers: [HnDatastore]
})
export class DatastoreModule { }
