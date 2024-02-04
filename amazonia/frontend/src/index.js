import React from 'react';
import ReactDOM from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App';
import { StoreProvider } from './Store';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <StoreProvider>
    <HelmetProvider>
      <App />
    </HelmetProvider>
    </StoreProvider>
  </React.StrictMode>
);
