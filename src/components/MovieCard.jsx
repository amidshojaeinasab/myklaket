// src/components/MovieCard.jsx

import React from 'react';
import { Card, Rate } from 'antd';

const { Meta } = Card;

const MovieCard = (props) => {
  const { title, year, posterUrl, rating } = props.movie;

  return (
    <Card
      hoverable
      style={{ 
        width: 200, /* عرض کارت کوچکتر شد */
        margin: '12px',
        backgroundColor: '#2a2a2a',
        borderColor: '#444',
        overflow: 'hidden', // برای اینکه گوشه‌های تصویر گرد شود
      }}
      bodyStyle={{ padding: '16px' }} // پدینگ داخلی کارت
      cover={<img alt={title} src={posterUrl} style={{ height: 300, objectFit: 'cover' }} />}
    >
      <Meta 
        title={<span style={{ color: '#e6e6e6', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{`${title} (${year})`}</span>}
      />
      <div style={{ marginTop: '12px', textAlign: 'center' }}>
        <Rate allowHalf disabled defaultValue={rating / 2} style={{ fontSize: 16 }} />
        <span style={{ marginLeft: '8px', color: '#ffad33', fontWeight: 'bold' }}>{rating}</span>
      </div>
    </Card>
  );
};

export default MovieCard;