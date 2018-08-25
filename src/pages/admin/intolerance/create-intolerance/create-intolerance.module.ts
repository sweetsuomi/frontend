import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CreateIntolerancePage } from './create-intolerance';
import { ComponentsModule } from '../../../../components/components.module';

@NgModule({
  declarations: [
    CreateIntolerancePage
  ],
  imports: [
    IonicPageModule.forChild(CreateIntolerancePage),
    ComponentsModule
  ],
})
export class CreateIntolerancePageModule {}
