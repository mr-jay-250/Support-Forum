import React, { useState } from 'react';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';

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
    <form onSubmit={handleSubmit}>
      <div>
        <label>Title</label>
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
      </div>
      <div>
        <label>Description</label>
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
      </div>
      <div>
        <label>Tags</label>
        <select value={tag} onChange={(e) => setTag(e.target.value)}>
          <option value="" disabled>Select a tag</option>
          {tags.map(tag => (
            <option key={tag} value={tag}>{tag}</option>
          ))}
        </select>
      </div>
      <button type="submit">Create Question</button>
    </form>
  );
};

export default CreateQuestion;
