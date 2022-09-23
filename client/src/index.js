import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Left from './components/Left';
import Right from './components/Right';
import reportWebVitals from './reportWebVitals';

const leftanswers = ReactDOM.createRoot(document.getElementById('leftpage'));
leftanswers.render(
  <React.StrictMode>
    <Left />
  </React.StrictMode>
);

const rightanswers = ReactDOM.createRoot(document.getElementById('rightpage'));
rightanswers.render(
  <React.StrictMode>
    <Right />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
