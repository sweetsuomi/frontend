import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';

import { OrderProvider } from '../../../../providers/order-provider';
import { LoadingComponent } from '../../../../components/loading/loading';
import { ToastComponent } from '../../../../components/toast/toast';
import moment from 'moment';

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
		private toast: ToastComponent,
		private loading: LoadingComponent
	) { }

	ionViewDidLoad() {
		this.date = moment().format("YYYY-MM-DD");
	}

	ionViewDidEnter() {
		this.loadCurrentOrders();
	}
	
	loadCurrentOrders() {
		this.loading.createAnimation('Cargando listado de pedidos...');
		this.orders = undefined;
		this.orderProvider.getOrderList(this.date).then(response => {
			this.orders = response;
		}).catch(e => {
			this.toast.setToastError(e);
		}).then(() => {
			this.loading.stopAnimation();
		});
	}

	formatTime(time) {
		return moment(time, "hmm").format("HH:mm");
	}

	goToOrderDetail(id) {
		this.navCtrl.push('AdminOrderDetailPage', {
			orderId: id
		})
	}
}
