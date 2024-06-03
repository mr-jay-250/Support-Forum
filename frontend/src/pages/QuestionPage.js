import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../services/api';
import CommentSection from '../components/CommentSection';

const QuestionPage = () => {
  const { id } = useParams();
  const [question, setQuestion] = useState({});
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const fetchQuestion = async () => {
      const response = await api.get(`/questions/${id}`);
      setQuestion(response.data);
    };

    const fetchComments = async () => {
      const response = await api.get(`/comments/${id}`);
      setComments(response.data);
    };

    fetchQuestion();
    fetchComments();
  }, [id]);

  return (
    <div>
      <h1>{question.title}</h1>
      <p>{question.description}</p>
      <p>Tags: {question.tags}</p>
      <p>Owner: {question.owner}</p>
      <p>Created at: {question.createdAt}</p>
      <CommentSection comments={comments} questionId={id} />
    </div>
  );
};

export default QuestionPage;
