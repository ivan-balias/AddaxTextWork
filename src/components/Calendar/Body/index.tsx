import React, {useContext} from 'react';
import {Day, DaysWrapper} from './Days.styles';
import {Weeks} from './Weeks.styles';
import {AppContext} from "../../AppContext";

const dayNames = ["mo", "tu", "we", "th", "fr", "sa", "su"];

const Index = ({}) => {
    const {days, getDayEvents, updateIsOpenEvent} = useContext(AppContext);
    return (
        <>
            <Weeks>
                {dayNames.map((el, i) => (
                    <div key={i}>{el}</div>
                ))}
            </Weeks>
            <DaysWrapper>
                {days.map((el, i) => (
                    <Day onClick={
                        () => {
                            !el.inactive && getDayEvents(el);
                            !el.inactive && updateIsOpenEvent(true)
                        }
                    } key={i} inactive={el.inactive} hasEvents={el.hasEvents} date={el.date} dateKey={el.dateKey}>
                        <span>{el.date.day}</span>
                        {el?.hasEvents && (
                            <i></i>
                        )}
                    </Day>
                ))}
            </DaysWrapper>


        </>
    );
};

export default Index;