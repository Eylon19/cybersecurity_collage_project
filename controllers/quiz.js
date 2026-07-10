const QuizResult = require('../models/quizResult');

const CORRECT_ANSWERS = { q1: 'b', q2: 'c', q3: 'a', q4: 'b' };

exports.getQuiz = (req, res, next) => {
    res.render('quiz', { score: null });
};

exports.postQuiz = (req, res, next) => {
    let score = 0;
    for (const [question, answer] of Object.entries(CORRECT_ANSWERS)) {
        if (req.body[question] === answer) {
            score += 25;
        }
    }

    const result = new QuizResult(req.session.user.id, score);
    result.save()
        .then(() => res.render('quiz', { score }))
        .catch(err => {
            console.error('Quiz save error:', err.message);
            res.render('error', { message: 'שגיאה בשמירת תוצאות המבחן' });
        });
};
