import React from 'react';
import ReactDOM from 'react-dom';
import './App.scss';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";

ReactDOM.render(
  <React.StrictMode>
      <BrowserRouter>
          <Routes>
              <Route path="/" element={<App />} />
              <Route path="user/login" element={<App action='login' />} />
              <Route path="user/register" element={<App action='register' />} />
              <Route path="user/recover" element={<App action='recover' />} />
              <Route path="user/reset" element={<App action='reset' />} />
          </Routes>
      </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
