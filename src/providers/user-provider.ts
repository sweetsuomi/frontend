import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { GlobalProvider } from './global-provider';

@Injectable()
export class UserProvider {

	private serverURL: String;
	public user;

	constructor(
		private http: Http,
		private globalProvider: GlobalProvider
	) {
		this.serverURL = this.globalProvider.getServerURL();
		this.user = {
			nickname: '',
			phone: '',
			company: ''
		};
	}

	initUser() {
		this.user = {
			nickname: '',
			phone: '',
			company: ''
		};
	}

	validateNickname() {
		return new Promise((resolve, reject) => {
			if (typeof this.user.nickname === undefined || typeof this.user.nickname !== 'string') {
				return reject(new Error("El nickname no puede estar vacío"));
			} else if (this.user.nickname.length < 2) {
				return reject(new RangeError("Prueba con un nickname mas largo"));
			} else if (this.user.nickname.length > 30) {
				return reject(new RangeError("El nickname es un poco largo, prueba con uno que tenga menos caracteres"));
			}
			resolve();
		});
	}

	exist() {
		return this.http.get(`${this.serverURL}user/exist/${this.user.nickname}`, this.requestHeaders()).toPromise();
	}

	validatePhoneAndCompany() {
		return new Promise((resolve, reject) => {
			if (typeof this.user.phone === undefined || typeof this.user.phone !== 'string') {
				return reject(new Error("Déjanos tu teléfono para contactar contigo en caso de problemas con algún pedido =)"));
			}

			if (this.user.company) {
				if (this.user.company.length < 4) {
					return reject(new RangeError("Prueba con un nombre de empresa mas largo"));
				} else if (this.user.company.length > 30) {
					return reject(new RangeError("El nombre de tu empresa es un poco largo, prueba con uno que tenga menos caracteres"));
				}
			}

			resolve();
		});
	}

	private requestHeaders() {
		let headers = new Headers();
		headers.append('Content-Type', 'application/json');
		return new RequestOptions({ headers: headers });
	}

	sanitizeFields() {
		this.user.nickname = this.user.nickname.trim();
		this.user.phone = this.user.phone.trim();
		if (this.user.company) {
			this.user.company = this.user.company.trim();
		}
	}
}