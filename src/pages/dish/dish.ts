import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';

import { GlobalProvider } from '../../providers/global-provider';
import { MenuProvider } from '../../providers/menu-provider';
import { OrderProvider } from '../../providers/order-provider';

import { LoadingComponent } from '../../components/loading/loading';
import { ToastComponent } from '../../components/toast/toast';

@IonicPage({
	segment: 'dish'
})
@Component({
	selector: 'page-dish',
	templateUrl: 'dish.html',
})
export class DishPage {
	
	private dish: any;
	private booked: number;
	private cloudFrontURL: String;

	constructor(
		private loading: LoadingComponent,
		private globalProvider: GlobalProvider,
		private menuProvider: MenuProvider,
		private orderProvider: OrderProvider,
		private navParams: NavParams,
		private navCtrl: NavController,
		private alertCtrl: AlertController,
		private toast: ToastComponent
	) {}
	
	ionViewDidLoad() {
		this.cloudFrontURL = this.globalProvider.cloudFrontURL;
		this.loading.createAnimation('Cargando plato...');
		this.dish = this.menuProvider.getDishFromMenu(
			this.navParams.get('category'),
			this.navParams.get('dish')
		);
		this.booked = this.orderProvider.getDishQuantity(this.dish.dish._id) || 0;
		this.loading.stopAnimation();
	}

	removeQuantity() {
		this.orderProvider.removeDishFromOrder(this.dish.dish._id);
		this.navCtrl.pop();
	}
	
	promptQuantity() {
		this.alertCtrl.create({
			title: 'Cantidad',
			message: "Agrega el número de platos",
			inputs: [{
				name: 'quantity',
				placeholder: 'Cantidad',
				type: 'number',
				min: 1,
				max: this.dish.quantity
			}],
			buttons: [{
				text: 'Cancelar'
			}, {
				text: 'Agregar',
				handler: data => {
					const quantity = parseInt(data.quantity);
					if (!isNaN(quantity) && quantity <= this.dish.quantity && quantity > 0) {
						this.orderProvider.addDishToOrder(this.dish._id, this.dish, quantity);
						this.navCtrl.pop();
					} else {
						this.toast.setToastError(new Error("Introduce una cantidad válida menor o igual que la cantidad de unidades displonibles"));
					}
				}
			}]
		}).present();
	}

	isEmptyObject(obj) {
		return (obj && (Object.keys(obj).length > 0));
	}
}
