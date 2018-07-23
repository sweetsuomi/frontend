import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { GlobalProvider } from './global-provider';

@Injectable()
export class AuthProvider {
	
	private serverURL: String;
	private token: string;
	private userId: string;
	private nickname: string;
	public role: string;
	public auth;

  constructor(
		private http: Http,
		private globalProvider: GlobalProvider
	) {
		this.serverURL = this.globalProvider.getServerURL();
		this.auth = {
			email: '',
			password: ''
		};
		this.role = 'user';
	}
	
	validate() {
		return new Promise((resolve, reject) => {
			const email_regexp = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;
			const email = this.auth.email;
			const password = this.auth.password;
			
			if (typeof email === undefined || email === '') {
				return reject(new Error("El campo email no puede estar vacío"));
			} else if (!email_regexp.test(email) || typeof email !== 'string') {
				return reject(new Error("El email debe ser válido"));
			} else if (email.length < 8) {
				return reject(new Error("Prueba con un email mas largo"));
			} else if (this.auth.email.length > 75) {
				return reject(new Error("El email es un poco largo, prueba con uno que tenga menos caracteres"));
			}
			
			if (typeof password === undefined || password === '') {
				return reject(new Error("El campo contraseña no puede estar vacío"));
			} else if (typeof password !== 'string' || password.length < 4 || password.length > 25) {
				return reject(new Error("El usuario o la contraseña introducida no existe"));
			}

			resolve();
		});
	}

	initAuth() {
		this.auth = {
			email: '',
			password: ''
		};
	}

	exist() {
		return this.http.get(`${this.serverURL}account/exist/${this.auth.email}`, this.requestHeaders()).toPromise();
	}

	sanitizeFields() {
		this.auth.email = this.auth.email.trim().toLowerCase();
		this.auth.password = this.auth.password.trim();
	}
	
	login() {
		return this.validate().then(() => {
			this.auth = {
				email: this.auth.email.trim().toLowerCase(),
				password: this.auth.password.trim()
			};
			return this.http.post(`${this.serverURL}account/login`, this.auth, this.requestHeaders()).toPromise();
		}).then(response => {
			let credentials = response.json();
			this.initCredentials(credentials.userId, credentials.jwt, credentials.nickname, credentials.role);
		});
	}
	
	public register(user) {
		let params = JSON.stringify({
			email: this.auth.email,
			nickname: user.nickname,
			password: this.auth.password,
			phone: user.phone,
			company: user.company
		});
		return this.http.post(`${this.serverURL}account`, params, this.requestHeaders()).toPromise();
	}
	
	public tryToInitCredentials() {
		if (localStorage.getItem('suomiUser') != null) {
			let suomiUser = JSON.parse(localStorage.getItem('suomiUser'));
			this.initCredentials(suomiUser.userId, suomiUser.token, suomiUser.nickname, suomiUser.role);
			return true;
		}
		return false;
	}
	
	public isAdmin() {
		if (this.role === 'Admin') {
			return true;
		}
		return false;
	}
	
	private initCredentials(userId, token, nickname, isAdmin) {
		this.token = token;
		this.userId = userId;
		this.nickname = nickname;
		this.role = isAdmin;
		localStorage.setItem('suomiUser', JSON.stringify({
			userId: this.userId,
			token: this.token,
			nickname: this.nickname,
			role: this.role
		}));
	}
	
	private requestHeaders() {
		let headers = new Headers();
    	headers.append('Content-Type', 'application/json');
		return new RequestOptions({ headers: headers });
	}
	
	public getCredentials() {
		if (typeof this.token === 'undefined') {
			if (!this.tryToInitCredentials()) {
				return Promise.reject(new Error("The user is not logged"));
			}
			return Promise.resolve({
				token: this.token,
				user: this.userId,
				nickname: this.nickname,
				role: this.role
			});
		}
		return Promise.resolve({
			token: this.token,
			user: this.userId,
			nickname: this.nickname,
			role: this.role
		});
	}
	
	public logout() {
		this.token = undefined;
		this.userId = undefined;
		this.nickname = undefined;
		this.role = undefined;
		localStorage.removeItem('suomiUser');
		return Promise.resolve();
	}
	
}
