import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { GlobalProvider } from './global-provider';
import { AuthProvider } from './auth-provider';

@Injectable()
export class CommunicationProvider {

	serverURL: String;
	schedule: any;

	constructor(
		private http: Http,
        private globalProvider: GlobalProvider,
        private authProvider: AuthProvider
	) {
		this.serverURL = this.globalProvider.serverURL;
	}

	public sendEmailToAllUsers(message) {
        return this.authProvider.getCredentials().then(response => {
			return this.http.post(
                `${this.serverURL}mail/all`,
                JSON.stringify({ message: message }),
				this.requestHeaders(response.token)
			).toPromise();
		});
    }

	private requestHeaders(token) {
		let headers = new Headers({ 'Authorization': 'Bearer ' + token });
		headers.append('Content-Type', 'application/json');
		return new RequestOptions({ headers: headers });
	}
}
