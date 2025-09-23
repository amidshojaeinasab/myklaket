// src/components/Layout/AppLayout.jsx
import React from 'react';
import { Layout } from 'antd';
import HeaderBar from './Header';
import styles from './AppLayout.module.css';

const { Content } = Layout;

export default function AppLayout({ children }) {
  return (
    <Layout className={styles.layout}>
      <HeaderBar />
      <Content className={styles.content}>{children}</Content>
    </Layout>
  );
}
