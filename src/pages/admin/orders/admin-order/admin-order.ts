import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { ToastController } from 'ionic-angular';

import { OrderProvider } from '../../../../providers/order-provider';
import { LoadingComponent } from '../../../../components/loading/loading';

@IonicPage()
@Component({
  selector: 'page-admin-order',
  templateUrl: 'admin-order.html',
})
export class AdminOrderPage {
	
	private orders: Object;
	private date: string;

	constructor(
		private navCtrl: NavController,
		private orderProvider: OrderProvider,
		private toastCtrl: ToastController,
		private loading: LoadingComponent
	) {}

  ionViewDidLoad() {
		this.date = new Date().toISOString().split('T')[0];
  }
	
	ionViewDidEnter() {
		this.loading.createAnimation('Cargando listado de pedidos...');
		this.loadOrders();
	}
	
	loadOrders() {
		this.orderProvider.getOrderList(this.date).then(response => {
			this.orders = response;
		}).catch(e => {
			this.setToastMessage(e.message);
		}).then(() => {
			this.loading.stopAnimation();
		});
	}
	
	formatDate(date) {
		return date.split('T')[1].slice(0, -8);
	}
	
	changeDate() {
		this.loading.createAnimation('Cargando listado...');
		this.orders = undefined;
		this.loadOrders();
	}

	setToastMessage(message) {
		let toast = this.toastCtrl.create({
			message: message,
			duration: 3000,
			position: 'top'
		});
		toast.present();
	}
	
	objectKeys = Object.keys;
	
	goToOrderDetail(key) {
		this.navCtrl.push('AdminOrderDetailPage', {
			order: key
		})
	}
}
