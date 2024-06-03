const express = require('express');
const { register, login, getUser } = require('../controllers/authController');
const router = express.Router();

router.get('/:id', getUser );
router.post('/register', register);
router.post('/login', login);

module.exports = router;
