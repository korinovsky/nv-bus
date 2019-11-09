import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {StopComponent} from './stop.component';
import {MatCardModule} from "@angular/material/card";
import {StopsService} from "../stops.service";


@NgModule({
    declarations: [
        StopComponent
    ],
    imports: [
        CommonModule,
        MatCardModule
    ],
    providers: [
        StopsService
    ],
    exports: [
        StopComponent
    ]
})
export class StopModule {}
