import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {StopModel, StopsService} from "../stops.service";
import _forEach from "lodash/forEach";
import {filter} from "rxjs/operators";

interface Arrival {
    time: string;
    bus: string;
    future: boolean;
}

@Component({
    selector: 'app-stop',
    templateUrl: './stop.component.html',
    styleUrls: ['./stop.component.scss']
})
export class StopComponent implements OnInit, OnDestroy {
    private static numberOfArrivals = 10;
    private static secondsToShow = 60;
    @Input() public stop: StopModel;
    public arrivals: Array<Arrival>;
    public short;
    private timeout: number;

    constructor(
        private route: ActivatedRoute,
        private stopsService: StopsService,
        private router: Router
    ) {}

    private static getTimeFormatted(time: number): string {
        let hours = Math.floor(time / 3600);
        let minutes = (time - hours * 3600) / 60;
        return hours + ":" + (minutes < 10 ? "0" : "") + minutes;
    }

    ngOnInit() {
        this.short = !!this.stop;
        if (this.short) {
            this.refresh();
        } else {
            this.route.params.subscribe(params => {
                this.stopsService.stops
                    .pipe(filter(v => v.length > 0))
                    .subscribe(() => {
                        this.stop = this.stopsService.getStop(params.stop);
                        if (!this.stop) {
                            this.router.navigate(['/']);
                        }
                        this.ngOnDestroy();
                        this.refresh();
                    })
            })
        }
    }

    refresh() {
        let now = new Date();
        if (now.getHours() < 4) {
            now.setDate(now.getDate() - 1);
        }

        const nowTime = now.getHours() * 3600 + now.getMinutes() * 60 - StopComponent.secondsToShow,
            dayOfWeek = (now).getDay(),
            checkDate = function (date) {
                return parseInt(date, 2) & [1, 64, 32, 16, 8, 4, 2][dayOfWeek];
            };

        this.arrivals = [];
        _forEach(this.stop.days, (times, dayCode) => {
            if (checkDate(dayCode)) {
                let future = false;
                _forEach(times, busTime => {
                    let time = busTime.time;
                    future = future || time >= nowTime;
                    if (this.short && !future) {
                        return;
                    }
                    this.arrivals.push({
                        time: StopComponent.getTimeFormatted(time),
                        bus: busTime.bus,
                        future: future,
                    });
                    if (this.short && this.arrivals.length == StopComponent.numberOfArrivals) {
                        return false;
                    }
                });
                return false;
            }
        });
        this.timeout = setTimeout(this.refresh.bind(this), 60001 - now.getMilliseconds() - now.getSeconds() * 1000);
    }

    ngOnDestroy(): void {
        if (this.timeout !== undefined) clearTimeout(this.timeout);
    }
}
