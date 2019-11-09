import {Injectable} from '@angular/core';
import stops from '../data/stops';

export class BusTime {
    time: number;
    bus: string;
}

export class DayOfWeek {
    code: string;
    times: Array<BusTime>;
}

export class StopModel {
    name: string;
    days: Array<DayOfWeek>;
}

@Injectable()
export class StopsService {
    private stops: Array<StopModel> = new Array<StopModel>();

    constructor() {
        Object.keys(stops).forEach((stopName) => {
            let stop = new StopModel();
            stop.name = stopName;
            stop.days = new Array<DayOfWeek>();
            this.pushDayOfWeek(stop, stopName);
            this.stops.push(stop);
        });
    }

    getStops() {
        return this.stops;
    }

    getStop(name: string) {
        return this.stops.find(stop => stop.name === name);
    }

    private pushDayOfWeek(stop, stopName) {
        Object.keys(stops[stopName]).forEach((daysCode) => {
            let day = new DayOfWeek();
            stop.days.push(day);
            day.code = daysCode;
            day.times = new Array<BusTime>();
            this.pushBusStop(day, stopName, daysCode);
        });
    }

    private pushBusStop(day, stopName, daysCode) {
        stops[stopName][daysCode].forEach((elem) => {
            let time = new BusTime();
            day.times.push(time);
            time.time = elem.time;
            time.bus = elem.way;
        });
    }
}
