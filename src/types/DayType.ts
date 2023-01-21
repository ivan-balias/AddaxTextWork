import {EventType} from "./EventType";

export const DayDefaultValue: DayType = {
    date: {
        day: 1,
        month: 1,
        year: 1970
    },
    dateKey: "1970-01-01",
    inactive: false,
    hasEvents: true
}

export type DayType = {
    date: {
        day: number,
        month: number,
        year: number
    },
    dateKey: string
    inactive: boolean,
    hasEvents?: boolean;
}