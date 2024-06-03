import React, { useState } from 'react';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';
import styles from '../style/CreateQuestion.module.css';

const CreateQuestion = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [tag, setTag] = useState(''); // Changed to single tag selection
  const navigate = useNavigate();

  const tags = ['web', 'java', 'javascript', 'github', 'dsa', 'oops']; // Predefined tags

  const handleSubmit = async (e) => {
    e.preventDefault();
    await api.post('/questions', { title, description, tags: tag }); // Use the selected tag
    navigate('/');
  };

  return (
    <div className={styles.createQuestionContainer}>
      <h2>Create a New Question</h2>
      <form onSubmit={handleSubmit} className={styles.questionForm}>
        <div className={styles.formGroup}>
          <label className={styles.label}>Title</label>
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className={styles.inputField} />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label}>Description</label>
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} className={styles.textareaField} />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label}>Tags</label>
          <select value={tag} onChange={(e) => setTag(e.target.value)} className={styles.selectField}>
            <option value="" disabled>Select a tag</option>
            {tags.map(tag => (
              <option key={tag} value={tag}>{tag}</option>
            ))}
          </select>
        </div>
        <button type="submit" className={styles.submitButton}>Create Question</button>
      </form>
    </div>
  );
};

export default CreateQuestion;
