import { Injectable } from '@angular/core';

import { Http, Headers, RequestOptions, Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { GlobalProvider } from './global-provider';
import { AuthProvider } from '../providers/auth-provider';

@Injectable()
export class CategoryProvider {
	
	private serverURL: String;
	private categoryList: any;

  constructor(
		private http: Http,
		private globalProvider: GlobalProvider,
		private authProvider: AuthProvider
	) {
		this.serverURL = this.globalProvider.getServerURL();
	}
	
	public loadCategories() {
		return this.http.get(
			`${this.serverURL}category`
		).toPromise().then(data => {
			this.categoryList = data.json();
			return this.categoryList;
		}).catch(e => {
			return Promise.reject(new Error(e));
		});
	}
	
	public filterGroupById() {
		// let object = {};
		// for (let i = 0; i < this.categoryList.length; i += 1) {
		// 	object[this.categoryList[i]._id] = new CategoryModel(this.categoryList[i]);
		// }
		// this.categoryList = object;
		// return Promise.resolve(object);
	}
	
	public getCategoryList() {
		if (this.categoryList) {
			return this.categoryList;
		}
	}
	
	public deleteCategory(key) {
		return this.authProvider.getCredentials()
			.then(response => {
				return this.http.delete(
					`${this.serverURL}category?category_id=${this.categoryList[key]._id}`,
					this.requestHeaders(response.token)
				).toPromise();
			}).then(() => {
				return this.loadCategories();
			}).catch(e => {
				return Promise.reject(new Error("La categoría no ha podido ser borrada"));
			})
	}
	
	public postCategory(category): Promise<Response> {
		return this.authProvider.getCredentials()
			.then(response => {
				return this.http.post(
					`${this.serverURL}category`,
					JSON.stringify({ name: category }),
					this.requestHeaders(response.token)
				).toPromise();
			}).catch(e => {
				return Promise.reject(new Error("No se ha podido crear la categoría"));
			})
	}
	
	public updateCategory(categoryId, name) {
		return this.authProvider.getCredentials()
			.then(response => {
				return this.http.put(
					`${this.serverURL}category`,
					JSON.stringify({ category_id: categoryId, name: name }),
					this.requestHeaders(response.token)
				).toPromise();
			}).catch(e => {
				return Promise.reject(new Error("No se ha podido actualizar la categoría"));
			})
	}
	
	private requestHeaders(token): RequestOptions {
		let headers = new Headers({ 'Authorization': 'Bearer ' + token });
    headers.append('Content-Type', 'application/json');
		return new RequestOptions({ headers: headers });
	}
	
}
