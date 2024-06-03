import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from '../services/api';
import CommentSection from '../components/CommentSection';

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
    <div>
      <h1>{question.title}</h1>
      <p>{question.description}</p>
      <p>Tags: {question.tags}</p>
      <p>Owner: {ownerName}</p>
      <p>Created at: {question.createdAt}</p>
      <CommentSection comments={comments} questionId={id} />
    </div>
  );
};

export default QuestionPage;
