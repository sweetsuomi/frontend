import { Component } from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';
import { IonicPage, NavParams } from 'ionic-angular';
import { ToastController } from 'ionic-angular';

import { DishProvider } from '../../../../providers/dish-provider';
import { LoadingComponent } from '../../../../components/loading/loading';
import { GlobalProvider } from '../../../../providers/global-provider';
import { CategoryProvider } from '../../../../providers/category-provider';
import { IntoleranceProvider } from '../../../../providers/intolerance-provider';
import { AWSProvider } from '../../../../providers/aws-provider';

@IonicPage()
@Component({
  selector: 'page-update-dish',
  templateUrl: 'update-dish.html',
})
export class UpdateDishPage {
	
	private cloudFrontURL: String;
	private dish: any;	
	private categoryList: Object;
	private intoleranceList: Object;
	private imageUrl: Object;

  constructor(
		private categoryProvider: CategoryProvider,
		private intoleranceProvider: IntoleranceProvider,
		private globalProvider: GlobalProvider,
		private loading: LoadingComponent,
		private dishProvider: DishProvider,
		private awsProvider: AWSProvider,
	 	private toastCtrl: ToastController,
		private navParams: NavParams,
		private cdRef:ChangeDetectorRef
	) {}
	
	ionViewDidLoad() {
		this.loading.createAnimation('Cargando el plato...');
		this.cloudFrontURL = this.globalProvider.getCloudFrontUrl();
		this.categoryList = this.categoryProvider.getCategoryList();
		this.intoleranceList = this.intoleranceProvider.getIntoleranceList();
		this.dish = this.dishProvider.getDishFromList(this.navParams.get('dish'));
		this.imageUrl = { base64: this.cloudFrontURL + 'dish/' + this.dish._id + '.png', name: undefined };
		this.cdRef.detectChanges();
		this.loading.stopAnimation();
	}
	
	imageUpload(event) {
		let file = event.target.files[0];
		this.awsProvider.signImage(file.name,	file.type)
			.then(response => {
				return this.awsProvider.uploadToS3(file);
			}).then(response => {
				this.imageUrl = response;
			}).catch(e => {
				this.setToastMessage(e.message);
			});
	}
	
	updateDish(key) {
		this.dishProvider.updateDishList(key, this.dish)
			.then(() => {
				return this.dishProvider.updateDish(key, this.imageUrl);
			}).then(() => {
				this.setToastMessage("El plato ha sido actualizado");
			}).catch(e => {
			this.setToastMessage(e.message);
		});
	}
	
	switchCategory(category) {
		this.dish.category._id = category._id;
		this.dish.category.name = category.name;
	}
	
	setIntolerances(intolerances) {
		this.dish.intolerances = intolerances;
	}

	checkIfCategoryIsSelected(category) {
		return category === this.dish.category.name;
	}
	
	checkIfIntoleranceIsSelected(intolerance) {
		for (let i = 0; i < this.dish.intolerances.length; i += 1) {
			if (this.dish.intolerances[i].name === intolerance) {
				return true
			}
		}
		return false;
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
