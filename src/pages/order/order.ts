import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { LoadingComponent } from '../../components/loading/loading';
import { GlobalProvider } from '../../providers/global-provider';
// import { MenuProvider } from '../../providers/menu-provider';
import { OrderProvider } from '../../providers/order-provider';
// import { ToastComponent } from '../../components/toast/toast';
import moment from 'moment';

@IonicPage()
@Component({
	selector: 'page-order',
	templateUrl: 'order.html',
})
export class OrderPage {

	private cloudFrontURL: String;
	private order;

	constructor(
		public navCtrl: NavController,
		public navParams: NavParams,
		// private toast: ToastComponent,
		private loading: LoadingComponent,
		private globalProvider: GlobalProvider,
		// private alertCtrl: AlertController,
		private orderProvider: OrderProvider
	) { }

	ionViewDidLoad() {
		this.loading.createAnimation('Cargando pedido...');
		this.cloudFrontURL = this.globalProvider.cloudFrontURL;
		this.order = this.orderProvider.orderList[this.navParams.get('order')];
		this.formatTime();
		this.loading.stopAnimation();
	}

	formatTime() {
		const time = this.order.time;
		this.order.time = moment(time < 1000 ? '0' + time : time, "LT").format('HH:mm');
		// const currentTime = moment();
		// const minTime = currentTime.add(this.globalProvider.removeDishFromMenu, 'minutes');
		// const timeError = minTime.isAfter(maxTime);
		// this.date = this.time;
	}

	verifyTme() {
		// const orderDish = this.orderProvider.order.orderDish;
		// const time = Object.keys(orderDish)
		// 	.map(index => orderDish[index].schedule)
		// 	.reduce((previous, current) => current.timeEnd > previous.timeEnd ? previous.timeEnd : current.timeEnd);

		// const minTime = moment().add(this.globalProvider.removeDishFromMenu, 'minutes');
		// const maxTime = moment(typeof time === 'object' ? time.timeEnd : time, "LT");
		// const timeError = minTime.isAfter(maxTime);

		// this.time = {
		// 	minTime: minTime.format('HH:mm'),
		// 	maxTime: maxTime.format("HH:mm"),
		// 	error: timeError
		// };

		// this.date = this.time.minTime;
	}

	deleteOrder() {
		// let prompt = this.alertCtrl.create({
		// 	title: 'Eliminar pedido',
		// 	message: "¿Estás seguro que quieres eliminar el pedido?",
		// 	buttons: [{
		// 		text: 'Cancelar'
		// 	}, {
		// 		text: 'Aceptar',
		// 		handler: data => {
		// 			this.loading.createAnimation('Eliminando pedido...');
		// 			this.orderProvider.deleteOrder(this.order)
		// 				.then(() => {
		// 					const date = new Date().toISOString().split('T')[0];
		// 					return this.menuProvider.getMenu(date);
		// 				}).then(data => {
		// 					return this.menuProvider.filterGroupByCategory();
		// 				}).then(() => {
		// 					this.loading.stopAnimation();
		// 					this.navCtrl.pop();
		// 				}).catch(error => {
		// 					this.setToastMessage(error.message);
		// 					this.loading.stopAnimation();
		// 				});
		// 		}
		// 	}]
		// });
		// prompt.present();
	}

	updateOrder() {
		// let prompt = this.alertCtrl.create({
		// 	title: 'Modificar pedido',
		// 	message: "¿Estás seguro que quieres modificar el pedido? Si lo modificas, tienes que salvar los cambios antes de cerrar tu aplicación. De lo contrario, tu pedido podría ser borrado.",
		// 	buttons: [{
		// 		text: 'Cancelar'
		// 	}, {
		// 		text: 'Aceptar',
		// 		handler: data => {
		// 			this.loading.createAnimation('Modificando pedido...');
		// 			this.orderProvider.updateOrder(this.order)
		// 				.then(() => {
		// 					const date = new Date().toISOString().split('T')[0];
		// 					return this.menuProvider.getMenu(date);
		// 				}).then(() => {
		// 					return this.menuProvider.filterGroupByCategory();
		// 				}).then(() => {
		// 					return this.orderProvider.recreateMenuDeleted(this.order);
		// 				}).then(() => {
		// 					this.loading.stopAnimation();
		// 					this.navCtrl.setRoot('HomePage');
		// 				}).catch(error => {
		// 					this.setToastMessage(error.message);
		// 					this.loading.stopAnimation();
		// 				});
		// 		}
		// 	}]
		// });
		// prompt.present();
	}

}
