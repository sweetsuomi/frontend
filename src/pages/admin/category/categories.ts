import { Component } from '@angular/core';
import { IonicPage, AlertController } from 'ionic-angular';
import { LoadingComponent } from '../../../components/loading/loading';
import { ToastComponent } from '../../../components/toast/toast';
import { CategoryProvider } from '../../../providers/category-provider';

@IonicPage()
@Component({
	selector: 'page-categories',
	templateUrl: 'categories.html',
})
export class CategoriesPage {

	private categoryList: any;

	constructor(
		private loading: LoadingComponent,
		private categoryProvider: CategoryProvider,
		private toast: ToastComponent,
		private alertCtrl: AlertController
	) { }

	ionViewDidLoad() {
		this.loading.createAnimation('Cargando listado...');
		this.loadCategories();
	}

	loadCategories() {
		this.categoryProvider.loadCategories().then(response => {
			this.categoryList = response;
		}).catch(e => {
			this.toast.setToastError(e);
		}).then(() => {
			this.loading.stopAnimation();
		});
	}

	createCategory() {
		this.displayPrompt().then(category => {
			if (category) {
				this.loading.createAnimation('Creando categoría...');
				this.categoryProvider.postCategory(category).then(() => {
					this.loadCategories();
				});
			}
		});
	}

	updateCategory(category) {
		this.displayPrompt(category.name).then(response => {
			if (response) {
				this.loading.createAnimation('Actualizando categoría...');
				this.categoryProvider.updateCategory(category._id, response).then(() => {
					this.loadCategories();
				});
			}
		});
	}

	deleteCategory(category) {
		this.alertCtrl.create({
			title: 'Borrar categoría',
			message: "¿Estás seguro que quieres eliminar la categoría: <b>" + category.name + '?</b>',
			buttons: [{
				text: 'Cancelar',
			}, {
				text: 'Aceptar',
				handler: data => {
					this.loading.createAnimation('Borrando categoría...');
					this.categoryProvider.deleteCategory(category._id).then(response => {
						this.loadCategories();
					});
				}
			}]
		}).present();
	}

	displayPrompt(name = undefined) {
		return new Promise((resolve, reject) => {
			this.alertCtrl.create({
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
						if (typeof data.category === 'string') {
							resolve(data.category);
						} else {
							resolve(false);
						}
					}
				}]
			}).present();
		});
	}
}
