import {NgModule} from '@angular/core';
import {AuthService} from "./auth.service";
import {DirectionsService} from "./directions.service";
import {HttpClient, HttpClientModule} from "@angular/common/http";

@NgModule({
    declarations: [],
    imports: [
        HttpClientModule
    ],
    providers: [
        AuthService,
        DirectionsService,
        HttpClient
    ]
})
export class CoreModule {}
