import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AdminOrderPage } from './admin-order';
import { ComponentsModule } from '../../../../components/components.module';

@NgModule({
	declarations: [
		AdminOrderPage,
	],
	imports: [
		IonicPageModule.forChild(AdminOrderPage),
		ComponentsModule
	],
})
export class AdminOrderPageModule {}
