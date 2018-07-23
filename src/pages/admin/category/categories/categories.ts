import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';

import { LoadingComponent } from '../../../../components/loading/loading';

import { CategoryProvider } from '../../../../providers/category-provider';
import { GlobalProvider } from '../../../../providers/global-provider';

@IonicPage()
@Component({
  selector: 'page-categories',
  templateUrl: 'categories.html',
})
export class CategoriesPage {
	
	private cloudFrontURL: String;
	private categoryList: any;

  constructor(
		private globalProvider: GlobalProvider,
		private loading: LoadingComponent,
		private categoryProvider: CategoryProvider,
	 	private toastCtrl: ToastController,
		private alertCtrl: AlertController
	) {}

  ionViewDidLoad() {
		this.loading.createAnimation('Cargando listado...');
		this.cloudFrontURL = this.globalProvider.getCloudFrontUrl();
		this.categoryProvider.loadCategories()
			.then(response => {
				this.categoryList = response;
			}).catch(e => {
				this.setToastMessage(e.message);
			}).then(() => {
				this.loading.stopAnimation();
			});
	}
	
	createCategory() {
		this.displayPrompt()
			.then(category => {
				if (category) {
					this.loading.createAnimation('Creando categoría...');
					this.categoryProvider.postCategory(category).then(() => {
						return this.categoryProvider.loadCategories();
					}).then(response => {
						this.categoryList = response;
					}).catch(e => {
						this.setToastMessage(e.message);
					}).then(() => {
						this.loading.stopAnimation();
					});
				}
		});
	}
	
	updateCategory(key) {
		this.displayPrompt(this.categoryList[key].name).then(response => {
			if (response) {
				this.loading.createAnimation('Actualizando categoría...');
				this.categoryProvider.updateCategory(this.categoryList[key]._id, response)
					.then(() => {
						return this.categoryProvider.loadCategories();
					}).then(response => {
						this.categoryList = response;
					}).catch(e => {
						this.setToastMessage(e.message);
					}).then(() => {
						this.loading.stopAnimation();
					});
			}
		});
	}
	
	displayPrompt(name = undefined) {
		return new Promise((resolve, reject) => {
			let prompt = this.alertCtrl.create({
				title: 'Categoría',
				message: "",
				inputs: [{
					name: 'category',
					placeholder: 'entrante, postre...',
					value: name,
					type: 'string'
				}],
				buttons: [{
					text: 'Cancelar',
					handler: data => {
						resolve(false);
					}
				}, {
					text: 'Agregar',
					handler: data => {
						typeof data.category === 'string'
							?	resolve(data.category)
							: resolve(false)
					}
				}]
			});
			prompt.present();
		});
	}
	
	deleteCategory(key): Promise<boolean> {
		return new Promise((resolve, reject) => {
			let prompt = this.alertCtrl.create({
				title: 'Borrar categoría',
				message: "¿Estás seguro que quieres eliminar la categoría: <b>" + this.categoryList[key].name + '?</b>',
				buttons: [{
					text: 'Cancelar',
				}, {
					text: 'Aceptar',
					handler: data => {
						this.loading.createAnimation('Borrando categoría...');
						this.categoryProvider.deleteCategory(key)
							.then(response => {
								this.categoryList = response;
							}).catch(e => {
								this.setToastMessage(e.message);
							}).then(() => {
								this.loading.stopAnimation();
							});
					}
				}]
			});
			prompt.present();
		});
	}
	
	setToastMessage(message) {
		let toast = this.toastCtrl.create({
			message: message,
			duration: 3000,
			position: 'top'
		});
		toast.present();
	}

}
