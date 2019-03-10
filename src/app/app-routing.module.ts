import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  { path: 'home', loadChildren: './home/home.module#HomePageModule' },
  { path: 'top-stories', loadChildren: './feed/feed.module#FeedPageModule' },
  { path: 'items/:id', loadChildren: './item-detail/item-detail.module#ItemDetailPageModule' },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
