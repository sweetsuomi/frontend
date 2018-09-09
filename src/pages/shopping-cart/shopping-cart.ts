import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { ItemSliding } from 'ionic-angular';
import { GlobalProvider } from '../../providers/global-provider';
import { OrderProvider } from '../../providers/order-provider';

import { LoadingComponent } from '../../components/loading/loading';
import { ToastComponent } from '../../components/toast/toast';
import moment from 'moment';

@IonicPage()
@Component({
	selector: 'page-shopping-cart',
	templateUrl: 'shopping-cart.html',
})
export class ShoppingCartPage {

	private cloudFrontURL: String;
	private order: any;
	private resume: any;
	private time: any;
	private date: String;

	constructor(
		private globalProvider: GlobalProvider,
		private orderProvider: OrderProvider,
		private navCtrl: NavController,
		private loading: LoadingComponent,
		private toast: ToastComponent
	) { }

	ionViewDidLoad() {
		this.loading.createAnimation('Cargando pedido...');
		this.cloudFrontURL = this.globalProvider.cloudFrontURL;
		this.setupTimes();
		this.resume = this.orderProvider.getOrderMenuResume();
		this.order = this.orderProvider.order;
		this.loading.stopAnimation();
	}

	setupTimes() {
		const orderDish = this.orderProvider.order.orderDish;
		const time = Object.keys(orderDish)
			.map(index => orderDish[index].schedule)
			.reduce((previous, current) => current.timeEnd > previous.timeEnd ? previous.timeEnd : current.timeEnd);

		const minTime = moment().add(this.globalProvider.removeDishFromMenu, 'minutes');
		const maxTime = moment(typeof time === 'object' ? time.timeEnd : time, "LT");
		const timeError = minTime.isAfter(maxTime);

		this.time = {
			minTime: minTime.format('HH:mm'),
			maxTime: maxTime.format("HH:mm"),
			error: timeError
		};

		this.date = moment().format('HH:mm');
	}

	removeDishFromOrder(key) {
		this.orderProvider.removeDishFromOrder(key);
		this.resume = this.orderProvider.getOrderMenuResume();
		this.setupTimes();
		if (this.resume.quantity === 0) {
			this.navCtrl.pop();
		}
	}

	removeDishWithAnimation(key, slidingItem: ItemSliding) {
		slidingItem.close();
		setTimeout(() => {
			this.removeDishFromOrder(key);
		}, 500);
	}

	postOrder() {
		this.orderProvider.postOrder(this.order, this.date).then(() => {
			this.orderProvider.pending = {};
			this.navCtrl.setRoot('TicketPage');
		}).catch(e => {
			if (e.message === "The user is not logged") {
				this.navCtrl.push('LoginOrderPage');
			} else {
				this.toast.setToastError(e);
			}
		});
	}

	objectKeys = Object.keys;
}
