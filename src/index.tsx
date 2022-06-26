import React from 'react';
import './assets/styles/index.css';
import App from './App';
import ReactDOM from "react-dom";
import { createRoot } from 'react-dom/client';

const container = document.getElementById('root');
// @ts-ignore
const root = createRoot(container);
root.render(<App />);

// ReactDOM.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
//   document.getElementById("root")
// );
