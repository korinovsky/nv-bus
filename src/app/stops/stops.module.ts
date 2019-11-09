import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {StopsComponent} from "./stops.component";
import {StopModule} from "./stop/stop.module";

@NgModule({
    declarations: [
        StopsComponent
    ],
    imports: [
        CommonModule,
        StopModule
    ]
})
export class StopsModule {}
