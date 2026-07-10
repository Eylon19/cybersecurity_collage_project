const express = require('express');
const router = express.Router();
const quizController = require('../controllers/quiz');
const { requireLogin } = require('../middleware/auth');

router.get('/quiz', requireLogin, quizController.getQuiz);
router.post('/quiz', requireLogin, quizController.postQuiz);

module.exports = router;
