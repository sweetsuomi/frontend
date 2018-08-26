import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';

import { OrderProvider } from '../../../../providers/order-provider';
import { LoadingComponent } from '../../../../components/loading/loading';
import { ToastComponent } from '../../../../components/toast/toast';
import { ScheduleProvider } from '../../../../providers/schedule-provider';
import * as moment from 'moment';

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
		private loading: LoadingComponent,
		private scheduleProvider: ScheduleProvider
	) { }

	ionViewDidLoad() {
		this.date = new Date().toISOString().split('T')[0];
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

	goToOrderDetail(key) {
		this.navCtrl.push('AdminOrderDetailPage', {
			order: key
		})
	}
}
