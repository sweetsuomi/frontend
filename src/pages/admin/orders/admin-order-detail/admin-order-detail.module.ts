import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AdminOrderDetailPage } from './admin-order-detail';

@NgModule({
  declarations: [
    AdminOrderDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(AdminOrderDetailPage),
  ],
})
export class AdminOrderDetailPageModule {}
