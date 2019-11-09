import {Injectable} from '@angular/core';
import * as moment from 'moment'
import {Moment} from 'moment'

interface HolidayModel {
    date: Moment;
    holiday: boolean;
}

@Injectable()
export class HolidayService {

    private holidays: HolidayModel[] = [
        {date: moment("2019-05-01"), holiday: true},
        {date: moment("2019-05-02"), holiday: true},
        {date: moment("2019-05-03"), holiday: true},
        {date: moment("2019-05-09"), holiday: true},
        {date: moment("2019-05-10"), holiday: true},
        {date: moment("2019-06-12"), holiday: true},
        {date: moment("2019-11-04"), holiday: true},
    ];

    private static isRest(date: Moment, startDate?: Moment, endDate?: Moment) {
        if (startDate) {
            if (endDate) {
                return date.isBetween(startDate, endDate, null, '[]');
            }
            return date.isSameOrAfter(startDate);
        } else if (endDate) {
            return date.isSameOrBefore(endDate);
        }
        return false;
    }

    workDays(buyDate: Moment, days: number, startDate?: Moment, endDate?: Moment) {
        let date = buyDate.clone();
        let workDays = 0;
        for (let i = 0; i < days; i++) {
            workDays += +(this.isWorkDay(date) && !HolidayService.isRest(date, startDate, endDate));
            date.add(1, 'days');
        }
        return workDays;
    }

    private isWorkDay(date: Moment): boolean {
        const holiday = this.holidays.find(value => value.date.isSame(date));
        if (holiday) return !holiday.holiday;
        return [1, 2, 3, 4, 5].includes(date.isoWeekday());
    }
}
