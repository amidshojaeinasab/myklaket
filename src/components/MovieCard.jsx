// src/components/MovieCard.jsx

import React, { useState } from 'react';
import { Card, Rate, Popconfirm, Button, Modal, Input } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';

const { Meta } = Card;
const { TextArea } = Input;

const MovieCard = ({ movie, onDelete, onUpdate }) => {
  const { id, title, year, posterUrl, rating, userRating, userReview } = movie;

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editedRating, setEditedRating] = useState(userRating);
  const [editedReview, setEditedReview] = useState(userReview);

  const showEditModal = () => {
    setEditedRating(userRating);
    setEditedReview(userReview);
    setIsModalVisible(true);
  };

  const handleSave = () => {
    onUpdate(id, { userRating: editedRating, userReview: editedReview });
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <>
      <Card
        hoverable
        style={{
          width: 220, // ۱. عرض کارت کمی بیشتر شد
          margin: '16px',
          backgroundColor: '#2a2a2a',
          borderColor: '#444',
          overflow: 'hidden',
        }}
        // ۲. حداقل ارتفاع برداشته شد و پدینگ تنظیم شد
        bodyStyle={{ padding: '16px 16px 12px 16px' }} 
        // ۳. ارتفاع پوستر متناسب با عرض جدید تنظیم شد
        cover={<img alt={title} src={posterUrl} style={{ height: 330, objectFit: 'cover' }} />} 
        actions={[
          <EditOutlined key="edit" onClick={showEditModal} />,
          <Popconfirm
            title="Delete this movie?"
            description="Are you sure you want to remove this movie?"
            onConfirm={() => onDelete(id, title)}
            okText="Yes, Remove"
            cancelText="No"
          >
            <DeleteOutlined key="delete" />
          </Popconfirm>
        ]}
      >
        <Meta
          title={<span style={{ color: '#e6e6e6', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{`${title} (${year})`}</span>}
        />
        
        <div style={{ marginTop: '10px', textAlign: 'center' }}>
          <Rate allowHalf disabled defaultValue={rating / 2} style={{ fontSize: 16 }} />
          <span style={{ marginLeft: '8px', color: '#ffad33', fontWeight: 'bold' }}>{rating}</span>
        </div>

        <div style={{ marginTop: '15px', textAlign: 'center', borderTop: '1px solid #444', paddingTop: '10px' }}>
          <h4 style={{ color: 'rgba(255,255,255,0.7)', margin: '0 0 5px 0', fontWeight: 'normal', fontSize: '14px' }}>My Review</h4>
          <Rate value={userRating} disabled style={{ fontSize: 16 }} />
          {userReview && (
            <p style={{ color: 'rgba(255,255,255,0.5)', margin: '5px 0 0 0', fontSize: '12px', fontStyle: 'italic' }}>
              "{userReview.substring(0, 30)}{userReview.length > 30 ? '...' : ''}"
            </p>
          )}
        </div>
      </Card>

      {/* مودال برای ویرایش */}
      <Modal
        title={`Review for: ${title}`}
        open={isModalVisible}
        onOk={handleSave}
        onCancel={handleCancel}
        okText="Save"
        cancelText="Cancel"
      >
        <h4>Your Rating</h4>
        <Rate
          value={editedRating}
          onChange={setEditedRating}
          style={{ marginBottom: '20px' }}
        />
        <h4>Your Review</h4>
        <TextArea
          rows={4}
          placeholder="What did you think about this movie?"
          value={editedReview}
          onChange={(e) => setEditedReview(e.target.value)}
        />
      </Modal>
    </>
  );
};

export default MovieCard;