import { Injectable } from '@angular/core';

import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { GlobalProvider } from './global-provider';
import { AuthProvider } from '../providers/auth-provider';

@Injectable()
export class DishProvider {

	private serverURL: String;
	public dishList: any;

	constructor(
		public http: Http,
		private globalProvider: GlobalProvider,
		private authProvider: AuthProvider
	) {
		this.serverURL = this.globalProvider.getServerURL();
		this.dishList = [];
	}

	public loadDishes(categoryId, offset, limit) {
		return this.authProvider.getCredentials().then(response => {
			let path = `${this.serverURL}dish?offset=${offset || 0}&limit=${limit || 2000}`;
			if (categoryId) { path += `&category=${categoryId || 0}`; }
			return this.http.get(path, this.requestHeaders(response.token, false)).toPromise();
		}).then(response => {
			const data = response.json();
			for (let i = 0; i < data.length; i += 1) {
				this.dishList.push(data[i])
			}
		});
	}

	public filterGroupById() {
		// let object = {};
		// for (let i = 0; i < this.dishList.length; i += 1) {
		// 	object[this.dishList[i]._id] = new DishModel(this.dishList[i]);
		// }
		// this.dishList = object;
		// return Promise.resolve(object);
	}

	public filterGroupByCategory(): Promise<any> {
		let array = {};
		for (let dish in this.dishList) {
			if (array[this.dishList[dish].category.name]) {
				array[this.dishList[dish].category.name].dishes.push(this.dishList[dish]);
			} else {
				array[this.dishList[dish].category.name] = {
					dishes: [this.dishList[dish]]
				};
			}
		}
		return Promise.resolve(array);
	}

	public deleteDish(key: string) {
		return this.authProvider.getCredentials().then(response => {
			return this.http.delete(
				`${this.serverURL}dish/${this.dishList[key]._id}`,
				this.requestHeaders(response.token, false)
			).toPromise();
		}).then(() => {
			return this.dishList.splice(key, 1);
		}).catch(e => {
			return Promise.reject(new Error(e));
		});
	}

	public updateDish(dish, file) {
		return this.authProvider.getCredentials().then(response => { 
			let formData: FormData = new FormData();

			for (const data in dish) {
				if (data === 'category') {
					formData.append(data, dish[data]._id);
				} else if (data === 'intolerances') {
					for (let i = 0; i < dish.intolerances.length; i += 1) {
						formData.append(data + '[' + i + ']', dish.intolerances[i]);
					}
				} else {
					formData.append(data, dish[data]);
				}
			}
			
			if (file && file.name) {
				formData.append('picture', file);
			}

			return this.http.put(
				`${this.serverURL}dish/${dish._id}`,
				formData,
				this.requestHeaders(response.token, true)
			).toPromise();
		}).catch(e => {
			return Promise.reject(new Error(e));
		});
	}




















	public createDish(dish, image) {
		// let params: any = new DishModel();
		// return params.update(dish).then(() => {
		// 	return this.authProvider.getCredentials();
		// }).then(response => {
		// 	dish.imgName = image.name
		// 	return this.http.post(
		// 		`${this.serverURL}dish`,
		// 		dish,
		// 		this.requestHeaders(response.token)
		// 	).toPromise();
		// }).then(response => {
		// 	params._id = response.json().dish;
		// 	this.dishList[params._id] = new DishModel(params);
		// }).catch(e => {
		// 	return Promise.reject(new Error("Error creando el plato"));
		// });
	}

	public getAllDishes(token, date): Promise<Array<any>> {
		return this.http.get(`${this.serverURL}dish/all?date=${date}`, this.requestHeaders(token, false))
			.toPromise().then((data) => {
				this.dishList = data.json();
				return this.dishList;
			}).catch((e) => {
				return Promise.reject(new Error("Error getting quantity" + e));
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
