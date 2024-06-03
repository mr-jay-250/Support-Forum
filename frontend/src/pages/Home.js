import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { Link } from 'react-router-dom';

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
    <div>
      <h1>Questions</h1>
      <Link to="/create">Ask a Question</Link>
      <div>
        {questions.map(question => (
          <div key={question.id}>
            <h2><Link to={`/questions/${question.id}`}>{question.title}</Link></h2>
            <p>{question.description}</p>
            <p>Views: {question.viewCount}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
