import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import "./index.css";
import {BrowserRouter} from 'react-router-dom';
import AuthContext from './Context/AuthContext';

const rootElm = document.getElementById("root");
const Root = ReactDOM.createRoot(rootElm);

Root.render(
    <BrowserRouter>
    <AuthContext>
     <App/>
     </AuthContext>
    </BrowserRouter>
);