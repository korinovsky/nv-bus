export const directionName = {
    AB: 'Туда',
    BA: 'Обратно'
};

export interface Stop {
    key: string;
    name: string;
    direction: keyof typeof directionName;
}
