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

	private cloudFrontURL: String;
	private dish: any;
	private categoryList;
	private intoleranceList;
	private imageUrl;

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
		this.cloudFrontURL = this.globalProvider.getCloudFrontUrl();
		this.dish = this.dishProvider.dishList[this.navParams.get('key')];
		this.imageUrl = this.cloudFrontURL + 'dish/' + this.dish._id + '.png';
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

		const file = event.target.files[0];
		
		let reader:FileReader = new FileReader();
		reader.readAsDataURL(file);
		reader.onloadend = (e) => {
			this.imageUrl = reader.result;
		}
	}

	updateDish(key) {
		// this.dishProvider.updateDishList(key, this.dish).then(() => {
		// 	return this.dishProvider.updateDish(key, this.imageUrl);
		// }).then(() => {
		// 	this.toast.setToastError("El plato ha sido actualizado");
		// }).catch(e => {
		// 	this.toast.setToastError(e);
		// });
	}

	updateCategory(category) {
		this.dish.category._id = category._id;
		this.dish.category.name = category.name;
	}

	updateIntolerance(intolerance) {
		const dishIntolerances = this.dish.intolerances;
		for (let i = 0; i < intolerance.length; i += 1) {
			const position = dishIntolerances.indexOf(intolerance[i]);
			if (position >= 0) {
				delete dishIntolerances[position];
			} else {
				dishIntolerances.push(intolerance);
			}
		}
		console.log(this.dish.intolerances);
	}
}
