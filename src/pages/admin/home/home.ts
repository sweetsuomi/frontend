import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { AuthProvider } from '../../../providers/auth-provider';

@IonicPage()
@Component({
	selector: 'page-admin-home',
	templateUrl: 'home.html',
})
export class AdminHomePage {
	
	constructor(
		private authProvider: AuthProvider,
		public navCtrl: NavController
	) {}
	
	navigateToAdminCreateMenu() {
		this.navCtrl.push("CreateMenuPage");
	}

	navigateToSchedules() {
		this.navCtrl.push("SchedulesPage");
	}
	
	navigateToDishes() {
		this.navCtrl.push("DishesPage");
	}
	
	navigateToCategories() {
		this.navCtrl.push("CategoriesPage");
	}
	
	navigateToIntolerances() {
		this.navCtrl.push("IntolerancesPage");
	}
	
	navigateToHistoricOrders() {
		this.navCtrl.push("AdminOrderPage")	
	}

	navigateToStats() {
		this.navCtrl.push('StatsPage');
	}
	
	navigateToCommunication() {
		this.navCtrl.push('CommunicationPage');
	}
	
	logout() {
		this.authProvider.logout().then(() => {
			this.navCtrl.setRoot('HomePage');
		});
	}
}
