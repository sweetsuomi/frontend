import { NgModule } from '@angular/core';

import { IonicModule } from "ionic-angular";

import { LoadingComponent } from './loading/loading';
import { ToastComponent } from './toast/toast';
import { MenuNavComponent } from './nav/nav';

@NgModule({
	declarations: [
		MenuNavComponent
	],
	imports: [IonicModule],
	exports: [
		MenuNavComponent
	],
	providers: [
		LoadingComponent,
		ToastComponent,
	]
})

export class ComponentsModule {}
