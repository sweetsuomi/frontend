import { Component } from '@angular/core';

import { IonicPage, NavParams } from 'ionic-angular';

import { LoadingComponent } from '../../../../components/loading/loading';
import { GlobalProvider } from '../../../../providers/global-provider';
import { IntoleranceProvider } from '../../../../providers/intolerance-provider';
import { ToastComponent } from '../../../../components/toast/toast';

@IonicPage()
@Component({
	selector: 'page-update-intolerance',
	templateUrl: 'update-intolerance.html',
})
export class UpdateIntolerancePage {

	private s3Url: String;
	private intolerance: any;
	private imageUrl: Object;
	private file;

	constructor(
		public navParams: NavParams,
		private intoleranceProvider: IntoleranceProvider,
		private globalProvider: GlobalProvider,
		private loading: LoadingComponent,
		private toast: ToastComponent
	) { }

	ionViewDidLoad() {
		this.loading.createAnimation('Cargando el plato...');
		this.intolerance = this.intoleranceProvider.newIntolerance();
		this.s3Url = this.globalProvider.s3Url;
		this.intolerance = this.intoleranceProvider.intoleranceList[this.navParams.get('key')];
		this.imageUrl = this.s3Url + 'intolerances/' + this.intolerance._id + '.png';
		this.loading.stopAnimation();
	}

	updateIntolerance() {
		this.intoleranceProvider.updateIntolerance(this.intolerance, this.file).then(() => {
			this.toast.setToastMessage("La intolerancia ha sido actualizada");
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
