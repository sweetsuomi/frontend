import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { GlobalProvider } from './global-provider';

@Injectable()
export class ScheduleProvider {

	serverURL: String;
	schedule: any;

	constructor(
		private http: Http,
		private globalProvider: GlobalProvider
	) {
		this.serverURL = this.globalProvider.getServerURL();
		this.schedule = [];
	}

	public getSchedule() {
		return this.http.get(`${this.serverURL}schedule/now`).toPromise().then((response: Response) => {
			this.schedule = response.json();
		});
	}

	public getScheduleFinishFirst() {
		return this.getSchedule().then(() => {
			let time = 2399;
			this.schedule.forEach(element => {
				if (element.timeEnd < time) {
					time = element.timeEnd
				}
			});
			return time;
		});
	}

	public getSchedules() {
		return this.http.get(`${this.serverURL}schedule`, this.requestHeaders(undefined)).toPromise().then((response: Response) => {
			return response.json();
		});
	}

	private requestHeaders(token) {
		let headers = new Headers({ 'Authorization': 'Bearer ' + token });
		headers.append('Content-Type', 'application/json');
		return new RequestOptions({ headers: headers });
	}
}
