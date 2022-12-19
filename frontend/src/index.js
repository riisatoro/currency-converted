import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App';
import CurrencyProvider from './context/CurrencyContext';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <CurrencyProvider>
    <App />
  </CurrencyProvider>
);
