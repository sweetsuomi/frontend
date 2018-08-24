import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { IntoleranceProvider } from '../../../../providers/intolerance-provider';
import { ToastComponent } from '../../../../components/toast/toast';

@IonicPage()
@Component({
	selector: 'page-create-intolerance',
	templateUrl: 'create-intolerance.html',
})
export class CreateIntolerancePage {

	private intolerance: any;
	private imageUrl: Object;
	private file;

	constructor(
		public navCtrl: NavController,
		public navParams: NavParams,
		private intoleranceProvider: IntoleranceProvider,
		private toast: ToastComponent
	) { }

	ionViewDidLoad() {
		this.intolerance = this.intoleranceProvider.newIntolerance();
		this.imageUrl = '#';
	}

	createIntolerance() {
		this.intoleranceProvider.createIntolerance(this.intolerance, this.file).then(() => {
			this.toast.setToastMessage("Se ha creado el la intolerancia");
			this.navCtrl.pop();
		}).catch(e => {
			this.toast.setToastError(e);
		});
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
