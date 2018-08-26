import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CommunicationPage } from './communication';
import { ComponentsModule } from '../../../components/components.module';

@NgModule({
  declarations: [
    CommunicationPage,
  ],
  imports: [
    IonicPageModule.forChild(CommunicationPage),
    ComponentsModule
  ],
})
export class CommunicationPageModule {}
