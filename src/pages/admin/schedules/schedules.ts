import { Component } from '@angular/core';
import { IonicPage, AlertController } from 'ionic-angular';

import { ScheduleProvider } from '../../../providers/schedule-provider';
import { LoadingComponent } from '../../../components/loading/loading';
import { ToastComponent } from '../../../components/toast/toast';
import * as moment from 'moment';

@IonicPage()
@Component({
	selector: 'page-schedules',
	templateUrl: 'schedules.html',
})
export class SchedulesPage {

	scheduleList: any

	constructor(
		private loading: LoadingComponent,
		private scheduleProvider: ScheduleProvider,
		private alertCtrl: AlertController,
		private toast: ToastComponent,
	) { }

	ionViewDidLoad() {
		this.loading.createAnimation('Cargando listado de horarios...');
	}

	ionViewDidEnter() {
		this.getSchedules();
	}

	getSchedules() {
		this.scheduleList = [];
		this.scheduleProvider.getSchedules().then(response => {
			this.formatTime(response);
		}).catch(e => {
			this.toast.setToastError(e);
		}).then(() => {
			this.loading.stopAnimation();
		});
	}

	createSchedule() {
		this.displayPrompt().then(() => {
			this.getSchedules();
		}).catch(e => {
			this.toast.setToastError(e);
			this.loading.stopAnimation();
		});
	}

	updateSchedule(schedule) {
		this.loading.createAnimation('Actualizando el estado del horario...');
		this.scheduleProvider.updateSchedule(schedule).catch(e => {
			this.toast.setToastError(e);
		}).then(() => {
			this.loading.stopAnimation();
		});
	}

	updateTime(event, schedule, element) {
		const hours = event.hour === 0 ? '00' : event.hour < 10 ? '0' + event.hour : '' + event.hour;
		const minutes = event.minute === 0 ? '00' : event.minute < 10 ? '0' + event.minute : '' + event.minute;

		schedule[element] = hours + ':' + minutes;

		this.updateSchedule(schedule);
	}


	formatTime(data) {
		this.scheduleList = data.map(function (element) {
			const timeStart = element.timeStart < 10 ? '000' + element.timeStart : element.timeStart < 100 ? '00' + element.timeStart : element.timeStart < 1000 ? '0' + element.timeStart : element.timeStart;
			const timeEnd = element.timeEnd < 10 ? '000' + element.timeEnd : element.timeEnd < 100 ? '00' + element.timeEnd : element.timeEnd < 1000 ? '0' + element.timeEnd : element.timeEnd;
			element.timeStart = moment(timeStart, "HHmm").format("HH:mm")
			element.timeEnd = moment(timeEnd, "HHmm").format("HH:mm")
			return element;
		})
	}

	displayPrompt(name = undefined) {
		return new Promise((resolve, reject) => {
			this.alertCtrl.create({
				title: 'Crear franja horaria',
				message: '',
				inputs: [{
					name: 'name',
					placeholder: 'entrante, postre...',
					value: name,
					type: 'string'
				}],
				buttons: [{
					text: 'Cancelar'
				}, {
					text: 'Agregar',
					handler: data => {
						this.loading.createAnimation('Creando franja horaria...');
						this.scheduleProvider.createSchedule(data.name).then(() => {
							resolve();
						}).catch(e => {
							reject(e);
						});
					}
				}]
			}).present();
		});
	}
}