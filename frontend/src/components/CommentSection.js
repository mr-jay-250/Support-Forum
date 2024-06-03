import React, { useState, useEffect } from 'react';
import api from '../services/api';
import styles from '../style/CommentSection.module.css'; // Import the CSS module

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
    <div className={styles.commentSection}>
      <h2>Comments</h2>
      {comments.map(comment => (
        <div key={comment.id} className={styles.commentItem}>
          <p className={styles.commentText}>{comment.text}</p>
          <p className={styles.commentOwner}>Owner: {ownerNames[comment.owner]}</p>
          <p className={styles.commentTimestamp}>Posted at: {comment.createdAt}</p>
        </div>
      ))}
      <form onSubmit={handleSubmit} className={styles.commentForm}>
        <div>
          <input type="text" value={text} onChange={(e) => setText(e.target.value)} className={styles.commentInput} placeholder="Write a comment..." />
        </div>
        <button type="submit" className={styles.submitButton}>Add Comment</button>
      </form>
    </div>
  );
};

export default CommentSection;
