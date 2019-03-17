import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'feed/top',
    pathMatch: 'full'
  },
  { path: 'home', loadChildren: './home/home.module#HomePageModule' },
  { path: 'feed/:type', loadChildren: './feed/feed.module#FeedPageModule' },
  { path: 'items/:id', loadChildren: './item/item.module#ItemPageModule' },
  { path: 'settings', loadChildren: './settings/settings.module#SettingsPageModule' },
  { path: 'users/:id', loadChildren: './user/user.module#UserPageModule' },
  { path: 'users/', loadChildren: './user/user.module#UserPageModule' },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
