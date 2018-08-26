import { Component } from '@angular/core';
import { IonicPage, NavController, AlertController } from 'ionic-angular';

import { LoadingComponent } from '../../../../components/loading/loading';
import { ToastComponent } from '../../../../components/toast/toast';
import { IntoleranceProvider } from '../../../../providers/intolerance-provider';
import { GlobalProvider } from '../../../../providers/global-provider';

@IonicPage()
@Component({
	selector: 'page-intolerances',
	templateUrl: 'intolerances.html',
})
export class IntolerancesPage {

	s3Url: String;
	intoleranceList: Object;
	currentDateTime: number;

	constructor(
		private navCtrl: NavController,
		private globalProvider: GlobalProvider,
		private loading: LoadingComponent,
		private intoleranceProvider: IntoleranceProvider,
		private alertCtrl: AlertController,
		private toast: ToastComponent,
	) { }

	ionViewDidLoad() {
		this.loading.createAnimation('Cargando listado de intolerancias...');
		this.s3Url = this.globalProvider.s3Url;
	}

	ionViewDidEnter() {
		this.currentDateTime = new Date().getTime();
		this.getIntolerances();
	}

	getIntolerances() {
		this.intoleranceList = [];
		this.intoleranceProvider.loadIntolerances().then(response => {
			this.intoleranceList = response;
		}).catch(e => {
			this.toast.setToastError(e);
		}).then(() => {
			this.loading.stopAnimation();
		});
	}

	deleteIntolerance(key) {
		this.alertCtrl.create({
			title: 'Borrar intolerancia',
			message: "¿Estás seguro que quieres eliminar: <b>" + this.intoleranceList[key].name + '?</b>',
			buttons: [{
				text: 'Cancelar'
			}, {
				text: 'Aceptar',
				handler: () => {
					this.loading.createAnimation('Borrando intolerancia...');
					this.intoleranceProvider.deleteIntolerance(this.intoleranceList[key]._id).then(() => {
						this.getIntolerances();
					}).catch(e => {
						this.toast.setToastError(e);
					});
				}
			}]
		}).present();
	}

	pushNewIntolerancePage() {
		this.navCtrl.push('CreateIntolerancePage');
	}

	pushUpdateIntolerancePage(key) {
		this.navCtrl.push('UpdateIntolerancePage', {
			key: key
		});
	}
}
