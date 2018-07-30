import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DishesPage } from './dishes';
import { ComponentsModule } from '../../../../components/components.module';

@NgModule({
  declarations: [
    DishesPage,
  ],
  imports: [
    IonicPageModule.forChild(DishesPage),
    ComponentsModule
  ],
})
export class DishesPageModule {}
