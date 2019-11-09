import {Component, OnInit} from '@angular/core';
import {StopModel, StopsService} from "./stops.service";
import {Router} from "@angular/router";

@Component({
    selector: 'app-stops',
    templateUrl: './stops.component.html',
    styleUrls: ['./stops.component.scss']
})
export class StopsComponent implements OnInit {
    public stops: Array<StopModel>;

    constructor(
        private stopsService: StopsService,
        private router: Router
    ) {}

    ngOnInit() {
        this.stops = this.stopsService.getStops();
    }

    stopClicked(stop: StopModel) {
        this.router.navigate(['/', stop.name])
    }
}
