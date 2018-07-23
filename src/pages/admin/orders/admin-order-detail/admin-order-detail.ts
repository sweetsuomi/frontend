import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';

import { LoadingComponent } from '../../../../components/loading/loading';
import { GlobalProvider } from '../../../../providers/global-provider';
import { OrderProvider } from '../../../../providers/order-provider';

@IonicPage()
@Component({
  selector: 'page-admin-order-detail',
  templateUrl: 'admin-order-detail.html',
})
export class AdminOrderDetailPage {
	
	private cloudFrontURL: String;
	private order;

  constructor(
		public navCtrl: NavController,
		public navParams: NavParams,
		private toastCtrl: ToastController,
		private loading: LoadingComponent,
		private globalProvider: GlobalProvider,
		private alertCtrl: AlertController,
		private orderProvider: OrderProvider
	) {}

  ionViewDidLoad() {
		this.loading.createAnimation('Cargando pedido...');
		this.cloudFrontURL = this.globalProvider.getCloudFrontUrl();
		this.order = this.orderProvider.getSpecificOrder(this.navParams.get('order'));
		this.loading.stopAnimation();
	}
	
	setToastMessage(message) {
		let toast = this.toastCtrl.create({
			message: message,
			duration: 3000,
			position: 'top'
		});
		toast.present();
	}
	
	deleteOrder() {
		let prompt = this.alertCtrl.create({
			title: 'Eliminar pedido',
			message: "¿Estás seguro que quieres eliminar el pedido?",
			buttons: [{
				text: 'Cancelar'
			}, {
				text: 'Aceptar',
				handler: data => {
					this.loading.createAnimation('Eliminando pedido...');
					this.orderProvider.deleteAdminOrder(this.order._id)
						.then(() => {
							this.loading.stopAnimation();
							this.navCtrl.pop();
						}).catch(error => {
							this.setToastMessage(error.message);
							this.loading.stopAnimation();
						});
				}
			}]
		});
		prompt.present();
	}
	
	acceptOrder() {
		let prompt = this.alertCtrl.create({
			title: 'Aceptar pedido',
			message: "Atención! Aceptar el pedido implica que está entregado. ¿Estás seguro?",
			buttons: [{
				text: 'Cancelar'
			}, {
				text: 'Aceptar',
				handler: data => {
					this.loading.createAnimation('Aceptando pedido...');
					this.orderProvider.acceptOrder(this.order._id)
						.then(() => {
							this.loading.stopAnimation();
							this.navCtrl.pop();
						}).catch(error => {
							this.setToastMessage(error.message);
							this.loading.stopAnimation();
						});
				}
			}]
		});
		prompt.present();
	}
}
