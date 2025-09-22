// src/components/Header/Header.jsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Layout, Menu, Input } from 'antd';
import './Header.css';

const { Header: AntHeader } = Layout;
const { Search } = Input;

export default function HeaderComponent() {
  const navigate = useNavigate();

  const onSearch = (value) => {
    if (!value) return;
    // ارسال کاربر به صفحه جستجو با کوئری در query string
    navigate(`/search?q=${encodeURIComponent(value)}`);
  };

  return (
    <AntHeader className="site-header">
      <div className="logo">
        <Link to="/">MyKlaket</Link>
      </div>

      <div className="header-controls">
        <Search
          placeholder="جستجو فیلم یا سریال..."
          onSearch={onSearch}
          enterButton
          style={{ width: 300 }}
        />
        <Menu mode="horizontal" selectable={false} className="main-menu">
          <Menu.Item key="library">
            <Link to="/library">کتابخانه</Link>
          </Menu.Item>
          <Menu.Item key="dashboard">
            <Link to="/dashboard">داشبورد</Link>
          </Menu.Item>
          <Menu.Item key="about">
            <Link to="/about">درباره من</Link>
          </Menu.Item>
        </Menu>
      </div>
    </AntHeader>
  );
}
