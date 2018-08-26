import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { GlobalProvider } from './global-provider';
import { AuthProvider } from './auth-provider';

@Injectable()
export class StatsProvider {

	serverURL: String;
	schedule: any;

	constructor(
		private http: Http,
        private globalProvider: GlobalProvider,
        private authProvider: AuthProvider
	) {
		this.serverURL = this.globalProvider.serverURL;
	}

	public getSoldDishes() {
        return this.authProvider.getCredentials().then(response => {
			return this.http.get(
				`${this.serverURL}stats/orderdish/sold`,
				this.requestHeaders(response.token)
			).toPromise().then(response => {
				return response.json();
			});
        });
    }
    
    public getUsersCounter() {
        return this.authProvider.getCredentials().then(response => {
			return this.http.get(
				`${this.serverURL}stats/user/count`,
				this.requestHeaders(response.token)
			).toPromise().then(response => {
				return response.json();
			});
        });
    }
    
    public getOrdersCounter() {
        return this.authProvider.getCredentials().then(response => {
			return this.http.get(
				`${this.serverURL}stats/order/count`,
				this.requestHeaders(response.token)
			).toPromise().then(response => {
				return response.json();
			});
        });
	}

	private requestHeaders(token) {
		let headers = new Headers({ 'Authorization': 'Bearer ' + token });
		headers.append('Content-Type', 'application/json');
		return new RequestOptions({ headers: headers });
	}
}
