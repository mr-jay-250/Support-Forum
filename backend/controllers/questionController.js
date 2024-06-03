const Question = require('../models/Question');

const createQuestion = async (req, res) => {
  const { title, description, tags } = req.body;
  const question = await Question.create({ title, description, tags, owner: req.user.id });
  res.json(question);
};

const getQuestions = async (req, res) => {
  const questions = await Question.findAll();
  res.json(questions);
};

const getQuestionById = async (req, res) => {
  const question = await Question.findByPk(req.params.id);
  res.json(question);
};

const incrementViewCount = async (req, res) => {
  try {
    const question = await Question.findByPk(req.params.id);
    if (!question) {
      return res.status(404).json({ error: 'Question not found' });
    }
    question.viewCount += 1;
    await question.save();
    res.json(question);
  } catch (error) {
    res.status(500).json({ error: 'Error incrementing view count' });
  }
};

module.exports = { createQuestion, getQuestions, getQuestionById, incrementViewCount };
