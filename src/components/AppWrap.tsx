import React, {useEffect, useState} from 'react';
import {AppContext} from './AppContext';
import {DateDefaultValue, DateType} from "../types/DateType";
import {DayDefaultValue, DayType} from "../types/DayType";
import {EventsType, EventType} from "../types/EventType";
import Request from "../api/Request";
import {getDate} from "./Calendar/Calendar.helper";

type Props = {
    children: React.ReactNode
}

const AppWrap = ({children}: Props) => {
    const [curDate, setCurDate] = useState<DateType>(DateDefaultValue)
    const [days, setDays] = useState<DayType[]>([]);
    const [events, setEvents] = useState<EventsType>({})
    const [dayEvents, setDayEvents] = useState<EventType[]>();
    const [isOpenEvent, setIsOpenEvent] = useState<boolean>(false)
    const [selectedDay, setSelectedDay] = useState<DayType>(DayDefaultValue)

    const getPublicHolidays = async () => {
        const response = await Request.get(`PublicHolidays/${curDate.year}/UA`).then((res: any) => res.data)
        const res = response.reduce((acc: any, el: any) => (
            {
                ...acc, [el.date]: [{
                    name: el.name,
                    public: true,
                    background: "#4343db",
                    color: "white",
                    order: 0,
                }]
            }
        ), {})

        setEvents(res)
    }

    useEffect(() => {
        getPublicHolidays()
    }, [curDate.year])

    useEffect(() => {
        setDays(getDate(curDate.year, curDate.month, events))
        getDayEvents(selectedDay)
    }, [curDate, events])


    const getDayEvents = (day: DayType) => {
        const dayEvents =  events && events[day.dateKey];

        setDayEvents(dayEvents)
        setSelectedDay(day)
    }

    const updateCurDate = ({year, month}: DateType) => {
        setCurDate({
            year, month
        })
    }

    const updateIsOpenEvent = (bool: boolean) => {
        setIsOpenEvent(bool);
    }

    const updateDayEvents = (event: EventType, day: DayType) => {
        const oldEvents: [EventType] = events[day.dateKey] || [];
        oldEvents.push(event)

        setEvents({
            ...events,
            [day.dateKey] : [
                ...oldEvents
            ]
        })
    }

    const updateEvents = (eventsData: EventsType) => {
        setEvents({
            ...events,
            ...eventsData
        })
    }
    return (
        <AppContext.Provider value={{
            curDate,
            updateCurDate,
            days,
            dayEvents,
            selectedDay,
            getDayEvents,
            updateDayEvents,
            isOpenEvent,
            updateIsOpenEvent,
            events,
            updateEvents
        }}>
            {children}
        </AppContext.Provider>
    );
};

export default AppWrap;