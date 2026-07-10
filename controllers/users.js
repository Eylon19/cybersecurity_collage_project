const User = require('../models/user');
const QuizResult = require('../models/quizResult');
const { validateRegistration } = require('../util/validation');

function toSessionUser(user) {
    return {
        id: user.id,
        username: user.username,
        age: user.age,
        city: user.city,
        occupation: user.occupation,
        favorite_topic: user.favorite_topic,
        experience_level: user.experience_level
    };
}

exports.getHome = (req, res, next) => {
    res.render('index');
};

exports.getRegister = (req, res, next) => {
    res.render('register', { error: null });
};

exports.postRegister = (req, res, next) => {
    const validationErrors = validateRegistration(req.body);
    if (validationErrors.length > 0) {
        return res.render('register', { error: validationErrors[0] });
    }

    const user = new User(
        req.body.username.trim(),
        req.body.password,
        parseInt(req.body.age, 10),
        req.body.city.trim(),
        req.body.occupation.trim(),
        req.body.favoriteTopic.trim(),
        req.body.experienceLevel
    );

    user.save()
        .then(() => res.redirect('/login'))
        .catch(err => {
            console.error('Registration error:', err.message);
            res.render('register', { error: 'לא ניתן להירשם. ייתכן ששם המשתמש כבר קיים.' });
        });
};

exports.getLogin = (req, res, next) => {
    res.render('login', { error: null });
};

exports.postLogin = (req, res, next) => {
    if (!req.body.username || !req.body.password) {
        return res.render('login', { error: 'יש למלא שם משתמש וסיסמה' });
    }

    User.authenticate(req.body.username.trim(), req.body.password)
        .then(user => {
            if (!user) {
                return res.render('login', { error: 'שם משתמש או סיסמה שגויים' });
            }

            req.session.regenerate(err => {
                if (err) {
                    console.error('Session regenerate error:', err.message);
                    return res.render('login', { error: 'אירעה שגיאה בהתחברות' });
                }
                req.session.user = toSessionUser(user);
                res.redirect('/profile');
            });
        })
        .catch(err => {
            console.error('Login error:', err.message);
            res.render('login', { error: 'אירעה שגיאה בהתחברות' });
        });
};

exports.getProfile = (req, res, next) => {
    QuizResult.getByUserId(req.session.user.id)
        .then(rows => {
            res.render('profile', { results: rows[0] });
        })
        .catch(err => {
            console.error('Profile error:', err.message);
            res.render('error', { message: 'שגיאה בטעינת הפרופיל' });
        });
};

exports.logout = (req, res, next) => {
    req.session.destroy(err => {
        if (err) {
            console.error('Logout error:', err.message);
            return res.render('error', { message: 'שגיאה בהתנתקות' });
        }
        res.clearCookie('connect.sid');
        res.redirect('/');
    });
};
