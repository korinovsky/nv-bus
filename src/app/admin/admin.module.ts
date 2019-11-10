import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AdminComponent} from './admin.component';
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {DirectionsModule} from "./directions/directions.module";

@NgModule({
    declarations: [
        AdminComponent
    ],
    imports: [
        CommonModule,
        MatIconModule,
        MatButtonModule,
        MatProgressSpinnerModule,
        DirectionsModule
    ]
})
export class AdminModule {}
