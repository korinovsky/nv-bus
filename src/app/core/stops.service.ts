import {DbListService} from "./db-list.service";
import {AngularFireDatabase} from "@angular/fire/database";
import {Stop} from "./models/stop.model";
import {Injectable} from "@angular/core";

@Injectable()
export class StopsService extends DbListService<Stop> {
    constructor(db: AngularFireDatabase) {
        super(db);
    }

    init(directionKey: string) {
        super.init(`directions/${directionKey}/stops`)
    }
}
