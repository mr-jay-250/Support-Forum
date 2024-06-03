import React, { useState } from 'react';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';
import styles from '../style/Auth.module.css'; // Import the CSS module

const Auth = ({ isLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const endpoint = isLogin ? '/auth/login' : '/auth/register';
      const response = await api.post(endpoint, { username, password });
      localStorage.setItem('token', response.data.token);
      navigate('/');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.authForm}>
      <div className={styles.formGroup}>
        <label className={styles.label}>Username</label>
        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} className={styles.inputField} />
      </div>
      <div className={styles.formGroup}>
        <label className={styles.label}>Password</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className={styles.inputField} />
      </div>
      <button type="submit" className={styles.submitButton}>{isLogin ? 'Login' : 'Register'}</button>
    </form>
  );
};

export default Auth;
