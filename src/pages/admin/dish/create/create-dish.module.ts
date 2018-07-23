import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CreateDishPage } from './create-dish';

@NgModule({
  declarations: [
    CreateDishPage,
  ],
  imports: [
    IonicPageModule.forChild(CreateDishPage),
  ],
})
export class CreateDishPageModule {}
