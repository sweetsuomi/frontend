import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { IntolerancesPage } from './intolerances';
import { ComponentsModule } from '../../../../components/components.module';

@NgModule({
  declarations: [
    IntolerancesPage,
  ],
  imports: [
    IonicPageModule.forChild(IntolerancesPage),
    ComponentsModule
  ],
})
export class IntolerancesPageModule {}
