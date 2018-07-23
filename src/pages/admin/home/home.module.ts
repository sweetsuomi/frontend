import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AdminHomePage } from './home';

@NgModule({
  declarations: [
    AdminHomePage,
  ],
  imports: [
    IonicPageModule.forChild(AdminHomePage),
  ],
})
export class AdminHomePageModule {}
