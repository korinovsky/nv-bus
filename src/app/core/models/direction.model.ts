import {Stop} from "./stop.model";

export interface Direction {
    key: string;
    name: string;
    stops?: Stop[]
}
