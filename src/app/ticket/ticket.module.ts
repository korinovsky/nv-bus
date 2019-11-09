import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TicketComponent} from "./ticket.component";
import {CookieService} from "ngx-cookie-service";
import {HolidayService} from "./holiday.service";
import {MatCardModule} from "@angular/material/card";
import {MatInputModule} from "@angular/material/input";
import {MatTableModule} from "@angular/material/table";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {FormsModule} from "@angular/forms";
import {MatSelectModule} from "@angular/material/select";

@NgModule({
    declarations: [
        TicketComponent
    ],
    imports: [
        CommonModule,
        MatCardModule,
        MatInputModule,
        MatTableModule,
        MatDatepickerModule,
        FormsModule,
        MatSelectModule
    ],
    providers: [
        HolidayService,
        CookieService
    ]
})
export class TicketModule {}
