import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { ToastController } from 'ionic-angular';

import { OrderProvider } from '../../providers/order-provider';
import { LoadingComponent } from '../../components/loading/loading';

@IonicPage()
@Component({
  selector: 'page-orders',
  templateUrl: 'orders.html',
})
export class OrdersPage {
	
	private orderList: Object;
	private date: String;
	
  constructor(
		private loading: LoadingComponent,
		private orderProvider: OrderProvider,
		private toastCtrl: ToastController,
		private navCtrl: NavController
	) {}

  ionViewDidLoad() {
		this.date = new Date().toISOString().split('T')[0];
	}
	
	ionViewDidEnter() {
		this.loading.createAnimation('Cargando listado de pedidos...');
		this.loadOrders();
	}
	
	loadOrders() {
		this.orderProvider.getUserOrderList(this.date).then(response => {
			this.orderList = response;
		}).catch(e => {
			this.setToastMessage(e.message);
		}).then(() => {
			this.loading.stopAnimation();
		});
	}
	
	changeDate() {
		this.loading.createAnimation('Cargando listado de pedidos...');
		this.orderList = undefined;
		this.loadOrders();
	}
	
	formatDate(date) {
		return date.split('T')[1].slice(0, -8);
	}
	
	setToastMessage(message) {
		let toast = this.toastCtrl.create({
			message: message,
			duration: 3000,
			position: 'top'
		});
		toast.present();
	}
	
	public goToOrderDetail(key) {
		this.navCtrl.push('OrderPage', {
			order: key
		});
	}
	
	public objectKeys = Object.keys;

}