import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { GlobalProvider } from '../../providers/global-provider';
import { MenuProvider } from '../../providers/menu-provider';
import { OrderProvider } from '../../providers/order-provider';
import { LoadingComponent } from '../../components/loading/loading';

@IonicPage({
	segment: 'menu'
})
@Component({
	selector: 'page-home',
	templateUrl: 'home.html'
})

export class HomePage {
	
	private cloudFrontURL: String;
	private order: Object;
	private resume: Object;
	private isStoreOpened: boolean = false;
	
	constructor(
		private loading: LoadingComponent,
		private globalProvider: GlobalProvider,
		private menuProvider: MenuProvider,
		private orderProvider: OrderProvider,
		private navCtrl: NavController
	) {}
	
	ionViewDidLoad() {
		this.cloudFrontURL = this.globalProvider.cloudFrontURL;
		this.order = this.orderProvider.order;
		this.resume = undefined;
		this.getMenu();
	}
	
	ionViewDidEnter() {
		const orderMenu = this.orderProvider.getOrderMenuResume();
		if (orderMenu.quantity > 0) {
			this.resume = orderMenu;
		} else {
			this.resume = undefined;
		}
	}
	
	getMenu() {
		this.loading.createAnimation('Cargando plato...');
		return this.menuProvider.getMenu(null, null).then(() => {
			return this.menuProvider.filterGroupByCategory();
		}).then(() => {
			if (!Object.keys(this.menuProvider.menuList).length) {
				this.isStoreOpened = false;
			} else {
				this.isStoreOpened = true;
			}
			this.loading.stopAnimation();
		});
	}

	doRefresh(refresher) {
		this.getMenu().then(() => {
			refresher.complete();
		});
	}
	
	navigateToDishPage(category, dish) {
		this.navCtrl.push("DishPage", {
			category: category,
			dish: dish
		});
	}

	navigateToOrderDetail() {
		this.navCtrl.push("ShoppingCartPage");
	}
	
	objectKeys = Object.keys;
}
