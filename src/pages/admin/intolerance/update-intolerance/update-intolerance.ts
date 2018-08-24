import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { LoadingComponent } from '../../../../components/loading/loading';
import { GlobalProvider } from '../../../../providers/global-provider';
import { IntoleranceProvider } from '../../../../providers/intolerance-provider';
import { AWSProvider } from '../../../../providers/aws-provider';

@IonicPage()
@Component({
  selector: 'page-update-intolerance',
  templateUrl: 'update-intolerance.html',
})
export class UpdateIntolerancePage {

	private cloudFrontURL: String;
	private imageUrl: Object;
	private intolerance: any;
	
  constructor(
		public navCtrl: NavController,
		public navParams: NavParams,
		private intoleranceProvider: IntoleranceProvider,
		private globalProvider: GlobalProvider,
		private loading: LoadingComponent,
		private awsProvider: AWSProvider,
	 	private toastCtrl: ToastController
	) {}

  ionViewDidLoad() {
		// this.loading.createAnimation('Cargando el plato...');
		// this.cloudFrontURL = this.globalProvider.getCloudFrontUrl();
		// this.intolerance = this.intoleranceProvider.getIntoleranceFromList(this.navParams.get('intolerance'));
		// this.imageUrl = { base64: this.cloudFrontURL + 'intolerances/' + this.intolerance._id + '.png', name: undefined };
		// this.loading.stopAnimation();
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
	
	updateIntolerance() {
		// this.intoleranceProvider.updateIntoleranceList(this.navParams.get('intolerance'), this.intolerance)
		// 	.then(() => {
		// 		return this.intoleranceProvider.updateIntolerance(this.navParams.get('intolerance'), this.imageUrl);
		// 	}).then(() => {
		// 		this.setToastMessage("La intolerancia ha sido actualizada");
		// 	}).catch(e => {
		// 		this.setToastMessage(e.message);
		// 	});
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
