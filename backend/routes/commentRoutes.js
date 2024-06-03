const express = require('express');
const { createComment, getCommentsByQuestionId } = require('../controllers/commentController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/', authMiddleware, createComment);
router.get('/:questionId', getCommentsByQuestionId);

module.exports = router;
