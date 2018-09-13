import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AdminOrderDetailPage } from './admin-order-detail';
import { ComponentsModule } from '../../../../components/components.module';

@NgModule({
  declarations: [
    AdminOrderDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(AdminOrderDetailPage),
    ComponentsModule
  ],
})
export class AdminOrderDetailPageModule {}
