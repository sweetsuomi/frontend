import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { DishProvider } from '../../../../providers/dish-provider';
import { CategoryProvider } from '../../../../providers/category-provider';
import { IntoleranceProvider } from '../../../../providers/intolerance-provider';
import { MenuProvider } from '../../../../providers/menu-provider';
import { LoadingComponent } from '../../../../components/loading/loading';
import { GlobalProvider } from '../../../../providers/global-provider';

@IonicPage()
@Component({
  selector: 'page-dishes',
  templateUrl: 'dishes.html',
})
export class DishesPage {
	
	cloudFrontURL: String;
	dishList: Object;
	currentDateTime: number;
	menuDay: any;

  constructor(
		private categoryProvider: CategoryProvider,
		private intoleranceProvider: IntoleranceProvider,
		private menuProvider: MenuProvider,
		private navCtrl: NavController,
		private globalProvider: GlobalProvider,
		private loading: LoadingComponent,
		private dishProvider: DishProvider,
		private alertCtrl: AlertController,
	 	private toastCtrl: ToastController
	) {}

  ionViewDidLoad() {	
		this.loading.createAnimation('Cargando listado...');
		this.cloudFrontURL = this.globalProvider.getCloudFrontUrl();
		this.currentDateTime = new Date().getTime();
		this.loadCategoriesAndIntolerances();
		this.loadMenuDay();
		this.loadDishes();
	}
	
	loadCategoriesAndIntolerances() {
		Promise.all([
			this.intoleranceProvider.loadIntolerances(),
			this.categoryProvider.loadCategories()
		]).then(() => {
			return Promise.all([
				this.intoleranceProvider.filterGroupById(),
				this.categoryProvider.filterGroupById()
			]);
		}).catch(e => {
			this.setToastMessage(e.message);
		});
	}
	
	loadMenuDay() {
		// let date = new Date().toISOString().split('T')[0];
		// this.menuProvider.getMenu(date)
		// 	.then(() => {
		// 		return this.menuProvider.filterMenuListGroupById();
		// 	}).then(response => {
		// 		this.menuDay = response;
		// 	}).catch(e => {
		// 		this.setToastMessage(e.message);
		// 	});
	}
	
	loadDishes() {
		// this.dishProvider.loadDishes().then(response => {
		// 	return this.dishProvider.filterGroupById();
		// }).then(response => {
		// 	this.dishList = response;
		// }).catch(e => {
		// 	this.setToastMessage(e.message);
		// }).then(() => {
		// 	this.loading.stopAnimation();
		// });
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
					this.dishProvider.deleteDish(key)
						.then(response => {
							this.dishList = response;
						}).catch(e => {
							this.setToastMessage(e.message);
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
			dish: key
		});
	}
	
	objectKeys = Object.keys;
	
	setToastMessage(message) {
		let toast = this.toastCtrl.create({
			message: message,
			duration: 3000,
			position: 'top'
		});
		toast.present();
	}

}
