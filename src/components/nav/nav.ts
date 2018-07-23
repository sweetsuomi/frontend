import { Component } from '@angular/core';
import { ViewController, NavController, MenuController } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth-provider';

@Component({
	selector: 'menu-nav',
	templateUrl: 'nav.html'
})

export class MenuNavComponent {

	private isLogged: boolean;
	private isAdmin: boolean;
	
	constructor(
		private menuCtrl: MenuController,
		private viewController: ViewController,
		private navCtrl: NavController,
		private authProvider: AuthProvider
	) {}

	ngOnInit() {
		this.viewController.didEnter.subscribe(() => {
			this.isLogged = this.authProvider.tryToInitCredentials();
			this.isAdmin = this.authProvider.isAdmin();
		});
	}
	
	logout() {
		this.authProvider.logout().then(() => {
			this.isLogged = false;
			this.isAdmin = false;
			this.menuCtrl.close();
		});
	}
	
	navigateToOrders() {
		this.menuCtrl.close();
		this.navCtrl.push("OrdersPage");
	}
	

	navigateToLogin() {
		this.menuCtrl.close();
		this.navCtrl.push("LoginPage");
	}
  
  navigateToRegister() {
		this.menuCtrl.close();
		this.navCtrl.push("RegisterPage");
	}
	
	navigateToAbout() {
		this.menuCtrl.close();
		this.navCtrl.push("AboutPage");
	}
	
	navigateToFeedback() {
		this.menuCtrl.close();
		this.navCtrl.push("FeedbackPage");
	}
	
	navigateToAdmin() {
		this.menuCtrl.close();
		this.navCtrl.setRoot("AdminHomePage");
	}
}
