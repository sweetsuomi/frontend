import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DishPage } from './dish';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    DishPage,
  ],
  imports: [
    IonicPageModule.forChild(DishPage),
    ComponentsModule
  ]
})
export class DishPageModule {}
