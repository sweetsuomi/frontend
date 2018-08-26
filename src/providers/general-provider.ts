import { Injectable } from '@angular/core';

import { Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { GlobalProvider } from './global-provider';

@Injectable()
export class GeneralProvider {

	private serverURL: String;

	constructor(
		public http: Http,
		private globalProvider: GlobalProvider
	) {
		this.serverURL = this.globalProvider.serverURL;
	}

	public postFeedback(feedback) {
		return this.http.post(`${this.serverURL}general/feedback`, { feedback: feedback }).toPromise();
	}

}
