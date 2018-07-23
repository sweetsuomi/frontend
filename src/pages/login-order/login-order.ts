import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth-provider';
import { OrderProvider } from '../../providers/order-provider';

@IonicPage()
@Component({
  selector: 'page-login-order',
  templateUrl: '../login/login.html'
})
export class LoginOrderPage {
	
	private auth: Object;
	
  constructor(
		private authProvider: AuthProvider,
		private orderProvider: OrderProvider,
		private navCtrl: NavController,
		private navParams: NavParams,
		private toastCtrl: ToastController
	) {}
	
	ionViewDidLoad() {
		// this.auth = this.authProvider.initAuth();
	}
	
	login() {
		// this.authProvider.validate().then(() => {
		// 	return this.authProvider.login();
		// }).then(response => {
		// 	this.orderProvider.postOrder()
		// }).then(() => {
		// 	this.navCtrl.setRoot('TicketPage');
		// }).catch(e => {
		// 	if (e.message === "The user is not logged") {
		// 		this.navCtrl.push('LoginOrderPage');
		// 	} else {
		// 		this.setToastMessage(e.message);
		// 	}
		// });
	}
	
	setToastMessage(message) {
		let toast = this.toastCtrl.create({
			message: message,
			duration: 3000,
			position: 'top'
		});
		toast.present();
	}
	
	goToRegister() {}
}
