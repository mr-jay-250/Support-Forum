const express = require('express');
const { createQuestion, getQuestions, getQuestionById, incrementViewCount } = require('../controllers/questionController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/', authMiddleware, createQuestion);
router.get('/', getQuestions);
router.get('/:id', getQuestionById);
router.patch('/:id/views', incrementViewCount);

module.exports = router;
