import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LoginOrderPage } from './login-order';

@NgModule({
  declarations: [
    LoginOrderPage,
  ],
  imports: [
    IonicPageModule.forChild(LoginOrderPage),
  ],
})
export class LoginOrderPageModule {}
