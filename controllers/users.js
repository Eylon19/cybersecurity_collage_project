const User = require('../models/user');
const QuizResult = require('../models/quizResult');

exports.getHome = (req, res, next) => {
    res.render('index');
};

exports.getRegister = (req, res, next) => {
    res.render('register', { error: null });
};

exports.postRegister = (req, res, next) => {
    const user = new User(
        req.body.username,
        req.body.password,
        req.body.age,
        req.body.city,
        req.body.occupation,
        req.body.favoriteTopic,
        req.body.experienceLevel
    );

    user.save()
        .then(() => res.redirect('/login'))
        .catch(err => {
            console.log(err);
            res.render('register', { error: 'לא ניתן להירשם. ייתכן ששם המשתמש כבר קיים.' });
        });
};

exports.getLogin = (req, res, next) => {
    res.render('login', { error: null });
};

exports.postLogin = (req, res, next) => {
    User.findByUsernameAndPassword(req.body.username, req.body.password)
        .then(rows => {
            const users = rows[0];
            if (users.length === 0) {
                return res.render('login', { error: 'שם משתמש או סיסמה שגויים' });
            }
            req.session.user = users[0];
            res.redirect('/profile');
        })
        .catch(err => {
            console.log(err);
            res.render('login', { error: 'אירעה שגיאה בהתחברות' });
        });
};

exports.getProfile = (req, res, next) => {
    QuizResult.getByUserId(req.session.user.id)
        .then(rows => {
            res.render('profile', { results: rows[0] });
        })
        .catch(err => {
            console.log(err);
            res.render('error', { message: 'שגיאה בטעינת הפרופיל' });
        });
};

exports.logout = (req, res, next) => {
    req.session.destroy(() => {
        res.redirect('/');
    });
};
