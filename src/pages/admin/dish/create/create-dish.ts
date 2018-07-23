import { Component, ChangeDetectorRef } from '@angular/core';
import { IonicPage, NavController, ToastController } from 'ionic-angular';

import { DishProvider } from '../../../../providers/dish-provider';
import { LoadingComponent } from '../../../../components/loading/loading';
import { GlobalProvider } from '../../../../providers/global-provider';
import { CategoryProvider } from '../../../../providers/category-provider';
import { IntoleranceProvider } from '../../../../providers/intolerance-provider';
import { AWSProvider } from '../../../../providers/aws-provider';

@IonicPage()
@Component({
  selector: 'page-create-dish',
  templateUrl: 'create-dish.html',
})
export class CreateDishPage {
	
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
		private navCtrl: NavController,
		private cdRef:ChangeDetectorRef
	) {}
	
	ionViewDidLoad() {
		this.loading.createAnimation('Cargando el plato...');
		this.cloudFrontURL = this.globalProvider.getCloudFrontUrl();
		this.imageUrl = { base64: '#', name: undefined };
		this.categoryList = this.categoryProvider.getCategoryList();
		this.intoleranceList = this.intoleranceProvider.getIntoleranceList();
		this.dish = this.dishProvider.startNewDish();
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
	
	createDish() {
		this.dishProvider.createDish(this.dish, this.imageUrl)
			.then(() => {
				this.setToastMessage("Se ha creado el plato");
				this.navCtrl.pop();
			}).catch(e => {
				this.setToastMessage(e.message);
			});
	}

	switchCategory(category) {
		this.dish.category = category
	}
	
	setIntolerances(intolerances) {
		this.dish.intolerances = intolerances;
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
