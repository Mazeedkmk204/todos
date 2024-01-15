import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import axios from 'axios';
import { BrowserRouter } from "react-router-dom";
axios.defaults.baseURL = "https://node-js-crud-three.vercel.app/api/crud/v1"
axios.interceptors.request.use(async req=>{
  req.headers.Authorization = await localStorage.getItem('authorizationToken') || ""
  return req
})
axios.interceptors.response.use( async req =>await req)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter>
    <App />
    </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
