import {Injectable} from '@angular/core';
import {DbListService} from "./db-list.service";
import {AngularFireDatabase} from "@angular/fire/database";
import {Direction} from "./models/direction.model";

@Injectable()
export class DirectionsService extends DbListService<Direction> {
    constructor(db: AngularFireDatabase) {
        super(db, 'directions');
    }
}
