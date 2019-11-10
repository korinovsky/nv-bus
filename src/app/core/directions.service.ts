import {Injectable} from '@angular/core';
import {DbListService} from "./db-list.service";
import {AngularFireDatabase} from "@angular/fire/database";

interface Stop {
    key: string;
    name: string;
}

export interface Direction {
    key: string;
    name: string;
    stops?: Stop[]
}

@Injectable()
export class DirectionsService extends DbListService<Direction> {
    constructor(db: AngularFireDatabase) {
        super(db, 'directions');
    }
}
