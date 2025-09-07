// src/main.jsx

import React from 'react';
import ReactDOM from 'react-dom/client';
// ۱. وارد کردن ConfigProvider و theme از antd
import { App as AntAppProvider, ConfigProvider, theme } from 'antd';
import App from './App.jsx';

import './index.css';
import 'antd/dist/reset.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* ۲. اضافه کردن ConfigProvider و تنظیم تم تاریک */}
    <ConfigProvider
      theme={{
        algorithm: theme.darkAlgorithm,
        token: {
          colorPrimary: '#ffad33', // رنگ اصلی برند شما
        },
      }}
    >
      <AntAppProvider>
        <App />
      </AntAppProvider>
    </ConfigProvider>
  </React.StrictMode>,
);