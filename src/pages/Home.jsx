// src/pages/Home.jsx
import React from 'react';
import styles from './Home.module.css';

export default function Home() {
  return (
    <div className={styles.page}>
      <h1 className={styles.title}>🎬 به MyKlaket خوش اومدی</h1>
      <p className={styles.subtitle}>فیلم مورد علاقه‌ات رو جستجو کن و به کتابخونه‌ات اضافه کن.</p>
    </div>
  );
}
