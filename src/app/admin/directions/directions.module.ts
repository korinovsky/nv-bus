import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DirectionsComponent} from './directions.component';
import {MatTableModule} from "@angular/material/table";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatDialogModule} from "@angular/material/dialog";
import {FormComponent} from "./form/form.component";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {FormModule} from "./form/form.module";

@NgModule({
    declarations: [
        DirectionsComponent
    ],
    imports: [
        CommonModule,
        MatTableModule,
        MatProgressSpinnerModule,
        MatDialogModule,
        MatButtonModule,
        MatIconModule,
        FormModule
    ],
    exports: [
        DirectionsComponent
    ],
    entryComponents: [
        FormComponent
    ]
})
export class DirectionsModule {}
