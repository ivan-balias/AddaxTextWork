import React from "react";
import {DateDefaultValue, DateType} from "../types/DateType";
import {EventsType, EventType} from "../types/EventType";
import {DayDefaultValue, DayType} from "../types/DayType";


type AppContextType = {
    curDate: DateType,
    updateCurDate: ({year, month}: DateType) => void,
    days: DayType[],
    dayEvents?: EventType[] | [],
    selectedDay: DayType,
    getDayEvents: (day: DayType) => void,
    updateDayEvents: (event: EventType, day: DayType) => void,
    isOpenEvent: boolean,
    updateIsOpenEvent: (bool: boolean) => void,
    events: EventsType,
    updateEvents: (events: EventsType) => void

}

export const AppContext = React.createContext<AppContextType>({
    curDate: DateDefaultValue,
    updateCurDate: ({year,month}:DateType) => {},
    days: [],
    dayEvents: [],
    selectedDay: DayDefaultValue,
    getDayEvents: (day: DayType)=>{},
    updateDayEvents: (event: EventType, day: DayType) => {},
    isOpenEvent:false,
    updateIsOpenEvent: (bool:boolean) => {},
    events: {},
    updateEvents: (events:EventsType) => {}
});