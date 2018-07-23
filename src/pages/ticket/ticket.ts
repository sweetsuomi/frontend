import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';

import { OrderProvider } from '../../providers/order-provider';

@IonicPage()
@Component({
  selector: 'page-ticket',
  templateUrl: 'ticket.html',
})
export class TicketPage {

	private date: Object;
	private price: number;
	
  constructor(
		private orderProvider: OrderProvider,
		private navCtrl: NavController
	) {}

  ionViewDidLoad() {
		this.date = this.orderProvider.order.date;
		this.price = this.orderProvider.price;
	}
	
	public goToHome() {
		this.orderProvider.resetOrder().then(() => {
			this.navCtrl.setRoot('HomePage');
		});
	}
}
