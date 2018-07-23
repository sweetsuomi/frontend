import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CreateIntolerancePage } from './create-intolerance';

@NgModule({
  declarations: [
    CreateIntolerancePage,
  ],
  imports: [
    IonicPageModule.forChild(CreateIntolerancePage),
  ],
})
export class CreateIntolerancePageModule {}
