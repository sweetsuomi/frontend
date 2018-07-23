import { Injectable } from '@angular/core';

import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { GlobalProvider } from './global-provider';
import { AuthProvider } from '../providers/auth-provider';

@Injectable()
export class AWSProvider {
	
	private serverURL: String;
	private tempS3TokenSigned: string;

  constructor(
		private http: Http,
		private globalProvider: GlobalProvider,
		private authProvider: AuthProvider
	) {
		this.serverURL = this.globalProvider.getServerURL();
	}
	
	public signImage(name, type): Promise<void> {
		return this.authProvider.getCredentials().then(response => {
			return this.http.get(
				`${this.serverURL}aws/sign/image?name=${name.slice(0, -4)}&type=${type.split("/")[1]}`,
				this.requestHeaders(response.token)
			).toPromise();
		}).then(response => {
			this.tempS3TokenSigned = response.json().token;
		}).catch(e => {
			return Promise.reject(e);
		});
	}
	
	public uploadToS3(file) {
		let headers = new Headers({ 'Content-Type': 'binary/octet-stream' });
		let options = new RequestOptions({ headers: headers });
		return new Promise((resolve, reject) => {
			this.http.put(this.tempS3TokenSigned, file, options)
				.toPromise().then(response => {
					let reader: FileReader = new FileReader();
					reader.onloadend = () => resolve({ base64: reader.result, name: file.name });
					reader.readAsDataURL(file);
				}).catch(error => {
					return Promise.reject(new Error("Error subiendo a S3"));
				});
		});
	}
	
	private requestHeaders(token): RequestOptions {
		let headers = new Headers({ 'Authorization': 'Bearer ' + token });
    headers.append('Content-Type', 'application/json');
		return new RequestOptions({ headers: headers });
	}
}
