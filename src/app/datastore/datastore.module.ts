import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { HnDatastore, HnBaseURL } from './hn.datastore';
import { CommonModule } from '@angular/common';
import { IonicStorageModule } from '@ionic/storage';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    CommonModule,
    AngularFireModule.initializeApp({
      databaseURL: HnBaseURL
    }),
    AngularFireDatabaseModule,
    HttpClientModule,
    IonicStorageModule.forRoot()
  ],
  providers: [HnDatastore]
})
export class DatastoreModule { }
