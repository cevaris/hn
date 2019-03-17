import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { IonicConfig } from '@ionic/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DatastoreModule } from './datastore/datastore.module';
import { HnSettingsService } from './datastore/settings.service';
import { CommentComponent } from './item/comment/comment.component';
import { ToastService } from './toast/toast.service';
import { SafeHtmlPipe } from './utils/safe-html.pipe';

const config: IonicConfig = {
  scrollAssist: false
}

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(config),
    AppRoutingModule,
    DatastoreModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    ToastService,
    HnSettingsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }


@NgModule({
  imports: [CommonModule],
  declarations: [CommentComponent, SafeHtmlPipe],
  exports: [CommentComponent, SafeHtmlPipe]
})
export class SharedAppModule { }