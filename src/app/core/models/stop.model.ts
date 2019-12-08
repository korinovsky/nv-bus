import {DbItem} from "~core/models/db.model";

export const directionName = {
    AB: 'Туда',
    BA: 'Обратно'
};

export type Direction = keyof typeof directionName;

export type Times = {
    [direction in Direction]: number[];
}

export interface Stop extends DbItem {
    way: string;
    wayPoint: number;
    direction: Direction;
    times?: Times;
}

export type WayPoint = { id: number, name: string };
