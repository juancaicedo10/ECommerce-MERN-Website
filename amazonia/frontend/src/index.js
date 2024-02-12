import React from 'react';
import ReactDOM from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';
import { PayPalScriptProvider } from '@paypal/react-paypal-js'; // Importa PayPalScriptProvider (PayPal en mayúsculas)

import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App';
import { StoreProvider } from './Store';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <StoreProvider>
      <HelmetProvider>
     <PayPalScriptProvider options={{ 'client-id': 'AVO8mXH0OwGNdz0XZ6XJBuHjVeWU6zGZWEyz3jlhRH2ZHjG5vEt8aQBOchXTFjX9pTrmH2fUlSwDkdGU' }}>
        <App />
      </PayPalScriptProvider>
      </HelmetProvider>
    </StoreProvider>
  </React.StrictMode>
);
