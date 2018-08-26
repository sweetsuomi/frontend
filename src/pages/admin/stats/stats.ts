import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';

import { StatsProvider } from '../../../providers/stats-provider';

import { LoadingComponent } from '../../../components/loading/loading';
import { ToastComponent } from '../../../components/toast/toast';

@IonicPage()
@Component({
	selector: 'page-stats',
	templateUrl: 'stats.html',
})
export class StatsPage {

    private stats = {};

	constructor(
		private loading: LoadingComponent,
        private statsProvider: StatsProvider,
		private toast: ToastComponent
	) { }

	ionViewDidLoad() {
        this.loading.createAnimation('Cargando listado de estadísticas...');
        Promise.all([
            this.statsProvider.getSoldDishes(),
            this.statsProvider.getUsersCounter(),
            this.statsProvider.getOrdersCounter(),
        ]).then(response => {
            this.stats['soldDishes'] = response[0];
            this.stats['usersCounter'] = response[1];
            this.stats['ordersCounter'] = response[2];
        }).catch(e => {
            this.toast.setToastError(e);
        }).then(() => {
            this.loading.stopAnimation();
        });
	}
}
