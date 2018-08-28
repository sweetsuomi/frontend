import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';

import { GlobalProvider } from '../../../providers/global-provider';
import { DishProvider } from '../../../providers/dish-provider';
import { MenuProvider } from '../../../providers/menu-provider';
import { ScheduleProvider } from '../../../providers/schedule-provider';
import { CategoryProvider } from '../../../providers/category-provider';

import { LoadingComponent } from '../../../components/loading/loading';
import { ToastComponent } from '../../../components/toast/toast';

@IonicPage()
@Component({
	selector: 'page-create-menu',
	templateUrl: 'create-menu.html',
})

export class CreateMenuPage {
	private cloudFrontURL;
	private date;
	public timeSelected;
	public categoryIndex;
	private categories;
	private schedule;
	private dishList;
	private menuDay;
	private arrayKeys;

	constructor(
		private loading: LoadingComponent,
		private globalProvider: GlobalProvider,
		private dishProvider: DishProvider,
		private categoryProvider: CategoryProvider,
		private menuProvider: MenuProvider,
		private scheduleProvider: ScheduleProvider,
		private toast: ToastComponent
	) { }

	ionViewDidLoad() {
		this.loading.createAnimation('Cargando listado de platos...');
		this.cloudFrontURL = this.globalProvider.cloudFrontURL;
		this.date = new Date().toISOString().split('T')[0];
		this.scheduleProvider.getSchedules(true).then(response => {
			this.schedule = response;
			this.timeSelected = 0;
			return this.categoryProvider.loadCategories();
		}).then(response => {
			this.categories = response;
			this.categoryIndex = 0;
			this.loadDishes();
		});
	}

	changeDate() {
		this.loading.createAnimation('Cargando listado...');
		this.menuDay = undefined;
		this.loadMenuDay();
	}

	changeTime() {
		this.loading.createAnimation('Cargando listado...');
		this.menuDay = undefined;
		this.loadMenuDay();
	}
	
	changeCategory() {
		this.loading.createAnimation('Cargando listado...');
		this.loadDishes();
	}

	loadDishes() {
		const category = this.categories[this.categoryIndex];
		this.dishProvider.loadDishes(category._id, 0, 2000).then(response => {
			return this.dishProvider.filterGroupByCategory();
		}).then(response => {
			this.dishList = response[category.name].dishes;
			this.loadMenuDay();
		}).catch(e => {
			this.toast.setToastError(e)
		});
	}

	loadMenuDay() {		
		const time = this.schedule[this.timeSelected]._id;
		this.menuProvider.getMenu(this.date, time).then(() => {
			return this.menuProvider.filterMenuListGroupById();
		}).then(response => {
			this.menuDay = response;
		}).catch(e => {
			this.toast.setToastError(e);
		}).then(() => {
			this.loading.stopAnimation()
		});
	}

	initArrayKeys() {
		this.arrayKeys = [];
		for (var i = 0; i < 30; i++) {
			this.arrayKeys.push({
				value: i,
				selected: false
			});
		}
	}

	getArrayKeys(dishId) {
		this.initArrayKeys();
		this.arrayKeys[0].selected = true;
		if (this.menuDay[dishId]) {
			this.arrayKeys[0].selected = false;
			this.arrayKeys[this.menuDay[dishId].quantity].selected = true;
		}
		return this.arrayKeys;
	}

	modifyDishQuantity(dish, menu, quantity) {
		quantity === 0 ? this.deleteDishFromMenu(menu) : this.createDishOnMenu(dish._id, quantity);
	}
	
	deleteDishFromMenu(menu) {
		this.menuProvider.deleteDishFromMenu(menu.dish._id).then(response => {
			this.toast.setToastMessage("El plato ha sido eliminado del menú");
		}).catch(e => {
			this.toast.setToastError(e);
		});
	}

	createDishOnMenu(dishId, quantity) {
		const date = this.date.replace(/-/g, '');
		const scheduleId = this.schedule[this.timeSelected]._id;
		this.menuProvider.postMenuDish(dishId, quantity, date, scheduleId).then(() => {
			this.menuDay = undefined;
			this.loadMenuDay();
		}).catch(e => {
			this.toast.setToastError(e);
		});
	}

	objectKeys = Object.keys;
}
