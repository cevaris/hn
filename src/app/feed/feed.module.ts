import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { ItemComponent } from '../item/item.component';
import { FeedPage } from './feed.page';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild([
      {
        path: '',
        component: FeedPage
      }
    ])
  ],
  declarations: [FeedPage, ItemComponent]
})
export class FeedPageModule { }
