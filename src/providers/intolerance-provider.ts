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
			return this.intoleranceList = data.json();
		});
	}

	public createIntolerance(intolerance, image) {
		// return this.authProvider.getCredentials().then(response => { 
		// 	let formData: FormData = new FormData();

		// 	for (const data in dish) {
		// 		if (data === 'category') {
		// 			formData.append(data, dish[data]._id);
		// 		} else if (data === 'intolerances') {
		// 			for (let i = 0; i < dish.intolerances.length; i += 1) {
		// 				formData.append(data + '[' + i + ']', dish.intolerances[i]);
		// 			}
		// 		} else {
		// 			formData.append(data, dish[data]);
		// 		}
		// 	}
			
		// 	if (file && file.name) {
		// 		formData.append('picture', file);
		// 	}

		// 	return this.http.put(
		// 		`${this.serverURL}dish/${dish._id}`,
		// 		formData,
		// 		this.requestHeaders(response.token, true)
		// 	).toPromise();
		// }).catch(e => {
		// 	return Promise.reject(new Error(e));
		// });



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

	public deleteIntolerance(id): Promise<any> {
		return this.authProvider.getCredentials().then(response => {
			return this.http.delete(
				`${this.serverURL}intolerance/${id}`,
				this.requestHeaders(response.token, false)
			).toPromise();
		});
	}
	
	public deleteIntoleranceFromList(key) {
		delete this.intoleranceList[key];
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
				this.requestHeaders(response.token, false)
			).toPromise();
		}).catch((e) => {
			return Promise.reject(new Error("Error actualizando la intolerancia"));
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
