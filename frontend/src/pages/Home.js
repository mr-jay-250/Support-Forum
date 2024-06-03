import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { Link } from 'react-router-dom';
import styles from '../style/Home.module.css'; // Import the CSS module

const Home = () => {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    const fetchQuestions = async () => {
      const response = await api.get('/questions');
      setQuestions(response.data);
    };
    fetchQuestions();
  }, []);

  return (
    <div className={styles.homeContainer}>
      <h1>Questions</h1>
      <Link to="/create">Ask a Question</Link>
      <div className={styles.questionList}>
        {questions.map(question => (
          <div key={question.id} className={styles.questionItem}>
            <h2 className={styles.questionTitle}>
              <Link to={`/questions/${question.id}`}>{question.title}</Link>
            </h2>
            <p className={styles.questionDescription}>{question.description}</p>
            <p className={styles.viewsCount}>Views: {question.viewCount}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
