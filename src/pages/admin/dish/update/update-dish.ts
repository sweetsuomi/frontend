import { Component } from '@angular/core';
import { IonicPage, NavParams } from 'ionic-angular';

import { DishProvider } from '../../../../providers/dish-provider';
import { LoadingComponent } from '../../../../components/loading/loading';
import { GlobalProvider } from '../../../../providers/global-provider';
import { CategoryProvider } from '../../../../providers/category-provider';
import { IntoleranceProvider } from '../../../../providers/intolerance-provider';
import { AWSProvider } from '../../../../providers/aws-provider';
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

		let reader:FileReader = new FileReader();
		const file = event.target.files[0];
		reader.readAsDataURL(file);
		reader.onloadend = (e) => {
			this.imageUrl = reader.result;
		}
		// this.awsProvider.signImage(file.name, file.type).then(response => {
		// 	return this.awsProvider.uploadToS3(file);
		// }).then(response => {
		// 	this.imageUrl = response;
		// }).catch(e => {
		// 	this.toast.setToastError(e);
		// });
	}

	// updateDish(key) {
		// this.dishProvider.updateDishList(key, this.dish).then(() => {
		// 	return this.dishProvider.updateDish(key, this.imageUrl);
		// }).then(() => {
		// 	this.toast.setToastError("El plato ha sido actualizado");
		// }).catch(e => {
		// 	this.toast.setToastError(e);
		// });
	// }

	switchCategory(category) {
		this.dish.category._id = category._id;
		this.dish.category.name = category.name;
	}

	setIntolerances(intolerances) {
		this.dish.intolerances = intolerances;
	}

	checkIfCategoryIsSelected(category) {
		// return category === this.dish.category.name;
	}

	// Check if intolerance is in the list intolerance list
	checkIfIntoleranceIsSelected(dishIntoleranceList, intolerance) {
		// console.log(Object.values(dishIntoleranceList))
		// return dishIntoleranceList.map(element => {
		// 	console.log(intolerance, element);
		// 	if (intolerance === element) {
		// 		return true;
		// 	}
		// })
		// for (let i = 0; i < this.dish.intolerances.length; i += 1) {
		// 	if (this.dish.intolerances[i].name === intolerance) {
		// 		return true
		// 	}
		// }
		// return false;
	}

	objectKeys = Object.keys;
}
