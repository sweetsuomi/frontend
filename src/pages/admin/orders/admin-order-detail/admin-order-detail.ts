import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';

import { LoadingComponent } from '../../../../components/loading/loading';
import { GlobalProvider } from '../../../../providers/global-provider';
import { OrderProvider } from '../../../../providers/order-provider';
import { ToastComponent } from '../../../../components/toast/toast';
import * as moment from 'moment';

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
		private toast: ToastComponent,
		private loading: LoadingComponent,
		private globalProvider: GlobalProvider,
		private alertCtrl: AlertController,
		private orderProvider: OrderProvider
	) { }

	ionViewDidLoad() {
		this.loading.createAnimation('Cargando pedido...');
		this.cloudFrontURL = this.globalProvider.cloudFrontURL;
		this.getOrder();
	}
	
	getOrder() {
		this.orderProvider.getOrder(this.navParams.get('orderId')).then(response => {
			this.order = response;
			this.loading.stopAnimation();
		});
	}

	formatTime(time) {
		return moment(time, "hmm").format("HH:mm");
	}

	deleteOrder() {
		this.alertCtrl.create({
			title: 'Eliminar pedido',
			message: "¿Estás seguro que quieres eliminar el pedido?",
			buttons: [{
				text: 'Cancelar'
			}, {
				text: 'Aceptar',
				handler: () => {
					this.loading.createAnimation('Eliminando pedido...');
					this.orderProvider.deleteOrder(this.order._id).then(() => {
						this.navCtrl.pop();
					}).catch(error => {
						this.toast.setToastError(error);
					}).then(() => {
						this.loading.stopAnimation();
					});
				}
			}]
		}).present();
	}

	acceptOrder() {
		this.alertCtrl.create({
			title: 'Aceptar pedido',
			message: "Atención! Aceptar el pedido implica que está entregado. ¿Estás seguro?",
			buttons: [{
				text: 'Cancelar'
			}, {
				text: 'Aceptar',
				handler: () => {
					this.loading.createAnimation('Aceptando pedido...');
					this.orderProvider.acceptOrder(this.order._id, true).then(() => {
						this.navCtrl.pop();
					}).catch(error => {
						this.toast.setToastError(error);
					}).then(() => {
						this.loading.stopAnimation();
					});
				}
			}]
		}).present();
	}
}
