import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';

import { OrderProvider } from '../../providers/order-provider';
import { LoadingComponent } from '../../components/loading/loading';
import { ToastComponent } from '../../components/toast/toast';
import moment from 'moment';

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
		private toast: ToastComponent,
		private navCtrl: NavController
	) { }

	ionViewDidLoad() {
		this.date = moment().format("YYYY-MM-DD");
	}

	ionViewDidEnter() {
		this.loading.createAnimation('Cargando listado de pedidos...');
		this.loadOrders();
	}

	loadOrders() {
		this.orderProvider.getOrderList(this.date).then(response => {
			this.orderList = Object.keys(response).map(key => response[key]);
		}).catch(e => {
			this.toast.setToastError(e);
		}).then(() => {
			this.loading.stopAnimation();
		});
	}

	changeDate() {
		this.loading.createAnimation('Cargando listado de pedidos...');
		this.orderList = undefined;
		this.loadOrders();
	}

	goToOrderDetail(key) {
		this.navCtrl.push('OrderPage', {
			order: key
		});
	}
}