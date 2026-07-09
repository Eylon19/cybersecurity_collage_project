const express = require('express');
const router = express.Router();
const quizController = require('../controllers/quiz');

function requireLogin(req, res, next) {
    if (!req.session.user) {
        return res.redirect('/login');
    }
    next();
}

router.get('/quiz', requireLogin, quizController.getQuiz);
router.post('/quiz', requireLogin, quizController.postQuiz);

module.exports = router;
