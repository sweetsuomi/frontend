import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LoginOrderPage } from './login-order';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    LoginOrderPage,
  ],
  imports: [
    IonicPageModule.forChild(LoginOrderPage),
    ComponentsModule
  ],
})
export class LoginOrderPageModule {}
