import { Injectable } from '@angular/core';

import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { GlobalProvider } from './global-provider';
import { AuthProvider } from '../providers/auth-provider';

@Injectable()
export class MenuProvider {
	
	public menuList;
	private serverURL: String;
	private offset = 0;
	private limit = 990;

  constructor(
		public http: Http,
		private globalProvider: GlobalProvider,
		private authProvider: AuthProvider
	) {
		this.serverURL = this.globalProvider.getServerURL();
	}
	
	public getMenu(date?: string, time?: string) {
		var url = '';

		if (date && time) {
			url = `${this.serverURL}menu?offset=${this.offset}&limit=${this.limit}&date=${date}&scheduleId=${time}`;
		} else {
			url = `${this.serverURL}menu?offset=${this.offset}&limit=${this.limit}`;
		}

		return this.http.get(url).toPromise().then(data => {
			this.menuList = data.json();
		}).catch(() => {
			throw new Error('No hay platos disponibles para ese día');
		});
	}
	
	public filterMenuListGroupById(): Promise<any> {
		let object = {};
		for (let i = 0; i < this.menuList.length; i += 1) {
			object[this.menuList[i].dish._id] = {
				dish: {
					_id: this.menuList[i]._id,
					title: this.menuList[i].title,
					category: this.menuList[i].category,
					price: this.menuList[i].price,
					description: this.menuList[i].description,
					intolerances: []
				},
				quantity: this.menuList[i].quantity
			};
		}
		this.menuList = object;
		return Promise.resolve(object);
	}
	
	public filterGroupByCategory(): Promise<void> {
		let object = {};
		for (let dish in this.menuList) {
			const categoryName = this.menuList[dish].dish.category.name;
			if (object[categoryName]) {
				object[categoryName].dishes.push(this.menuList[dish]);
			} else {
				object[categoryName] = {
					dishes: [this.menuList[dish]]
				};
			}
		}
		this.menuList = object;
		return Promise.resolve();
	}

	public getDishFromMenu(category, dishId): Object {
		if (category && !isNaN(dishId)) {
			const categoryDish = this.menuList[category];
			if (categoryDish) {
				const dish = categoryDish.dishes[dishId];
				return dish ? dish : {};
			}
			return {};
		}
		return {};
	}

	public postMenuDish(dishId, quantity, date, time) {
		return this.authProvider.getCredentials().then(response => {
			return this.http.put(
				`${this.serverURL}menu`,
				JSON.stringify({ date: date, time: time, menu: [{ dish: dishId, quantity: quantity }] }),
				this.requestHeadersAuth(response.token)
			).toPromise();
		});
	}

	public deleteDishFromMenu(menuId) {
		return this.authProvider.getCredentials().then(response => {
			return this.http.delete(
				`${this.serverURL}menu/${menuId}`,
				this.requestHeadersAuth(response.token)
			).toPromise();
		});
	}
	
	private requestHeadersAuth(token): RequestOptions {
		let headers = new Headers({ 'Authorization': 'Bearer ' + token });
    headers.append('Content-Type', 'application/json');
		return new RequestOptions({ headers: headers });
	}
}
