import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {StopsComponent} from './stops.component';
import {MatButtonModule, MatIconModule, MatProgressSpinnerModule, MatTableModule} from "@angular/material";
import {FormComponent} from "./form/form.component";
import {FormModule} from "./form/form.module";

@NgModule({
    declarations: [StopsComponent],
    exports: [
        StopsComponent
    ],
    imports: [
        CommonModule,
        MatIconModule,
        MatButtonModule,
        MatProgressSpinnerModule,
        FormModule,
        MatTableModule
    ],
    entryComponents: [
        FormComponent
    ]
})
export class StopsModule {}
