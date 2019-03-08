import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { HnDatastore } from './hn.datastore';
import { CommonModule } from '@angular/common';
import { IonicStorageModule } from '@ionic/storage';

@NgModule({
  imports: [
    CommonModule,
    AngularFireModule.initializeApp({
      databaseURL: 'https://hacker-news.firebaseio.com'
    }),
    AngularFireDatabaseModule,
    IonicStorageModule.forRoot()
  ],
  providers: [HnDatastore]
})
export class DatastoreModule { }
