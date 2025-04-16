import React from 'react';
import './index.css';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.css';
import { BrowserRouter as Router } from 'react-router-dom';
import { createRoot } from 'react-dom/client';
import Routercomponent from './router/Router';

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

root.render(
  <Router>
    <Routercomponent />
  </Router>
);

// // 👇️ wrap App in Router

// root.render(
//   <Router>
//     <App />
//   </Router>
// );
// const root = ReactDOM.createRoot(document.getElementById('root'));

// root.render( <Router>
//     <Routercomponent />
//   </Router>);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
