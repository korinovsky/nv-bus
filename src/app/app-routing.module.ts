import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {TicketComponent} from "./ticket/ticket.component";
import {StopsComponent} from "./stops/stops.component";
import {StopComponent} from "./stops/stop/stop.component";
import {AdminComponent} from "./admin/admin.component";

const routes: Routes = [
    {path: '', component: StopsComponent},
    {path: 'ticket', component: TicketComponent},
    {path: 'admin', component: AdminComponent},
    {path: ':stop', component: StopComponent},
    {path: '**', redirectTo: ''}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}
