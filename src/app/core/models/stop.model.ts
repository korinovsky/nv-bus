import {DbItem} from "~core/models/db.model";

export enum WayDirection {
    AB = 'AB',
    BA = 'BA',
}

export const wayDirectionName = {
    [WayDirection.AB]: 'Туда',
    [WayDirection.BA]: 'Обратно'
};

export type WayDirectionKey = keyof typeof WayDirection;

export type Times = {
    [direction in WayDirectionKey]: number[];
}

export interface Stop extends DbItem {
    way: string;
    wayPoint: number;
    direction: WayDirectionKey;
    times?: Times;
}

export type WayPoint = { id: number, name: string };
