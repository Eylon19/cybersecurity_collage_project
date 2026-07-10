const QuizResult = require('../models/quizResult');
const { logError } = require('../util/logger');

const CORRECT_ANSWERS = { q1: 'b', q2: 'c', q3: 'a', q4: 'b' };
const VALID_OPTIONS = new Set(['a', 'b', 'c']);

function validateQuizSubmission(body) {
    for (const question of Object.keys(CORRECT_ANSWERS)) {
        if (!VALID_OPTIONS.has(body[question])) {
            return 'יש לענות על כל שאלות המבחן.';
        }
    }
    return null;
}

exports.getQuiz = (req, res, next) => {
    res.render('quiz', { score: null, error: null });
};

exports.postQuiz = (req, res, next) => {
    const validationError = validateQuizSubmission(req.body);
    if (validationError) {
        return res.render('quiz', { score: null, error: validationError });
    }

    let score = 0;
    for (const [question, answer] of Object.entries(CORRECT_ANSWERS)) {
        if (req.body[question] === answer) {
            score += 25;
        }
    }

    const result = new QuizResult(req.session.user.id, score);
    result.save()
        .then(() => res.render('quiz', { score, error: null }))
        .catch(err => {
            logError('Quiz save error', err);
            res.render('error', { message: 'שגיאה בשמירת תוצאות המבחן' });
        });
};
