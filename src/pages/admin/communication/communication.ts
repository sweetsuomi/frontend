import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';

import { LoadingComponent } from '../../../components/loading/loading';
import { ToastComponent } from '../../../components/toast/toast';
import { CommunicationProvider } from '../../../providers/communication-provider';

@IonicPage()
@Component({
    selector: 'page-communication',
    templateUrl: 'communication.html',
})
export class CommunicationPage {

    private message: string;

    constructor(
        private loading: LoadingComponent,
        private communicationProvider: CommunicationProvider,
        private toast: ToastComponent
    ) { }

    sendFeedback() {
        this.loading.createAnimation('Cargando listado...');
        this.communicationProvider.sendEmailToAllUsers(this.message).catch(e => {
            this.toast.setToastError(e);
        }).then(() => {
            this.loading.stopAnimation();
        });
    }
}
