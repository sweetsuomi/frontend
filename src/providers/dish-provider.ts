import { Injectable } from '@angular/core';

import { Http, Headers, RequestOptions, Response } from '@angular/http';
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
	}

	public loadDishes(categoryId, offset, limit) {
		return this.authProvider.getCredentials().then(response => {
			let path = `${this.serverURL}dish?offset=${offset || 0}&limit=${limit || 2000}`;
			if (categoryId) { path += `&category=${categoryId || 0}`; }
			return this.http.get(path, this.requestHeaders(response.token)).toPromise();
		}).then(data => {
			return this.dishList = data.json();
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
				this.requestHeaders(response.token)
			).toPromise();
		}).then(() => {
			return this.dishList.splice(key, 1);
		}).catch(e => {
			return Promise.reject(new Error(e));
		});
	}

	public updateDishList(key, dish) {
		return this.dishList[key].update({
			_id: dish._id,
			title: dish.title,
			category: dish.category,
			price: dish.price,
			description: dish.description,
			intolerances: dish.intolerances
		}).catch(error => {
			throw new Error(error.message);
		});
	}

	public getDishFromList(key) {
		if (this.dishList[key]) {
			return this.dishList[key];
		}
	}

	public updateDish(key, img): Promise<Response> {
		return this.authProvider.getCredentials().then(response => {
			let params = this.getDishFromList(key);
			if (img.name) {
				params.imgName = img.name;
			}
			return this.http.put(
				`${this.serverURL}dish`,
				params,
				this.requestHeaders(response.token)
			).toPromise();
		}).catch(e => {
			console.log(e);
			return Promise.reject(new Error(e.json().msg));
		});
	}

	public startNewDish() {
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














	public getDishList() {
		return this.dishList;
	}

	public getAllDishes(token, date): Promise<Array<any>> {
		return this.http.get(`${this.serverURL}dish/all?date=${date}`, this.requestHeaders(token))
			.toPromise().then((data) => {
				this.dishList = data.json();
				return this.dishList;
			}).catch((e) => {
				return Promise.reject(new Error("Error getting quantity" + e));
			});
	}

	private requestHeaders(token): RequestOptions {
		let headers = new Headers({ 'Authorization': 'Bearer ' + token });
		headers.append('Content-Type', 'application/json');
		return new RequestOptions({ headers: headers });
	}

}
