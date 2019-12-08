import {DbListService} from "./db-list.service";
import {AngularFireDatabase} from "@angular/fire/database";
import {Stop, Times, WayPoint} from "./models/stop.model";
import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

const host = 'https://cast256.synology.me:3443/';

@Injectable()
export class StopsService extends DbListService<Stop> {
    constructor(
        db: AngularFireDatabase,
        private http: HttpClient
    ) {
        super(db);
    }

    init(direction: string) {
        super.init(`directions/${direction}/stops`)
    }

    get ways$() {
        return this.http.get<string[]>(`${host}ways`);
    }

    wayPoints$(way: string, direction: string) {
        return this.http.get<WayPoint[]>(`${host}ways/${way}/${direction}`);
    }

    times$(stop: Stop): Observable<Times>
    times$(stop: number, way: string, direction: string): Observable<Times>
    times$(stop: number | Stop, way?: string, direction?: string): Observable<Times> {
        if (typeof stop === 'object') {
            way = stop.way;
            direction = stop.direction;
            stop = stop.wayPoint;
        }
        return this.http.get<Times>(`${host}times/${way}/${direction}/${stop}`);
    }
}
