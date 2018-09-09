import { Component } from '@angular/core';
import { ToastController } from 'ionic-angular';

@Component({
  selector: 'toast',
  template: ''
})

export class ToastComponent {
	constructor(
		private toastCtrl: ToastController
	) {}
	
	setToastError(e) {
		let toast = this.toastCtrl.create({
			message: e.message || e.json().msg,
			duration: 5000,
			position: 'top'
		});

		toast.present();
	}

	setToastMessage(msg) {
		let toast = this.toastCtrl.create({
			message: msg,
			duration: 4000,
			position: 'top',
			dismissOnPageChange: true,
		});

		toast.present();
	}
}
