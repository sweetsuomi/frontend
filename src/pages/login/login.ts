import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';

import { AuthProvider } from '../../providers/auth-provider';
import { ToastComponent } from '../../components/toast/toast';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
	
  	constructor(
		private authProvider: AuthProvider,
		private navCtrl: NavController,
		private toast: ToastComponent
	) {}
	
	ionViewDidLoad() {
		this.authProvider.initAuth();
	}
	
	login() {
		return this.authProvider.login().then(() => {
			if (this.authProvider.role === 'admin') {
				this.navCtrl.setRoot('AdminHomePage');
			} else {
				this.navCtrl.pop();
			}
		}).catch(e => this.toast.setToastError(e));
	}
	
	goToRegister() {
		this.navCtrl.push('RegisterPage');
	}
}
