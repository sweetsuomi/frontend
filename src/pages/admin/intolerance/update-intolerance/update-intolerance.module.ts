import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UpdateIntolerancePage } from './update-intolerance';
import { ComponentsModule } from '../../../../components/components.module';

@NgModule({
  declarations: [
    UpdateIntolerancePage,
  ],
  imports: [
    IonicPageModule.forChild(UpdateIntolerancePage),
    ComponentsModule
  ],
})
export class UpdateIntolerancePageModule {}
