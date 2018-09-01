import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';

import { AuthProvider } from '../../providers/auth-provider';
import { OrderProvider } from '../../providers/order-provider';
import { ToastComponent } from '../../components/toast/toast';

@IonicPage()
@Component({
	selector: 'page-login-order',
	templateUrl: '../login/login.html'
})
export class LoginOrderPage {

	constructor(
		private authProvider: AuthProvider,
		private orderProvider: OrderProvider,
		private navCtrl: NavController,
		private toast: ToastComponent
	) { }

	ionViewDidLoad() {
		this.authProvider.initAuth();
	}

	login() {
		this.authProvider.validate().then(() => {
			return this.authProvider.login();
		}).then(() => {
			return this.orderProvider.postPendingOrder()
		}).then(() => {
			this.navCtrl.setRoot('TicketPage');
		}).catch(e => {
			this.toast.setToastError(e);
		});
	}

	goToRegister() { }
}
