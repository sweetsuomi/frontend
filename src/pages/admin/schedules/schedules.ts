import { Component } from '@angular/core';
import { IonicPage, NavController, AlertController } from 'ionic-angular';

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
		private navCtrl: NavController,
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
		});
	}
	
	updateSchedule(schedule) {

	}

	deleteSchedule(key) {
		this.alertCtrl.create({
			title: 'Borrar franja horaria',
			message: '¿Estás seguro que quieres eliminar esta franja horaria?</b>',
			buttons: [{
				text: 'Cancelar'
			}, {
				text: 'Aceptar',
				handler: () => {
					// this.loading.createAnimation('Borrando intolerancia...');
					// this.intoleranceProvider.deleteIntolerance(this.intoleranceList[key]._id).then(() => {
					// 	this.getIntolerances();
					// }).catch(e => {
					// 	this.toast.setToastError(e);
					// });
				}
			}]
		}).present();
	}

	formatTime(time) {
		if (time === 0) {
			return '00:00';
		}
		return moment(time, "hmm").format("HH:mm");
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