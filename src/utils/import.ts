import {EventsType} from "../types/EventType";


export const importFromJSON = (result: string | ArrayBuffer | null, updateEvents: (events: EventsType) => void) => {
    const events: EventsType = result && JSON.parse(result.toString());
    updateEvents(events)
}