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
            this.scheduleList = response;
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
		const hours = event.hours === 0 ? '00' : event.hours < 10 ? '0' : '' + event.hour;
		const minutes = event.minute === 0 ? '00' : event.minute < 10 ? '0' : '' + event.minute;

		schedule[element] = parseInt(hours + minutes, 10);

		this.updateSchedule(schedule);
	}


	formatTime(time) {
		return moment(time, "HHmm").format("HH:mm");
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