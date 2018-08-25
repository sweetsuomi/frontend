import { Injectable } from '@angular/core';

import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { GlobalProvider } from './global-provider';
import { AuthProvider } from '../providers/auth-provider';

@Injectable()
export class IntoleranceProvider {

	private serverURL: String;
	public intoleranceList: any;

	constructor(
		private http: Http,
		private globalProvider: GlobalProvider,
		private authProvider: AuthProvider
	) {
		this.serverURL = this.globalProvider.getServerURL();
	}

	public loadIntolerances() {
		return this.http.get(
			`${this.serverURL}intolerance`
		).toPromise().then(data => {
			return this.intoleranceList = data.json();
		});
	}

	public newIntolerance() {
		return { name: '' };
	}

	public createIntolerance(intolerance, file) {
		return this.authProvider.getCredentials().then(response => { 
			let formData: FormData = new FormData();

			for (const data in intolerance) {
				formData.append(data, intolerance[data]);
			}
			
			if (file && file.name) {
				formData.append('picture', file);
			}

			return this.http.post(
				`${this.serverURL}intolerance`,
				formData,
				this.requestHeaders(response.token, true)
			).toPromise();
		});
	}

	public updateIntolerance(intolerance, file) {
		return this.authProvider.getCredentials().then(response => { 
			let formData: FormData = new FormData();

			for (const data in intolerance) {
				formData.append(data, intolerance[data]);
			}
			
			if (file && file.name) {
				formData.append('picture', file);
			}

			return this.http.put(
				`${this.serverURL}intolerance/${intolerance._id}`,
				formData,
				this.requestHeaders(response.token, true)
			).toPromise();
		});
	}

	public deleteIntolerance(id) {
		return this.authProvider.getCredentials().then(response => {
			return this.http.delete(
				`${this.serverURL}intolerance/${id}`,
				this.requestHeaders(response.token, false)
			).toPromise();
		});
	}

	private requestHeaders(token, multipart): RequestOptions {
		let headers = new Headers({ 'Authorization': 'Bearer ' + token });
		if (!multipart) {
			headers.append('Content-Type', 'application/json');
		}
		return new RequestOptions({ headers: headers });
	}
}
