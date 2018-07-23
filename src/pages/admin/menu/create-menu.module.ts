import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CreateMenuPage } from './create-menu';
import { ComponentsModule } from '../../../components/components.module';

@NgModule({
  declarations: [
    CreateMenuPage,
  ],
  imports: [
    IonicPageModule.forChild(CreateMenuPage),
    ComponentsModule
  ],
})
export class AdminCreateMenuPageModule {}
