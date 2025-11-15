import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';

import { products } from './products';

import './main.css';

const reactRoot = ReactDOM.createRoot(document.getElementById('root'));

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);
