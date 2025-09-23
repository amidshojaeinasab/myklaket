// src/components/Layout/Header.jsx
import React from 'react';
import { Input, Menu } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import styles from './Header.module.css';

const { Search } = Input;

export default function HeaderBar() {
  const navigate = useNavigate();

  const onSearch = (value) => {
    if (value.trim()) {
      navigate(`/search?q=${value}`);
    }
  };

  return (
    <header className={styles.header}>
      <div className={styles.logo}>MyKlaket 🎬</div>

      <Menu mode="horizontal" theme="dark" className={styles.menu}>
        <Menu.Item key="home">
          <Link to="/">خانه</Link>
        </Menu.Item>
        <Menu.Item key="library">
          <Link to="/library">کتابخانه</Link>
        </Menu.Item>
        <Menu.Item key="dashboard">
          <Link to="/dashboard">داشبورد</Link>
        </Menu.Item>
      </Menu>

      <Search
        placeholder="جستجوی فیلم..."
        onSearch={onSearch}
        enterButton
        className={styles.search}
      />
    </header>
  );
}
