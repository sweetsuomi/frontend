import { Injectable } from '@angular/core';

import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { GlobalProvider } from './global-provider';
import { AuthProvider } from '../providers/auth-provider';

@Injectable()
export class IntoleranceProvider {
	
	private serverURL: String;
	public intoleranceList: any;

  constructor(
		private http: Http,
		private globalProvider: GlobalProvider,
		private authProvider: AuthProvider
	) {
		this.serverURL = this.globalProvider.getServerURL();
	}
	
	public loadIntolerances() {
		return this.http.get(
			`${this.serverURL}intolerance`
		).toPromise().then(data => {
			this.intoleranceList = data.json().intolerances;
		}).catch(e => {
			return Promise.reject(new Error(e));
		});
	}
	
	public filterGroupById() {
		// let object = {};
		// for (let i = 0; i < this.intoleranceList.length; i += 1) {
		// 	object[this.intoleranceList[i]._id] = new IntoleranceModel(this.intoleranceList[i]);
		// }
		// this.intoleranceList = object;
		// return Promise.resolve(object);
	}
	
	public getIntoleranceList() {
		if (this.intoleranceList) {
			return this.intoleranceList;
		}
	}
	
	public startNewIntolerance() {
	}
	
	public createIntolerance(intolerance, image) {
		// let params: any = new IntoleranceModel();
		// return params.update(intolerance).then(() => {
		// 	return this.authProvider.getCredentials();
		// }).then(response => {
		// 	intolerance.imgName = image.name
		// 	return this.http.post(
		// 		`${this.serverURL}intolerance`,
		// 		intolerance,
		// 		this.requestHeaders(response.token)
		// 	).toPromise();
		// }).then(response => {
		// 	params._id = response.json().intolerance;
		// 	this.intoleranceList[params._id] = new IntoleranceModel(params);
		// }).catch(e => {
		// 	console.log(e);
		// 	return Promise.reject(new Error("Error creando la intolerancia"));
		// });
	}
	
	public updateIntolerance(key, img) {
		return this.authProvider.getCredentials().then(response => {
			let params = this.intoleranceList[key];
			if (img.name) {
				params.imgName = img.name;
			}
			return this.http.put(
				`${this.serverURL}intolerance`,
				params,
				this.requestHeaders(response.token)
			).toPromise();
		}).catch((e) => {
			return Promise.reject(new Error("Error actualizando la intolerancia"));
		});
	}
	
	public deleteIntolerance(key: string): Promise<any> {
		return this.authProvider.getCredentials().then(response => {
			return this.http.delete(
				`${this.serverURL}intolerance?_id=${this.intoleranceList[key]._id}`,
				this.requestHeaders(response.token)
			).toPromise();
		}).then(() => {
			delete this.intoleranceList[key];
		}).catch(e => {
			return Promise.reject(new Error(e));
		});
	}
	
	public getIntoleranceFromList(key) {
		if (this.intoleranceList) {
			return this.intoleranceList[key];
		}
	}
	
	public updateIntoleranceList(key, intolerance) {
		this.intoleranceList[0]
		return this.intoleranceList[key].update({
			_id: intolerance._id,
			name: intolerance.name
		}).catch(error => {
			throw new Error(error.message);
		});
	}
	
	private requestHeaders(token): RequestOptions {
		let headers = new Headers({ 'Authorization': 'Bearer ' + token });
    headers.append('Content-Type', 'application/json');
		return new RequestOptions({ headers: headers });
	}
}
