import React from 'react';
import {Wrapper} from './App.styles'
import Calendar from "./Calendar";
import AppWrap from "./AppWrap";

function App() {

    return (
        <AppWrap>
            <Wrapper>
                <Calendar/>
            </Wrapper>
        </AppWrap>
    );
}

export default App;
