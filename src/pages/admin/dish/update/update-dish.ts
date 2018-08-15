import { Component } from '@angular/core';
import { IonicPage, NavParams } from 'ionic-angular';

import { DishProvider } from '../../../../providers/dish-provider';
import { LoadingComponent } from '../../../../components/loading/loading';
import { GlobalProvider } from '../../../../providers/global-provider';
import { CategoryProvider } from '../../../../providers/category-provider';
import { IntoleranceProvider } from '../../../../providers/intolerance-provider';
import { ToastComponent } from '../../../../components/toast/toast';

@IonicPage()
@Component({
	selector: 'page-update-dish',
	templateUrl: 'update-dish.html',
})

export class UpdateDishPage {

	private s3Url: String;
	private dish: any;
	private categoryList;
	private intoleranceList;
	private imageUrl;
	private file;

	constructor(
		private globalProvider: GlobalProvider,
		private categoryProvider: CategoryProvider,
		private intoleranceProvider: IntoleranceProvider,
		private loading: LoadingComponent,
		private dishProvider: DishProvider,
		private navParams: NavParams,
		private toast: ToastComponent
	) { }

	ionViewDidLoad() {
		this.loading.createAnimation('Cargando el plato...');
		this.s3Url = this.globalProvider.s3Url;
		this.dish = this.dishProvider.dishList[this.navParams.get('key')];
		this.imageUrl = this.s3Url + 'dish/' + this.dish._id + '.png';
		this.loadCategories();
		this.loadIntolerances();
		this.loading.stopAnimation();
	}

	loadCategories() {
		this.categoryProvider.loadCategories().then(categories => {
			this.categoryList = categories;
		});
	}
	
	loadIntolerances() {
		this.intoleranceProvider.loadIntolerances().then(() => {
			this.intoleranceList = this.intoleranceProvider.intoleranceList;
		});
	}

	imageUpload(event) {
		if (event.target.files.length === 0) {
			return;
		}

		this.file = event.target.files[0];
		
		let reader:FileReader = new FileReader();
		reader.readAsDataURL(this.file);
		reader.onloadend = (e) => {
			this.imageUrl = reader.result;
		}
	}

	updateDish(key) {
		this.dishProvider.updateDish(this.dish, this.file).then(() => {
			this.toast.setToastError("El plato ha sido actualizado");
		}).catch(e => {
			this.toast.setToastError(e);
		});
	}

	updateCategory(category) {
		this.dish.category._id = category._id;
		this.dish.category.name = category.name;
	}

	updateIntolerance(intolerance) {
		this.dish.intolerances = intolerance;
	}
}
