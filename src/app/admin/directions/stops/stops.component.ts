import {Component, Input, OnInit} from '@angular/core';
import {StopsService} from "~core/stops.service";
import {Direction} from "~core/models/direction.model";
import {directionName, Stop} from "~core/models/stop.model";
import {MatDialog} from "@angular/material";
import {FormComponent} from "./form/form.component";
import {filter} from "rxjs/operators";
import * as _ from "lodash";

@Component({
    selector: 'app-stops',
    templateUrl: './stops.component.html',
    styleUrls: ['./stops.component.scss'],
    providers: [
        StopsService
    ]
})
export class StopsComponent implements OnInit {
    @Input() direction: Direction;
    stops: Stop[];
    columns = ['way', 'direction', 'name', 'actions'];
    getDirectionName = (direction) =>  directionName[direction];

    constructor(
        public stopsService: StopsService,
        private dialog: MatDialog
    ) {}

    ngOnInit() {
        this.stops = this.stopsFromDirection;
        this.stopsService.init(this.direction.key);
        this.stopsService.items
            .pipe(filter(value => value !== undefined))
            .subscribe(value => this.stops = value);
    }

    create() {
        this.dialog.open(FormComponent).componentInstance.initForm(this.stopsService)
    }

    remove(key: string) {
        this.stopsService.remove(key);
    }

    update(stop: Stop) {
        this.dialog.open(FormComponent).componentInstance.initForm(this.stopsService, stop);
    }

    get stopsFromDirection() {
        return _.map(_.get(this.direction, 'stops', {}), (stop, key) => ({key, ...stop}));
    }

    updateTimes() {
        this.stops.forEach(stop => {
            this.stopsService.times$(stop)
                .subscribe(result => {
                    stop.times = result;
                    this.stopsService.update(stop).then();
                });
        });
    }
}
