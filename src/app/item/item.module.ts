import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { CommentComponent } from './comment/comment.component';
import { ItemPage } from './item.page';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild([
      {
        path: '',
        component: ItemPage
      }
    ])
  ],
  declarations: [ItemPage, CommentComponent]
})
export class ItemPageModule { }
