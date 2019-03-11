import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { IonicStorageModule } from '@ionic/storage';
import { CacheService } from './cache.service.';
import { HnBaseURL, HnService } from './hn.service';

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
  providers: [HnService, CacheService]
})
export class DatastoreModule { }
