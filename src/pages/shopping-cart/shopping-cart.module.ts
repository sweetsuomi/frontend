import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ShoppingCartPage } from './shopping-cart';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    ShoppingCartPage,
  ],
  imports: [
    IonicPageModule.forChild(ShoppingCartPage),
    ComponentsModule
  ]
})
export class ShoppingCartPageModule {}
