// src/pages/Search.jsx
import React, { useEffect, useState, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import { Row, Col, Card, Button, Spin } from 'antd';
import { searchMovies } from '../api/tmdb';
import styles from './Search.module.css';
import { LibraryContext } from '../context/LibraryContext';

const { Meta } = Card;

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export default function Search() {
  const query = useQuery();
  const q = query.get('q');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState([]);
  const { addMovie } = useContext(LibraryContext);

  useEffect(() => {
    if (!q) return;
    setLoading(true);
    searchMovies(q)
      .then((data) => {
        setResults(data.results || []);
      })
      .finally(() => setLoading(false));
  }, [q]);

  return (
    <div className={styles.page}>
      <h2 className={styles.title}>
        نتایج جستجو برای: <span className={styles.query}>{q}</span>
      </h2>

      {loading ? (
        <Spin size="large" />
      ) : (
        <Row gutter={[16, 16]}>
          {results.map((movie) => (
            <Col key={movie.id} xs={24} sm={12} md={8} lg={6}>
              <Card
                hoverable
                cover={
                  movie.poster_path ? (
                    <img
                      alt={movie.title}
                      src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    />
                  ) : (
                    <div className={styles.noImage}>بدون پوستر</div>
                  )
                }
                actions={[
                  <Button type="primary" onClick={() => addMovie(movie)}>
                    افزودن به کتابخانه
                  </Button>,
                ]}
              >
                <Meta
                  title={movie.title}
                  description={`امتیاز: ${movie.vote_average}`}
                />
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </div>
  );
}
