import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';

import { IntoleranceProvider } from '../../../../providers/intolerance-provider';
import { GlobalProvider } from '../../../../providers/global-provider';

@IonicPage()
@Component({
	selector: 'page-create-intolerance',
	templateUrl: 'create-intolerance.html',
})
export class CreateIntolerancePage {

	private cloudFrontURL: String;
	private intolerance: any;
	private imageUrl: Object;
	private file;

	constructor(
		public navCtrl: NavController,
		public navParams: NavParams,
		private globalProvider: GlobalProvider,
		private intoleranceProvider: IntoleranceProvider,
		private toastCtrl: ToastController
	) { }

	ionViewDidLoad() {
		this.cloudFrontURL = this.globalProvider.getCloudFrontUrl();
		this.imageUrl = '#';
		// this.intolerance = this.intoleranceProvider.startNewIntolerance();
	}

	createIntolerance() {
		// this.intoleranceProvider.createIntolerance(this.intolerance, this.imageUrl)
		// 	.then(() => {
		// 		this.setToastMessage("Se ha creado el la intolerancia");
		// 		this.navCtrl.pop();
		// 	}).catch(e => {
		// 		this.setToastMessage(e.message);
		// 	});
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
}
