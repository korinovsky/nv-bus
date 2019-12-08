import {Stop} from "./stop.model";
import {DbItem} from "~core/models/db.model";

export interface Direction extends DbItem {
    name: string;
    stops?: Stop[]
}
