import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SchedulesPage } from './schedules';
import { ComponentsModule } from '../../../components/components.module';

@NgModule({
  declarations: [
    SchedulesPage,
  ],
  imports: [
    IonicPageModule.forChild(SchedulesPage),
    ComponentsModule
  ],
})
export class SchedulesPageModule {}
