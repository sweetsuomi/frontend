import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AdminOrderPage } from './admin-order';

@NgModule({
  declarations: [
    AdminOrderPage,
  ],
  imports: [
    IonicPageModule.forChild(AdminOrderPage),
  ],
})
export class AdminOrderPageModule {}
