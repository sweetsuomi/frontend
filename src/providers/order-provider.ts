import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
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
			orderDish: {},
			quantity: 0,
		};
		this.price = 0;
	}

	addDishToOrder(menuId, dish, quantity) {
		this.order.orderDish[dish.dish._id] = {
			menuId: menuId,
			dish: dish.dish,
			schedule: dish.schedule,
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

	private requestHeaders(token): RequestOptions {
		let headers = new Headers({ 'Authorization': 'Bearer ' + token });
		headers.append('Content-Type', 'application/json');
		return new RequestOptions({ headers: headers });
	}
}
