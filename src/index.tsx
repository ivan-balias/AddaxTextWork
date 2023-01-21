import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App';

import GlobalStyles from "./Global.styles";

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

root.render(
    <React.StrictMode>
        <GlobalStyles/>
        <App/>
    </React.StrictMode>
);
