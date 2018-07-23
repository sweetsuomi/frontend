import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { ItemSliding } from 'ionic-angular';
import { GlobalProvider } from '../../providers/global-provider';
import { OrderProvider } from '../../providers/order-provider';
import { ScheduleProvider } from '../../providers/schedule-provider';

import { LoadingComponent } from '../../components/loading/loading';
import { ToastComponent } from '../../components/toast/toast';
import * as moment from 'moment';

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
	  	private scheduleProvider: ScheduleProvider,
	  	private navCtrl: NavController,
		private loading: LoadingComponent,
		private toast: ToastComponent
	) {}

  	ionViewDidLoad() {
		this.loading.createAnimation('Cargando pedido...');
		this.cloudFrontURL = this.globalProvider.getCloudFrontUrl();
		this.setupTimes();
		this.resume = this.orderProvider.getOrderMenuResume();
		this.order = this.orderProvider.order;
		this.loading.stopAnimation();
	}

	setupTimes() {
		this.scheduleProvider.getScheduleFinishFirst().then(time => {
			this.time = {
				minTime: moment().add(15, 'minutes').format('HH:mm'),
				maxTime: moment(time, "hmm").format("HH:mm")
			};
			this.date = moment().format('HH:mm');
		});
	}
	
	removeDishFromOrder(key) {
		this.orderProvider.removeDishFromOrder(key);
		this.resume = this.orderProvider.getOrderMenuResume();
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
		// this.orderProvider.postOrder().then(() => {
			this.navCtrl.setRoot('TicketPage');
		// }).catch(e => {
		// 	if (e.message === "The user is not logged") {
		// 		this.navCtrl.push('LoginOrderPage');
		// 	} else {
		// 		this.toast.setToastMessage(e.message);
		// 	}
		// });
	}
	
	objectKeys = Object.keys;
}
