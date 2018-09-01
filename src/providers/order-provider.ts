import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { GlobalProvider } from './global-provider';
import { AuthProvider } from './auth-provider';

@Injectable()
export class OrderProvider {

	serverURL: String;
	order: any;
	price: number;
	orderList: any;
	pending: any;

	constructor(
		private http: Http,
		private globalProvider: GlobalProvider,
		private authProvider: AuthProvider
	) {
		this.serverURL = this.globalProvider.serverURL;
		this.pending = {};
		this.newOrder();
	}

	newOrder() {
		this.order = {
			orderDish: [],
			quantity: 0,
		};
		this.price = 0;
	}

	addDishToOrder(menuId, dish, quantity) {
		this.order.orderDish[dish._id] = {
			menuId: menuId,
			dish: dish,
			quantity: quantity
		};
	}

	removeDishFromOrder(dishId) {
		if (this.order.orderDish[dishId]) {
			delete this.order.orderDish[dishId];
		}
	}

	getOrderMenuResume() {
		const resume = {
			quantity: 0,
			price: 0
		};
		for (let element in this.order.orderDish) {
			resume.quantity += this.order.orderDish[element].quantity;
			resume.price += this.order.orderDish[element].dish.price * this.order.orderDish[element].quantity;
		}
		this.price = resume.price;
		return resume;
	}

	getDishQuantity(dishId) {
		if (this.order.orderDish[dishId]) {
			return this.order.orderDish[dishId].quantity;
		}
		return 0;
	}

	resetOrder() {
		this.newOrder();
		return Promise.resolve();
	}

	getOrderList(date) {
		return this.authProvider.getCredentials().then(response => {
			return this.http.get(
				`${this.serverURL}order?date=${date}`,
				this.requestHeaders(response.token)
			).toPromise();
		}).then(response => {
			return this.orderList = response.json();
		});
	}

	getOrder(id) {
		return this.authProvider.getCredentials().then(response => {
			return this.http.get(
				`${this.serverURL}order/${id}`,
				this.requestHeaders(response.token)
			).toPromise();
		}).then(response => {
			return this.orderList = response.json();
		});
	}

	acceptOrder(orderId, deliver) {
		return this.authProvider.getCredentials().then(response => {
			return this.http.put(
				`${this.serverURL}order/deliver`,
				JSON.stringify({ order: orderId, deliver: deliver }),
				this.requestHeaders(response.token)
			).toPromise();
		});
	}

	deleteOrder(orderId) {
		return this.authProvider.getCredentials().then(response => {
			return this.http.delete(
				`${this.serverURL}order/${orderId}`,
				this.requestHeaders(response.token)
			).toPromise();
		});
	}

	postOrder(order, time) {
		var orders = [];
		for (let element in order.orderDish) {
			orders.push(order.orderDish[element]);
		}
		this.pending = { order: orders, note: order.note, time: time };
		return this.authProvider.getCredentials().then(response => {
			return this.http.post(
				`${this.serverURL}order`,
				JSON.stringify({ order: orders, note: order.note, time: time }),
				this.requestHeaders(response.token)
			).toPromise();
		});
	}

	postPendingOrder() {
		if (Object.keys(this.pending).length === 0) {
			throw new Error();
		}
		return this.authProvider.getCredentials().then(response => {
			return this.http.post(
				`${this.serverURL}order`,
				JSON.stringify(this.pending),
				this.requestHeaders(response.token)
			).toPromise();
		});
	}













	formatDate() {
		var tzoffset = (new Date()).getTimezoneOffset() * 60000;

		var d = (new Date(Date.now() - tzoffset));
		d.setHours(Number(this.order.date.slice(0, -3)) + 1);
		d.setMinutes(Number(this.order.date.slice(3, 5)));
		this.order.date = d.toISOString();
		return d;
	}

	public getUserOrderList(date) {
		return this.authProvider.getCredentials().then(response => {
			return this.http.get(
				`${this.serverURL}order/list?date=${date}`,
				this.requestHeaders(response.token)
			).toPromise();
		}).then((response: Response) => {
			const orders = response.json().orderList;
			const dishList = response.json().dishes;
			this.orderList = {};
			for (let i = 0; i < orders.length; i += 1) {
				this.orderList[orders[i]._id] = orders[i];
				this.orderList[orders[i]._id].price = 0;
				this.orderList[orders[i]._id].dishes = [];
				for (let j = 0; j < dishList.length; j += 1) {
					if (dishList[j].orderId === orders[i]._id) {
						this.orderList[orders[i]._id].dishes.push(dishList[j]);
						this.orderList[orders[i]._id].price += dishList[j].quantity * dishList[j].dish.price
					}
				}
			}
			return this.orderList;
		}).catch(e => {
			return Promise.reject(new Error(e.json().msg));
		});
	}

	public getSpecificOrder(key) {
		return this.orderList[key];
	}	

	public updateOrder(order) {
		return this.authProvider.getCredentials().then(response => {
			return this.http.delete(
				`${this.serverURL}order?orderId=${order._id}&date=${order.date}`,
				this.requestHeaders(response.token)
			).toPromise();
		}).catch(e => {
			return Promise.reject(new Error(e.json().msg));
		});
	}

	public recreateMenuDeleted(order) {
		for (let i = 0; i < order.dishes.length; i += 1) {
			// this.addDishToOrder(order.dishes[i].dish, order.dishes[i].quantity);
		}
		console.log(this.order);
	}

	private requestHeaders(token): RequestOptions {
		let headers = new Headers({ 'Authorization': 'Bearer ' + token });
		headers.append('Content-Type', 'application/json');
		return new RequestOptions({ headers: headers });
	}
}
