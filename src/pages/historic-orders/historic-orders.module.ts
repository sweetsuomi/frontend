import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HistoricOrdersPage } from './historic-orders';

@NgModule({
  declarations: [
    HistoricOrdersPage,
  ],
  imports: [
    IonicPageModule.forChild(HistoricOrdersPage),
  ],
})
export class HistoricOrdersPageModule {}
