import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {AppContainer} from './App';
import reportWebVitals from './reportWebVitals';
import {Provider} from "react-redux";
import {store} from "./store/store";
import {BrowserRouter} from "react-router-dom";
import {createGlobalStyle} from "styled-components";
import "antd/dist/antd.css";
let GlobalStyle=createGlobalStyle`
h1{
        font-size:2vmin;
    }
    p{
        font-size:1.5vmin
    }
@media(max-width:500px){
    h1{
        font-size:5vmin;
    }
    p{
        font-size:3vmin
    }
    }
    
`
ReactDOM.render(
  <React.StrictMode>
      <BrowserRouter>
    <Provider store={store}>
        <GlobalStyle/>
    <AppContainer/>
    </Provider>
      </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
