import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { IntolerancesPage } from './intolerances';

@NgModule({
  declarations: [
    IntolerancesPage,
  ],
  imports: [
    IonicPageModule.forChild(IntolerancesPage),
  ],
})
export class IntolerancesPageModule {}
