// src/main.jsx

import React from 'react';
import ReactDOM from 'react-dom/client';
import { App as AntAppProvider } from 'antd'; // 1. کامپوننت App از antd را وارد کنید
import App from './App.jsx';

import './index.css';
import 'antd/dist/reset.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* 2. کل برنامه را با AntAppProvider بپوشانید */}
    <AntAppProvider>
      <App />
    </AntAppProvider>
  </React.StrictMode>,
);