import {DayType} from "../../types/DayType";
import {EventsType, EventType} from "../../types/EventType";

const getDaysInMonth = (year: number, month: number) => new Date(year, month, 0).getDate();
const getDayNum = (year: number, month: number) => new Date(year, month, 0).getDay();

export const dateFormat = (date: any, separator: string) => (
    `${date.year}${separator}${date.month + 1 < 11 ? `0${date.month + 1}` : date.month}${separator}${date.day + 1 < 11 ? `0${date.day}` : date.day}`
)

export const getDate = (currentYear: number, currentMonth: number, events?: EventsType): DayType[] => {
    const daysInPreviousMonth = getDaysInMonth(currentYear, currentMonth);
    const daysInCurrentMonth = getDaysInMonth(currentYear, currentMonth + 1);
    const firstDayInCurrentMonth = getDayNum(currentYear, currentMonth);

    const days: DayType[] = [];

    for (let i = firstDayInCurrentMonth; i > 0; i--) {
        days.push({
            date: {
                day: daysInPreviousMonth - i + 1,
                month: currentMonth < 1 ? 11 : currentMonth - 1,
                year: currentMonth < 1 ? currentYear - 1 : currentYear
            },
            inactive: true,
            dateKey: dateFormat(
                {
                    day: daysInPreviousMonth - i + 1,
                    month: currentMonth < 1 ? 11 : currentMonth - 1,
                    year: currentMonth < 1 ? currentYear - 1 : currentYear
                },
                "-"
            ),
            hasEvents: false
        })
    }

    for (let i = 1; i <= daysInCurrentMonth; i++) {
        const date = `${currentYear}-${currentMonth + 1 < 11 ? `0${currentMonth + 1}` : currentMonth + 1}-${i < 11 ? `0${i}` : i}`
        days.push({
            date: {
                day: i,
                month: currentMonth,
                year: currentYear
            },
            inactive: false,
            dateKey: dateFormat(
                {
                    day: i,
                    month: currentMonth,
                    year: currentYear
                }, "-"
            ),
            hasEvents: events && events[date]?.length > 0
        })
    }

    for (let i = 1; days.length <= 41; i++)
        days.push({
            date: {
                day: i,
                month: currentMonth > 10 ? 0 : currentMonth + 1,
                year: currentMonth > 10 ? currentYear + 1 : currentYear
            },
            inactive: true,
            dateKey: dateFormat(
                {
                    day: i,
                    month: currentMonth > 10 ? 0 : currentMonth + 1,
                    year: currentMonth > 10 ? currentYear + 1 : currentYear
                }, "-"
            ),
            hasEvents: false
        })


    return days;
}