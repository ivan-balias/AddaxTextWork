export const EventDefaultValue = {
    "1970-01-01": {
        name: "Hello World",
        public: true,
        background: "red",
        color: "#fff",
        order: 1
    },

}

export type EventsType = {
    [key: string]: [
       EventType
    ]
}

export type EventType = {
    name: string,
    public: boolean,
    background: string,
    color: string,
    order: number,
}