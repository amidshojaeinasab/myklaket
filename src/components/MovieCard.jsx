// src/components/MovieCard.jsx

import React from 'react';
import { Card, Rate } from 'antd';

const { Meta } = Card;

const MovieCard = (props) => {
  // اطلاعات از props استخراج می‌شوند
  const { title, year, posterUrl, rating } = props.movie;

  return (
    <Card
      hoverable
      style={{ width: 240, margin: '16px' }} // کمی فاصله برای نمایش بهتر در لیست
      // ✅ تصحیح شد: استفاده مستقیم از متغیرهای استخراج شده
      cover={<img alt={title} src={posterUrl} />}
    >
      
      <Meta title={`${title} (${year})`} />
      <div style={{ marginTop: '16px' }}>
        
        <Rate allowHalf disabled defaultValue={rating / 2} />
        
        <span style={{ marginLeft: '8px' }}>{rating}</span>
      </div>
    </Card>
  );
};

export default MovieCard;