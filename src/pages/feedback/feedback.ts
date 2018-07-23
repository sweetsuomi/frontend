import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { LoadingComponent } from '../../components/loading/loading';
import { FeedbackProvider } from '../../providers/feedback-provider';
import { ToastComponent } from '../../components/toast/toast';

@IonicPage()
@Component({
  selector: 'page-feedback',
  templateUrl: 'feedback.html',
})

export class FeedbackPage {
	
	feedback: String;

  	constructor(
		private navCtrl: NavController,
		private loading: LoadingComponent,
		private feedbackProvider: FeedbackProvider,
		private toast: ToastComponent
	) {
		this.feedback = '';
	}
	
	sendFeedback() {
		this.loading.createAnimation('Enviando sugerencia...');
		this.feedbackProvider.postFeedback(this.feedback).then(() => {
			this.loading.changeMessage("La sugerencia ha sido enviada! Muchas Gracias!");
			setTimeout(() => {
				this.loading.stopAnimation();
				this.navCtrl.pop();
			}, 1000)
		}).catch(e => {
			this.loading.stopAnimation();
			this.toast.setToastError(e);
		});
	}
}
