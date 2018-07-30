import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { IntoleranceProvider } from '../../../../providers/intolerance-provider';
import { GlobalProvider } from '../../../../providers/global-provider';
import { AWSProvider } from '../../../../providers/aws-provider';

@IonicPage()
@Component({
  selector: 'page-create-intolerance',
  templateUrl: 'create-intolerance.html',
})
export class CreateIntolerancePage {
	
	private cloudFrontURL: String;
	private imageUrl: Object;
	private intolerance: any;

  constructor(
		public navCtrl: NavController,
		public navParams: NavParams,
		private globalProvider: GlobalProvider,
		private intoleranceProvider: IntoleranceProvider,
		private awsProvider: AWSProvider,
		private toastCtrl: ToastController
	) {}

  ionViewDidLoad() {
		this.cloudFrontURL = this.globalProvider.getCloudFrontUrl();
    this.imageUrl = { base64: '#', name: undefined };
		this.intolerance = this.intoleranceProvider.startNewIntolerance();
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
	
	setToastMessage(message) {
		let toast = this.toastCtrl.create({
			message: message,
			duration: 3000,
			position: 'top'
		});
		toast.present();
	}
}
