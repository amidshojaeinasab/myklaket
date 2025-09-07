// src/components/MovieCard.jsx

import React, { useState } from 'react';
import { Card, Rate, Popconfirm, Modal, Input } from 'antd';
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
          width: 220,
          margin: '16px',
          backgroundColor: '#2a2a2a',
          borderColor: '#444',
          overflow: 'hidden',
        }}
        bodyStyle={{ padding: '16px 16px 12px 16px' }}
        cover={<img alt={title} src={posterUrl} style={{ height: 330, objectFit: 'cover' }} />}
        actions={[
          <EditOutlined key="edit" onClick={showEditModal} />,
          <Popconfirm
            key="delete"
            title="Delete this movie?"
            description="Are you sure you want to remove this movie?"
            onConfirm={() => onDelete(id, title)}
            okText="Yes, Remove"
            cancelText="No"
          >
            <DeleteOutlined />
          </Popconfirm>,
        ]}
      >
        <Meta
          title={<span style={{ color: '#e6e6e6', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{`${title} (${year})`}</span>}
        />
        
        {/* نمایش امتیاز TMDB با ۵ ستاره */}
        <div style={{ marginTop: '10px', textAlign: 'center' }}>
          <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: '12px', marginRight: '8px' }}>TMDB:</span>
          <Rate allowHalf disabled value={rating / 2} style={{ fontSize: 16 }} />
          <span style={{ marginLeft: '8px', color: '#ffad33', fontWeight: 'bold' }}>{rating}</span>
        </div>

        {/* نمایش امتیاز کاربر با ۵ ستاره */}
        <div style={{ marginTop: '15px', textAlign: 'center', borderTop: '1px solid #444', paddingTop: '10px' }}>
          <h4 style={{ color: 'rgba(255,255,255,0.7)', margin: '0 0 5px 0', fontWeight: 'normal', fontSize: '14px' }}>My Rating</h4>
          <Rate allowHalf disabled value={userRating / 2} style={{ fontSize: 16 }} />
          {userRating > 0 && (
            <span style={{ marginLeft: '8px', color: '#ffad33', fontWeight: 'bold' }}>{userRating}</span>
          )}
          {userReview && (
            <p style={{ color: 'rgba(255,255,255,0.5)', margin: '5px 0 0 0', fontSize: '12px', fontStyle: 'italic' }}>
              {`"${userReview.substring(0, 30)}${userReview.length > 30 ? '...' : ''}"`}
            </p>
          )}
        </div>
      </Card>

      {/* مودال ویرایش با ۱۰ ستاره کوچک */}
      <Modal
        title={`Review for: ${title}`}
        open={isModalVisible}
        onOk={handleSave}
        onCancel={handleCancel}
        okText="Save"
        cancelText="Cancel"
      >
        <h4 style={{ color: 'rgba(255, 255, 255, 0.85)', marginTop: '0' }}>Your Rating (0-10)</h4>
        <div>
          <Rate
            count={10} // استفاده از ۱۰ ستاره برای دقت کامل
            allowHalf // فعال کردن نیم‌ستاره
            value={editedRating} // مقدار مستقیم در مقیاس ۱۰
            onChange={setEditedRating} // ذخیره مستقیم مقدار در مقیاس ۱۰
            style={{ marginBottom: '20px', fontSize: 18 }} // ۱. ستاره‌ها کوچک‌تر شدند
          />
          <span style={{ fontSize: 20, fontWeight: 'bold', marginLeft: 16, color: '#ffad33' }}>
            {editedRating}
          </span>
        </div>
        
        <h4 style={{ color: 'rgba(255, 255, 255, 0.85)', marginTop: '10px' }}>Your Review</h4>
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