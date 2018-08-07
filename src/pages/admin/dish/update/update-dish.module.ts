import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UpdateDishPage } from './update-dish';
import { AndroidPermissions } from '@ionic-native/android-permissions';
import { ComponentsModule } from '../../../../components/components.module';

@NgModule({
  declarations: [
    UpdateDishPage,
  ],
  imports: [
    IonicPageModule.forChild(UpdateDishPage),
    ComponentsModule
  ],
	providers: [
		AndroidPermissions
	]
})
export class UpdateDishPageModule {}
