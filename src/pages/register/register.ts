import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, Slides } from 'ionic-angular';

import { AuthProvider } from '../../providers/auth-provider';
import { UserProvider } from '../../providers/user-provider';
import { ToastComponent } from '../../components/toast/toast';

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})

export class RegisterPage {
	@ViewChild(Slides) slides: Slides;
	
	private user: Object;
	private auth: Object;
	private conditions: boolean;

  	constructor(
		private navCtrl: NavController,
		private toast: ToastComponent,
		private userProvider: UserProvider,
		private authProvider: AuthProvider
	) {}

  	ionViewDidLoad() {
		this.conditions = false;
		this.authProvider.initAuth();
		this.userProvider.initUser();
		this.auth = this.authProvider.auth;
		this.user = this.userProvider.user;
	}

	ngAfterViewInit() {
		this.slides.lockSwipes(true);
	}
	
	public slide1() {
		Promise.all([
			this.authProvider.validate(),
			this.userProvider.validateNickname()
		]).then(() => {
			return Promise.all([
				this.authProvider.exist(),
				this.userProvider.exist()
			])
		}).then(() => {
			this.nextSlide();
		}).catch(e => {
			this.toast.setToastError(e);
		});
	}
	
	public slide2() {
		this.userProvider.validatePhoneAndCompany().then(() => {
			if (this.conditions === false) {
				throw new Error("Para finalizar el proceso, es necesario leer y aceptar los términos y condiciones de uso");
			}
			this.userProvider.sanitizeFields();
			this.authProvider.sanitizeFields();
			const user = {
				email: this.authProvider.auth.email,
				nickname: this.userProvider.user.nickname,
				password: this.authProvider.auth.password,
				phone: this.userProvider.user.phone,
				company: this.userProvider.user.company
			}
			return this.authProvider.register(user);
		}).then(() => {
			this.nextSlide();
		}).catch(e => this.toast.setToastError(e));
	}

	public slide3() {
		this.authProvider.login().then(response => {
			this.navCtrl.setRoot('HomePage');
		}).catch(e => this.toast.setToastError(e));
	}
	
	private nextSlide() {
		this.slides.lockSwipeToNext(false);
		this.slides.slideTo(this.slides.getActiveIndex() + 1, 900);
		this.slides.lockSwipeToNext(true);
	}
	
	goToLogin() {
		this.navCtrl.push('LoginPage');
	}
	
	goToTerms() {
		this.navCtrl.push('AboutPage');
	}

}
