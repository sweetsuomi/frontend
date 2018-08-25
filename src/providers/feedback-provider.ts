import { Injectable } from '@angular/core';

import { Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { GlobalProvider } from './global-provider';

@Injectable()
export class FeedbackProvider {

	private serverURL: String;

	constructor(
		public http: Http,
		private globalProvider: GlobalProvider
	) {
		this.serverURL = this.globalProvider.getServerURL();
	}

	public postFeedback(feedback) {
		return this.http.post(`${this.serverURL}feedback`, { feedback: feedback }).toPromise();
	}

}
