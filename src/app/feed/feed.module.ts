import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { FeedPage } from './feed.page';
import { RowComponent } from './row/row.component';

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
  declarations: [FeedPage, RowComponent]
})
export class FeedPageModule { }
