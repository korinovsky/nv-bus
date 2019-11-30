import {BrowserModule} from '@angular/platform-browser';
import {LOCALE_ID, NgModule} from '@angular/core';
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MAT_DATE_LOCALE} from "@angular/material/core";
import {MatMomentDateModule} from "@angular/material-moment-adapter";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MatToolbarModule} from "@angular/material/toolbar";
import {AngularFireModule} from "@angular/fire";
import {AngularFireAuthModule} from "@angular/fire/auth";

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {StopsModule} from "./stops/stops.module";
import {TicketModule} from "./ticket/ticket.module";
import {AdminModule} from "./admin/admin.module";
import {firebase} from "./conf/firebase";
import {AngularFireDatabaseModule} from "@angular/fire/database";
import {CoreModule} from "./core/core.module";

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        StopsModule,
        TicketModule,
        AdminModule,
        MatToolbarModule,
        MatButtonModule,
        MatIconModule,
        MatMomentDateModule,
        AngularFireModule.initializeApp(firebase),
        AngularFireAuthModule,
        AngularFireDatabaseModule,
        CoreModule
    ],
    providers: [
        {provide: LOCALE_ID, useValue: 'ru-RU'},
        {provide: MAT_DATE_LOCALE, useValue: 'ru-RU'}
    ],
    bootstrap: [AppComponent]
})
export class AppModule {}
