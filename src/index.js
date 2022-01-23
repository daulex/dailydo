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
              <Route path="user/verify" element={<App action='verify' />} />
              
              <Route path="settings" element={<App action='settings' />} />

              <Route path="todos" element={<App action='todos' />} />
              <Route path="todos/:id" element={<App action='pastTodo' key={Math.random()} />} />
              <Route path="templates" element={<App action='templates' />} />
              
          </Routes>
      </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
