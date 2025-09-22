// src/components/Layout/AppLayout.jsx
import React from 'react';
import { Layout } from 'antd';
import Header from './Header/Header';
import './AppLayout.css';

const { Content, Footer } = Layout;

export default function AppLayout({ children }) {
  return (
    <Layout className="app-layout">
      <Header />
      <Content className="app-content">
        {children}
      </Content>
      <Footer style={{ textAlign: 'center' }}>
        MyKlaket © {new Date().getFullYear()}
      </Footer>
    </Layout>
  );
}
