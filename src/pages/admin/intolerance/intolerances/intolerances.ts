import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';

import { LoadingComponent } from '../../../../components/loading/loading';

import { IntoleranceProvider } from '../../../../providers/intolerance-provider';
import { GlobalProvider } from '../../../../providers/global-provider';

@IonicPage()
@Component({
  selector: 'page-intolerances',
  templateUrl: 'intolerances.html',
})
export class IntolerancesPage {
	
	private cloudFrontURL: String;
	private intoleranceList: Object;

  constructor(
		private navCtrl: NavController,
	 	private globalProvider: GlobalProvider,
		private loading: LoadingComponent,
		private intoleranceProvider: IntoleranceProvider,
		private alertCtrl: AlertController,
	 	private toastCtrl: ToastController
	) {}

  ionViewDidLoad() {
		this.loading.createAnimation('Cargando listado de intolerancias...');
		this.cloudFrontURL = this.globalProvider.getCloudFrontUrl();
		this.intoleranceProvider.loadIntolerances()
			.then(response => {
				return this.intoleranceProvider.filterGroupById();
			}).then(response => {
				this.intoleranceList = response;
			}).catch(e => {
				this.setToastMessage(e.message);
			}).then(() => {
				this.loading.stopAnimation();
			});
	}
	
	deleteIntolerance(key) {
		let prompt = this.alertCtrl.create({
				title: 'Borrar intolerancia',
				message: "¿Estás seguro que quieres eliminar: <b>" + this.intoleranceList[key].name + '?</b>',
				buttons: [{
					text: 'Cancelar'
				}, {
					text: 'Aceptar',
					handler: data => {
						this.loading.createAnimation('Borrando intolerancia...');
						this.intoleranceProvider.deleteIntolerance(key).catch(e => {
							this.setToastMessage(e.message);
						}).then(() => {
							this.loading.stopAnimation();
						});
					}
				}]
		});
		prompt.present();		
	}
	
	pushNewIntolerancePage() {
		this.navCtrl.push('CreateIntolerancePage');	
	}
	
	pushIntolerancePage(key) {
		this.navCtrl.push('UpdateIntolerancePage', {
			intolerance: key
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
	
	objectKeys = Object.keys;

}
