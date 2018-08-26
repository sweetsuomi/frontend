import { Injectable } from '@angular/core';

import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { GlobalProvider } from './global-provider';
import { AuthProvider } from '../providers/auth-provider';

@Injectable()
export class CategoryProvider {

	private serverURL: String;
	public categoryList;

	constructor(
		private http: Http,
		private globalProvider: GlobalProvider,
		private authProvider: AuthProvider
	) {
		this.serverURL = this.globalProvider.serverURL;
	}

	public loadCategories() {
		return this.http.get(
			`${this.serverURL}category`
		).toPromise().then(data => this.categoryList = data.json());
	}

	public postCategory(category) {
		return this.authProvider.getCredentials().then(response =>
			this.http.post(
				`${this.serverURL}category`,
				JSON.stringify({ name: category }),
				this.requestHeaders(response.token)
			).toPromise()
		);
	}

	public updateCategory(categoryId, newName) {
		return this.authProvider.getCredentials().then(response =>
			this.http.put(
				`${this.serverURL}category/${categoryId}`,
				JSON.stringify({ name: newName }),
				this.requestHeaders(response.token)
			).toPromise()
		);
	}

	public deleteCategory(categoryId) {
		return this.authProvider.getCredentials().then(response =>
			this.http.delete(
				`${this.serverURL}category/${categoryId}`,
				this.requestHeaders(response.token)
			).toPromise()
		);
	}

	private requestHeaders(token) {
		let headers = new Headers({ 'Authorization': 'Bearer ' + token });
		headers.append('Content-Type', 'application/json');
		return new RequestOptions({ headers: headers });
	}

}
