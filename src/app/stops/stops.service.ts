import {Injectable} from '@angular/core';
import {DirectionsService} from "~core/directions.service";
import _forEach from "lodash/forEach";
import _reduce from "lodash/reduce";
import {Direction} from "~core/models/direction.model";
import {filter} from "rxjs/operators";
import {BehaviorSubject} from "rxjs";

export class BusTime {
    time: number;
    bus: string;
}

export class StopModel {
    name: string;
    days: {[key: string]: BusTime[]};
}

@Injectable()
export class StopsService {
    stops = new BehaviorSubject<StopModel[]>([]);

    constructor(
        directionsService: DirectionsService
    ) {
        directionsService.items
            .pipe(filter(v => !!v))
            .subscribe(directions => {
            this.stops.next(directions.map(this.mapDirection.bind(this)));
        });
    }

    getStop(name: string) {
        return this.stops.getValue().find(stop => stop.name === name);
    }

    private mapDirection(direction: Direction) {
        const stop = new StopModel();
        stop.name = direction.name;
        stop.days = this.getDaysOfWeek(direction);
        _forEach(direction.stops, directionStop =>
            _forEach(directionStop.times, (times, daysCode) => {
                this.pushBusTime(stop.days[daysCode], directionStop.way, times);
            })
        );
        stop.days = _forEach(stop.days, (days, key) =>
            stop.days[key] = days.sort((a, b) => a.time - b.time));
        return stop;
    }

    private getDaysOfWeek(direction: Direction): {[key: string]: []} {
        return _reduce(direction.stops, (res, stop) => {
            Object.keys(stop.times).forEach(daysCode => {
                if (!res[daysCode]) {
                    res[daysCode] = [];
                }
            });
            return res;
        }, {});
    }

    private pushBusTime(times: BusTime[], way: string, source: number[]) {
        source.forEach(busTime => {
            const time = new BusTime();
            time.time = busTime * 60;
            time.bus = way;
            times.push(time);
        });
    }
}
