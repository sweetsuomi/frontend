import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { GlobalProvider } from '../providers/global-provider';
import { AuthProvider } from '../providers/auth-provider';
import { MenuProvider } from '../providers/menu-provider';
import { FeedbackProvider } from '../providers/feedback-provider';
import { OrderProvider } from '../providers/order-provider';
import { DishProvider } from '../providers/dish-provider';
import { CategoryProvider } from '../providers/category-provider';
import { IntoleranceProvider } from '../providers/intolerance-provider';
import { UserProvider } from '../providers/user-provider';
import { ScheduleProvider } from '../providers/schedule-provider';
import { CommunicationProvider } from '../providers/communication-provider';
import { StatsProvider } from '../providers/stats-provider';
// TO-DO: Remove GeneralProvider at the end of the review of the app
import { GeneralProvider } from '../providers/general-provider';

@NgModule({
  declarations: [
    MyApp
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
		GlobalProvider,
		AuthProvider,
    MenuProvider,
    FeedbackProvider,
		OrderProvider,
		DishProvider,
		CategoryProvider,
		IntoleranceProvider,
    UserProvider,
    ScheduleProvider,
    StatsProvider,
    CommunicationProvider,
    // TO-DO: Remove GeneralProvider at the end of the review of the app
    GeneralProvider
  ]
})
export class AppModule {}
