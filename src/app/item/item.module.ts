import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { CommentComponent } from './comment/comment.component';
import { ItemPage } from './item.page';
import { SafeHtmlPipe } from '../utils/safe-html.pipe';


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
  declarations: [ItemPage, CommentComponent, SafeHtmlPipe]
})
export class ItemPageModule { }
