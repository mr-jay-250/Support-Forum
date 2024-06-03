import React, { useState } from 'react';
import api from '../services/api';

const CommentSection = ({ comments, questionId }) => {
  const [text, setText] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    await api.post('/comments', { text, questionId });
    window.location.reload();
  };

  return (
    <div>
      <h2>Comments</h2>
      {comments.map(comment => (
        <div key={comment.id}>
          <p>{comment.text}</p>
          <p>Owner: {comment.owner}</p>
          <p>Posted at: {comment.createdAt}</p>
        </div>
      ))}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Comment</label>
          <input type="text" value={text} onChange={(e) => setText(e.target.value)} />
        </div>
        <button type="submit">Add Comment</button>
      </form>
    </div>
  );
};

export default CommentSection;
