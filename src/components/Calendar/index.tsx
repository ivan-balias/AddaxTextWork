import React, {useContext, useEffect, useState} from 'react';

import Title from "./Title";
import Body from "./Body";

import {Calendar} from "./Calendar.styles";
import {AppContext} from "../AppContext";
import styled from "styled-components";
import {EventType} from "../../types/EventType";
import {dateFormat} from "./Calendar.helper";
import {BsPlus} from "react-icons/bs";

const Index = () => {
    const {isOpenEvent, dayEvents, selectedDay, updateDayEvents} = useContext(AppContext);
    const [inputName, setInputName] = useState<string>("");
    const [inputBackground, setInputBackground] = useState<string>("")
    const [inputColor, setInputColor] = useState<string>("")

    const [isOpenModal, setIsOpenModal] = useState<boolean>(false)

    const [filterInput, setFilterInput] = useState<string>("");
    const [filteredEvents, setFilteredEvents] = useState<EventType[]>();

    const [dragId, setDragId] = useState<EventType>();

    useEffect(()=> {
        setFilteredEvents(dayEvents)
    }, [dayEvents])

    useEffect(()=> {
        const filteredData = dayEvents?.filter((el)=> (
            el.name.toLowerCase().includes(filterInput)
        ));
        setFilteredEvents(filteredData)
    }, [filterInput])


    const createEvent = () => {
        const event: EventType = {
            name: inputName,
            public: false,
            background: inputBackground || "#f5f5f5",
            color: inputColor || "#313131",
            order: dayEvents?.length || 0
        }

        updateDayEvents(event, selectedDay);
        close();
    }

    const close = () => {
        setInputName("");
        setInputBackground("");
        setInputColor("");

        setIsOpenModal(false);
    }


    const handleDrag = (e:React.DragEvent<HTMLDivElement>, event:EventType) => {
        setDragId(event);
    }
    const handleDrop = (e:React.DragEvent<HTMLDivElement>, event: EventType) => {

        setFilteredEvents(filteredEvents?.map((ev) => {
            if(event.public)
                return ev;

            if(ev.order === event.order)
                return {...ev, order: dragId?.order || 0}

            if(ev.order === dragId?.order)
                return {...ev, order: event.order || 0}

            return ev
        }))

    }

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
    }



    return (
        <Calendar>
            <Title/>
            <Body/>
            {
                isOpenEvent && (<EventWrap>
                    <EventTitle>
                        {dateFormat(selectedDay.date, "/")}
                        <EventTitleButtons>
                            <input type="text" value={filterInput} onChange={(e) => setFilterInput(e.target.value)}/>
                            <div className="primary" onClick={()=>setIsOpenModal(true)}>
                                <BsPlus/>
                            </div>
                        </EventTitleButtons>
                    </EventTitle>
                    <EventsList>
                        {filteredEvents?.sort((a,b) => (a.order - b.order))?.map((event, i) => (
                            <Event
                                public={event.public} name={event.name} key={i}
                                color={event.color} background={event.background} order={event.order}

                                data-order={event.order}

                                draggable={true}
                                onDragOver={(e) => handleDragOver(e)}
                                onDragEnd={(e)=>e.preventDefault()}
                                onDragStart={(e ) => handleDrag(e,event)}
                                onDrop={(e) => handleDrop(e, event)}
                            >
                                {event.name}
                            </Event>
                        ))}
                    </EventsList>
                </EventWrap>)
            }

            {
                isOpenModal && (
                    <Modal>
                        <ModalContent>
                            <div className="title">
                                Create event
                            </div>
                            <div className="form">
                                <div className="formInput">
                                    <label htmlFor="">Name</label>
                                    <input type="text" value={inputName} onChange={e => setInputName(e.target.value)}/>
                                </div>
                                <div className="formInput">
                                    <label htmlFor="">Background</label>
                                    <input type="color" value={inputBackground}
                                           onChange={e => setInputBackground(e.target.value)}/>
                                </div>
                                <div className="formInput">
                                    <label htmlFor="">Color</label>
                                    <input type="color" value={inputColor} onChange={e => setInputColor(e.target.value)}/>
                                </div>
                            </div>
                            <div className="buttons">
                                <div className="btn secondary" onClick={close}>Cancel</div>
                                <div className="btn primary" onClick={createEvent}>Create</div>
                            </div>
                        </ModalContent>
                    </Modal>
                )
            }
        </Calendar>
    );
};
const Modal = styled.div`

  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, .6);
`

const ModalContent = styled.div`
  padding: 30px 20px;
  display: flex;
  gap: 30px;
  background: #4f4f4f;
  justify-content: center;
  //align-items: center;
  flex-direction: column;
  border-radius: 15px;
  width: 300px;

  .title {
    font-size: 18px;
    text-align: center;
    color: white;
  }

  .form {
    display: flex;
    flex-direction: column;
    gap: 10px;

    .formInput {
      display: flex;
      flex-direction: column;
      gap: 5px;


      label {
        font-size: 16px;
        color: #fff;
      }

      input[type="text"] {
        padding: 5px 10px;
        width: 100%;
      }

      input {
        border-radius: 5px;
        border: 0;
      }
    }
  }

  .buttons {
    align-self: end;
    color: #fff;
    display: flex;
    gap: 10px;

    .btn {
      padding: 5px 10px;
      border-radius: 5px;
    }

    .primary {
      background: #4343db;

    }

    .secondary {
      background: #727272;
    }
  }

`

const EventWrap = styled.div`
  width: 100%;
  padding: 20px 7px;
`
const EventsList = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;

  max-height: 300px;
  overflow: auto;
`

const EventTitle = styled.div`
  color: #fff;
  font-size: 20px;
  margin-bottom: 10px;
  display: flex;
  justify-content: space-between;
`

const EventTitleButtons = styled.div`
  display: flex;
  gap: 10px;

  div {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  input{
    border-radius: 5px;
    border: 0;
  }
  
  .primary {
    background: rgba(159, 159, 159, 0.35);
    border-radius: 5px;
    padding: 5px 10px;

  }

`

const Event = styled.div<EventType>`
  background: ${props => props.background};
  color: ${props => props.color};
  padding: 10px 5px;
  border-radius: 5px;
`

export default Index;