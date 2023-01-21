import React, {ChangeEvent, useContext, useRef} from 'react';
import {BsFillCaretLeftFill, BsFillCaretRightFill} from "react-icons/bs";
import {CalendarTitle} from './Title.style';
import monthNames from "../../../data/month.json";
import {AppContext} from "../../AppContext";
import {exportToJSON} from "../../../utils/export";
import {importFromJSON} from "../../../utils/import";
import html2canvas from "html2canvas";

const Index = ({}) => {

    const {curDate, updateCurDate, events, updateEvents} = useContext(AppContext)

    const changeMonth = (operation: string) => {
        switch (operation) {
            case "-":
                updateCurDate({
                    year: curDate.month < 1 ? curDate.year - 1 : curDate.year,
                    month: curDate.month < 1 ? 11 : curDate.month - 1
                })
                break;
            case "+":
                updateCurDate({
                    year: curDate.month > 10 ? curDate.year + 1 : curDate.year,
                    month: curDate.month > 10 ? 0 : curDate.month + 1
                })
                break;
        }
    }

    const inputImportFile = useRef<HTMLInputElement>(null)

    const uploadFile = () => {
        if (inputImportFile.current)
            inputImportFile.current.click();
    }

    const handleUpload = (e: ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files)
            return

        const reader = new FileReader();
        reader.readAsText(e.target.files[0])
        reader.onload = () => {
            importFromJSON(reader.result, updateEvents)
        }
    }

    const saveAsImage = () => {
        html2canvas(document.body, {
            scrollX: 0,
            scrollY: 0
        }).then(canvas => {
            let a = document.createElement("a");
            a.download = `${curDate.year}_${monthNames[curDate.month]}.png`;
            a.href = canvas.toDataURL("image/png");
            a.click();
        });
    }

    return (
        <CalendarTitle>
            <div className="controls">
                <BsFillCaretLeftFill onClick={() => changeMonth("-")}></BsFillCaretLeftFill>
                <span>{monthNames[curDate.month]} {curDate.year}</span>
                <BsFillCaretRightFill onClick={() => changeMonth("+")}></BsFillCaretRightFill>
            </div>

            <div className="buttons">
                <button onClick={saveAsImage}>Save as image</button>
                <button onClick={uploadFile}>Import from JSON</button>
                <button onClick={() => exportToJSON(events)}>Export from JSON</button>
                <input ref={inputImportFile} type="file" accept={".json"} onChange={handleUpload} hidden={true}/>
            </div>
        </CalendarTitle>
    );
};


export default Index;