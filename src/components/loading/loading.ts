import { Component } from '@angular/core';
import { LoadingController } from 'ionic-angular';

@Component({
  selector: 'loading'
})

export class LoadingComponent {

	private loadingObject;

  constructor(
		private loadingCtrl: LoadingController
	) {}
	
	ngOnInit() {}
	
	createAnimation(title) {
		this.loadingObject = this.loadingCtrl.create({ content: title });
		this.startAnimation();
	}
	
	startAnimation() {
		this.loadingObject.present();
	}
	
	stopAnimation() {
		this.loadingObject.dismiss();
	}
	
	changeMessage(newText) {
		this.loadingObject.setContent(newText);
	}
}
