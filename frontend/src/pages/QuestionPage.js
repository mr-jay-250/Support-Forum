import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from '../services/api';
import CommentSection from '../components/CommentSection';
import styles from '../style/QuestionPage.module.css'; // Import the CSS module

const QuestionPage = () => {
  const { id } = useParams();
  const [question, setQuestion] = useState({});
  const [comments, setComments] = useState([]);
  const [ownerName, setOwnerName] = useState('');

  useEffect(() => {
    const fetchQuestion = async () => {
      const response = await api.get(`/questions/${id}`);
      setQuestion(response.data);
      // Fetch owner's name based on owner ID
      const ownerResponse = await api.get(`/auth/${response.data.owner}`);
      setOwnerName(ownerResponse.data.username); // Assuming owner's name is returned by the API
    };

    const fetchComments = async () => {
      const response = await api.get(`/comments/${id}`);
      setComments(response.data);
    };

    const incrementViewCount = async () => {
      await api.patch(`/questions/${id}/views`);
    };

    fetchQuestion();
    fetchComments();
    incrementViewCount();
  }, [id]);

  return (
    <div className={styles.questionPageContainer}>
      <h1 className={styles.questionTitle}>{question.title}</h1>
      <p className={styles.questionDescription}>{question.description}</p>
      <div className={styles.questionDetails}>
        <p className={styles.questionTags}>Tags: {question.tags}</p>
        <p className={styles.questionOwner}>Owner: {ownerName}</p>
        <p className={styles.questionTimestamp}>Created at: {question.createdAt}</p>
      </div>
      <CommentSection comments={comments} questionId={id} />
    </div>
  );
};

export default QuestionPage;
