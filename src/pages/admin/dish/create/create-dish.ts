import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';

import { DishProvider } from '../../../../providers/dish-provider';
import { LoadingComponent } from '../../../../components/loading/loading';
import { CategoryProvider } from '../../../../providers/category-provider';
import { IntoleranceProvider } from '../../../../providers/intolerance-provider';
import { ToastComponent } from '../../../../components/toast/toast';

@IonicPage()
@Component({
	selector: 'page-create-dish',
	templateUrl: 'create-dish.html',
})
export class CreateDishPage {

	private dish: any;
	private categoryList: Object;
	private intoleranceList: Object;
	private imageUrl: Object;
	private file;

	constructor(
		private categoryProvider: CategoryProvider,
		private intoleranceProvider: IntoleranceProvider,
		private loading: LoadingComponent,
		private dishProvider: DishProvider,
		private navCtrl: NavController,
		private toast: ToastComponent,
	) { }

	ionViewDidLoad() {
		this.loading.createAnimation('Cargando el plato...');
		this.dish = this.dishProvider.newDish();
		this.imageUrl = '#';
		Promise.all([
			this.categoryProvider.loadCategories(),
			this.intoleranceProvider.loadIntolerances()
		]).then(response => {
			this.categoryList = response[0];
			this.intoleranceList = response[1];
			this.loading.stopAnimation();
		});
	}

	imageUpload(event) {
		if (event.target.files.length === 0) {
			return;
		}

		this.file = event.target.files[0];

		let reader: FileReader = new FileReader();
		reader.readAsDataURL(this.file);
		reader.onloadend = (e) => {
			this.imageUrl = reader.result;
		}
	}

	createDish() {
		this.dishProvider.createDish(this.dish, this.file).then(() => {
			this.toast.setToastMessage("Se ha creado el plato");
			this.navCtrl.pop();
		}).catch(e => {
			this.toast.setToastError(e);
		});
	}
}
