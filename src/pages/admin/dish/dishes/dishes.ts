import { Component } from '@angular/core';
import { IonicPage, NavController, AlertController } from 'ionic-angular';

import { DishProvider } from '../../../../providers/dish-provider';
import { MenuProvider } from '../../../../providers/menu-provider';
import { GlobalProvider } from '../../../../providers/global-provider';
import { LoadingComponent } from '../../../../components/loading/loading';
import { ToastComponent } from '../../../../components/toast/toast';

@IonicPage()
@Component({
	selector: 'page-dishes',
	templateUrl: 'dishes.html',
})
export class DishesPage {

	s3Url: String;
	dishList: Array<any>;
	currentDateTime: number;
	menuDay: any;
	offset: number;
	limit: number;

	constructor(
		private menuProvider: MenuProvider,
		private navCtrl: NavController,
		private globalProvider: GlobalProvider,
		private loading: LoadingComponent,
		private dishProvider: DishProvider,
		private alertCtrl: AlertController,
		private toast: ToastComponent
	) { }

	ionViewDidLoad() {
		this.loading.createAnimation('Cargando listado...');
		this.s3Url = this.globalProvider.s3Url;
		this.offset = 0;
		this.limit = 10;
		this.loadMenuDay();
		this.loadDishes();
	}

	ionViewDidEnter() {
		this.currentDateTime = new Date().getTime();
	}

	loadMenuDay() {
		this.dishProvider.dishList = [];
		this.menuProvider.getMenu().then(() => {
			return this.menuProvider.filterMenuListGroupById();
		}).then(response => {
			this.menuDay = response;
		}).catch(e => {
			this.toast.setToastError(e);
		});
	}

	loadDishes() {
		this.dishProvider.loadDishes(0, this.offset, this.limit).then(() => {
			this.offset += this.limit;
			this.dishList = this.dishProvider.dishList
		}).catch(e => {
			this.toast.setToastError(e);
		}).then(() => {
			this.loading.stopAnimation();
		});
	}

	doInfinite(infiniteScroll) {
		this.dishProvider.loadDishes(0, this.offset, this.limit).then(() => {
			this.offset += this.limit;
			this.dishList = this.dishProvider.dishList;
			setTimeout(() => {
				infiniteScroll.complete();
			}, 500);
		}).catch(e => {
			this.toast.setToastError(e);
		});
	}

	deleteDish(key) {
		let prompt = this.alertCtrl.create({
			title: 'Borrar plato',
			message: "¿Estás seguro que quieres eliminar: <b>" + this.dishList[key].title + '?</b>',
			buttons: [{
				text: 'Cancelar'
			}, {
				text: 'Aceptar',
				handler: data => {
					this.loading.createAnimation('Borrando plato...');
					this.dishProvider.deleteDish(key).catch(e => {
						this.toast.setToastError(e);
					}).then(() => {
						this.loading.stopAnimation();
					});
				}
			}]
		});
		prompt.present();
	}

	isEnabled(key) {
		return this.menuDay[key] ? false : true;
	}

	pushNewCreateDishPage() {
		this.navCtrl.push('CreateDishPage');
	}

	goToDishDetail(key) {
		this.navCtrl.push('UpdateDishPage', {
			key: key
		});
	}
}
