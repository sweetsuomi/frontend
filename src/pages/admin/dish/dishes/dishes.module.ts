import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DishesPage } from './dishes';

@NgModule({
  declarations: [
    DishesPage,
  ],
  imports: [
    IonicPageModule.forChild(DishesPage),
  ],
})
export class DishesPageModule {}
