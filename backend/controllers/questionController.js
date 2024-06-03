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
  const question = await Question.findByPk(req.params.id);
  question.viewCount += 1;
  await question.save();
  res.json(question);
};

module.exports = { createQuestion, getQuestions, getQuestionById, incrementViewCount };
