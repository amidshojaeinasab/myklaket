import React, { useState, useContext, useEffect } from 'react';
import { Card, Button, Rate, Input } from 'antd';
import styles from './LibraryCard.module.css';
import { LibraryContext } from '../../context/LibraryContext';

const { Meta } = Card;
const { TextArea } = Input;

export default function LibraryCard({ movie }) {
  const { removeMovie, updateMovie } = useContext(LibraryContext);
  const [rating, setRating] = useState(movie.rating || 0);
  const [note, setNote] = useState(movie.note || '');

  useEffect(() => {
    updateMovie(movie.id, { rating, note });
  }, [rating, note, movie.id, updateMovie]);

  return (
    <Card
      hoverable
      className={styles.card}
      cover={
        movie.poster_path ? (
          <img alt={movie.title} src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} />
        ) : (
          <div className={styles.noImage}>بدون پوستر</div>
        )
      }
      actions={[
        <Button danger onClick={() => removeMovie(movie.id)}>حذف</Button>
      ]}
    >
      <Meta title={movie.title} description={`امتیاز TMDB: ${movie.vote_average}`} />

      <div>
        <span>امتیاز من: </span>
        <Rate value={rating} onChange={setRating} />
      </div>

      <TextArea
        rows={3}
        placeholder="یادداشت یا تحلیل شما"
        value={note}
        onChange={(e) => setNote(e.target.value)}
      />
    </Card>
  );
}
