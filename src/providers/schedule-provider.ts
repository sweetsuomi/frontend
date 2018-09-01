import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { GlobalProvider } from './global-provider';
import { AuthProvider } from './auth-provider';

@Injectable()
export class ScheduleProvider {

	serverURL: String;
	schedule: any;
	scheduleList: any;

	constructor(
		private http: Http,
		private globalProvider: GlobalProvider,
		private authProvider: AuthProvider
	) {
		this.serverURL = this.globalProvider.serverURL;
		this.schedule = [];
		this.scheduleList = [];
	}

	public getSchedule() {
		return this.http.get(
			`${this.serverURL}schedule/now`
		).toPromise().then(response => {
			this.schedule = response.json();
		});
	}

	public getScheduleFinishFirst() {
		return this.getSchedule().then(() => {
			let time = {
				end: 2359,
				id: ''
			};
			this.schedule.forEach(element => {
				if (element.timeEnd < time.end) {
					time.end = element.timeEnd;
					time.id = element._id;
				}
			});
			return time;
		});
	}

	public getSchedules(isEnabled?) {
		return this.http.get(
			`${this.serverURL}schedule/${isEnabled || ''}`,
			this.requestHeaders(undefined)
		).toPromise().then(response => {
			return response.json();
		});
	}

	public createSchedule(name) {
		const data = {
			name: name,
			timeStart: '00:00',
			timeEnd: '23:59'
		};
		return this.authProvider.getCredentials().then(response => {
			return this.http.post(
				`${this.serverURL}schedule`,
				JSON.stringify(data),
				this.requestHeaders(response.token)
			).toPromise().then(response => {
				return response.json();
			});
		});
		
	}

	public updateSchedule(schedule) {
		return this.authProvider.getCredentials().then(response => {
			return this.http.put(
				`${this.serverURL}schedule/${schedule._id}`,
				JSON.stringify(schedule),
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
