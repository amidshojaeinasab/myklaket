import React, { useContext } from 'react';
import { LibraryContext } from '../context/LibraryContext';
import styles from './Dashboard.module.css';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function Dashboard() {
  const { movies } = useContext(LibraryContext);

  // تعداد کل فیلم‌ها
  const totalMovies = movies.length;

  // میانگین امتیازات شخصی
  const avgRating =
    movies.reduce((sum, movie) => sum + (movie.rating || 0), 0) /
    (totalMovies || 1);

  // داده نمودار (تعداد فیلم‌ها بر اساس امتیاز)
  const ratingData = Array.from({ length: 5 }, (_, i) => {
    const rating = i + 1;
    const count = movies.filter((m) => Math.round(m.rating) === rating).length;
    return { rating: rating.toString(), count };
  });

  return (
    <div className={styles.page}>
      <h2 className={styles.title}>📊 داشبورد کتابخانه</h2>

      <p className={styles.stat}>تعداد کل فیلم‌ها: {totalMovies}</p>
      <p className={styles.stat}>میانگین امتیاز: {avgRating.toFixed(1)}</p>

      <div className={styles.chartContainer}>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={ratingData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="rating" label={{ value: 'امتیاز', position: 'insideBottom', offset: -5 }} />
            <YAxis label={{ value: 'تعداد فیلم', angle: -90, position: 'insideLeft' }} />
            <Tooltip />
            <Bar dataKey="count" fill="var(--primary-color)" />

          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
