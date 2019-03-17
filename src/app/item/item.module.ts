import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { SharedAppModule } from '../app.module';
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
    ]),
    SharedAppModule,
  ],
  declarations: [ItemPage]
})
export class ItemPageModule { }
