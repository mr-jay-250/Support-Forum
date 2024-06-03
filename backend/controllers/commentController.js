const Comment = require('../models/Comment');

const createComment = async (req, res) => {
  const { text, questionId } = req.body;
  const comment = await Comment.create({ text, questionId, owner: req.user.id });
  res.json(comment);
};

const getCommentsByQuestionId = async (req, res) => {
  const comments = await Comment.findAll({ where: { questionId: req.params.questionId } });
  res.json(comments);
};

module.exports = { createComment, getCommentsByQuestionId };
