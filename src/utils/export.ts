import {EventsType} from "../types/EventType";
import {ExportToCsv} from "export-to-csv";

export const exportToCSV = (events: EventsType) => {
    const options = {
        fieldSeparator: ',',
        quoteStrings: '"',
        decimalSeparator: '.',
        showLabels: true,
        showTitle: true,
        title: 'My Awesome CSV',
        useTextFile: false,
        useBom: true,
        useKeysAsHeaders: false,
    };

    console.log(events)

    const csvExporter = new ExportToCsv(options);

    csvExporter.generateCsv(events);

}
export const exportToJSON = (events: EventsType) => {
    const jsonString = `data:text/json;chatset=utf-8,${encodeURIComponent(
        JSON.stringify(events)
    )}`;
    const link = document.createElement("a");
    link.href = jsonString;
    link.download = "events.json";

    link.click();
};