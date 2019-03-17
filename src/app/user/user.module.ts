import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { SafeHtmlPipe } from '../utils/safe-html.pipe';
import { UserPage } from './user.page';
import { CommentComponent } from '../item/comment/comment.component';

const routes: Routes = [
  {
    path: '',
    component: UserPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [UserPage, SafeHtmlPipe, CommentComponent]
})
export class UserPageModule { }
