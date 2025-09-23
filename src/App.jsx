// src/App.jsx
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AppLayout from './components/Layout/AppLayout';
import Home from './pages/Home';
import Search from './pages/Search';
import Library from './pages/Library';
import Dashboard from './pages/Dashboard';
import { LibraryProvider } from './context/LibraryContext';

export default function App() {
  return (
    <LibraryProvider>
      <BrowserRouter>
        <AppLayout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/search" element={<Search />} />
            <Route path="/library" element={<Library />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </AppLayout>
      </BrowserRouter>
    </LibraryProvider>
  );
}
