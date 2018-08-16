import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CreateDishPage } from './create-dish';
import { ComponentsModule } from '../../../../components/components.module';

@NgModule({
  declarations: [
    CreateDishPage,
  ],
  imports: [
    IonicPageModule.forChild(CreateDishPage),
    ComponentsModule
  ],
})
export class CreateDishPageModule {}
