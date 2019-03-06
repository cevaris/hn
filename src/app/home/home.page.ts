import { Component } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Firebase } from '@ionic-native/firebase/ngx';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(
    private platform: Platform,
    private firebaseNative: Firebase,
    private firebaseBrowser: AngularFireDatabase
  ) {
    this.platform.ready().then(() => {
      if (this.platform.is('cordova')) {
        console.log("loading mobile firebase");
        this.firebaseNative.getToken()
          .then(token => console.log(`The token is ${token}`)) // save the token server-side and use it to push notifications to this device
          .catch(error => console.error('Error getting token', error));

        this.firebaseNative.onNotificationOpen()
          .subscribe(data => console.log(`User opened a notification ${data}`));

        this.firebaseNative.onTokenRefresh()
          .subscribe((token: string) => console.log(`Got a new token ${token}`));

      } else {
        // fallback to browser APIs
        console.log("loading browser firebase");
        this.firebaseBrowser.list<any>('/v0/topstories')
          .valueChanges()
          .subscribe(res => console.log(res));
      }
    });
  }
}
