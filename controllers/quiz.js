const QuizResult = require('../models/quizResult');

exports.getQuiz = (req, res, next) => {
    res.render('quiz', { score: null });
};

exports.postQuiz = (req, res, next) => {
    let score = 0;
    if (req.body.q1 === 'b') score += 25;
    if (req.body.q2 === 'c') score += 25;
    if (req.body.q3 === 'a') score += 25;
    if (req.body.q4 === 'b') score += 25;

    const result = new QuizResult(req.session.user.id, score);
    result.save()
        .then(() => res.render('quiz', { score: score }))
        .catch(err => res.render('error', { message: err }));
};
