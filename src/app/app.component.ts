import { Component } from '@angular/core';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  public appPages = [
    { title: 'Top', url: '/feed/top', icon: 'star' },
    { title: 'New', url: '/feed/new', icon: 'flash' },
    { title: 'Ask', url: '/feed/ask', icon: 'help' },
    { title: 'Show', url: '/feed/show', icon: 'list' },
    { title: 'Jobs', url: '/feed/job', icon: 'briefcase' },
    { title: 'Best', url: '/feed/best', icon: 'ribbon' },
    { title: 'Settings', url: '/settings', icon: 'settings', divide: true },
  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
}
