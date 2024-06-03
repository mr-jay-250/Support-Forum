// CommentSection.js
import React, { useState, useEffect } from 'react';
import api from '../services/api';

const CommentSection = ({ comments, questionId }) => {
  const [text, setText] = useState('');
  const [ownerNames, setOwnerNames] = useState({});

  useEffect(() => {
    const fetchOwnerNames = async () => {
      const names = {};
      for (const comment of comments) {
        // Fetch owner's name based on owner ID for each comment
        const response = await api.get(`/auth/${comment.owner}`);
        names[comment.owner] = response.data.username; // Assuming owner's name is returned by the API
      }
      setOwnerNames(names);
    };
    fetchOwnerNames();
  }, [comments]);

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
          <p>Owner: {ownerNames[comment.owner]}</p>
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
