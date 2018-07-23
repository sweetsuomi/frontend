import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UpdateDishPage } from './update-dish';
import { AndroidPermissions } from '@ionic-native/android-permissions';

@NgModule({
  declarations: [
    UpdateDishPage,
  ],
  imports: [
    IonicPageModule.forChild(UpdateDishPage),
  ],
	providers: [
		AndroidPermissions
	]
})
export class UpdateDishPageModule {}
