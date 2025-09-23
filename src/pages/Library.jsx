import React, { useContext } from 'react';
import { Row, Col } from 'antd';
import styles from './Library.module.css';
import { LibraryContext } from '../context/LibraryContext';
import LibraryCard from '../components/LibraryCard/LibraryCard';

export default function Library() {
  const { movies } = useContext(LibraryContext);

  return (
    <div className={styles.page}>
      <h2 className={styles.title}>📚 کتابخانه من</h2>

      {movies.length === 0 ? (
        <p className={styles.empty}>فعلا فیلمی اضافه نکردی...</p>
      ) : (
        <Row gutter={[16, 16]}>
          {movies.map((movie) => (
            <Col key={movie.id} xs={24} sm={12} md={8} lg={6}>
              <LibraryCard movie={movie} />
            </Col>
          ))}
        </Row>
      )}
    </div>
  );
}
